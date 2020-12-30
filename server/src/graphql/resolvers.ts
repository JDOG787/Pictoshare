import User from '../mongodb/models/User';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt'

interface UserInfo {
    username: String,
    password: String
}

interface CurrentUser {
    username: String
}

type UserContext = undefined | CurrentUser

export default {
    Query: {
        users: async (parent, args, { user }: { user: UserContext }) => {
            if (!user) {
                return;
            }
            return await User.find()
        },
    },

    Mutation: {
        createUser: async (_, { userInfo }: { userInfo: UserInfo }) => {
            const foundUser = await User.findOne({username: userInfo.username});
            if (foundUser) {
                throw new Error("An account already exists with this username")
            }
            const hash = await bcrypt.hash(userInfo.password, 12);
            const user = await User.create({username: userInfo.username, password: hash});
            const token = await jwt.sign({username: user.username, userId: user._id}, process.env.JWT_SECRET, {
                expiresIn: '1d'
            })
            return { token, userId: user._id }
        }
    }
}