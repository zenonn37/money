const state = {
    errors: null,
    nav: true,
    auth: false
}

const mutations = {
    set_errors(state, err) {
        state.errors = err;
    },
    set_nav(state) {
        state.nav = !state.nav
    },
    toggle_auth(state) {
        state.auth = !state.auth
    },
    set_auth(state, bool) {
        state.auth = bool
    }


}

const getters = {
    get_errors(state) {
        return state.errors
    },
    get_nav(state) {
        return state.nav
    },
    get_auth(state) {
        return state.auth
    }

}

const actions = {
    set_aside({ commit, getters }) {
        commit('set_nav')
    },
    toggle_auth({ commit }) {
        commit('toggle_auth')
    },
    set_auth_login({ commit }) {
        commit('set_auth', false)
    },
    set_auth_register({ commit }) {
        commit('set_auth', true)
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}