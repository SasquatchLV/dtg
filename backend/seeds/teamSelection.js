const TeamSelection = require("../models/teamSelectionModel")

const teamSelection = async () => {
    const team = await TeamSelection.findOne({})

    const countries = [
        {
            country: 'Canada',
            flag: 'https://cdn-icons-png.flaticon.com/512/323/323277.png',
        },
        {
            country: 'United States',
            flag: 'https://cdn-icons-png.flaticon.com/512/323/323310.png',
        },
        {
            country: "Finland",
            flag: "https://cdn-icons-png.flaticon.com/512/197/197585.png",
        },
        {
            country: "Germany",
            flag: "https://cdn-icons-png.flaticon.com/512/197/197571.png",
        },
        {
            country: "Czech Republic",
            flag: "https://cdn-icons-png.flaticon.com/512/197/197576.png",
        },
        {
            country: "Slovakia",
            flag: "https://cdn-icons-png.flaticon.com/512/197/197592.png",
        },
        {
            country: "Sweden",
            flag: "https://cdn-icons-png.flaticon.com/512/197/197564.png",
        },
        {
            country: "Russia",
            flag: "https://cdn-icons-png.flaticon.com/512/197/197408.png",
        },
        {
            country: "Denmark",
            flag: "https://cdn-icons-png.flaticon.com/512/197/197565.png",
        },
        {
            country: "Norway",
            flag: "https://cdn-icons-png.flaticon.com/512/197/197579.png",
        },
        {
            country: "Switzerland",
            flag: "https://cdn-icons-png.flaticon.com/512/197/197540.png",
        },
        {
            country: "Latvia",
            flag: "https://cdn-icons-png.flaticon.com/512/197/197605.png",
        },
        {
            country: "Austria",
            flag: "https://cdn-icons-png.flaticon.com/512/197/197447.png",
        },
        {
            country: "France",
            flag: "https://cdn-icons-png.flaticon.com/512/197/197560.png",
        },
        {
            country: "Italy",
            flag: "https://cdn-icons-png.flaticon.com/512/197/197626.png",
        },
        {
            country: "Great Britain",
            flag: "https://cdn-icons-png.flaticon.com/512/197/197374.png",
        },
    ]

    if (!team) {
        countries.map(({ country, flag }) => {
            const newTeam = new TeamSelection({
                country,
                flag,
            })

            newTeam.save()
        })
    }
}

module.exports = teamSelection