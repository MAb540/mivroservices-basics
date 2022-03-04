import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

// interface CustomError {
//   statusCode: number;
//   serializeErrors(): {
//     message: string;
//     field: string;
//   }[];
// }

export class RequestValidationError extends CustomError {
  // error : ValidationError[];
  // constructor(error: ValidationError[]){
  //     super();
  //     this.error = error;
  // }
  // this is equivalent to above code
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super("request validaton error");

    // on because we are extending a base class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => {
      return {
        message: error.msg,
        field: error.param,
      };
    });
  }
}
