import isUrl from 'is-url';
import UrlShortenerService from '../services';
import {
  graphQLUrlResponse, constants, ApiError, moduleErrLogMessager,
} from '../utils';

const { SHORTEN_URL_FAIL, SHORTEN_URL, INVALID_URL } = constants;

/**
 * generate a short url representing the long url
 * @param {string} url -The long url to be converted to short url
 * @param {string} [customName=null] - an optional parameter representing a
 * custom name in place of a random string
  * @param {boolean} [replace=false] - an optional parameter signifying
  * if the passed long url should replace all the instances of a long url
  * @returns { JSON } A JSON response with the short url.

 */
const generateShortUrl = (url, customName = null, replace = false) => {
  try {
    if (isUrl(url)) {
      const shortUrlService = new UrlShortenerService(url, customName, replace);
      const data = shortUrlService.generateShortUrl();
      return graphQLUrlResponse(200, SHORTEN_URL, data);
    }
    return graphQLUrlResponse(400, INVALID_URL);
  } catch (e) {
    const error = new ApiError({
      status: SHORTEN_URL_FAIL,
      message: e.message,
    });
    moduleErrLogMessager(error);
    return graphQLUrlResponse(500, e.message);
  }
};

export default generateShortUrl;
