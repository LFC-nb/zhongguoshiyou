import config from '../config/config.js'
import commonFunc from './common/common.js'
import interfaceApi from './common/interface.js'
import requestService from './common/request.js'

const demoApi = {
  async getDemoData(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'username': params.userName,
      'pwd': params.passWord
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('demo', conditionsParams)
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('demoApi getDemoData resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('demoApi getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  }
}

export default demoApi
