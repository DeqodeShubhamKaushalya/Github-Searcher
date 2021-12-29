import dotenv from 'dotenv';
import appStart from './src/app';

const connectionDetails = dotenv.config().parsed;

export default connectionDetails;
appStart();
