import { generateShortUrl } from '../../controllers';

const uriResolvers = {
  Query: {
    urlShortener(parent, { url, customName, replace }) {
      const shortUrl = generateShortUrl(url, customName, replace);
      return shortUrl;
    },
  },
};

export default uriResolvers;
