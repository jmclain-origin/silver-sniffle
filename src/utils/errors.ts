export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'HttpError';
  }
}

export class FileSystemError extends Error {
  public readonly path: string | undefined;
  constructor(message: string, path?: string) {
    super(message);
    this.name = 'FileSystemError';
    this.path = path;
  }
}

export class ValidationError extends HttpError {
  constructor(message: string) {
    super(400, message);
    this.name = 'ValidationError';
  }
}

export class DatabaseError extends HttpError {
  constructor(message: string) {
    super(500, message);
    this.name = 'DatabaseError';
  }
}

export class AuthenticationError extends HttpError {
  constructor(message: string) {
    super(401, message);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends HttpError {
  constructor(message: string) {
    super(403, message);
    this.name = 'AuthorizationError';
  }
}

export class ThirdPartyServiceError extends HttpError {
  constructor(message: string) {
    super(502, message);
    this.name = 'ThirdPartyServiceError';
  }
}
