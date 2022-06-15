import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name:String,
  creator: String,//creator will get automatic string
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],//this will be array of ids
    default: [],//initially default it will be empty array
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
