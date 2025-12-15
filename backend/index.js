require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const productRoutes = require('./routes/products.routes');

const app = express();
app.use(cors());
app.use(express.json());

//Getting the products
app.use('/api/products', productRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
