import Cookies from 'js-cookie'
// import { constantRouterMap } from '@/router'
const app = {
    state: {
        sidebar: {
            opened: !+Cookies.get('sidebarStatus')
        },
        routes: []
    },
    mutations: {
        TOGGLE_SIDEBAR: state => {
            if (state.sidebar.opened) {
                Cookies.set('sidebarStatus', 1)
            } else {
                Cookies.set('sidebarStatus', 0)
            }
            state.sidebar.opened = !state.sidebar.opened
        }
    },
    actions: {
        ToggleSideBar: ({ commit }) => {
            commit('TOGGLE_SIDEBAR')
        },
        generateRoutes: ({ commit, rootState }) => {
            // constantRouterMap
        }
    }
}

export default app
