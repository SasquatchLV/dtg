const router = express.Router();
const matches = require("./matches");
const seasons = require("./seasons");
const users = require("./user");
const requireAuth = require("../middleware/requireAuth")


// Matches
router
  .use("/matches", requireAuth, matches)
  .use("/seasons", seasons)
  .use("/user", users)

module.exports = router;