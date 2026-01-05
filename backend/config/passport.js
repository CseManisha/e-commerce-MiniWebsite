// backend/config/passport.js

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

// Use LocalStrategy with username & password
passport.use(User.createStrategy());

// Serialize user for session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport;
