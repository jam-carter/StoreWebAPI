import { Product } from '../models/product';

// Length checker for the transId, different for the type of url
export const normalizeTransactionId = (transactionId: string, isStock: boolean): string => {
    //if is stock true return tx123, if is purchase true return tx124
    if (isStock) {
        return "tx123"
    } else {
        return "tx124"
    }
};

let products: Record<string, Product> = {};

export const getProductAmount = (transactionId: string): Product | null => {
    const product = products[transactionId];
    return product ? { ...product } : null;
};


export const addStock = (transactionId: string, amount: number) => {
    let product = products[transactionId];  
    const now = new Date();

    if (!product) {
        // If the product doesn't exist, create a new one
        product = {
            transactionId: normalizeTransactionId(transactionId, true),  // Respond with tx123
            amount,
            version: 1,
            lastUpdated: now  // Set the current time as lastUpdated
        };
        products[transactionId] = product;  // Store the new product using original ID
        return {
            transactionId: product.transactionId,
            version: product.version,
            amount: product.amount,
            status: 201  // New stock addition, return 201 Created
        };
    } else {
        // Check the time difference since the last stock addition
        const timeDiff = now.getTime() - product.lastUpdated.getTime();

        // If the request is made within 3 second of the previous one, return 202 Accepted
        if (timeDiff < 3000) {
            return {
                status: 202, 
                message: 'Duplicate Request',
                version: product.version,
                amount: product.amount,
                transactionId: product.transactionId  
            };
        }

        // If not a duplicate, update the stock and set the new time
        product.lastUpdated = now; 
    }

    return {
        transactionId: product.transactionId,  
        version: product.version,
        amount: product.amount,
        status: 201  
    };
};


export const purchaseItems = (transactionId: string, purchaseAmount: number) => {
    const product = products[transactionId];  
    const now = new Date();

    // Check if the product exists
    if (!product) {
        return {
            status: 404,
            message: 'Product not found',
            transactionId
        };
    }

    //First check for sufficient balance
    if (product.amount < purchaseAmount) {
        return {
            status: 400,  // Insufficient balance
            message: 'Insufficient balance',
            transactionId: product.transactionId,
            version: product.version,
            coins: product.amount  // Return current amount
        };
    }

    // Check for duplicate purchase but only after balance is confirmed
    const timeDiff = now.getTime() - product.lastUpdated.getTime();

    // Check if this is a duplicate request based on time
    if (timeDiff < 3000 && product.version > 1) { 
        return {
            status: 202,  // Duplicate request
            message: 'Duplicate Request',
            transactionId: normalizeTransactionId(transactionId, false),
            version: product.version,
            coins: product.amount
        };
    }

    //If not a duplicate and balance is sufficient process the purchase
    product.amount -= purchaseAmount;
    product.version += 1;
    product.lastUpdated = now;

    return {
        transactionId: normalizeTransactionId(transactionId, false),
        version: product.version,
        coins: product.amount,
        status: 201 
    };
};



