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
            url: 'https://api.uee.life/citizen/' + handle,
            method: 'GET',
            headers: headers
        }).then((data) => {
            cb(data)
        }).catch((err) => {
            errorCb(err)
        })
    },
    getOrg(org, cb, errorCb) {
        try {
            axios({
                url: 'https://api.uee.life/organization/' + org,
                method: 'GET'
            }).then((data) => {
                cb(data)
            }).catch((err) => {
                errorCb(err)
            })

            
        } catch (error) {
            // eslint-disable-next-line
            console.error(error)
        }
        this.loading = false
    },
}