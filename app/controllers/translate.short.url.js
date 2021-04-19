import {
  ApiError, constants, errorResponse, genericErrors, moduleErrLogMessager,
} from '../utils';
import UrlShortenerService from '../services';

const { ERROR_REDIRECTING_FAIL, ERROR_REDIRECTING } = constants;

/**
   * redirect the short url to the corresponding long url
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { string | Null } - Returns error response if validation fails or a long url.
   * @memberof AuthMiddleware
   *
   */
const redirectToLongUrl = (req, res, next) => {
  try {
    const { shortUrl } = req.params;

    const urlService = new UrlShortenerService(shortUrl);
    const { longUrl } = urlService.fetchShortString(shortUrl) || {};
    return longUrl ? res.redirect(longUrl) : errorResponse(req, res, genericErrors.notFoundApi);
  } catch (e) {
    const error = new ApiError({
      status: ERROR_REDIRECTING_FAIL,
      message: e.message,
    });
    moduleErrLogMessager(error);
    next(new ApiError({ message: ERROR_REDIRECTING }));
  }
};

export default redirectToLongUrl;
