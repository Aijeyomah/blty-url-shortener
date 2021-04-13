import ModuleError from './module.error';
import constants from '../constants';
import { ErrorOptions } from './interface';

const { DB_ERROR } = constants;
/**
 *a custom error to handle api errors
 *
 * @export
 * @class DbError
 * @extends {ModuleError}
 */
export default class DbError extends ModuleError {
  /**
   * The DBError Constructor.
   * @param {Object} options - A configuration object for errors.
   * @param {String} options.message - The error message if any.
   * @param {Number} options.status - The status code of error if any.
   * @param {Array} options.errors - Additional error details if any.
   * @constructor DBError
   */
  constructor(options:ErrorOptions) {
    super(options);
    this.name = this.constructor.name;
    this.message = options.message || DB_ERROR;
    this.status = options.status || 500;
  }
}
