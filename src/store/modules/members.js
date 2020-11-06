import membersApi from '../../api/members.js'
import commonFunc from '../../api/common/common.js'

// moduleA
// 单一状态树，用一个对象就包含了全部的应用层级状态。
// 至此它便作为一个“唯一数据源 (SSOT)”而存在。
const state = {
  resMembersDataArr: [],
  resMembersTotalNum: 0
}

// getters
const getters = {
  GET_RES_DATA_ARR: state => { return state.resMembersDataArr },
  GET_RES_DATA_Attr: state => { return state.resMembersTotalNum }
}

// 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
// Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
const mutations = {
  SET_RES_DATA_OBJ(state, dataArr) { state.resMembersDataArr = dataArr },
  SET_RES_DATA_Attr(state, attr) { state.resMembersTotalNum = attr }
}

// Action 类似于 mutation，不同在于：
// Action 提交的是 mutation，而不是直接变更状态。
// Action 可以包含任意异步操作。context包含 state, commit, rootState
const actions = {
  async getMembersData(context, paramsObj) {
    // 调用Api接口(对传入参数进行过滤，如果需要对传如api的参数进行重组可在此操作，无操作直接传入即可)
    // if (!paramsObj.userName || !paramsObj.passWord) { // 打印日志或者弹出提示
    //   commonFunc.myConsole('请传入完整参数')
    // } else {
    let resData = await membersApi.getManagerlist(paramsObj)
    commonFunc.myConsole('store demoStore ===>')
    commonFunc.myConsole(resData)
    // 判断接口数据code
    if (resData.status === '000') {
      if (resData.data.record) {
        for (let i = 0; i < resData.data.record.length; i++) {
          if (resData.data.record[i].IdentityType === 0) {
            resData.data.record[i].IdentityName = '企业人员'
          } else if (resData.data.record[i].IdentityType === 1) {
            resData.data.record[i].IdentityName = '临时人员'
          }
          if (resData.data.record[i].NoApply === 0) {
            resData.data.record[i].NoApplyStatus = '未授权'
          } else if (resData.data.record[i].NoApply === 1) {
            commonFunc.myConsole(resData)
            resData.data.record[i].NoApplyStatus = '已授权'
          }
          if (resData.data.record[i].IsEnabled === 0) {
            resData.data.record[i].accountsStatus = '待审核'
          } else if (resData.data.record[i].IsEnabled === 1) {
            resData.data.record[i].accountsStatus = '可用'
          } else if (resData.data.record[i].IsEnabled === 2) {
            resData.data.record[i].accountsStatus = '不可用'
          }
        }
      }
      context.commit('SET_RES_DATA_OBJ', resData.data.record)
      context.commit('SET_RES_DATA_Attr', resData.data.totalNum)
      commonFunc.myConsole('store getMembersData SET_DATA ===>')
      commonFunc.myConsole(context.state.resMembersDataArr)
      commonFunc.myConsole(context.state.resMembersTotalNum)
    } else {
      commonFunc.myConsole('返回错误')
      // 封装公共函数统一进行错误码处理
    }
    // }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
