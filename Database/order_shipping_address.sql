CREATE TABLE order_shipping_address (
    order_id INT PRIMARY KEY REFERENCES orders(id) ON DELETE CASCADE,
    phone_number TEXT NOT NULL,
    country TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    city TEXT NOT NULL,
    street TEXT NOT NULL,
    house_number TEXT NOT NULL,
    floor_door TEXT
);
