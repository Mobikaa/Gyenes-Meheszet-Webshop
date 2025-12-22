require('dotenv').config();

const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/products.routes');
const signupRoutes = require('./routes/signup.routes');
const loginRoutes = require('./routes/login.routes');

const app = express();
app.use(cors());
app.use(express.json());

//Getting the products 
app.use('/api/products', productRoutes);
//Signing up users
app.use('/api/users', signupRoutes);
//Authorizing users
app.use('/api/auth', loginRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
