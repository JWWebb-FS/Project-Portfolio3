
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {sequelize} = require('./config/database');


const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running');
});

sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Database sync error:', error);
  });
