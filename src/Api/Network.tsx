import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

const HandleError = (error: any) => {
    const { response } = error
    if (error && response) {
        throw response.data.errorMessage
    }
    throw error.message
}


export const get = (url: string) => {
    return axios
        .get(baseUrl + url)
        .then(res => res.data)
        .catch(err => HandleError(err))
}

export const post = (url: string, payload: Object) => {
    return axios
        .post(baseUrl + url, payload)
        .then(res => res.data.data)
        .catch(err => HandleError(err))
}