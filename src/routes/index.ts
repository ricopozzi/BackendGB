// src/routes/index.ts
import { Router } from 'express';
import appointmentsRouter from './appointements.routes';
import usersRouter from './user.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
