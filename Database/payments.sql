CREATE TABLE payments (
    order_id INT PRIMARY KEY REFERENCES orders(id) ON DELETE CASCADE,
    method payment_method NOT NULL,
    status payment_status NOT NULL DEFAULT 'Folyamatban',
    paid_at TIMESTAMP
    CHECK (
        (status = 'Kifizetve' AND paid_at IS NOT NULL)
    OR  (status != 'Kifizetve' AND paid_at IS NULL)
    )
);