import money from '../../api/money'

const state = {
    token: localStorage.getItem("access_token") || null,
    user: null

};
const mutations = {
    SET_AUTH(state, token) {
        state.token = token
    },
    SET_USER(state, user) {
        state.user = user
    }


}

const getters = {
    GET_AUTH(state) {
        return state.token
    },
    GET_USER(state) {
        return state.USER
    }

}

const actions = {

    //LOGIN
    LOGIN({ commit, data }) {

        return new Promise((resolve, reject) => {
            money.post('/login', data)
                .then(res => {
                    console.log(res);
                    const result = res.data.access_token;
                    commit(SET_AUTH, result)
                    localStorage.setItem("access_token", result)

                }).catch(err => {
                    console.log(err);

                })
        });

    }
}

export default {
    state, mutations, getters, actions
}

