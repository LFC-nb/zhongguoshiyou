import config from '../config/config.js'
import commonFunc from './common/common.js'
import interfaceApi from './common/interface.js'
import requestService from './common/request.js'

const statisticschartsApi = {
  async getQuestion_todo(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {}
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Question_todo', conditionsParams, '')
    // commonFunc.myConsole(dataParams)
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      // commonFunc.myConsole('Api Question_todo getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      // commonFunc.myConsole('Api del Question_todo reject =====>')
      // commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async getQuestion_count(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = params
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Question_count', conditionsParams, '')
    commonFunc.myConsole(dataParams)
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Question_count getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Question_count getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  }
}

export default statisticschartsApi
