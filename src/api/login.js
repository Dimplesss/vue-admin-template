import axios from '@/utils/request'

export const login = (username, password) => {
    return axios.get(`http://auth.vkforest.com/sys/login/checklogin?belong=125&username=${username}&password=${password}`)
}

export const getInfo = (token) => {
    return axios.get(`http://auth.vkforest.com/sys/user/getUserInfo?belong=125&token=${token}`)
}

// export function login(username, password) {
//     return request({
//         url: '/user/login',
//         method: 'post',
//         data: {
//             username,
//             password
//         }
//     })
// }

// export function getInfo(token) {
//     return request({
//         url: '/user/info',
//         method: 'get',
//         params: {
//             token
//         }
//     })
// }

// export function logout() {
//     return request({
//         url: '/user/logout',
//         method: 'post'
//     })
// }
