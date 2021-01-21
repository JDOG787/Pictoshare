import User from '../mongodb/models/User';
import { Context } from '../types/context';
import { compare, hash } from 'bcrypt';

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
        users: async (p, a, { req }: Context) => {
            console.log(req.payload)
            if (!req.isAuth) {
                return null;
            }
            return await User.find()
        },

        currentUser: async (_, args, { req }: Context) => {
            // if (!req.isAuth) {
            //     return null;
            // }

            // try {
            //     const user = await User.findById(req.payload.userId);
            //     return user;
            // } catch {
            //     return null;
            // }
        },

        logout: (parent, args, { req }: Context) => {
            req.logout();

            return "Logged out"
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

            return true
        },
    }
}