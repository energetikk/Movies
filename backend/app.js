require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimiter = require("./middlewares/rateLimiter");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { PORT, MONGO_DB } = require("./utils/config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGO_DB);

app.use(requestLogger);
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3000','http://localhost:4000', 'http://localhost:3001', "http://api.deminpavel.ru", "https://api.deminpavel.ru", "http://wwww.deminpavel.ru", "http://deminpavel.ru", "https://deminpavel.ru"],
  credentials: true,
}));
app.use(helmet());
app.use(rateLimiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Слушаю порт ${PORT}`);
});
