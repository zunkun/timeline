import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    relations: [],
  },
  mutations: {
    setRelations(state, relations) {
      state.relations = relations;
    }
  },
  actions: {
    setRelations(context, relations) {
      context.commit('setRelations', relations)
    }
  }
})
