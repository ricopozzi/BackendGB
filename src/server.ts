import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes/index';
import uploadConfig from './config/upload';
import './database';
import 'reflect-metadata';
import AppError from './errors/AppError';

const app = express();
app.use(express.json());
app.use(routes);
app.use('/files', express.static(uploadConfig.directory));

app.use(
    // middleware de tratativa de erro global
    (err: Error, request: Request, response: Response, _: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                status: 'error',
                message: err.message,
            });
        }

        // eslint-disable-next-line no-console
        console.error(err);

        return response.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    },
);

routes.post('/usuarios', (request, response) => {
    const { name, email } = request.body;

    const user = {
        name,
        email,
    };

    return response.json(user);
});

// eslint-disable-next-line no-console
app.listen(3333, () => console.log('server running finde on port 3333'));
