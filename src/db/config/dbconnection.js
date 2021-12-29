import mongoose from 'mongoose';
import connectionDetails from '../../../index';

async function dbConnection() {
  await mongoose.connect(
    `mongodb://${connectionDetails.DB_USER}:${connectionDetails.DB_PASSWORD}@${connectionDetails.DB_HOST}:${connectionDetails.DB_PORT}/${connectionDetails.DB_NAME}`,
  );
}
export default dbConnection;
