import express from 'express';
import data from './data.js';
import fs from 'fs/promises';

const router = express.Router();


// router.get('/', (req, res) => {
//     res.json({
//         'name': 'name'
//     });
// });

// router.get('/:id', (req, res) => {
//     const { id } = req.params;
//     const result = data.find(item => item.id === id);
//     if (!result) {
//         res.status(404).json({
//             'status': 'error',
//             'code': '404'
//         });
//     }
//     res.json(result);
// });


// //post

// router.post('/', (req, res) => {
//     const newProduct = { ...req.body, id: '22' };
//     data.push(newProduct);
//     res.status(201).json(newProduct);
// });

router.get('/', async (req, res, next) => {
    const products = await fs.readFile('src/data.js', 'utf-8');
    console.log(products);
    res.json(products);
});
export default router;
