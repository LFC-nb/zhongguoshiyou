// 公用方法和变量封装
const commonFunc = {
  // 全局统一控制打印log日志--部署版本前请务必注释打印代码
  myConsole(logObj) {
    console.log(logObj)
  },
  // 全局统一 debugger --部署版本前请务必注释该行
  myDebugger() {
    // debugger
  },
  // 判断是否定义或存在
  isDefine(para) {
    let paraType = typeof para
    if (para === 'undefined' || para === 'null' || para === '' || para === '[]' || para === null || para === undefined) {
      return false
    } else if (paraType === 'number' || paraType === 'object' || paraType === 'string' || paraType === 'function' || paraType === 'boolean') {
      return true
    } else {
      for (var o in para) {
        return true
      }
      return false
    }
  },
  getnowDate(myDate, Offset) {
    let MillisecondDiff = new Date(myDate).getTime()
    myDate = new Date(MillisecondDiff + Offset * 24 * 60 * 60 * 1000)
    let FullYear = myDate.getFullYear() // 获取完整的年份(4位,1970-????)
    let Month = myDate.getMonth() + 1 // 获取当前月份(0-11,0代表1月)
    let mDate = myDate.getDate()
    return FullYear + '-' + Month + '-' + mDate
  },
  dateFormat(timer, type) {
    if (timer === 'undefined' || timer === 'null' || timer === '' || timer === '[]' || timer === null || timer === undefined) {
      return ''
    }
    let timerFormat = new Date(timer)
    let oYear = timerFormat.getFullYear()
    let oMonth = timerFormat.getMonth() + 1 < 10 ? '0' + (timerFormat.getMonth() + 1) : (timerFormat.getMonth() + 1)
    let oDay = timerFormat.getDate() < 10 ? '0' + timerFormat.getDate() : timerFormat.getDate()
    let oHour = timerFormat.getHours() < 10 ? '0' + timerFormat.getHours() : timerFormat.getHours()
    let oMinute = timerFormat.getMinutes() < 10 ? '0' + timerFormat.getMinutes() : timerFormat.getMinutes()
    // let oSecond = timerFormat.getSeconds() < 10 ? '0' + timerFormat.getSeconds() : timerFormat.getSeconds()
    if (type === 1) {
      let str = oYear + '-' + oMonth + '-' + oDay
      return str
    } else {
      let str2 = oHour + ':' + oMinute
      return str2
    }
  },
  timerDiff(timer1, timer2) {
    let MillisecondDiff = new Date(timer2).getTime() - new Date(timer1).getTime() // 时间差的毫秒数
    // let minutesDiff = Math.floor(MillisecondDiff / (60 * 1000)) // 计算相差的总分钟数
    //
    // let hours1 = parseInt(MillisecondDiff / (3600 * 1000)) // 计算总的小时数
    // let leavel1 = MillisecondDiff % (3600 * 1000) // 计算小时后剩余的时间
    // let leavel3 = leavel1 % (3600 * 1000) // 计算剩余小时后剩余的毫秒数
    // let minutes1 = parseInt(leavel3 / (60 * 1000)) // 计算剩余的分钟数
    let MillisecondDiff2 = new Date(timer2).getTime()
    let minutesDiff2 = parseInt(MillisecondDiff2 / (60 * 1000))
    let MillisecondDiff1 = new Date(timer1).getTime()
    let minutesDiff1 = parseInt(MillisecondDiff1 / (60 * 1000))
    let minutesDiff = minutesDiff2 - minutesDiff1
    let hours2 = parseInt(minutesDiff / 60)
    let day = parseInt(hours2 / 24)
    let hours1 = parseInt(hours2 % 24)
    let minutes1 = minutesDiff % 60
    let str1 = ''
    if (day === 0) {
      if (hours1 <= 0) {
        str1 = minutes1 + '分钟'
      } else {
        if (minutes1 <= 0) {
          str1 = hours1 + '小时'
        } else {
          str1 = hours1 + '小时' + minutes1 + '分钟'
        }
      }
    } else {
      if (hours1 <= 0) {
        str1 = day + '天' + '0小时' + minutes1 + '分钟'
      } else {
        if (minutes1 <= 0) {
          str1 = day + '天' + hours1 + '小时'
        } else {
          str1 = day + '天' + hours1 + '小时' + minutes1 + '分钟'
        }
      }
    }

    let days = Math.floor(MillisecondDiff / (24 * 3600 * 1000)) // 计算出天数
    let leavel = MillisecondDiff % (24 * 3600 * 1000) // 计算天数后剩余的时间
    let hours = Math.floor(leavel / (3600 * 1000)) // 计算剩余的小时数
    let leavel2 = leavel % (3600 * 1000) // 计算剩余小时后剩余的毫秒数
    let minutes = Math.floor(leavel2 / (60 * 1000)) // 计算剩余的分钟数
    let str2 = days + '天' + hours + '小时' + minutes + '分钟'
    let timerDiffArr = {
      'minutesDiff': minutesDiff,
      'hourminDiff': str1,
      'dayhouminDiff': str2
    }
    return timerDiffArr
  },
  // 获取对象是否是指定的对象 使用：commonFunc.Type.isArray(value)
  Type: (function() {
    var type = {}
    var typeArr = [
      'String',
      'Object',
      'Number',
      'Array',
      'Undefined',
      'Function',
      'Null',
      'Symbol'
    ]
    for (var i = 0; i < typeArr.length; i++) {
      (function(name) {
        type['is' + name] = function(obj) {
          return Object.prototype.toString.call(obj) === '[object ' + name + ']'
        }
      })(typeArr[i])
    }
    return type
  })(),
  // 获取元素是否存在或数组中的定位
  getArrayIndexByValue(val, ArrayObj) {
    for (var i = 0; i < ArrayObj.length; i++) {
      if (JSON.stringify(ArrayObj[i]) === JSON.stringify(val)) {
        return i
      }
    }
    return -1
  },
  // 根据键值 返回  满足条件的json数组
  arraySubBybool(keyname, ArrayObj) {
    var arr = ArrayObj.filter(function(obj) {
      return obj[keyname] === true
    })
    return arr
  },
  // 根据元素值在数组中删除某个元素
  arrayRemoveByValue(val, ArrayObj) {
    var index = this.getArrayIndexByValue(val, ArrayObj)
    if (index > -1) {
      ArrayObj.splice(index, 1)
    }
    return ArrayObj
  },
  // 解决 js 加-减-乘-除-四则运算精度问题
  // 除 (2.11/100)
  amcDiv(arg1, arg2) {
    let t1 = 0
    let t2 = 0
    let r1
    let r2
    try {
      t1 = arg1.toString().split('.')[1].length
    } catch (e) {}
    try {
      t2 = arg2.toString().split('.')[1].length
    } catch (e) {}
    r1 = Number(arg1.toString().replace('.', ''))
    r2 = Number(arg2.toString().replace('.', ''))
    return (r1 / r2) * Math.pow(10, t2 - t1)
  },
  // 乘 (1.11*100)
  amcMul(arg1, arg2) {
    let m = 0
    let s1 = arg1.toString()
    let s2 = arg2.toString()
    try {
      m += s1.split('.')[1].length
    } catch (e) {}
    try {
      m += s2.split('.')[1].length
    } catch (e) {}
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
  },
  // 加 (1.11+1)
  amcAdd(arg1, arg2) {
    let r1,
      r2,
      m
    try {
      r1 = arg1.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
  },
  // 减 (1.11-1)
  amcSub(arg1, arg2) {
    let r1,
      r2,
      m,
      n
    try {
      r1 = arg1.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    // last modify by deeka
    // 动态控制精度长度
    n = (r1 >= r2)
      ? r1
      : r2
    return ((arg1 * m - arg2 * m) / m).toFixed(n)
  }
}

export default commonFunc
