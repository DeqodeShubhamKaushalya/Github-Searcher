import app from './app';
import config from './utils/config/config';
import connectDB from './db/config/dbconnection';
import logger from './utils/logger';

const port = config.get('port');

// Server start
async function appStart() {
  try {
    await connectDB();
    app.listen(port);
    logger.info(`app listening at port: ${port}`);
  } catch (err) {
    logger.error(err.message);
  }
}

appStart();
