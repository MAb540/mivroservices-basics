import { Request, Response, NextFunction } from "express";
import { CustomError } from "./custom-error";
import { DababaseConnectionError } from "./database-connection-error";
import { RequestValidationError } from "./request-validation-error";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof CustomError) {
    console.log("instance of cutom error");
    return res.status(err.statusCode).json({ errors: err.serializeErrors() });
  }
  // if (err instanceof RequestValidationError) {
  //   // const formattedErrors = err.errors.map((error) => {
  //   //   return {
  //   //     message: error.msg,
  //   //     field: error.param,
  //   //   };
  //   // });
  //   return res.status(err.statusCode).json({ errors: err.serializeErrors() });
  // }

  // if (err instanceof DababaseConnectionError) {
  //   return res.status(err.statusCode).json({ errors: err.serializeErrors() });
  //   // return res.status(500).json({
  //   //   errors: [{ message: err.reason }],
  //   // }
  //   //);
  // }

  res.status(400).json({ errors: [{ message: err.message }] });
}
