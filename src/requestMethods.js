import axios from "axios";

const API_URL = 'http://localhost:4000/api/'
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY2E1ZjM3ZDAzNzQ0MjI5NzExMjNiZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NDY2NTE5OCwiZXhwIjoxNjc0OTI0Mzk4fQ.XbfI3sXfsupK6e1SStuOPEIyMo1XYDTWcsWSZ3Hssj0'

export const publicRequest = axios.create({
    baseURL: API_URL
})

export const userRequest = axios.create({
    baseURL: API_URL,
    header: {
        token: `Bearer ${TOKEN}`
    }
})