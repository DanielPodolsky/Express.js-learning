import { Router } from "express";

const router = Router();

const posts = [
  { id: 1, title: "First Post", content: "Hello, World!" },
  { id: 2, title: "Second Post", content: "Another Post" },
];

// Get all posts
router.get("/getall", (req, res) => {
  console.log("Getting all posts...");
  res.json({ data: posts, message: "All posts received!" });
});

// Return posts filtered by title (using a query parameter)
router.get("/getposts", (req, res) => {
  let postTitle = req.query.postTitle;
  console.log(postTitle);
  let filteredPosts = posts.filter((post) => post.title === postTitle);
  if (!filteredPosts) {
    return res.json({ message: "No posts found!" });
  }
  console.log(`Getting posts with title "${postTitle}":`, filteredPosts);
  res.json({ data: filteredPosts, message: "Received filtered posts!" });
});

// Get post by ID using params
router.get("/getposts/:id", (req, res) => {
  let postID = parseInt(req.params.id);
  let post = posts.find((post) => post.id === postID);
  if (!post) {
    return res.json({ message: "No post found!" });
  }
  res.json({ data: post, message: "Found post!" });
});

// We will add with JSON only this time
router.post("/addpost", (req, res) => {
  let title = req.body.title;
  let content = req.body.content;
  let lastID = posts.length;
  let newPost = { id: ++lastID, title: title, content: content };
  posts.push(newPost);
  res.json({ data: posts, message: "Added post successfully!" });
});

// We will update the post using JSON
router.put("/updatepost", (req, res) => {
  let postID = parseInt(req.body.id);
  let postNewContent = req.body.content;
  let post = posts.find((post) => post.id === postID);
  if (!post) {
    return res.json({ message: "No post found to update!" });
  }
  post.content = postNewContent;
  res.json({ data: posts, message: "Updated post successfully!" });
});

// Delete post by ID using params this time
router.delete("/deletepost/:id", (req, res) => {
  let postID = parseInt(req.params.id);
  let post = posts.find((post) => post.id === postID);
  if (!post) {
    return res.json({ message: "No post found to delete!" });
  }
  let postIndex = posts.findIndex((post) => post.id === postID);
  posts.splice(postIndex, 1);
  for (let i = postIndex; i < posts.length; i++) {
    posts[i].id--;
  }
  res.json({ data: posts, message: "Post deleted successfully!" });
});

export default router;
