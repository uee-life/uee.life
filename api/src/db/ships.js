const axios = require("axios")
const {executeSQL} = require('./mariadb')

const manufacturers = {
    'Origin Jumpworks GmbH': 1,
    'Anvil Aerospace': 2,
    'Roberts Space Industries': 3,
    'Aegis Dynamics': 4,
    'Esperia': 5,
    'Drake Interplanetary': 6,
    'Tumbril': 7,
    'Banu': 8,
    'Musashi Industrial & Starflight Concern': 9,
    'Aopoa': 10,
    'Argo Astronautics': 11,
    'Consolidated Outland': 12,
    'Kruger Intergalactic': 13,
    'Vanduul': 14
}

const sizes = {
    'vehicle': 1,
    'snub': 2,
    'small': 3,
    'medium': 4,
    'large': 5,
    'capital': 6
}

const types = {
    'Exploration': 1,
    'Competition': 2,
    'Combat': 3,
    'Transport': 4,
    'Multi': 5,
    'Ground': 6,
    'Industrial': 7,
    'Support': 8
}

const focus = {
    'Touring': 1,
    'Expedition': 2,
    'Racing': 3,
    'Pathfinder': 4,
    'Light Fighter': 5,
    'Light Freight': 6,
    'Interdiction': 7,
    'Military': 8,
    'Snub Fighter': 9,
    'Transport':10,
    'Medium Freight':11,
    'Recon':12,
    'Medical':13,
    'Militia':14,
    'Stealth Bomber':15,
    'Medium Fighter':16,
    'Stealth Fighter':17,
    'Bomber':18,
    'Heavy Fighter':19,
    'Medium Data':20,
    'Heavy Gun Ship':21,
    'Mining':22,
    'Stealth':23,
    'Luxury':24,
    'Reporting':25,
    'Heavy Salvage':26,
    'Light Science':27,
    'Heavy Bomber':28,
    'Heavy Refuelling':29,
    'Exploration':30,
    'Dropship':31,
    'Passenger': 32
}

async function saveShip(ship) {
    sql = 'INSERT INTO ships (short_name, manufacturer, model, size, max_crew, cargo, type, focus) values (?, ?, ?, ?, ?, ?, ?, ?)'
    args = [ship.short_name, ship.manufacturer, ship.model, ship.size, ship.max_crew, ship.cargo, ship.type, ship.focus]
    res = await executeSQL(sql, args)
}

async function clearShips() {
    sql = 'DELETE FROM ships'
    res = await executeSQL(sql, [])
}

async function syncShips() {
    let result = await axios({
        url: 'https://calculator-api-259617.appspot.com/mongoDocuments/ships',
        method: 'GET'
    }).then((res) => {
        for (i in res.data) {
            const item = res.data[i]
            ship = {}
            ship.short_name = item.ship.localName
            ship.manufacturer = manufacturers[item.ship.manufacturer]
            ship.model = item.ship.name
            ship.size = sizes[item.ship.size]
            ship.max_crew = item.ship.maxCrew
            ship.cargo = item.ship.cargoCapacity
            ship.type = types[item.ship.type]
            ship.focus = focus[item.ship.focus]
            saveShip(ship)
        }
        return {success: true, count: res.data.length}
    }).catch((err) => {
        console.error(err)
        return {success: false}
    })
    return result
}

async function getShips() {
    sql = 'select * from ship_view'
    const ships = await executeSQL(sql)
    const makes = await executeSQL('select * from ship_manufacturers')
    const types = await executeSQL('select * from ship_types')
    const focus = await executeSQL('select * from ship_focus')
    return {
        ships: ships,
        types: types,
        focus: focus,
        makes: makes
    }
}

module.exports = {
    syncShips,
    getShips
};