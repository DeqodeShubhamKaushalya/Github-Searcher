import convict from 'convict';
import convict_format_with_validator from 'convict-format-with-validator';

convict.addFormat(convict_format_with_validator.ipaddress);

// Define a schema
const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  ip: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'IP_ADDRESS',
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
    },
    name: {
      doc: 'Database name',
      format: String,
      default: 'users',
    },
    username: {
      doc: 'Database user name',
      format: '*',
      default: 'admin',
    },
    password: {
      doc: 'Database password',
      format: '*',
      default: 'admin',
    },
    port: {
      doc: 'The port to bind.',
      format: 'port',
      default: 27017,
    },
  },
  gitHub: {
    apiBaseUrl: {
      doc: 'Git hub api url',
      format: '*',
      default: '',
    },
    gitHubAuthToken: {
      doc: 'Git hub auth token',
      format: '*',
      default: '',
    },
  },
  admins: {
    doc: 'Users with write access, or null to grant full access without login.',
    format: Array,
    nullable: true,
    default: null,
  },
});

// Load environment dependent configuration
const env = config.get('env');
config.loadFile('.env');

// Perform validation
config.validate({ allowed: 'strict' });

export default config;
