const seeds = require('../seeds/index')

const startup = async () => {
    await seeds();
}

module.exports = startup