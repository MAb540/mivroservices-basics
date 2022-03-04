import express from "express";

const signoutRouter = express.Router();

signoutRouter.post("/api/users/signout", (req, res) => {
  console.log("req came signout");
  res.status(200).json({ message: "json response" });
});

export default signoutRouter;
