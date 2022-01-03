import express from 'express';
import reposRouter from './routers/repos.router';
import profileRouter from './routers/profile.router';

const app = express();

app.use('/api/handler', reposRouter);
app.use('/api/user', profileRouter);

export default app;
