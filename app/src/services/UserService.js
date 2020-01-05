import axios from 'axios'

import { api_url } from '../../api_config.json'

const apiClient = axios.create({
    baseURL: api_url,
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