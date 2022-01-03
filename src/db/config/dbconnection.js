import mongoose from 'mongoose';
import config from '../../utils/config/config';

async function dbConnection() {
  await mongoose.connect(
    `mongodb://${config.get().db.username}:${config.get().db.password}@${
      config.get().db.host
    }:${config.get().db.port}/${config.get().db.name}`,
  );
}

export default dbConnection;
