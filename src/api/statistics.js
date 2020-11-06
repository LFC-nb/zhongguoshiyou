import config from '../config/config.js'
import commonFunc from './common/common.js'
import interfaceApi from './common/interface.js'
import requestService from './common/request.js'

const statisticsApi = {
  async getallstatisticslist(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'DepartmentLev': params.DepartmentLev, //
      'CarNo': params.CarNo, //
      'StartTime': params.StartTime, // 开始日期
      'EndTime': params.EndTime
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('ShipList_analysis', conditionsParams, '')
    commonFunc.myConsole(dataParams)
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('ShipList_analysis getDemoData resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('ShipList_analysis getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  }
}

export default statisticsApi
