import { gql } from 'apollo-server-express';

const Url = gql`
  # DATA TYPES
  
  type Url {
    longUrl: String!
    shortUrl: String!
  }
  # RESPONSE TYPES
  type UrlShortenerResponse {
    status: Int!
    message: String!
    shortUrl: String
  }
  
  # MUTATION
  
  extend type Query {
    urlShortener(url: String!, customName: String, replace: Boolean): UrlShortenerResponse!
  }
`;

export default Url;
