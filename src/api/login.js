import config from '../config/config.js'
import commonFunc from './common/common.js'
import interfaceApi from './common/interface.js'
import requestService from './common/request.js'

const demoApi = {
  async getLoginData(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'username': params.userName,
      'pwd': params.passWord
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Manager_login', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Manager_login getDemoData resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Manager_login getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async getsupplierLoginData(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'username': params.userName,
      'pwd': params.passWord
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Supplier_login', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Supplier_login getDemoData resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Supplier_login getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async Manager_editinfo(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'Password': params.Password,
      'NickName': params.NickName,
      'Phone': params.Phone
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Manager_editinfo', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Manager_editinfo getDemoData resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Manager_editinfo getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async Supplier_newpass(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'Password': params.Password,
      'NickName': params.NickName,
      'Phone': params.Phone,
      'Address': params.Address
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Supplier_newpass', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Supplier_newpass getDemoData resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Supplier_newpass getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async Employee_newpass(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'Password': params.Password
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Employee_newpass', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    commonFunc.myConsole(111111111111111111111111)
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Employee_newpass getDemoData resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Employee_newpass getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  }
}

export default demoApi
