import config from '../config/config.js'
import commonFunc from './common/common.js'
import interfaceApi from './common/interface.js'
import requestService from './common/request.js'

const distributionStatisticsApi = {
  async fundlist(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'PageNo': params.PageNo,
      'PageSize': params.PageSize,
      'SupplierID': params.SupplierID,
      'Department': params.Department,
      'StartTime': params.StartTime,
      'EndTime': params.EndTime
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('order_count', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('order_count getDemoData resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('order_count getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async limitDepartment(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'DepartmentLev': params.DepartmentLev
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Limit_department', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    commonFunc.myConsole(dataParams)
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Limit_department  resolve =====>')
      // commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Limit_department  reject =====>')
      // commonFunc.myConsole(error)
      resData = error
    })
    return resData
  }
}

export default distributionStatisticsApi
