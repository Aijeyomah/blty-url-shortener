import rootPath from 'app-root-path';
import development from './development';
import production from './production';
import test from './test';

const {
  PORT,
  SHORT_NODE_ENV: NODE_ENV,
} = process.env;

const currentEnv = {
  development,
  production,
  test,
}[NODE_ENV || 'development'];

export default {
  ...process.env,
  ...currentEnv,
  PORT,
  rootPath,

};
