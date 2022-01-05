const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/show-route", (req, res) => {
  const userId = req.body.userId;
  const requestedTime = new Date(req.body.timestamp);
  const currentTime = requestedTime.getTime();
  const addMinute = 60 * 1000;
  const newTimestamp = new Date(currentTime + addMinute);

  const user = db.find((user) => user.id === userId);
  if (user) {
    if (requestedTime < user.timestamp && user.token > 0) {
    
      user.token = user.token - 1;
      res.status(200).json({ message: "Updated user token." });
    } else if (requestedTime < user.timestamp && user.token <= 0) {
     
      res.status(429).json({ message: "Too many request." });
    } else if (requestedTime > user.timestamp) {
      
      user.timestamp = newTimestamp;
      user.token = 9;
      res.status(200).json({ message: "Refreshed user timestamp and token." });
    }
  } else {
    
    const newUser = {
      id: userId,
      timestamp: newTimestamp,
      token: 9,
    };
    db.push(newUser);
    res.status(200).json({ message: "Added new user." });
  }
});

module.exports = router;