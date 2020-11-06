import config from '../config/config.js'
import commonFunc from './common/common.js'
import interfaceApi from './common/interface.js'
import requestService from './common/request.js'

const membersAddApi = {
  async updateManager(params) {
    // 定义组装上传需要的相关参数
    let conditionsParams = {
      'DepartmentID': params.DepartmentID,
      'DepartmentLev': params.DepartmentLev,
      'ID': params.ID,
      'IdentityType': params.IdentityType,
      'LoginName': params.LoginName,
      'NickName': params.NickName,
      'Password': params.Password,
      'Phone': params.Phone,
      'UserNumber': params.UserNumber,
      'IsLongTerm': params.IsLongTerm,
      'CarInputRight': params.CarInputRight,
      'ShipWaterAdjust': params.ShipWaterAdjust,
      'IsFreeMeal': params.IsFreeMeal,
      'IsEnabled': params.IsEnabled,
      'NoApply': params.NoApply,
      'RoleID': params.RoleID
    }
    // 得到组装好的接口数据
    let dataParams = interfaceApi.getParams('Manager_edit', conditionsParams, '')
    // 接收api返回来的结果
    let resData
    await requestService.post(config.APISERVER.host, dataParams).then(resApi => {
      commonFunc.myConsole('membersApi getDemoData resolve =====>')
      commonFunc.myConsole(resApi)
      resData = resApi
    }, error => {
      commonFunc.myConsole('membersApi getDemoData reject =====>')
      commonFunc.myConsole(error)
      resData = error
    })
    return resData
  }
}

export default membersAddApi
