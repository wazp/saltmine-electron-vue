const state = {
  error: null
}

const mutations = {
  setError (state, payload) {
    state.error = payload
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
