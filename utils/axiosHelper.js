import axios from 'axios';

export async function GetFromUrl (url) {
    const result = await axios.get(url);
    return result.data.data;
}