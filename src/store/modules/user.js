import { login, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
    state: {
        token: getToken(),
        name: '',
        avatar: '',
        roles: []
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },

    actions: {
        // 登录
        Login({ commit }, userInfo) {
            const username = userInfo.username.trim()
            return login(username, userInfo.password).then(data => {
                // const data = response.data
                setToken(data.token)
                commit('SET_TOKEN', data.token)
            })
        },
        GetInfo({ commit }) {
            return getInfo(getToken()).then(({ data }) => {
                console.log(data)
                commit('SET_ROLES', data.auth)
                commit('SET_NAME', data.name)
                // const data = response.data
                // setToken(data.token)
                commit('SET_TOKEN', getToken())
            })
        },
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        }
    }
}

export default user
