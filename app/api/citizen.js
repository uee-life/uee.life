import axios from 'axios'

export default {
    getCitizen(handle, cb, errorCb, skipcache=false) {
        let headers = {}
        if(skipcache) {
            headers = {
                skipcache: 1
            }
        }
        axios({
            url: 'https://api.uee.life/citizens/' + handle,
            method: 'GET',
            headers: headers
        }).then((data) => {
            cb(data)
        }).catch((err) => {
            errorCb(err)
        })
    },
    getOrg(org, cb, errorCb) {
        axios({
            url: 'https://api.uee.life/orgs/' + org,
            method: 'GET'
        }).then((data) => {
            cb(data)
        }).catch((err) => {
            errorCb(err)
        })
    },
}