import cookieSession from "cookie-session";
import express from "express";
import mongoose from "mongoose";
import currentUser from "./routes/current-user";
import signoutRouter from "./routes/signout";

import signupRouter from "./routes/signup";
import { errorHandler } from "./Utility/errors/error-handler";
import { NotFoundError } from "./Utility/errors/not-found-error";

const app = express();
app.set("trust proxy", true);

app.use(express.json({ limit: "1mb" }));
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUser);
app.use(signoutRouter);
app.use(signupRouter);
app.use(signupRouter);

app.all("*", async (req, res, next) => {
  //throw new NotFoundError();  sync way
  next(new NotFoundError()); // when using async/await in a function
});

app.use(errorHandler);

const startUp = async (): Promise<void> => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("connecte to mongo db");
  } catch (err) {
    console.error("Error connecting to: ", err);
  }
  const PORT = 3000;
  app.listen(PORT, () => console.log("Auth Server is running on port: ", PORT));
};

startUp();
