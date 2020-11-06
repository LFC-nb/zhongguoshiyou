import config from '../config/config.js'
import commonFunc from './common/common.js'
import interfaceApi from './common/interface.js'
import requestService from './common/request.js'

const questionTypeeditApi = {
  async questionTypeedit(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'Entity': params
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('QuestionType_edit', conditionsParams, '')
    commonFunc.myConsole(dataParams)
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Api QuestionType_edit resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Api QuestionType_edit reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  }
}

export default questionTypeeditApi
