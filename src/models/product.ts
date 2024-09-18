export interface Product {
    transactionId: string;
    amount: number; // This can represent stock amount
    version: number;
    lastUpdated: Date;
}

export interface Amount {
    transactionId: string;
    coins: number; // This can represent purchase amount in coins
    version: number;
    lastUpdated: Date;
}

