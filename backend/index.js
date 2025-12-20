require('dotenv').config();

const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/products.routes');
const userRoutes = require('./routes/users.routes');

const app = express();
app.use(cors());
app.use(express.json());

//Getting the products 
app.use('/api/products', productRoutes);
//Managing users
app.use('/api/users', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
