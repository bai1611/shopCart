

import Vue from 'vue'
import Vuex from 'vuex'
//import user from './user'

Vue.use(Vuex)

const state = {
    el : '11',
    selectType : 2,
    onlyContent : false
}

const mutations = {
  CHANGE (state, name) {
    state.name=name;
  },
  CHANGE_NAV (state) {
    state.nav_width=!state.nav_width
  },
  EVENT(state,name) {
    state.el = name
  },
  SELECTTYPE(state,name) {
    state.selectType = name
  },
  ONLYCONTENT(state,name ) {
    state.onlyContent = name
  }
}

const actions = {
  changeName ({commit}, name) {
    commit('CHANGE', name)
  },
  changeNav ({commit}){
    commit('CHANGE_NAV')
  },
  changeEL ({commit},name){
    commit('EVENT',name)
  },
  selectType({commit},name){
    commit('SELECTTYPE',name)
  },
  onlyContent({commit},name){
    commit("ONLYCONTENT",name)
  }
}

const getters = {
  getName (state) {
    return state.name
  }
  // getEL(state){
  //   return state.el
  // }
}

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,mutations,actions,getters
})

export default store;
