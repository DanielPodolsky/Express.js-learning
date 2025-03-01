import { Router } from "express";
import UserAuth from "../models/userAuth.js";
import purify from "../utils/sanitize.js";
import { userAuthentication } from "../validation/userAuth.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";

const router = Router();

// Handle Registeration
router.post("/register", async (req, res) => {
  // 1) Sanitize JSON object's keys
  Object.keys(req.body).forEach((key) => {
    req.body[key] = purify.sanitize(req.body[key]);
  }); // Sanitize each key(Email, Password)

  // 2) Validate the input data
  const { error } = userAuthentication.validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  // 3) Check if the email already exists in the database
  const user = await UserAuth.findOne({ email: req.body.email });
  if (user) return res.status(400).json({ message: "Email already exists" });

  // 4) If not, let's try to create a new user (Use hashing for the password)
  const salt = await bcrypt.genSalt(10); // 10 is the num of times we are hashing the previous value
  console.log("router.post ~ salt:", salt);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  console.log(req.body.password);

  try {
    const newUser = await UserAuth.create({
      email: req.body.email,
      password: req.body.password,
    });

    // Assign Token
    const tokenProps = {
      id: newUser._id,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    };

    const token = generateToken(tokenProps);
    res
      .cookie("access_token", token, {
        httpOnly: true, // Save the token in httpOnly cookie, the only way to access it is with the access_token string.
        // secure: true, // Use it when working on HTTPS (Production)
      })
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Handle Login
router.post("/login", async (req, res) => {
  // 1) Sanitize JSON object's keys
  Object.keys(req.body).forEach((key) => {
    req.body[key] = purify.sanitize(req.body[key]);
  }); // Sanitize each key(Email, Password)

  // 2) Validate the input data
  const { error } = userAuthentication.validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  // 3) Check if the user doesnt exist in the database
  const user = await UserAuth.findOne({
    email: req.body.email,
  }).select("+password"); // Password field is omitted when fetching from database, so we need to add the field only when authenticating.

  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  // Make sure password fields exist before comparing
  if (!req.body.password)
    return res.status(400).json({ message: "Password is required" });
  if (!user.password)
    return res.status(400).json({ message: "Invalid user data" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ message: "Invalid credentials" });

  // 4) If it does

  // Assign Token
  const tokenProps = {
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
  };

  const token = generateToken(tokenProps);
  res
    .cookie("access_token", token, {
      httpOnly: true, // Save the token in httpOnly cookie, the only way to access it is with the access_token string.
      // secure: true, // Use it when working on HTTPS (Production)
    })
    .status(200)
    .json({ message: "User logged in successfully", user: user });
});

export default router;
