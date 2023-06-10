import express from 'express';
import scheduleController from './controller/scheduleController.js';

const app = express();

// routes
app.get('/schedule', scheduleController.getAll);
app.get('/schedule/:line', scheduleController.getLineOrByDeparture);

export default app;