import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
    withCredentials: true,
    // baseURL: process.env.BASE_API, // api的base_url
    timeout: 15000 // 请求超时时间
})

const duration = 3 * 1000

// request拦截器
service.interceptors.request.use(config => {
    if (config.url.indexOf('http://auth.vkforest.com') === -1 && store.getters.token) {
        config.headers['Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {
        /**
         * code为非20000是抛错 可结合自己业务进行修改
         */
        const res = response.data
        if (res.status !== 200) {
            Message({
                message: res.statusInfo,
                type: 'error',
                duration
            })
            return Promise.reject('error')
        } else {
            return response.data
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.statusInfo,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
