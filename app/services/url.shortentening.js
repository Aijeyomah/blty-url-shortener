import randomString from 'randomstring';
import { loggers } from 'winston';
import urlDb from '../model';
import config from '../../config';
import { moduleErrLogMessager } from '../utils';

const { SHORT_BASE_URL } = config;
/**
 * A url shortening service
 *
 * @class UrlShortenerService
 */
class UrlShortenerService {
  /**
   * Creates an instance of UrlShortenerService.
   * @param {string} longLink - The url to be converted to a short url
   * @param {string} [customName=null] - an optional parameter representing
   * a custom name in place of a random string
   * @param {boolean} [replace=false] - an optional parameter signifying if
   * the passed long url should replace all the instances of a long url
   * @memberof UrlShortenerService
   */
  constructor(longLink, customName = null, replace = false) {
    if (!longLink) {
      throw new Error('Long link is required');
    }
    if (customName && customName.length !== 6) {
      throw new Error('custom name must be equal to 6 characters');
    }
    this.longLink = longLink;
    this.customName = customName;
    this.replace = replace;
  }

  /**
 * generates a short url corresponding to the provided long url
 * @returns {string} - short url representing the the long url
 * @memberof UrlShortenerService
 * @return
 */
  generateShortUrl() {
    try {
      let linkExist = false;
      let shortString;

      if (!this.customName) {
        // saves a the random string once it has no occurrence in the database
        do {
          shortString = randomString.generate(6);
          linkExist = this.checkIfShortStringExist(shortString);
        } while (linkExist);

        this.saveShortString(shortString);
        return this.createShortUrl(shortString);
      }

      return this.useCustomName(shortString);
    } catch (e) {
      if (e.code !== 'duplicate_short_name') { e.message = 'Failed to generate shortString'; }
      moduleErrLogMessager(e);
      throw (e);
    }
  }

  /**
 * create a short short url using a provided custom name
 * @param {string} shortString - the custom name
 * @returns {string} - a short url representing the provided long url
 * @memberof UrlShortenerService
 */
  useCustomName(shortString) {
    shortString = this.customName;
    const linkExist = this.checkIfShortStringExist(shortString);

    if (linkExist) {
      // if  the custom name has been used to generate a short url
      // and "this.replace is true", replace
      // the occurrence of the corresponding long url with the new url
      if (this.replace) {
        urlDb.forEach((el) => {
          el.longUrl = this.longLink;
        });
        return this.createShortUrl(shortString);
      }
      const error = new Error(`"${this.customName}" already exists. Replace the existing link with the new one?`);
      error.code = 'duplicate_short_name';
      throw (error);
    } else {
      this.saveShortString(shortString);
      return this.createShortUrl(shortString);
    }
  }

  /**
 * checks if a short string already exist in the db
 * @param {string} shortString - the generated or custom name string
 * @returns {object} - an object containing a long url and a corresponding short url
 * if the short string exist else return undefined
 * @memberof UrlShortenerService
 */
  fetchShortString(shortString) {
    try {
      return urlDb.find((item) => item.shortString === shortString);
    } catch (e) {
      moduleErrLogMessager(e);
    }
  }

  /**
 * @param {string} shortString - checks if a short string exist
 * @returns {boolean} - true if it exist else false
 * @memberof UrlShortenerService
 */
  checkIfShortStringExist(shortString) {
    try {
      const existingShortLink = !!this.fetchShortString(shortString);
      return existingShortLink;
    } catch (e) {
      moduleErrLogMessager(e);
    }
  }

  /**
 * save the long url and corresponding short string
 * @param {string} shortString - the custom name
 * @returns {null} - doesn't return anything
 * @memberof UrlShortenerService
 */
  saveShortString(shortString) {
    try {
      urlDb.push({ longUrl: this.longLink, shortString });
      loggers.info('Url successfully saved');
    } catch (e) {
      moduleErrLogMessager(e);
    }
  }

  /**
 * create a short url link from the generated short string
 * @param {string} shortString - a random string
 * @returns {string} - return a short url link that represents the long link passed
 * @memberof UrlShortenerService
 */
  createShortUrl(shortString) {
    try {
      const shortUrlLink = `${SHORT_BASE_URL}/${shortString}`;
      return shortUrlLink;
    } catch (e) {
      moduleErrLogMessager(e);
    }
  }
}

export default UrlShortenerService;
