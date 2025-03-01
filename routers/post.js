import { Router } from "express";
import { verifyToken, isAdmin } from "../utils/token.js";

const router = Router();

// Hard coding for JWT authentication + authorization testing
const posts = [
  {
    title: "post 1",
    content: "post 1 content",
  },
  {
    title: "post 2",
    content: "post 2 content",
  },
  {
    title: "post 3",
    content: "post 3 content",
  },
];

// Route to get all posts regardless of the human is logged in or not.
router.get("/", async (req, res) => {
  res.status(200).json(posts);
});

// Route to handle that only users that are logged in (Which means they all have a cookie with access_token) will be able to post a new post.
router.post("/", [verifyToken], async (req, res) => {
  // Before accessing the callback function, you go through the verify token function, which actually verifies if you're connected.
  console.log(req.user); // We will get in the console the user's ID and Email so we can asssociate.
  const { title, content } = req.body;
  posts.push({ title, content });
  res.status(200).send(posts);
});

// Route to delete posts that only admins can do.
// If the next function is called in both verifyToken() and isAdmin(), then the callback function will be triggered.
// This is how you can handle admin only things
// Keep in mind we first go to verifyToken() -> In there, we add / modify the user field in the request object.
// And then in isAdmin, there is already a user field so only thing left to check is the isAdmin field wether its true or false.
router.delete("/:title", [verifyToken, isAdmin], async (req, res) => {
  const { title } = req.params;
  const postIndex = posts.findIndex((post) => post.title === title);
  posts.splice(postIndex, 1);
  res.status(200).json(posts);
});

export default router;
