\encoding utf8
CREATE TABLE orders (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    email TEXT,
    order_date TIMESTAMP NOT NULL DEFAULT NOW(),
    total INT NOT NULL CHECK (total >= 0),
    payment_method TEXT,
    shipping_method TEXT,
    payment_fee INT NOT NULL DEFAULT 0 CHECK (payment_fee >= 0),
    shipping_fee INT NOT NULL DEFAULT 0 CHECK (shipping_fee >= 0),
    status order_status NOT NULL DEFAULT 'Feldolgozás alatt'
);