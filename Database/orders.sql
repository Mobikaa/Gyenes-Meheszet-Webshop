CREATE TABLE orders (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id),
    order_date TIMESTAMP NOT NULL DEFAULT NOW(),
    total INT NOT NULL CHECK (total >= 0),
    status order_status NOT NULL DEFAULT 'Feldolgozás alatt'
);