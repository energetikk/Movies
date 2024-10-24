const {
  JWT_SECRET,
  NODE_ENV,
  MONGO_DB = 'mongodb://mongo:27017/bitfilmsdb',
  PORT = 4000,
} = process.env;

module.exports = {
  JWT_SECRET,
  NODE_ENV,
  PORT,
  MONGO_DB,
};
