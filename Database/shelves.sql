
CREATE TABLE shelves (
    id INT NOT NULL,
    product_id INT NOT NULL REFERENCES products(id) ON DELETE NO ACTION,
    quantity INT NOT NULL CHECK (quantity >= 0),
    PRIMARY KEY (id, product_id)
);
