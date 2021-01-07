import User from '../mongodb/models/User';
import { createAccessToken, createRefreshToken } from '../auth';
import { sendRefreshToken } from '../sendRefreshToken';
import * as bcrypt from 'bcrypt'
import { Context } from '../types/context';

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
        users: async () => {
            return await User.find()
        },
        login: async (_, { loginData }: { loginData: LoginData }, { res }: Context) => {
            const foundUserByEmail = await User.findOne({ email: loginData.email });
            if (!foundUserByEmail) {
                throw new Error("There isnt an account registered with this email");
            }

            if (loginData.password !== foundUserByEmail.password) {
                throw new Error("Incorrect password")
            }

            sendRefreshToken(res, createRefreshToken(foundUserByEmail))

            return { 
                accessToken: createAccessToken(foundUserByEmail), 
                userId: foundUserByEmail._id 
            }
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
            const hash = await bcrypt.hash(userInfo.password, 12);
            const user = await User.create({username: userInfo.username, email: userInfo.email, password: hash});

            sendRefreshToken(res, createRefreshToken(user))

            return { 
                accessToken: createAccessToken(user), 
                userId: user._id 
            }
        }
    }
}