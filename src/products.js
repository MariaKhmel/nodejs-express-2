import express from 'express';
import fs from 'fs/promises';
import NotFound from 'http-errors';
import Joi from 'joi';
import { Book } from './models/contact.js';

const router = express.Router();

const productSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    location: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
    try {
        const products = await Book.find();
        console.log(products);
        console.log(Book);
        res.json(products);
    } catch (error) {
        console.log('error');
        next(error);
    }
});
router.post('/', async (req, res, next) => {
    try {
        const result = await Book.create(req.body);
        res.status(201).json(result);

    } catch (error) {
        next(error);
    }
});
router.get('/:id', async (req, res, next) => {

    try {
        const { id } = req.params;
        const result = await Book.findById(id);
        if (!result) {
            throw new NotFound('not found');
        }
        res.json(result);
    } catch (error) {
        next(error);

    }
});

// router.get('/', async (req, res, next) => {
//     try {
//         const data = await fs.readFile('src/data.json', 'utf-8');
//         const products = JSON.parse(data);
//         res.json(products);
//     } catch (error) {
//         console.log('error');
//         next(error);
//     }
// });

// router.get('/:id', async (req, res, next) => {

//     try {
//         const { id } = req.params;
//         const data = await fs.readFile('src/data.json', 'utf-8');
//         const products = JSON.parse(data);
//         const result = products.find(product => product.id === id);
//         if (!result) {
//             throw new NotFound('not found');
//         }
//         res.json(result);
//     } catch (error) {
//         next(error);

//     }
// });

// router.post('/', async (req, res, next) => {
//     try {
//         const { error } = productSchema.validate(req.body);
//         if (error) {
//             error.status(400);
//             throw error;
//         }
//         const data = await fs.readFile('src/data.json', 'utf-8');
//         const products = JSON.parse(data);
//         products.push(req.body);
//         res.status(201).json(req.body);
//         await fs.writeFile('src/data.json', JSON.stringify(products), 'utf-8');
//     } catch (error) {
//         next(error);
//     }
// });

// router.put('/:id', async (req, res, next) => {
//     try {
//         const { error } = productSchema.validate(req.body);
//         if (error) {
//             error.status(400);
//             throw error;
//         }
//         const { id } = req.params;
//         const data = await fs.readFile('src/data.json', 'utf-8');
//         const products = JSON.parse(data);
//         const indexToUpdate = products.find(product => product.id === Number(id));
//         products[indexToUpdate] = req.body;
//         res.json(req.body);
//     } catch (error) {
//         next(error);
//     }
// });

// router.delete('/:id', async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const data = await fs.readFile('src/data.json', 'utf-8');
//         const products = JSON.parse(data);
//         const indexToUpdate = products.find(product => product.id === Number(id));
//         products.splice(indexToUpdate, 1);
//         res.status(201).json(req.body);
//     } catch (error) {
//         next(error);
//     }
// });
export default router;
