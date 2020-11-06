import deliveryStatisticsApi from '../../api/deliveryStatistics.js'
import commonFunc from '../../api/common/common.js'

// moduleA
// 单一状态树，用一个对象就包含了全部的应用层级状态。
// 至此它便作为一个“唯一数据源 (SSOT)”而存在。
const state = {
  resfundDataArr: [],
  TotalMoneyProp: '',
  TotaltotalNum: 0
}

// getters
const getters = {
  GET_RES_DATA_ARR: state => {
    return state.resfundDataArr
  },
  GET_RES_DATA_Prop: state => {
    return state.TotalMoneyProp
  },
  GET_RES_DATA_TotalNum: state => {
    return state.TotaltotalNum
  }
}

// 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
// Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
const mutations = {
  SET_RES_DATA_OBJ(state, dataArr) {
    state.resfundDataArr = dataArr
  },
  SET_RES_DATA_Prop(state, totalMoney) {
    state.TotalMoneyProp = totalMoney
  },
  SET_RES_DATA_TotalNum(state, totalNum) {
    state.TotaltotalNum = totalNum
  }
}

// Action 类似于 mutation，不同在于：
// Action 提交的是 mutation，而不是直接变更状态。
// Action 可以包含任意异步操作。context包含 state, commit, rootState
const actions = {
  async getfundData(context, paramsObj) {
    // 调用Api接口(对传入参数进行过滤，如果需要对传如api的参数进行重组可在此操作，无操作直接传入即可)
    // if (!paramsObj.userName || !paramsObj.passWord) { // 打印日志或者弹出提示
    //   commonFunc.myConsole('请传入完整参数')
    // } else {
    let resData = await deliveryStatisticsApi.orderSuppliercount(paramsObj)
    // commonFunc.myConsole('store demoStore ===>')
    // commonFunc.myConsole(resData)
    // 判断接口数据code
    if (resData.status === '000') {
      if (resData.data.record.List) {
        context.commit('SET_RES_DATA_OBJ', resData.data.record.List)
        context.commit('SET_RES_DATA_Prop', resData.data.record.TotalPrice)
        context.commit('SET_RES_DATA_TotalNum', resData.data.totalNum)
      } else {
        commonFunc.myConsole('返回错误')
        // 封装公共函数统一进行错误码处理
      }
      // }
    }
  },
  setfundData(context, paramsObj) {
    context.commit('SET_RES_DATA_OBJ', paramsObj)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
