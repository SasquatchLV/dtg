const users = require('./users')
const teamSelection = require('./teamSelection')

const seed = async () => {
    await users()
    await teamSelection()
}

module.exports = seed