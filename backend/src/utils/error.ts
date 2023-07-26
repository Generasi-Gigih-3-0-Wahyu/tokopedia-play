export class ErrorBase extends Error {
  message: string;
  statusCode: number;
  cause: any;

  constructor({
    message,
    statusCode,
    cause,
  }: {
    message: string;
    statusCode: number;
    cause?: any;
  }) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.cause = cause;
  }
}
