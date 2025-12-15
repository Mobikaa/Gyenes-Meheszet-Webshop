export interface OrderItem {
    item_id: number;
    item_quantity: number;
}

export interface Order{
    id: number,
    email: string,
    date: Date,
    items: OrderItem[];
    total: number
}