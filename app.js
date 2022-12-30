require("dotenv").config();
require("express-async-errors");

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// Swagger
// const swaggerUI = require('swagger-ui-express');
// const YAML = require('yamljs');
// const swaggerDocument = YAML.load('./swagger.yaml');

const express = require("express");
const app = express();

const fileUpload = require("express-fileupload");
//database
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");
const authenticateadmin = require("./middleware/adminAuthentication");

//google auth
const passport = require("passport");

// routers
const authRouter = require("./routes/auth");
const citizenServiceRouter = require("./routes/citizenService");
const serviceCategoryRouter = require("./routes/serviceCategory");
const userProfileRouter = require("./routes/userProfile");
const municipalityServiceRouter = require("./routes/municipalityService");
const applicationRouter = require("./routes/application");
const municipalityRouter = require("./routes/municipality");
const electricityBillRouter = require("./routes/eletricityBill");
const contactUsRouter = require("./routes/contactUs");
// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(fileUpload());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/", (req, res) => {
  res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
});
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// routes
app.use("/api/auth", authRouter);
app.use("/api/profile", authenticateUser, userProfileRouter);
app.use("/api/citizen-service", citizenServiceRouter);
app.use("/api/municipality-service", municipalityServiceRouter);
app.use("/api/service-category", serviceCategoryRouter);
app.use("/api/application", authenticateUser, applicationRouter);
app.use("/api/municipality", municipalityRouter);
app.use("/api/bills/electricity", authenticateUser, electricityBillRouter);
app.use("/api/contact-us", authenticateUser, contactUsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
