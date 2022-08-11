const router = express.Router();
const matches = require("./matches");
const teams = require("./team");
const seasons = require("./seasons");
const users = require("./user");
const auth = require("./auth");
const requireAuth = require("../middleware/requireAuth")

router
  .use("/matches", requireAuth, matches)
  .use("/seasons", requireAuth, seasons)
  .use("/user", requireAuth, users)
  .use('/team', requireAuth, teams)
  .use('/auth', auth)

module.exports = router;