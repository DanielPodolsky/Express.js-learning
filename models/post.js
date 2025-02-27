import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },

  body: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 500,
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
