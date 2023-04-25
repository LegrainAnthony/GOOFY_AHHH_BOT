import axios from 'axios'

export const getFromUrl = (url) => {
    return axios.get(url)
}