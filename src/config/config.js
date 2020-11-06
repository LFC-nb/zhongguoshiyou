/**
 * 配置文件
 */

// 发布配置
const production = {
  // node API数据接口配置
  BASE: 'production',
  APISERVER: {
    cnpcay: '/cnpc-work',
    host: 'https://www.cqqgl.cn/cnpc-work/AjaxService.ashx',
    uploadip: 'https://www.cqqgl.cn/cnpc-work/UploadService.ashx?action=uploadimage',
    filepdf: 'https://www.cqqgl.cn/cnpc-work/',
    ip: 'https://www.cqqgl.cn/cnpc-work'
  }
}

// 开发配置
const development = {
  // node API数据接口配置
  BASE: 'development',
  APISERVER: {
    cnpcay: '',
    host: 'http://192.168.0.200:9068/AjaxService.ashx',
    uploadip: 'http://192.168.0.200:9068/UploadService.ashx?action=uploadimage',
    filepdf: 'http://192.168.0.200:9068/',
    ip: 'http://192.168.0.200:9068'
  },
  getApiServerHost() { // 从地址栏拿到数据请求的ip地址--仅开发测试阶段需要
    let urlStr = location.href
    let serverHostIndex = urlStr.indexOf('serverhost')
    if (serverHostIndex !== -1) {
      let urlStr1ubstr = urlStr.substr(serverHostIndex, urlStr.length)
      let urlStrSplit01 = urlStr1ubstr.split('=')[1]
      let apiServerHost = urlStrSplit01.replace('%3A', ':')
      localStorage.setItem('apiServerHost', apiServerHost)
    } else {
      localStorage.setItem('apiServerHost', '')
    }
    // 重新设置配置文件
    this.setApiServerHost()
  },
  setApiServerHost() {
    let apiServerHostTemp = localStorage.getItem('apiServerHost')
    if (apiServerHostTemp) {
      this.APISERVER.host = 'http://' + apiServerHostTemp + '/webapi'
    } else {
      this.APISERVER.host = 'http://192.168.0.200:9068/AjaxService.ashx'
    }
  }
}
// console.log(process.env.NODE_ENV)
const config = process.env.NODE_ENV === 'production' ? production : development
// console.log(config)

export default config
