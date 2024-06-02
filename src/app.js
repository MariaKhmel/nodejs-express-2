import express from 'express';
import cors from 'cors';
import router from './products.js';
import pino from 'pino-http';
import mongoose from "mongoose";
import dotenv from 'dotenv';


dotenv.config();
const { DB_HOST } = process.env;

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
    .then(() => console.log(DB_HOST))
    .catch((err) => {
        console.log(err.message);
        // process.exit(1);
    });



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
