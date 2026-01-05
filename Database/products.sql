CREATE TABLE products (
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    category_id INT NOT NULL REFERENCES categories(id),
    quantity INT NOT NULL CHECK (quantity >= 0),
    price INT NOT NULL CHECK (price >= 0),
    weight NUMERIC(10,3) NOT NULL CHECK (weight >= 0),
    description TEXT NOT NULL,
    picture TEXT NOT NULL
);