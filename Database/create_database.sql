-- Script to create PostgreSQL database with Hungarian locale and UTF-8 encoding

CREATE DATABASE gyenes_meheszet
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'hu_HU.UTF-8'
    LC_CTYPE = 'hu_HU.UTF-8'
    TEMPLATE = template0;

--To connect:
-- \c gyenes_meheszet