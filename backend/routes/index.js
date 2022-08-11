const express = require('express')
const router = express.Router();
const matches = require("./match");
const teams = require("./team");
const seasons = require("./season");
const users = require("./user");
const auth = require("./auth");
const requireAuth = require("../middleware/requireAuth")

router
  .use("/match", requireAuth, matches)
  .use("/season", requireAuth, seasons)
  .use("/user", requireAuth, users)
  .use('/team', requireAuth, teams)
  .use('/auth', auth)


module.exports = router;