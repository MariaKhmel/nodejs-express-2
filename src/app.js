import express, { response } from 'express';
import cors from 'cors';
import router from './products.js';
import pino from 'pino-http';

const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(pino({
    transport: {
        target: 'pino-pretty'
    }
}));

app.use('/api/products', router);

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
    const { status = 500, message = 'rever error' } = err;
    res.status(500).json({ message: err.message });
});

app.listen(`${PORT}`);
