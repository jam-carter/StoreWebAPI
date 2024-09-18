import { Router } from 'express';
import { getProduct, stockAmount, purchaseProductController } from '../controllers/productController';

const router = Router();

router.get('/:id', getProduct); // Get product by ID

router.post('/:id/stock', stockAmount); // Add stock

router.post('/:id/purchase', purchaseProductController); // Purchase product

export default router;


//Routes for the product API

//Improvemnnts: route validation