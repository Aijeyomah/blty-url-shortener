/* eslint-disable */ 
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { makeExecutableSchema } from 'graphql-tools';
import { graphql } from 'graphql';
import { resolvers, typeDefs } from '../app/graphql';
import urlResolvers from '../app/graphql/graphqlResolvers/uri.resolver';
import { url, urlShortenerQuery, invalidUrl, customName, wrongCustomName } from './query.test';
import { constants } from '../app/utils';
import app from '..';

const { SHORTEN_URL, NOT_FOUND_API, INVALID_URL } = constants;
chai.use(chaiHttp);

const runQuery = (query, variables = {}, ctx = {}) => {
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  return graphql(schema, query, null, { ...ctx }, variables);
};

describe('Url tests', () => {
  describe('Shorten url', () => {
    it('should resolve correctly', () => {
      const result = urlResolvers.Query.urlShortener(null, { url });
      expect(result.status).to.eql(200);
      expect(result.message).to.eql(SHORTEN_URL);
    });

    it('It should query shortenUrlQuery correctly', async () => {
      const { data } = await runQuery(urlShortenerQuery, { url });
      expect(data.urlShortener.status).to.eql(200);
      expect(data.urlShortener.message).to.eql(SHORTEN_URL);
    });

    it('It should successfully return a shortened url with the custom name ', async () => {
      const { data, errors } = await runQuery(urlShortenerQuery, { url, customName });
      expect(data.urlShortener.errors).to.be.undefined;
      expect(data.urlShortener.status).to.eql(200);
      expect(data.urlShortener.message).to.eql(SHORTEN_URL);
    });

    it('It should throw error if the the custom already exist and replace parameter is not provided or set to false', async () => {
      const { data } = await runQuery(urlShortenerQuery, { url, customName });
      expect(data.urlShortener.status).to.eql(500);
      expect(data.urlShortener.message).to.eql(`Custom name - ${customName} already exists. Replace the existing link with the new one?`);
      expect(data.urlShortener.shortUrl).to.eql(null);
    });

    it('It should successfully replace the existing long link with the new one and return a shortened url with the custom name ', async () => {
      const { data } = await runQuery(urlShortenerQuery, { url, customName, replace: true });
      expect(data.urlShortener.status).to.eql(200);
      expect(data.urlShortener.message).to.eql(SHORTEN_URL);
    });

    it('should fail to query shortenUrlQuery correctly when an incorrect parameter is passed', async () => {
      const { errors } = await runQuery(urlShortenerQuery, { body: url });
      expect(errors).to.not.be.undefined;
    });

    it('It should throw an error when an invalid url is passed as a parameter ', async () => {
      const { data } = await runQuery(urlShortenerQuery, { url: invalidUrl });
      expect(data.urlShortener.status).to.eql(400);
      expect(data.urlShortener.message).to.eql(INVALID_URL);
    });

    it('It should successfully return a shortened url with the custom name ', async () => {
      const { data, } = await runQuery(urlShortenerQuery, { url, customName: wrongCustomName });
      expect(data.urlShortener.errors).to.be.undefined;
      expect(data.urlShortener.status).to.eql(500);
      expect(data.urlShortener.message).to.eql('custom name must be equal to 6 characters');
    });
  });
  describe('Redirect Url', async () => {
    it('it should throw error if short url is invalid', async () => {
      const response = await chai.request(app).get('/RwxoI5');
      const { message } = response.body;
      expect(response.status).to.eql(404);
      expect(message).to.eq(NOT_FOUND_API);
    });

    it('return 200 for redirected url', async () => {
      const response = await chai.request(app).get('/enyata');
      expect(response).to.have.status(200);
      expect(response.redirects[0]).to.equal(url);
    });
  });
});
