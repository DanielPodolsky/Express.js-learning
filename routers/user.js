import { Router } from "express";
import purify from "../utils/sanitize.js";
import { userValidation, updateUserValidations } from "../validation/user.js";
import User from "../models/user.js";

const router = Router();

// Get all users
router.get("/getall", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0)
      return res.status(200).json("No users currently in our database");
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error getting all users");
  }
});

// Add user - 1 - JSON
router.post("/adduser-withjson", async (req, res) => {
  // 1. Sanitize
  Object.keys(req.body).forEach((key) => {
    req.body[key] = purify.sanitize(req.body[key]);
  }); // Sanitize each key in the object.

  // 2. Validate
  const { error } = userValidation.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // 3. Add user
  try {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error adding user");
  }
});

// Add user - 2 - Queries
router.post("/adduser-withqueries", async (req, res) => {
  // 1. Sanitize
  req.query.firstName = purify.sanitize(req.query.firstName);
  req.query.lastName = purify.sanitize(req.query.lastName);
  req.query.email = purify.sanitize(req.query.email);

  // 2. Validate
  const { error } = userValidation.validate({
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    email: req.query.email,
  });
  if (error) return res.status(400).json({ error: error.details[0].message });

  // 3. Add user
  try {
    const newUser = await User.create({
      firstName: req.query.firstName,
      lastName: req.query.lastName,
      email: req.query.email,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error adding user");
  }
});

// Add user - 3 - Params
router.post(
  "/adduser-withparams/:firstName/:lastName/:email",
  async (req, res) => {
    // 1. Sanitize
    req.params.firstName = purify.sanitize(req.params.firstName);
    req.params.lastName = purify.sanitize(req.params.lastName);
    req.params.email = purify.sanitize(req.params.email);

    // 2. Validate
    const { error } = userValidation.validate({
      firstName: req.params.firstName,
      lastName: req.params.lastName,
      email: req.params.email,
    });
    if (error) return res.status(400).json({ error: error.details[0].message });

    // 3. Add user
    try {
      const newUser = await User.create({
        firstName: req.params.firstName,
        lastName: req.params.lastName,
        email: req.params.email,
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json("Error adding user");
    }
  }
);

// Get a user by ID
router.get("/getuser/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json("User not found");
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong with getting user by ID");
  }
});

// Update a user by ID - 1 - JSON + ID
router.put("/updateuser-withjson/:id", async (req, res) => {
  Object.keys(req.body).forEach((key) => {
    req.body[key] = purify.sanitize(req.body[key]);
  }); // Sanitize each key.

  // 2nd step -> Validate
  const { error } = updateUserValidations.validate(req.body);
  if (error) return res.status(400).json({ data: error.details[0].message });

  // 3nd step -> Update post
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // It will return the updated document
    );
    if (!updatedUser) return res.status(404).json("User not found");
    // We don't need to use post.save(), it does it for us automatically.
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong with updating existing user");
  }
});

// Update a user by ID - 2 - Params
router.put(
  "/updateuser-withparams/:id/:firstName/:lastName/:email",
  async (req, res) => {
    req.params.firstName = purify.sanitize(req.params.firstName);
    req.params.lastName = purify.sanitize(req.params.lastName);
    req.params.email = purify.sanitize(req.params.email);

    // 2nd step -> Validate
    const { error } = updateUserValidations.validate({
      firstName: req.params.firstName,
      lastName: req.params.lastName,
      email: req.params.email,
    });
    if (error) return res.status(400).json({ data: error.details[0].message });

    // 3nd step -> Update post
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.params,
        { new: true } // It will return the updated document
      );
      if (!updatedUser) return res.status(404).json("User not found");
      // We don't need to use post.save(), it does it for us automatically.
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json("Something went wrong with updating existing user");
    }
  }
);

// Update a user by ID - 3 - Params + Queries
router.put("/updateuser-withqueries/:id", async (req, res) => {
  req.query.firstName = purify.sanitize(req.query.firstName);
  req.query.lastName = purify.sanitize(req.query.lastName);
  req.query.email = purify.sanitize(req.query.email);

  // 2nd step -> Validate
  const { error } = updateUserValidations.validate(req.query);
  if (error) return res.status(400).json({ data: error.details[0].message });

  // 3nd step -> Update post
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.query,
      { new: true } // It will return the updated document
    );
    if (!updatedUser) return res.status(404).json("User not found");
    // We don't need to use post.save(), it does it for us automatically.
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong with updating existing user");
  }
});

// Delete a user by ID - 1 - JSON
router.delete("/deleteuser-withjson", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.body.id);
    if (!deletedUser) return res.status(404).json("User not found");
    res.status(200).json(deletedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong with deleting user by ID");
  }
});

// Delete a user by ID - 2 - Params
router.delete("/deleteuser-withparams/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json("User not found");
    res.status(200).json(deletedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong with deleting user by ID");
  }
});

// Delete a user by ID - 2 - Queries
router.delete("/deleteuser-withqueries", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.query.id);
    if (!deletedUser) return res.status(404).json("User not found");
    res.status(200).json(deletedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong with deleting user by ID");
  }
});

// Handle user deletion
function deleteUser(indexToDelete) {
  console.log("Before Deleting", users);
  console.log(indexToDelete);
  users.splice(indexToDelete, 1); // Remove 1 element at index indexToDelete.
  console.log("After Deleting", users);
  for (let i = indexToDelete; i < users.length; i++) {
    users[i].id--; // Decrement ID of all users after deletion.
  }
  console.log("After Deleting AND updating users list", users);
}
export default router;
