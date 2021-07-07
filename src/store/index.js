import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    role:'',
    loginSuccess:false
  },
  mutations: {
    
    checkRole:(state,payload)=>{
      state.role=payload;
    },
    checkLogin(state){
      state.loginSuccess=!state.loginSuccess;
    }
  },
  actions: {
  },
  modules: {
  }
})
