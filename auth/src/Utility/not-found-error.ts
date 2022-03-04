import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  constructor() {
    super("Route not Found");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  statusCode = 400;
  serializeErrors() {
    return [{ message: "Not Found" }];
  }
}
