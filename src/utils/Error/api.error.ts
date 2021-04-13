import { ErrorOptions } from './interface';
import ModuleError from './module.error';
import constant from '../constants';

const { INTERNAL_SERVER_ERROR } = constant;

/**
   * The ApiError Constructor.
   * @param {Object} options - A configuration object for errors.
   * @param {String} options.message - The error message if any.
   * @param {Number} options.status - The status code of error if any.
   * @param {Array} options.errors - Additional error details if any.
   * @constructor ApiError
   */
class ApiError extends ModuleError {
  
  status: string | number ;
  errors: any;

  constructor(options: ErrorOptions) {
    super(options);
    this.name = this.constructor.name;
    this.message = options.message || INTERNAL_SERVER_ERROR;
    this.status = options.status || 500;
  }
}

export default ApiError;
