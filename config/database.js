const mongoose = require('mongoose');
const configDB = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  mongoose.connection.once('open', () => {
    console.log(`connected to DB`);
  });
};

module.exports = configDB;
