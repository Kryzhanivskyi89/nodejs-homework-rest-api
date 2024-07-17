const mongoose = require('mongoose');
const app = require('./app'); 
require('dotenv').config();

const { DB_HOST, PORT = 3000 } = process.env;

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'db-contacts',
};

mongoose
  .connect(DB_HOST, connectionOptions)
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Database connection error:', error.message);
    process.exit(1);
  });
  
// const app = require('./app');

// const mongoose = require('mongoose');

// const { DB_HOST } = process.env;

// mongoose
//   .connect(DB_HOST)
//   .then(() => {
//     console.log('Database connection successful');
//     app.listen(3000);
//   })
//   .catch(error => {
//     console.log(error.message);
//     process.exit(1);
//   });