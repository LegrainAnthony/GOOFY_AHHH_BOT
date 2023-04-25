import axios from 'axios'

export const getFromUrl = (url) => {
    return axios.get(url)
}

export const getImageFromUrl = (url) => {
    return axios.get(url, { responseType: 'arraybuffer' })
}