import roleApi from '../../api/role.js'
import commonFunc from '../../api/common/common.js'

// moduleA
// 单一状态树，用一个对象就包含了全部的应用层级状态。
// 至此它便作为一个“唯一数据源 (SSOT)”而存在。
const state = {
  resDataArr: [],
  resDataObj: {}
}

// getters
const getters = {
  GET_RES_DATA_ARR: state => {
    return state.resDataArr
  },
  GET_RES_DATA_OBJ: state => {
    return state.resDataObj
  }
}

// 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
// Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
const mutations = {
  SET_RES_DATA_OBJ(state, dataObj) {
    state.resDataObj = dataObj
  },
  SET_RES_DATA_ARR(state, dataObj) {
    state.resDataArr = dataObj
  }
}

// Action 类似于 mutation，不同在于：
// Action 提交的是 mutation，而不是直接变更状态。
// Action 可以包含任意异步操作。context包含 state, commit, rootState
const actions = {
  async getstoreRoleset(context, paramsObj) {
    // 调用Api接口(对传入参数进行过滤，如果需要对传如api的参数进行重组可在此操作，无操作直接传入即可)
    context.commit('SET_RES_DATA_ARR', resData.data.record)
    commonFunc.myConsole('store getRoleset SET_DATA ===>')
    commonFunc.myConsole(context.state.resDataArr)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
