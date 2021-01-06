import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://menu-b8774-default-rtdb.firebaseio.com'
})

export default instance