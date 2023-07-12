const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/ToDoRoute');
const authMiddleware = require('./middlewares/authMiddleware');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(authMiddleware.authenticate); // Use the authenticate function as the middleware

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('MongoDB Connected...');
    app.use(routes);
    app.listen(PORT, () => console.log(`Server Started On Port ${PORT}...`));
  })
  .catch((err) => console.log(err));
