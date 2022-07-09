import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { User } from "../models/user";
import { BadRequestError } from "../Utility/errors/bad-request-errror";
import { RequestValidationError } from "../Utility/errors/request-validation-error";
import jwt from "jsonwebtoken";

export async function signUp(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    next(new RequestValidationError(errors.array()));
  }

  const { email, password } = req.body;

  // returns null if no document is matched
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    next(new BadRequestError("Email already registered"));
    return;
  }

  const user = User.build({ email, password });
  await user.save();
  // one way to handle typescrpt jwt undefined error
  // if(!process.env.JWT_KEY){
  //   throw new Error('JWT Env variable is not defined')
  // }
  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY! // '!' is used to make typescript happy when we are 100% sure that a variable can not be undefined
  );

  // Store token on session object
  req.session = {
    jwt: userJwt,
  };

  res.status(201).json(user);
}
