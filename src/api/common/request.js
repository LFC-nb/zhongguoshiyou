/**
 * requestService用于与 Server Api 服务进行数据交换
 */
import commonFunc from './common.js'
import axios from 'axios'
import qs from 'qs'

// 拦截响应response，并做一些错误的自定义处理
axios.interceptors.response.use((response) => {
  return response
}, (err) => { // 这里是返回状态码不为200时候的错误处理
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误'
        break
      case 401:
        err.message = '未授权，请登录'
        break
      case 403:
        err.message = '拒绝访问'
        break
      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`
        break
      case 408:
        err.message = '请求超时'
        break
      case 500:
        err.message = '服务器内部错误'
        break
      case 501:
        err.message = '服务未实现'
        break
      case 502:
        err.message = '网关错误'
        break
      case 503:
        err.message = '服务不可用'
        break
      case 504:
        err.message = '网关超时'
        break
      case 505:
        err.message = 'HTTP版本不受支持'
        break
      default:
    }
  }
  let errorMsgObj = {
    'code': err.response.status,
    'data': '',
    'msg': err.message
  }
  // commonFunc.myConsole(err.response)
  return Promise.reject(errorMsgObj)
})

// 网络请求封装
const requestService = {

  /**
 * GET
 * @param  {object} optionsParams  相关参数传入
 * @param  {string} serverUrl  动态传入的获取数据的地址
 * @return {object}       结果
 */
  get: function(serverUrl, optionsParams) {
    commonFunc.myConsole('get optionsParams ===> ')
    commonFunc.myConsole(serverUrl)
    commonFunc.myConsole(optionsParams)
    if (!commonFunc.isDefine(optionsParams)) {
      serverUrl += '?t=' + Date.now()
    }
    let options = {
      method: 'get',
      url: serverUrl,
      // mode:'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // timeout: 3600,
      // `withCredentials` indicates whether or not cross-site Access-Control requests
      // should be made using credentials
      withCredentials: true, // default: false

      // `params` are the URL parameters to be sent with the request
      // Must be a plain object or a URLSearchParams object
      params: optionsParams,
      paramsSerializer: params => {
        let getParamsStr = qs.stringify(params, {indices: false})
        if (optionsParams) {
          getParamsStr += '&t=' + Date.now()
        } else {
          getParamsStr += '?t=' + Date.now()
        }
        return getParamsStr
      }
    }

    return new Promise((resolve, reject) => {
      axios(options).then((resp) => {
        // commonFunc.myConsole(resp)
        if (resp.data.code === 0) { // 成功正确的返回 -- resolve
          resolve(resp.data)
        } else { // 业务自定义错误码返回 -- reject
          reject(resp.data)
        }
      }).catch((error) => { // 服务器或网络错误码返回 -- reject
        // commonFunc.myConsole(error)
        reject(error)
      })
    })
  },

  /**
 * POST
 * @param  {object} optionsParams   相关参数传入
 * @param  {string} serverUrl  动态传入的获取数据的地址
 * @return {object}       结果
 */
  post: function(serverUrl, optionsParams, formSubmission) {
    // commonFunc.myConsole('post optionsParams ===> ')
    // commonFunc.myConsole(serverUrl)
    // commonFunc.myConsole(optionsParams)
    let isForm = commonFunc.isDefine(formSubmission) && formSubmission === 'form'
    let userInfo = localStorage.getItem('userDataInfo')
    // console.log(JSON.parse(userInfo))
    let options = {
      method: 'post',
      url: serverUrl,
      // mode:'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': isForm ? 'application/x-www-form-urlencoded' : 'application/json',
        // 'userId': userInfo ? JSON.parse(userInfo).ID : '',
        'userToken': userInfo ? JSON.parse(userInfo).Token : ''
      },
      // timeout: 3600,
      // `withCredentials` indicates whether or not cross-site Access-Control requests
      // should be made using credentials -- web need set cookie
      withCredentials: false, // default: false

      // `data` is the data to be sent as the request body
      // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
      data: isForm
        ? qs.stringify(optionsParams, {indices: false})
        : optionsParams
    }

    // commonFunc.myConsole(options)
    return new Promise((resolve, reject) => {
      axios(options).then((resp) => {
        if (resp.data.code === 0) { // 成功正确的返回 -- resolve
          // commonFunc.myConsole('==============>')
          // commonFunc.myConsole(resp)
          resolve(resp.data)
        } else { // 业务自定义错误码返回 -- reject
          // commonFunc.myConsole('>>>>>>>>>>>>')
          // commonFunc.myConsole(resp)
          reject(resp.data)
        }
      }).catch((error) => { // 服务器或网络错误码返回 -- reject
        // commonFunc.myConsole(error)
        reject(error)
      })
    })
  },
  /**
  * UpLoadFile
  * @param  {object} optionsParams   相关参数传入
  * @param  {string} serverUrl  动态传入的获取数据的地址
  * @return {object}       结果
  */
  UpLoadFile: function(serverUrl, optionsParams) {
    commonFunc.myConsole('post optionsParams ===> ')
    commonFunc.myConsole(serverUrl)
    commonFunc.myConsole(optionsParams)
    let options = {
      method: 'post',
      url: serverUrl,
      // mode:'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      // timeout: 3600,
      // `withCredentials` indicates whether or not cross-site Access-Control requests
      // should be made using credentials
      withCredentials: true, // default: false

      // `data` is the data to be sent as the request body
      // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
      data: optionsParams
    }

    return new Promise((resolve, reject) => {
      axios(options).then((resp) => {
        // commonFunc.myConsole(resp)
        if (resp.data.code === 0) { // 成功正确的返回 -- resolve
          resolve(resp.data)
        } else { // 业务自定义错误码返回 -- reject
          reject(resp.data)
        }
      }).catch((error) => { // 服务器或网络错误码返回 -- reject
        // commonFunc.myConsole(error)
        reject(error)
      })
    })
  }
}

export default requestService
