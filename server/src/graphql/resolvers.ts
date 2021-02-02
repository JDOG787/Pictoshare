import User, { IUser } from '../mongodb/models/User';
import { Context } from '../types/context';
import { compare, hash } from 'bcrypt';
import Post, {IPost} from '../mongodb/models/Post';
import { Query } from 'mongoose';

interface UserInfo {
    username: String,
    password: String,
    email: String
}

interface LoginData {
    email: String,
    password: String
}

export default {
    Query: {
        users: async (_, __, { req }: Context) => {
            if (!req.isAuth) {
                return null;
            }
            return await User.find()
        },

        currentUser: async (_, args, { req }: Context) => {
            if (!req.session.userId) {
                return null;
            }

            try {
                const user = await User.findById(req.session.userId);
                return user;
            } catch {
                return null;
            }
        },

        feed: async (_, __, { req }: Context) => {
            if (!req.isAuth) {
                throw new Error("Unauthenticated");
            }

            const posts = await Post.find({});

            return posts;
        },

        userById: (_, { id }) => {
            const foundUser = User.findById(id);

            return foundUser;
        }
    },

    Mutation: {
        createUser: async (_, { userInfo }: { userInfo: UserInfo }, { res, req }: Context) => {
            const foundUserEmail = await User.findOne({email: userInfo.email});
            if (foundUserEmail) {
                throw new Error("An account already exists with this email")
            }

            const foundUserUsername = await User.findOne({username: userInfo.username});
            if (foundUserUsername) {
                throw new Error("An account already exists with this username")
            }
            const hashedPassword = await hash(userInfo.password, 12);
            const user = await User.create({username: userInfo.username, email: userInfo.email, password: hashedPassword});

            req.session.userId = user._id;
            req.session.username = user.username as string;


            return true
        },

        login: async (_, { loginData }: { loginData: LoginData }, { req }: Context) => {
            const foundUserByEmail = await User.findOne({ email: loginData.email });
            if (foundUserByEmail === null) {
                throw new Error("There isnt an account registered with this email");
            }

            const valid = await compare(loginData.password, foundUserByEmail.password as string)
            if (!valid) {
                throw new Error("Incorrect password")
            }

            req.session.userId = foundUserByEmail._id;
            req.session.username = foundUserByEmail.username as string;

            return true
        },

        createPost: async (_, { body }: { body: string }, { req }: Context) => {
            if (!req.isAuth) {
                throw new Error("Unauthenticated")
            }

            const postData = {
                body,
                author: {
                    userId: req.user?.userId,
                    username: req.user?.username
                }
            }

            await Post.create(postData);

            return true;
        }
    }
}