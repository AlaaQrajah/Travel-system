const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const apiRoutes = require("./routes");
const notFound = require("./core/middlewares/notFound");
const errorHandler = require("./core/middlewares/errorHandler");

const app = express();
const publicDir = path.join(__dirname, "..", "public");
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiLimiter);
app.use("/api", apiRoutes);
app.use(express.static(publicDir));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
