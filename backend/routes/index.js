const router = express.Router();
const matches = require("./matches");
const seasons = require("./seasons");
const users = require("./user");
const requireAuth = require("../middleware/requireAuth")


// Matches
router
  .use("/matches", requireAuth, matches)
  .use("/seasons",requireAuth, seasons)
  .use("/user",requireAuth, users)

module.exports = router;