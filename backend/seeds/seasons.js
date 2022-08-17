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
        _id: {
            $oid: "62f2485aa6b7ba0eb2d0b740"
        },
        updatedAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        },
        createdAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        }
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
        _id: {
            $oid: "62f2485aa6b7ba0eb2d0b741"
        },
        updatedAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        },
        createdAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        }
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
        _id: {
            $oid: "62f2485aa6b7ba0eb2d0b742"
        },
        updatedAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        },
        createdAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        }
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
        _id: {
            $oid: "62f2485aa6b7ba0eb2d0b743"
        },
        updatedAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        },
        createdAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        }
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
        _id: {
            $oid: "62f2485aa6b7ba0eb2d0b744"
        },
        updatedAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        },
        createdAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        }
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
        _id: {
            $oid: "62f2485aa6b7ba0eb2d0b745"
        },
        updatedAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        },
        createdAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        }
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
        _id: {
            $oid: "62f2485aa6b7ba0eb2d0b746"
        },
        updatedAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        },
        createdAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        }
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
        _id: {
            $oid: "62f2485aa6b7ba0eb2d0b747"
        },
        updatedAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        },
        createdAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        }
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
        _id: {
            $oid: "62f2485aa6b7ba0eb2d0b748"
        },
        updatedAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        },
        createdAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        }
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
        _id: {
            $oid: "62f2485aa6b7ba0eb2d0b749"
        },
        updatedAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        },
        createdAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        }
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
        _id: {
            $oid: "62f2485aa6b7ba0eb2d0b74a"
        },
        updatedAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        },
        createdAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        }
    },
    {
        country: "United States",
        flag: "https://cdn-icons.flaticon.com/png/512/4628/premium/4628635.png?token=exp=1659615904~hmac=74b2d9942ae96ad0f35bdbfb093ff270",
        group: "B",
        points: 13,
        gamesWon: 3,
        gamesLost: 2,
        gamesWO: 2,
        gamesLO: 0,
        position: "4",
        _id: {
            $oid: "62f2485aa6b7ba0eb2d0b74b"
        },
        updatedAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        },
        createdAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        }
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
        _id: {
            $oid: "62f2485aa6b7ba0eb2d0b74c"
        },
        updatedAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        },
        createdAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        }
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
        _id: {
            $oid: "62f2485aa6b7ba0eb2d0b74d"
        },
        updatedAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        },
        createdAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        }
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
        _id: {
            $oid: "62f2485aa6b7ba0eb2d0b74e"
        },
        updatedAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        },
        createdAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        }
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
        _id: {
            $oid: "62f2485aa6b7ba0eb2d0b74f"
        },
        updatedAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        },
        createdAt: {
            $date: {
                $numberLong: "1660045402441"
            }
        }
    }
]

const users2022 = [
    {
        avatar: "https://freesvg.org/img/publicdomainq-scientist-Thomas_Alva_Edison.png",
        points: 17,
        _id: {
            $oid: "62f4c944ef9efa09017c7a41"
        },
        email: "user@user.com",
    },
    {
        avatar: "https://icons.iconarchive.com/icons/sykonist/south-park/256/Butters-Mr-Biggles-icon.png",
        points: 7,
        _id: {
            $oid: "62ecd46a07c5aa83ef057ae7"
        },
        email: "hacker2@hacker.com",
    },
    {
        avatar: "https://freesvg.org/img/publicdomainq-politician_mao_zedong.png",
        points: 3,
        _id: {
            $oid: "62f0bfb007170c8e17c392cb"
        },
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