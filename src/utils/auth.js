import Cookies from 'js-cookie'

const cookieKey = 'Xietong-Admin-'

export function getToken() {
    return Cookies.get(`${cookieKey}Token`)
}

export function setToken(token) {
    Cookies.set(`${cookieKey}Token`, token)
    Cookies.set(`token`, token)
    return true
}

export function removeToken() {
    Cookies.remove(`${cookieKey}Token`)
    Cookies.remove(`token`)
    return true
}
