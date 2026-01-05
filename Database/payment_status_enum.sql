CREATE TYPE payment_status AS ENUM (
    'Folyamatban',   -- még nincs kifizetve
    'Kifizetve',      -- kifizetve (utánvét átvételkor)
    'Sikertelen'     -- sikertelen (később)
);