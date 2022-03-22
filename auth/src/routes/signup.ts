import express from "express";
import { signUp } from "../services/signupService";
import { signUpValidation } from "../Utility/generalUtility";

const signupRouter = express.Router();

signupRouter.post("/api/users/signup", signUpValidation(), signUp);

export default signupRouter;

// (req: Request, res: Response) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     throw new RequestValidationError(errors.array());
//   }

//   console.log("req came signup for creating a user");
//   throw new DababaseConnectionError();

//   // throw new Error("some thing went wrong");
//   res.status(200).json({ message: "json response" });
// }
