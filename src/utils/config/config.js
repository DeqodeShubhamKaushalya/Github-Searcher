import convict from 'convict';
import dotenv from 'dotenv';

dotenv.config();

// Define a schema
const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT',
    arg: 'port',
  },
  db: {
    host: {
      doc: 'Database host name/IP',
      format: '*',
      default: 'server1.dev.test',
      env: 'DB_HOST',
    },
    name: {
      doc: 'Database name',
      format: String,
      default: 'users',
      env: 'DB_NAME',
    },
    username: {
      doc: 'Database user name',
      format: '*',
      default: 'admin',
      env: 'DB_USER',
    },
    password: {
      doc: 'Database password',
      format: '*',
      default: 'admin',
      env: 'DB_PASSWORD',
    },
    port: {
      doc: 'The port to bind.',
      format: 'port',
      default: 27017,
      env: 'DB_PORT',
    },
  },
  gitHub: {
    api: {
      baseUrl: {
        doc: 'Git hub api url',
        format: '*',
        default: '',
        env: 'GITHUB_API_URL',
      },
    },
    authToken: {
      doc: 'Git hub auth token',
      format: '*',
      default: '',
      env: 'GIT_HUB_AUTH_TOKEN',
    },
  },
});

// Perform validation
config.validate({ allowed: 'strict' });

export default config;
