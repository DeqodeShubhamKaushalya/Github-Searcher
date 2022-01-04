import express from 'express';
import router from './routers/routes';

const app = express();

app.use('/api/handles', router);

export default app;
