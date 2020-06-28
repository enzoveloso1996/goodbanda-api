const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

//import routes
const riderRoutes = require('./api/routes/riders');
const bookingRoutes = require('./api/routes/bookings');
const rateRoutes = require('./api/routes/rates');
const statusRoutes = require('./api/routes/status');
const userRoutes = require('./api/routes/users');
const riderBookingRoutes = require('./api/routes/riderBooking');

//mongoose
mongoose.set('useCreateIndex', true)
mongoose.connect(
    "mongodb+srv://enzoveloso888:%40dm1n3nz0@goodbanda-api-46euz.mongodb.net/goodbanda-api?retryWrites=true&w=majority",
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  }
);

mongoose.Promise = global.Promise;

//log requests
app.use(morgan('dev'));

//fix format
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

//use routes
app.use('/riders', riderRoutes);
app.use('/bookings', bookingRoutes);
app.use('/rates', rateRoutes);
app.use('/status', statusRoutes);
app.use('/users', userRoutes);
app.use('/riderBooking', riderBookingRoutes);

//error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;