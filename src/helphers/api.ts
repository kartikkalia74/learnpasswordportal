
import axios from 'axios'
const apiInterface = axios.create({ baseURL: `${process.env.REACT_APP_APIURL}/api` })


export const Login = async (body: { email: string, password: string }) => {
    try {
        console.log(process.env.APIURL)
        const { data,  } = await apiInterface.put('/user', body)
        return data;
    } catch (error: any) {
        throw error.response.data
    }

}


export const AddPassword = async (body: {
    "name": string,
    "email": string,
    "hint": string,
    "password": string,
    url: string
}) => {
    try {
        const token = localStorage.getItem('accessToken')
        console.log({ Authorization: `Bearer ${token}` })
        const { data } = await apiInterface.post('/password', body, { headers: { Authorization: `Bearer ${token}` } })
        return data;
    } catch (error: any) {
        throw error.response.data
    }

}

export const GetPassword = async () => {
    try {
        const token = localStorage.getItem('accessToken')
        console.log({ Authorization: `Bearer ${token}` })
        const { data } = await apiInterface.get('/password', { headers: { Authorization: `Bearer ${token}` } })
        return data;
    } catch (error: any) {
        throw error.response.data
    }

}