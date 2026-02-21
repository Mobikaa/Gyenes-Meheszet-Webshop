-- Script to create PostgreSQL database with Hungarian locale and UTF-8 encoding
-- Run this script as a superuser (e.g., postgres user) before running setup_database.sql

-- Create the database with Hungarian locale and UTF-8 encoding
-- Note: The locale 'hu_HU.UTF-8' must be available on your system
-- If not available, you can use 'C.UTF-8' or 'en_US.UTF-8' as fallback

CREATE DATABASE gyenes_meheszet
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'hu_HU.UTF-8'
    LC_CTYPE = 'hu_HU.UTF-8'
    TEMPLATE = template0;

-- Grant permissions if needed
-- GRANT ALL PRIVILEGES ON DATABASE gyenes_meheszet_webshop TO your_user;

-- Connect to the database and run setup_database.sql
-- \c gyenes_meheszet_webshop
-- \i setup_database.sql