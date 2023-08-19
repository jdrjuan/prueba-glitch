import express from "express";
import Product from "../models/Product.js";
import ProductManager from '../services/ProductManager.js';
import config from '../config.js';

const productRouter = express.Router();

productRouter.use(express.json());
// productRouter.use(express.urlencoded({ extended: true }));

const PRODUCTS_FILE_PATH = config.PRODUCTS_FILE_PATH || './src/data/products.json';
const productManager = new ProductManager(PRODUCTS_FILE_PATH);


productRouter.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    const {limit} = req.query;

    // If limit string contains an integer value
    if(/^\d+$/.test(limit)) {
        const productsLimit = +limit;
        const productsRange = products.slice(0, productsLimit);
        return res.send(productsRange);
    }
    
    res.send(products);
})

productRouter.get('/:pid', async (req, res) => {
    const {pid} = req.params;

    const product = await productManager.getProductById(parseInt(pid));
    if (!product) {
        res.status(404).send({});
        return;
    }

    res.send(product);
})

productRouter.post('/', async (req, res) => {
    console.clear();
    console.log(`___________${new Date().toLocaleString()}___________`);
    
    const product = new Product(req.body);

    try {
        const newProduct = await productManager.addProduct(product);
        console.log(newProduct);
        res.json(newProduct);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({error: 'Could not create product', details: error.message});
    }
    
});

productRouter.delete('/:pid', async (req, res) => {
    const {pid} = req.params;

    let deletedProduct;

    try {
        deletedProduct = await productManager.deleteProduct(parseInt(pid));
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({error: 'Could not delete product', details: 'An error was found while trying to delete the product.'});
    }
    
    if (!deletedProduct) {
        return res.status(404).send({error: 'Could not delete product', details: 'The product could not be found.'});
    }

    res.send(deletedProduct);
})

export default productRouter;
