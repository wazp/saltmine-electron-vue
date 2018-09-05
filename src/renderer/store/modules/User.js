const state = {
  uid: null,
  email: null
}

const mutations = {
  setUser (state, payload) {
    state.uid = payload.uid
    state.email = payload.email
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
