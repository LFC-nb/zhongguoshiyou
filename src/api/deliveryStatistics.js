import config from '../config/config.js'
import commonFunc from './common/common.js'
import interfaceApi from './common/interface.js'
import requestService from './common/request.js'

const deliveryStatisticsApi = {
  async orderSuppliercount(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'PageNo': params.PageNo,
      'PageSize': params.PageSize,
      'Type': params.Type,
      'Department': params.Department,
      'StartTime': params.StartTime,
      'EndTime': params.EndTime
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Order_suppliercount', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Order_suppliercount getDemoData resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Order_suppliercount getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  }
}

export default deliveryStatisticsApi
