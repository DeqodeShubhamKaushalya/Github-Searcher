import express from 'express';
import config from './utils/config/config';
import reposRouter from './routers/repos.router';
import profileRouter from './routers/profile.router';
import { repoLogger, profileLogger } from './utils/config/logger';

const configuration = config.get();
const app = express();

app.use('/api/handler', reposRouter);
app.use('/api/user', profileRouter);

export { app, configuration, repoLogger, profileLogger };
