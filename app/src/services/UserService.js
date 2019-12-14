import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'https://api.uee.life',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getApi(value) {
        return apiClient.get('/some/path/' + value)
    }
} 