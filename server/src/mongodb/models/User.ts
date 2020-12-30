import * as mongoose from 'mongoose';
import  { Schema, Document, Model } from 'mongoose'

interface IUser extends Document {
    username: String,
    password: String,
}

const schema = new Schema({
    username: String,
    password: String,
})


const User: Model<IUser> = mongoose.model("User", schema);

export default User;