import express from 'express';
import cors from 'cors';
import router from './products.js';

const PORT = process.env.port || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', router);

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

app.listen(`${PORT}`);
