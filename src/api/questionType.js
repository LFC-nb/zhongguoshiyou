import config from '../config/config.js'
import commonFunc from './common/common.js'
import interfaceApi from './common/interface.js'
import requestService from './common/request.js'

const questionTypeApi = {
  async getquestionTypelist(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('QuestionType_list', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Api getDemoData QuestionType_list resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Api getDemoData QuestionType_list reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  },
  async questionTypedel(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'ArrayID': params.ArrayID
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('QuestionType_del', conditionsParams, '')
    commonFunc.myConsole(dataParams)
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('Api getDemoData resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('Api del  questionType reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  }
}

export default questionTypeApi
