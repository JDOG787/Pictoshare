import * as mongoose from 'mongoose';
import  { Schema, Document, Model } from 'mongoose'

export interface IPost extends Document {
    body: string,
    author: {
        userId: string,
        username: string
    }
}

const schema = new Schema({
    body: String,
    author: {
        userId: String,
        username: String
    },
    created: {
        type: Date,
        default: Date.now()
    }
})


const Post: Model<IPost> = mongoose.model("Post", schema);

export default Post;