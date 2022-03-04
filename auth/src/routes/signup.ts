import express, { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { DababaseConnectionError } from "../Utility/database-connection-error";
import { signUpValidation } from "../Utility/generalUtility";
import { NotFoundError } from "../Utility/not-found-error";
import { RequestValidationError } from "../Utility/request-validation-error";

const signupRouter = express.Router();

signupRouter.post(
  "/api/users/signup",
  signUpValidation(),
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    console.log("req came signup for creating a user");
    throw new DababaseConnectionError();

    // throw new Error("some thing went wrong");
    res.status(200).json({ message: "json response" });
  }
);

export default signupRouter;
