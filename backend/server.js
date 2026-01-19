
const express = require('express');

const dotenv= require("dotenv");
const connectDB=require('./config/db');

const session =require("express-session");
const passport = require("./config/passport");

const cors = require("cors");


dotenv.config();// loads env files
connectDB();// connects mongodb

const app = express();

app.use(cors({
  origin:["http://localhost:5173",// frontend url
          "https://e-commerce-mini-website.vercel.app"
  ],
  credentials: true,// allow cookies if needed
}));

// Middleware to parse JSON

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// session setup (needed for passport login sessions)
app.use(session({
  secret: "mysecretkey",
  resave:false,
  saveUninitialized:false,
  //session
  cookie: {
      httpOnly: true,
      sameSite:"lax", // 1 day important
    },
}))

// initialize passport
app.use(passport.initialize());
app.use(passport.session());



// routes

const authRoutes=require("./routes/authRoutes");
app.use("/api/auth",authRoutes);

const productRoutes=require("./routes/productRoutes");
app.use("/api/products",productRoutes);

const orderRoutes=require("./routes/orderRoutes");
app.use("/api/orders",orderRoutes);


// Test route
app.get('/', (req, res) => {
  res.send('Hello from Express backend!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running in port ${PORT}`);
});


