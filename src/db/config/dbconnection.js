import mongoose from 'mongoose';
import config from '../../utils/config/config';

const dbname = config.get('db.name');
const username = config.get('db.username');
const password = config.get('db.password');
const host = config.get('db.host');
const port = config.get('db.port');

async function connectDB() {
  await mongoose.connect(
    `mongodb://${username}:${password}@${host}:${port}/${dbname}`,
  );
}

export default connectDB;
