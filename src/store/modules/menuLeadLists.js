// import commonFunc from '../../api/common/common.js'

// moduleA
// 单一状态树，用一个对象就包含了全部的应用层级状态。
// 至此它便作为一个“唯一数据源 (SSOT)”而存在。
const state = {
  menuLeadListsDataArr: []
}

// getters
const getters = {
  GET_MENULEADLISTS_ARR: state => {
    return state.menuLeadListsDataArr
  }
}

// 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
// Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
const mutations = {
  SET_MENULEADLISTS_ARR(state, dataObj) {
    state.menuLeadListsDataArr = dataObj
  }
}

// Action 类似于 mutation，不同在于：
// Action 提交的是 mutation，而不是直接变更状态。
// Action 可以包含任意异步操作。context包含 state, commit, rootState
const actions = {
  setMenuLeadListsData(context, menuLeadListsObj) {
    // commonFunc.myConsole(menuLeadListsObj)
    context.commit('SET_MENULEADLISTS_ARR', menuLeadListsObj)
    // commonFunc.myConsole(context.state.menuLeadListsDataArr)
  }
}

export default {namespaced: true, state, getters, actions, mutations}
