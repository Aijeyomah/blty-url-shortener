export const urlShortenerQuery = `
  query ShortenUrl($url: String!, $customName: String, $replace: Boolean) {
    urlShortener(url: $url, customName: $customName, replace: $replace) {
      status,
      message,
      shortUrl 
    }
  }
`;

export const url = 'https://www.graphql-tools.com/docs/generate-schema/';
export const invalidUrl = 'https/www.graphql-tools.com/docs/generate-schema/';
export const customName = 'enyata';
export const wrongCustomName = 'piggyvest';
