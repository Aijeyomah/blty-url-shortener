import constants from './constants';
import ModuleError from './error/module.error';
import genericErrors from './error/generic.errors';

const { SUCCESS_RESPONSE, SUCCESS, FAIL } = constants;
const { serverError } = genericErrors;

/**
 *Contains Helper methods
 */

export const successResponse = (
  res, { message = SUCCESS_RESPONSE, data, code = 200 },
) => res.status(code).json({
  status: SUCCESS,
  message,
  data,
});

/**
   * Generates log for module errors.
   * @static
   * @param {object} error - The module error object.
   * @memberof Helpers
   * @returns { Null } -  It returns null.
   */
export const moduleErrLogMessager = (error) => logger.error(`${error.status} - ${error.name} - ${error.message}`);

/**
   * Generates log for api errors.
   * @static
   * @param {object} error - The API error object.
   * @param {Request} req - Request object.
   * @memberof Helpers
   * @returns {String} - It returns null.
   */
export const apiErrLogMessager = (error, req) => {
  logger.error(
    `${error.name} - ${error.status} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
  );
};

/**
   * Creates Module Error object and logs it with respective error message and status.
   * @static
   * @param { Object } data - The data.
   * @param { Boolean } isDBError - The type of Error object.
   * @memberof Helper
   * @returns { Object } - It returns an Error Object.
   */
export const makeError = ({ error, status, errors }) => {
  const { message } = error;
  const err = new ModuleError({
    message,
    status,
  });
  if (errors) { err.errors = errors; }
  moduleErrLogMessager(err);
  return err;
};

/**
   * Generates a JSON response for failure scenarios.
   * @static
   * @param {Request} req - Request object.
   * @param {Response} res - Response object.
   * @param {object} error - The error object.
   * @param {number} error.status -  HTTP Status code, default is 500.
   * @param {string} error.message -  Error message.
   * @param {object|array} error.errors -  A collection of  error message.
   * @memberof Helpers
   * @returns {JSON} - A JSON failure response.
   */
export const errorResponse = (req, res, error) => {
  const errorCollection = { ...serverError, ...error };
  apiErrLogMessager(errorCollection, req);
  return res.status(errorCollection.status).json({
    status: FAIL,
    message: errorCollection.message,
    errors: errorCollection.errors,
  });
};

/**
   * Generates a response for graphQL success response.
   * @static
   * @param {number} status - the  success status code
   * @param {string} message - the response message
   * @param {string} shortUrl - a short url
   * @memberof Helpers
   * @returns {object} - contains the status, message shortUrl.
   */
export const graphQLUrlResponse = (status, message, shortUrl) => ({
  status,
  message,
  shortUrl,
});
