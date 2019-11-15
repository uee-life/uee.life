
async function getCitizen(handle) {
    return {
        info: {
            "bio": "Hacker, Gamer, Indie Game Dev, and Twitch Partner! Games aren't my life yet, but they should be ;)",
            "handle": "Capn_Flint",
            "name": "Flint McBane", 
            "record": "#84348", 
            "enlisted": "Nov 18, 2012", 
            "portrait": "https://robertsspaceindustries.com/media/lb0drmasxlhcyr/heap_infobox/Grog_fallout.png", 
            "org": "MCBANE", 
            "orgRank": "Director"
        },
        home: {
            system: "Stanton",
            planet: "Hurston",
            city: "Lorville"
        },
        ships: [
            {
            id: 1,
            manufacturer: "Anvil",
            make: "Hornet",
            model: "F7a",
            name: "Bulldog",
            size: "Light",
            crew: 8
        },
        {
            id: 2,
            manufacturer: "Aegis",
            make: "Avenger",
            model: "Titan",
            name: "Penguin",
        },
        {
            id: 3,
            manufacturer: "RSI",
            make: "Constellation",
            model: "Phoenix",
            name: "Shark",
        }
        ]
    }
};

module.exports = {
    getCitizen,
};