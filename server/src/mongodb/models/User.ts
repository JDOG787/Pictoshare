import * as mongoose from 'mongoose';
import  { Schema, Document, Model } from 'mongoose'

export interface IUser extends Document {
    username: String,
    password: String,
    email: String,
    tokenVersion: Number
}

const schema = new Schema({
    username: String,
    password: String,
    email: String,
    tokenVersion: {
        type: Number,
        default: 0
    }
})


const User: Model<IUser> = mongoose.model("User", schema);

export default User;