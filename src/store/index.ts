import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dialogFormVisible: false,
    showId: 1,
    refresh: false,
    isDelete: false
  },
  mutations: {
    addClick(state){
      state.dialogFormVisible = true
    },
    cancleAdd(state){
      state.dialogFormVisible = false
    },
    sureAdd(state){
      state.dialogFormVisible = false
    },
    homeClick(state){
      state.showId = 1
    },
    devClick(state){
      state.showId = 2
    },
    deliverClick(state){
      state.showId = 3
    },
    refresh(state){
      state.refresh = true
    },
    delete(state){
      state.isDelete = true
    },
    initDelete(state){
      state.isDelete = false
    }
  },
  actions: {
  },
  modules: {
  }
})
