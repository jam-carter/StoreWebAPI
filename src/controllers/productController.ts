import { Request, Response } from 'express';
import { getProductAmount, addStock, purchaseItems, normalizeTransactionId } from '../services/productServices';


export const getProduct = (req: Request, res: Response) => {
    const transactionId = req.params.id;
    console.log(`Retrieving product for transactionId: ${transactionId}`);

    const product = getProductAmount(transactionId);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    //Normalize the transactionId to tx124 if the product has been purchased
    const normalizedTransactionId = product.version > 1 ? normalizeTransactionId(transactionId, false) : normalizeTransactionId(transactionId, true);

    return res.status(200).json({
        transactionId: normalizedTransactionId,
        amount: product.amount,
        version: product.version,
        lastUpdated: product.lastUpdated
    });
};

export const stockAmount = (req: Request, res: Response) => {
    const transactionId = req.params.id;
    console.log(`Received request to add stock for transactionId: ${transactionId}`);

    const amount = req.body.amount || req.body.coins;
    console.log(`Adding stock for transactionId: ${transactionId}, amount: ${amount}`);

    const result = addStock(transactionId, amount);

    // Respond based on the status returned from addStock
    if (result.status === 202) {
        console.log(`Duplicate request detected for transactionId: ${transactionId}`);
        return res.status(202).json({
            message: result.message,
            version: result.version,
            amount: result.amount,  // Always return 'amount'
            transactionId: result.transactionId, // Normalized tx123 in response
        });
    }

    // For new stock added, return 201 response
    console.log(`New stock added for transactionId: ${transactionId}`);
    return res.status(201).json({
        transactionId: result.transactionId,
        version: result.version,
        amount: result.amount  // Always return 'amount'
    });
};


export const purchaseProductController = (req: Request, res: Response) => {
    const transactionId = req.params.id; // Use original transactionId for storage and operations
    console.log(`Received request to purchase product for transactionId: ${transactionId}`);

    const amount = req.body.amount || req.body.coins;

    try {
        const result = purchaseItems(transactionId, amount); // Use original transactionId

        // Set the response status based on the status returned from the purchaseItems function
        return res.status(result.status).json(result);  // Set the HTTP status
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === 'Product not found') {
                return res.status(404).json({ message: error.message });
            } else if (error.message === 'Insufficient balance') {
                return res.status(400).json({ message: error.message });
            }
        }
        return res.status(500).json({ message: 'Server error' });
    }
};

