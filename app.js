const express = require('express');
const cors = require('cors');
const connectDb = require('./database');
const userRoutes = require("./api/users/routes")
const productsRoutes = require('./api/products/routes');
const shopsRoutes = require('./api/shops/routes');
const app = express();
const passport = require ("passport");
const {localStartegy, jwtStrategy} = require ("./middleware/passport")



app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
  );
  next();
});

app.use(passport.initialize());
passport.use(localStartegy);
passport.use(jwtStrategy);


// Routes
app.use("/api",userRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/shops', shopsRoutes);
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});
connectDb();
app.listen(8000);
