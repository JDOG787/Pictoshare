import * as mongoose from 'mongoose';


export async function connect(): Promise<void> {
    await mongoose.connect('mongodb://localhost:27017/demo', {useNewUrlParser: true, useUnifiedTopology: true})
}