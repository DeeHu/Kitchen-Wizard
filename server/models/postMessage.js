import mongoose from 'mongoose';

// Define the post schema using the Mongoose.Schema class
const postSchema = mongoose.Schema({
    title: String,
    description: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount:{
        type: Number,
        default:0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }

});

const PostMessage = mongoose.model('PostMessage', postSchema);
export default PostMessage;