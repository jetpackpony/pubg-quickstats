class APIError extends Error {
  constructor(data = {}, ...params) {
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, APIError);
    }

    this.name = "APIError";
    this.data = data;
  }
}
module.exports = APIError;