export interface SellPosition{
    id: number;
    ticker: string;
    date: string;
    shares: number;
    price: number;
    sellReason: string;
    user_id: string;
}