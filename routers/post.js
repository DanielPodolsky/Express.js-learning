import { Router } from "express";
import purify from "../utils/sanitize.js";
import {
  postValidation,
  updatePostValidation,
  postTitleValidation,
} from "../validation/post.js";
import Post from "../models/post.js";

const router = Router();

// Get all posts
router.get("/getall", async (req, res) => {
  try {
    const posts = await Post.find({}); // It will find all documents.
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong with getting posts");
  }
});

// Return posts filtered by title (using a query parameter)
router.get("/getposts", async (req, res) => {
  const postTitle = purify.sanitize(req.query.postTitle); // Sanitize
  const { error } = postTitleValidation.validate({ title: postTitle }); // Validate
  if (error) return res.status(400).json({ data: error.details[0].message });

  try {
    const posts = await Post.find({ title: postTitle }); // It will find all documents with the given title
    if (posts.length === 0) {
      return res
        .status(404)
        .json({ data: "No posts found with the given title." });
    }
    res.status(200).json({ data: posts });
  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong with getting posts by title");
  }
});

// Get post by ID using params
router.get("/getposts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json("Post not found");
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong with getting post by ID");
  }
});

// We will add with JSON only this time
router.post("/addpost", async (req, res) => {
  // 1st step -> Sanitize (purify)
  Object.keys(req.body).forEach((key) => {
    req.body[key] = purify.sanitize(req.body[key]);
  }); // Sanitize each key in the object.

  // 2nd step -> Validate
  const { error } = postValidation.validate(req.body);
  if (error) return res.status(400).json({ data: error.details[0].message });

  // 3nd step -> Create post
  try {
    // One way:
    // const newPost = new Post({
    //   title: req.body.title,
    //   body: req.body.body,
    // });
    // newPost.save(); // This saves our new post into our database.

    // Another way: (ADDED ASYNC TO CALLBACK FUNCTION DECLARATION)
    const newPostSecondWay = await Post.create({
      title: req.body.title,
      body: req.body.body,
    });
    res.status(201).json(newPostSecondWay);
  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong with creating of new post");
  }
});

// We will update the post using JSON + params (JSON for post's title and body, params for the ID)
router.put("/updatepost/:id", async (req, res) => {
  Object.keys(req.body).forEach((key) => {
    req.body[key] = purify.sanitize(req.body[key]);
  }); // Sanitize each key.

  // 2nd step -> Validate
  const { error } = updatePostValidation.validate(req.body);
  if (error) return res.status(400).json({ data: error.details[0].message });

  // 3nd step -> Update post
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // It will return the updated document
    );
    if (!updatedPost) return res.status(404).json("Post not found");
    // We don't need to use post.save(), it does it for us automatically.
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong with updating existing post");
  }
});

// Delete post by ID using params this time
router.delete("/deletepost/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json("Post not found");
    res.status(200).json(deletedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong with deleting post by ID");
  }
});

export default router;
