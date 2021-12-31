import { app, configuration } from './app';
import dbConnection from './db/config/dbconnection';

appStart();

// Establish connection
async function appStart() {
  try {
    await dbConnection();
    app.listen(configuration.port);
    console.log(`app listening at port: ${configuration.port}`);
  } catch (err) {
    console.error(err);
  }
}
