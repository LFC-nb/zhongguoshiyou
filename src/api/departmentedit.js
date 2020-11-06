import config from '../config/config.js'
import commonFunc from './common/common.js'
import interfaceApi from './common/interface.js'
import requestService from './common/request.js'

const departmenteditApi = {
  async departmentedit(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'ID': params.ID,
      'ParentID': params.ParentID,
      'DepartmentName': params.DepartmentName,
      'Type': params.Type,
      'Line': params.Line
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Department_edit', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Api Department_edit resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Api Department_edit reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async getDeliveryline(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {}
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Department_line', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Api Department_line resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Api Department_line reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  }
}

export default departmenteditApi
