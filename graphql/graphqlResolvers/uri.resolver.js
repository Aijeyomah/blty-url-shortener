import { generateShortUrl } from '../../app/controllers';

const uriResolvers = {
  Query: {
    urlShortener(parent, { url, customName, replace }) {
      generateShortUrl(url, customName, replace);
    },
  },
};

export default uriResolvers;
