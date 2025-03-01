import express from "express";
import userRouter from "./routers/user.js";
import userAuthRouter from "./routers/userAuth.js";
import postRouter from "./routers/post.js";
import connectToDatabase from "./utils/databaseConnection.js";
import { config } from "dotenv";
config(); // Call the config function directly

const app = express();
const port = 3000;

// Connect to MongoDB
connectToDatabase();

// Routes
app.use(express.json()); // the application expects to get JSON objects in the requests
app.use("/api/user", userRouter);
app.use("/api/auth", userAuthRouter);
app.use("/api/post", postRouter);

app.listen(port, () => {
  console.log(`Application is listening on http://localhost:${port}`);
});
