import express from "express";
import userRouter from "./routers/user.js";
import postRouter from "./routers/post.js";
import connectToDatabase from "./utils/databaseConnection.js";

const app = express();
const port = 3000;

// Connect to MongoDB
connectToDatabase();

// Routes
app.use(express.json()); // the application expects to get JSON objects in the requests
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

app.listen(port, () => {
  console.log(`Application is listening on http://localhost:${port}`);
});
