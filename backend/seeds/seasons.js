const Season = require("../models/seasonModel")

const teams2022 = [
    {
        country: "Switzerland",
        flag: "https://cdn-icons-png.flaticon.com/512/197/197540.png",
        group: "A",
        points: 20,
        gamesWon: 6,
        gamesLost: 0,
        gamesWO: 1,
        gamesLO: 0,
        position: "5",
    },
    {
        country: "Germany",
        flag: "https://cdn-icons-png.flaticon.com/512/197/197571.png",
        group: "A",
        points: 16,
        gamesWon: 5,
        gamesLost: 1,
        gamesWO: 0,
        gamesLO: 1,
        position: "5",
    },
    {
        country: "Canada",
        flag: "https://cdn-icons-png.flaticon.com/512/197/197430.png",
        group: "A",
        points: 15,
        gamesWon: 5,
        gamesLost: 2,
        gamesWO: 0,
        gamesLO: 0,
        position: "2",
    },
    {
        country: "Slovakia",
        flag: "https://cdn-icons-png.flaticon.com/512/197/197592.png",
        group: "A",
        points: 12,
        gamesWon: 4,
        gamesLost: 3,
        gamesWO: 0,
        gamesLO: 0,
        position: "5",
    },
    {
        country: "Denmark",
        flag: "https://cdn-icons-png.flaticon.com/512/197/197565.png",
        group: "A",
        points: 12,
        gamesWon: 4,
        gamesLost: 3,
        gamesWO: 0,
        gamesLO: 0,
    },
    {
        country: "France",
        flag: "https://cdn-icons-png.flaticon.com/512/197/197560.png",
        group: "A",
        points: 5,
        gamesWon: 1,
        gamesLost: 5,
        gamesWO: 1,
        gamesLO: 0,
    },
    {
        country: "Kazakhstan",
        flag: "https://cdn-icons-png.flaticon.com/512/197/197603.png",
        group: "A",
        points: 3,
        gamesWon: 1,
        gamesLost: 6,
        gamesWO: 0,
        gamesLO: 0,
    },
    {
        country: "Italy",
        flag: "https://cdn-icons-png.flaticon.com/512/197/197626.png",
        group: "A",
        points: 1,
        gamesWon: 0,
        gamesLost: 6,
        gamesWO: 0,
        gamesLO: 1,
    },
    {
        country: "Finland",
        flag: "https://cdn-icons-png.flaticon.com/512/197/197585.png",
        group: "B",
        points: 19,
        gamesWon: 6,
        gamesLost: 0,
        gamesWO: 0,
        gamesLO: 1,
        position: "1",
    },
    {
        country: "Sweden",
        flag: "https://cdn-icons-png.flaticon.com/512/197/197564.png",
        group: "B",
        points: 18,
        gamesWon: 5,
        gamesLost: 0,
        gamesWO: 1,
        gamesLO: 1,
        position: "5",
    },
    {
        country: "Czech Republic",
        flag: "https://cdn-icons-png.flaticon.com/512/197/197576.png",
        group: "B",
        points: 13,
        gamesWon: 4,
        gamesLost: 2,
        gamesWO: 0,
        gamesLO: 1,
        position: "3",
    },
    {
        country: "United States",
        flag: 'https://cdn-icons-png.flaticon.com/512/323/323310.png',
        group: "B",
        points: 13,
        gamesWon: 3,
        gamesLost: 2,
        gamesWO: 2,
        gamesLO: 0,
        position: "4",
    },
    {
        country: "Latvia",
        flag: "https://cdn-icons-png.flaticon.com/512/197/197605.png",
        group: "B",
        points: 8,
        gamesWon: 2,
        gamesLost: 4,
        gamesWO: 1,
        gamesLO: 0,
    },
    {
        country: "Austria",
        flag: "https://cdn-icons-png.flaticon.com/512/197/197447.png",
        group: "B",
        points: 7,
        gamesWon: 1,
        gamesLost: 3,
        gamesWO: 1,
        gamesLO: 2,
    },
    {
        country: "Norway",
        flag: "https://cdn-icons-png.flaticon.com/512/197/197579.png",
        group: "B",
        points: 5,
        gamesWon: 1,
        gamesLost: 5,
        gamesWO: 1,
        gamesLO: 0,
    },
    {
        country: "Great Britain",
        flag: "https://cdn-icons-png.flaticon.com/512/197/197374.png",
        group: "B",
        points: 1,
        gamesWon: 0,
        gamesLost: 6,
        gamesWO: 0,
        gamesLO: 1,
    }
]

const users2022 = [
    {
        avatar: "https://freesvg.org/img/publicdomainq-scientist-Thomas_Alva_Edison.png",
        points: 17,
        email: "user@user.com",
    },
    {
        avatar: "https://icons.iconarchive.com/icons/sykonist/south-park/256/Butters-Mr-Biggles-icon.png",
        points: 7,
        email: "hacker2@hacker.com",
    },
    {
        avatar: "https://freesvg.org/img/publicdomainq-politician_mao_zedong.png",
        points: 3,
        email: "hacker@hacker.com",
    }
]

const seasons = async () => {
    const season = await Season.findOne({})

    if (!season) {
        const newSeason = new Season({
            year: 2022,
            status: 'finished',
            teams: teams2022,
            matches: [],
            users: users2022,
        })

        newSeason.save()
    }
}

module.exports = seasons