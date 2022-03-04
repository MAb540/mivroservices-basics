import express from "express";

const currentUserRouter = express.Router();

currentUserRouter.get("/api/users/currentuser", (req, res) => {
  console.log("req came");
  res.status(200).json({ message: "json response" });
});

export default currentUserRouter;
