-- PostgreSQL database setup script

-- Create enums first
\i 'e:/Sulis/Egyetem/Szakdolgozat/Gyenes-Meheszet-Webshop/Database/order_status_enum.sql'
\i 'e:/Sulis/Egyetem/Szakdolgozat/Gyenes-Meheszet-Webshop/Database/payment_method_enum.sql'
\i 'e:/Sulis/Egyetem/Szakdolgozat/Gyenes-Meheszet-Webshop/Database/payment_status_enum.sql'

-- Create base tables
\i 'e:/Sulis/Egyetem/Szakdolgozat/Gyenes-Meheszet-Webshop/Database/users.sql'
\i 'e:/Sulis/Egyetem/Szakdolgozat/Gyenes-Meheszet-Webshop/Database/user_shipping_address.sql'
\i 'e:/Sulis/Egyetem/Szakdolgozat/Gyenes-Meheszet-Webshop/Database/categories.sql'
\i 'e:/Sulis/Egyetem/Szakdolgozat/Gyenes-Meheszet-Webshop/Database/products.sql'

-- Create orders and related tables
\i 'e:/Sulis/Egyetem/Szakdolgozat/Gyenes-Meheszet-Webshop/Database/orders.sql'
\i 'e:/Sulis/Egyetem/Szakdolgozat/Gyenes-Meheszet-Webshop/Database/order_items.sql'
\i 'e:/Sulis/Egyetem/Szakdolgozat/Gyenes-Meheszet-Webshop/Database/order_billing_address.sql'
\i 'e:/Sulis/Egyetem/Szakdolgozat/Gyenes-Meheszet-Webshop/Database/order_shipping_address.sql'
\i 'e:/Sulis/Egyetem/Szakdolgozat/Gyenes-Meheszet-Webshop/Database/payments.sql'

-- Insert data
\i 'e:/Sulis/Egyetem/Szakdolgozat/Gyenes-Meheszet-Webshop/Database/insert_categories.sql'
\i 'e:/Sulis/Egyetem/Szakdolgozat/Gyenes-Meheszet-Webshop/Database/insert_products.sql'