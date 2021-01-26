import * as mongoose from 'mongoose';
import  { Schema, Document, Model } from 'mongoose'

export interface IPost extends Document {
    body: string,
    author: {
        username: string,
        userId: string
    },
    // created: Date
}

const schema = new Schema({
    body: String,
    author: {
        username: String,
        userId: String
    },
    created: {
        type: Date,
        default: Date.now()
    }
})


const Post: Model<IPost> = mongoose.model("Post", schema);

export default Post;