CREATE TABLE user_shipping_address (
    user_id INT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    full_name TEXT,
    phone_number TEXT,
    country TEXT,
    postal_code TEXT,
    city TEXT,
    street TEXT,
    house_number TEXT,
    floor_door TEXT
);