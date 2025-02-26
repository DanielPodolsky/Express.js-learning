import express from "express";
import userRouter from "./routers/user.js";
import postRouter from "./routers/post.js";

const app = express();
const port = 3000;

// Routes
app.use(express.json()); // the application expects to get JSON objects in the requests
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

app.listen(port, () => {
  console.log(`Application is listening on http://localhost:${port}`);
});
