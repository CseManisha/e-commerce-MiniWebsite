const express = require("express");
const passport = require("passport");
const User = require("../models/user");

const router = express.Router();

// ✅ REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Create new user
    const user = new User({ username: email , email,});

    await User.register(user, password); // Provided by passport-local-mongoose

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.login(user, (err) => {
      if (err) return next(err);
      return res.json({ message: "Login successful", user });
    });
  })(req, res, next);
});



// ✅ LOGOUT USER
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.json({ message: "Logged out successfully!" });
  });
});

// ✅ CHECK IF USER IS LOGGED IN
router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

module.exports = router;
