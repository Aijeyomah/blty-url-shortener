import { ErrorOptions } from './interface';

class ModuleError extends Error {
  status: string | number;

  errors: any;

  constructor(options: ErrorOptions) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = options.message;
    this.status = options.status;
    if (options.errors) { this.errors = options.errors; }
  }
}

export default ModuleError;
