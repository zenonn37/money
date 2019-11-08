const state = {
    errors: null,
    nav: true,
}

const mutations = {
    set_errors(state, err) {
        state.errors = err;
    },
    set_nav(state) {
        state.nav = !state.nav
    }

}

const getters = {
    get_errors(state) {
        return state.errors
    },
    get_nav(state) {
        return state.nav
    }
}

const actions = {
    set_aside({ commit, getters }) {
        commit('set_nav')
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}