import { CustomError } from "./custom-error";

export class DababaseConnectionError extends CustomError {
  reason = "Error connecting to database";
  statusCode = 500;
  constructor() {
    super("Db connecting Error");
    Object.setPrototypeOf(this, DababaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
