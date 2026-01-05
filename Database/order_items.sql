CREATE TABLE order_items (
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id),
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price_at_order INT NOT NULL CHECK (unit_price_at_order >= 0),
    PRIMARY KEY (order_id, product_id)
);
