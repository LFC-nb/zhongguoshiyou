import config from '../config/config.js'
import commonFunc from './common/common.js'
import interfaceApi from './common/interface.js'
import requestService from './common/request.js'

const departmentApi = {
  async getDepartmentlist(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'DepName': params.DepName
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Department_list', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Api getDemoData resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Api getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async getDepartmentwellcenter(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {}
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Department_wellcenter', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Api Department_wellcenter getDemoData resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Api Department_wellcenter getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async getDepartmentwkcenter(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {}
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Department_wkcenter', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Api Department_wkcenter getDemoData resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Api Department_wkcenter getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async getDepartmentwell(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {}
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Department_well', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Api Department_well getDemoData resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Api Department_well getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async getDepartmentRepair(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {}
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Department_repair', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Api Department_repair getDemoData resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Api Department_repair getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async departmentdel(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'ArrayID': params.ArrayID
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Department_del', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Api getDemoData resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Api del  department reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  }
}

export default departmentApi
