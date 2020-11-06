import config from '../config/config.js'
import commonFunc from './common/common.js'
import interfaceApi from './common/interface.js'
import requestService from './common/request.js'

const tagsApi = {
  async getTags_dep(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {}
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Tags_dep', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Tags_dep getDemoData resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Tags_dep getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  }
}

export default tagsApi
