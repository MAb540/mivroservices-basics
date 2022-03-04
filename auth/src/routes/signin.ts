import express from "express";

const signinRouter = express.Router();

signinRouter.post("/api/users/signin", (req, res) => {
  console.log("req came");
  res.status(200).json({ message: "json response" });
});

export default signinRouter;
