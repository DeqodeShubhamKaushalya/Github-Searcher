import mongoose from 'mongoose';
import config from '../../utils/config/config';

const configuration = config.get();

async function dbConnection() {
  await mongoose.connect(
    `mongodb://${configuration.db.username}:${configuration.db.password}@${configuration.db.host}:${configuration.db.port}/${configuration.db.name}`,
  );
}

export default dbConnection;
