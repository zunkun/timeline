import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isSignin: window.localStorage.getItem('isSignin') === 'true',
    user: JSON.parse(window.localStorage.getItem('user')),
  },
  mutations: {
    setSignin(store, data) {
      store.isSignin = data;
      window.localStorage.setItem('isSignin', data);
    },
    setUser(store, data) {
      store.user = data;
      window.localStorage.setItem('user', JSON.stringify(data))
    },
  }
})
