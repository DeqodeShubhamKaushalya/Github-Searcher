import app from './app';
import config from './utils/config/config';
import dbConnection from './db/config/dbconnection';

// Server start
async function appStart() {
  try {
    await dbConnection();
    app.listen(config.get().port);
    console.log(`app listening at port: ${config.get().port}`);
  } catch (err) {
    console.error(err);
  }
}

appStart();
