require('dotenv').config();

const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/products.routes');
const signupRoutes = require('./routes/signup.routes');
const loginRoutes = require('./routes/login.routes');
const orderRoutes = require('./routes/order.routes');
const profileRoutes = require('./routes/profile.routes');

const app = express();
app.use(cors());
app.use(express.json());

//Getting the products 
app.use('/api/products', productRoutes);
//Signing up users
app.use('/api/users', signupRoutes);
//Authorizing users
app.use('/api/auth', loginRoutes);
// Order creation
app.use('/api/orders', orderRoutes);
// Profile-specific endpoints
app.use('/api/profile', profileRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
