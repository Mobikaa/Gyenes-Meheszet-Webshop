CREATE TABLE order_billing_address (
    order_id INT PRIMARY KEY REFERENCES orders(id) ON DELETE CASCADE,
    same_as_shipping BOOLEAN NOT NULL,
    phone_number TEXT,
    country TEXT,
    postal_code TEXT,
    city TEXT,
    street TEXT,
    house_number TEXT,
    floor_door TEXT,
    CHECK (
        (same_as_shipping = TRUE AND country IS NULL)
     OR (same_as_shipping = FALSE AND country IS NOT NULL)
    )
);
