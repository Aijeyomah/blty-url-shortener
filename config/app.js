import { json, urlencoded } from 'express';
import morgan from 'morgan';
import config from './env';
import {
  genericErrors, constants, errorResponse, successResponse,
} from '../app/utils';
import urlRoute from '../app/route';

const { SHORT_DOMAIN } = config;
const { notFoundApi } = genericErrors;
const { WELCOME } = constants;
const appConfig = (app, server) => {
  // integrate winston logger with morgan
  app.use(morgan('combined', { stream: logger.stream }));

  // It parses incoming requests with JSON payloads and is based on body-parser
  app.use(json());

  // It parses incoming requests with urlencoded payloads and is based on body-parser.
  app.use(urlencoded({ extended: true }));

  server.applyMiddleware({ app, path: '/graphiql' });
  // add an entry route
  app.get('/', (req, res) => successResponse(res, { message: WELCOME }));

  app.use('/', urlRoute);
  // catches 404 errors and forwards them to error handlers
  app.use((req, res, next) => next(notFoundApi));

  // handles all forwarded errors
  app.use((err, req, res) => errorResponse(req, res, err));

  // server listens for connection
  const port = config.PORT || 4000;
  app.listen(port, () => {
    logger.info(`url shortener running on ${SHORT_DOMAIN}:${port}${server.graphqlPath} `);
  });
};

export default appConfig;
