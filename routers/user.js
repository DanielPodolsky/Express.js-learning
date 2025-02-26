import { Router } from "express";

const router = Router();

const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
];

// Get all users
router.get("/getall", (req, res) => {
  console.log("Getting all users...");
  res.json({ data: users, message: "Users List" });
});

// Add a user with incremented ID - 1 - JSON
router.post("/adduser-withjson", (req, res) => {
  let lastID = users.length;
  let newUserName = req.body.name; // Automatically converts to JS object, because the body contains our data so it just does that for us
  let newUserData = { id: ++lastID, name: newUserName };
  console.log(newUserData);
  users.push(newUserData);
  res.json({ data: users, message: "New User Added!" });
});

// Add a user with incremented ID - 2 - Queries
router.post("/adduser-withqueries", (req, res) => {
  let lastID = users.length;
  let newUserName = req.query.name || "Null Name By Default";
  let newUserData = { id: ++lastID, name: newUserName };
  console.log(newUserData);
  users.push(newUserData);
  res.json({ data: users, message: "New User Added!" });
});

// Add a user with incremented ID - 3 - Params
router.post("/adduser-withparams/:userName", (req, res) => {
  let lastID = users.length;
  let newUserName = req.params.userName || "Null Name By Default";
  let newUserData = { id: ++lastID, name: newUserName };
  console.log(newUserData);
  users.push(newUserData);
  res.json({ data: users, message: "New User Added!" });
});

// Get a user by ID
router.get("/getuser/:id", (req, res) => {
  let userID = parseInt(req.params.id);
  let user = users.find((user) => user.id === userID);
  if (!user) {
    return res.json({ message: "User Not Found!" });
  }
  console.log(user);
  res.json({ data: user, message: "User Found!" });
});

// Update a user by ID - 1 - JSON
router.put("/updateuser-withjson", (req, res) => {
  let newName = req.body.name || "Default Name";
  let userID = req.body.id;
  let user = users.find((user) => user.id === userID);
  if (!user) {
    return res.json({ message: "User Not Found!" });
  }
  console.log("Before Updating", user);
  user.name = newName;
  console.log("After Updating", user);
  res.json({ data: user, message: "User Updated!" });
});

// Update a user by ID - 2 - Params
router.put("/updateuser-withparams/:id/:newName", (req, res) => {
  let newName = req.params.newName || "Default Name";
  let userID = parseInt(req.params.id);
  let user = users.find((user) => user.id === userID);
  if (!user) {
    return res.json({ message: "User Not Found!" });
  }
  console.log("Before Updating", user);
  user.name = newName;
  console.log("After Updating", user);
  res.json({ data: user, message: "User Updated!" });
});

// Update a user by ID - 3 - Queries
router.put("/updateuser-withqueries/", (req, res) => {
  let newName = req.query.newName || "Default Name";
  let userID = parseInt(req.query.userID);
  let user = users.find((user) => user.id === userID);
  if (!user) {
    return res.json({ message: "User Not Found!" });
  }
  console.log("Before Updating", user);
  user.name = newName;
  console.log("After Updating", user);
  res.json({ data: user, message: "User Updated!" });
});

// Delete a user by ID - 1 - JSON
router.delete("/deleteuser-withjson", (req, res) => {
  let userID = parseInt(req.body.id);
  let user = users.find((user) => user.id === userID);
  if (!user) {
    return res.json({ message: "User Not Found!" });
  }
  let indexToDelete = users.findIndex((user) => user.id === userID);
  deleteUser(indexToDelete);
  res.json({ data: users, message: "User deleted!" });
});

// Delete a user by ID - 2 - Params
router.delete("/deleteuser-withparams/:id", (req, res) => {
  let userID = parseInt(req.params.id);
  let user = users.find((user) => user.id === userID);
  if (!user) {
    return res.json({ message: "User Not Found!" });
  }
  let indexToDelete = users.findIndex((user) => user.id === userID);
  deleteUser(indexToDelete);
  res.json({ data: users, message: "User deleted!" });
});

router.delete("/deleteuser-withqueries", (req, res) => {
  let userID = parseInt(req.query.userID);
  let user = users.find((user) => user.id === userID);
  if (!user) {
    return res.json({ message: "User Not Found!" });
  }
  let indexToDelete = users.findIndex((user) => user.id === userID);
  deleteUser(indexToDelete);
  res.json({ data: users, message: "User deleted!" });
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
