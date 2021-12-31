import mongoose from 'mongoose';
import { configuration } from '../../app';

async function dbConnection() {
  await mongoose.connect(
    `mongodb://${configuration.db.username}:${configuration.db.password}@${configuration.db.host}:${configuration.db.port}/${configuration.db.name}`,
  );
}

export default dbConnection;
