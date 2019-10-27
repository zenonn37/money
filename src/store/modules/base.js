const state = {
    errors: null,
}

const mutations = {
    set_errors(state, err) {
        state.errors = err;
    }

}

const getters = {
    get_errors(state) {
        return state.errors
    }
}

const actions = {

}


export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}