const users = require('./users')
const seasons = require('./seasons')
const teamSelection = require('./teamSelection')

const seed = async () => {
    await users()
    await seasons()
    await teamSelection()
}

module.exports = seed