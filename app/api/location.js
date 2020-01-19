import axios from 'axios'

export default {
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
    getSatellites(planet, cb, errorCb) {
        axios({
            url: 'https://api.uee.life/satellite/' + planet,
            method: 'GET'
        }).then((data) => {
            cb(data)
        }).catch((err) => {
            errorCb(err)
        })
    },
    getPOIs(poi, cb, errorCb) {
        axios({
            url: 'https://api.uee.life/planets/' + poi,
            method: 'GET'
        }).then((data) => {
            cb(data)
        }).catch((err) => {
            errorCb(err)
        })
    },
}
