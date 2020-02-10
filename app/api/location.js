import axios from 'axios'

export default {
    getSystems(cb, errorCb) {
        axios({
            url: 'https://api.uee.life/systems',
            method: 'GET'
        }).then((data) => {
            cb(data)
        }).catch((err) => {
            errorCb(err)
        })
    },
    getPlanet(planet, cb, errorCb) {
        axios({
            url: 'https://api.uee.life/planets/' + planet,
            method: 'GET'
        }).then((data) => {
            cb(data)
        }).catch((err) => {
            errorCb(err)
        })
    },
    getPlanets(system, cb, errorCb) {
        axios({
            url: `https://api.uee.life/systems/${system}/planets`,
            method: 'GET'
        }).then((data) => {
            cb(data)
        }).catch((err) => {
            errorCb(err)
        })
    },
    getSatellites(planet, cb, errorCb) {
        axios({
            url: `https://api.uee.life/planets/${planet}/satellites`,
            method: 'GET'
        }).then((data) => {
            cb(data)
        }).catch((err) => {
            errorCb(err)
        })
    },
    getPOIs(planet, cb, errorCb) {
        axios({
            url: `https://api.uee.life/planets/${playet}/pois`,
            method: 'GET'
        }).then((data) => {
            cb(data)
        }).catch((err) => {
            errorCb(err)
        })
    },
}
