<template>
<div class="login-container">
  <div class="bg-shadow">
    <div class="login-content hdp-uf hdp-uf-hfe">
      <div class="hdp-uf hdp-uf-vc hdp-uf-dc">
        <div class="hdp-uf psc-font-1 psc-color-white login-title">
          青橄榄智慧后勤<span class="hdp-uf" style="font-size: 24px;line-height:2.5;">(供应商登录)</span>
        </div>
        <div class="form">
          <div class="logo-content hdp-uf hdp-uf-hc">
            <p>
              <img src="../../assets/images/anyue-logo-black.png" alt="logo">
            </p>
          </div>
          <div class="body-content">
            <div class="input-style">
              <el-input class="login-input" placeholder="请输用户名" v-model="loginForm.account" prefix-icon="">
                <template slot="prepend"><i class="fa fa-user-o fa-fw" aria-hidden="true"></i></template>
              </el-input>
            </div>
            <div class="input-style">
              <el-input class="login-input" placeholder="请输入密码" type="password" v-model="loginForm.password">
                <template slot="prepend"><i class="fa fa-lock fa-fw" aria-hidden="true"></i></template>
              </el-input>
            </div>
            <div class="btn-style">
              <el-button class="login-btn" type="primary" @click="login()">登 录</el-button>
            </div>
          </div>
          <div class="footer-content">
            <!-- <el-button type="text" @click="changeDialogVisible = true">修改密码</el-button> -->
            <!-- <el-button type="text" @click="forgetDialogVisible = true">忘记密码</el-button> -->
            <!-- <el-button type="text">立即体验</el-button> -->
          </div>
        </div>
      </div>
    </div>
    <!-- 忘记密码 弹窗 -->
    <el-dialog :close-on-click-modal="false" title="忘记密码" :visible.sync="forgetDialogVisible" v-if="forgetDialogVisible" width="500px">
      <div class="dialog-content">
        <el-form ref="forgetForm" :model="forgetForm" :rules="forgetRules" label-width="100px">
          <el-form-item label="手机" prop="phone" style="width: 400px">
            <el-input v-model="forgetForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="password" style="width: 400px">
            <el-input type="password" v-model="forgetForm.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="passwordRel" style="width: 400px">
            <el-input type="password" v-model="forgetForm.passwordRel"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="vaildCode" style="width: 400px">
            <el-row>
              <el-col :span="14">
                <el-input v-model="forgetForm.vaildCode"></el-input>
              </el-col>
              <el-col :span="8" :offset="2">
                <button class="code-btn" :disabled="btnDisabled">{{codeText}}</button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="forgetDialogVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</div>
</template>
<script>
import mockData from '../../api/mockData.js'
import commonFunc from '../../api/common/common.js'
import demoApi from '../../api/login.js'
import roleApi from '../../api/role.js'
import departmentApi from '../../api/department.js'
export default {
  name: 'Login',
  data() {
    let validatePass4 = (rule, value, callback) => {
      if (this.forgetForm.passwordRel !== '') {
        this.$refs.forgetForm.validateField('passwordRel')
        callback()
      } else {
        callback()
      }
    }
    let validatePass5 = (rule, value, callback) => {
      if (this.forgetForm.password && value !== this.forgetForm.password) {
        callback(new Error('新密码和确认密码不一致!'))
      } else {
        callback()
      }
    }
    let passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{8,15}$/

    return {
      loginForm: {
        account: '',
        password: ''
      },
      changeDialogVisible: false,
      forgetDialogVisible: false,
      forgetForm: {
        phone: '',
        password: '',
        passwordRel: '',
        vaildCode: ''
      },
      forgetRules: {
        phone: [{
          required: true,
          message: '请输入手机',
          trigger: 'blur'
        }, {
          pattern: /^\d{1,14}$/,
          message: '请输入手机号码',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入新密码',
          trigger: 'blur'
        }, {
          pattern: passwordReg,
          message: '请输入8-15位数字和大、小写字母组合密码',
          trigger: 'blur'
        }, {
          validator: validatePass4,
          trigger: 'blur'
        }],
        passwordRel: [{
          required: true,
          message: '请输入确认密码',
          trigger: 'blur'
        }, {
          pattern: passwordReg,
          message: '请输入8-15位数字和大、小写字母组合密码',
          trigger: 'blur'
        }, {
          validator: validatePass5,
          trigger: 'blur'
        }],
        vaildCode: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }]
      },
      codeText: '发送验证码',
      btnDisabled: false,
      resList: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.$commonFunc.myConsole('渲染完成后 ===> 开始默认加载相应的逻辑')
      this.$store.dispatch('menuLeadLists/setMenuLeadListsData', this.currentMenuLeadListsData)
    },
    async login() {
      if (!this.loginForm.account && !this.loginForm.password) {
        this.$message.error('请输入用户名和密码')
        return
      } else if (!this.loginForm.account || !this.loginForm.password) {
        this.$message.error('请输入用户名或密码')
        return
      }

      let conditionsParams = {
        'userName': this.loginForm.account,
        'passWord': this.loginForm.password
      }
      localStorage.removeItem('userData')
      localStorage.removeItem('isLogin')
      localStorage.removeItem('userDataInfo')
      localStorage.removeItem('handleselectkey')
      commonFunc.myConsole(conditionsParams)
      let resData = await demoApi.getsupplierLoginData(conditionsParams)
      if (resData.status === '000') {
        mockData.userInfo[0].userId = resData.data.record.ID
        mockData.userInfo[0].userName = resData.data.record.LoginName
        mockData.userInfo[0].nickName = resData.data.record.NickName
        mockData.userInfo[0].UserType = resData.data.record.UserType
        mockData.userInfo[0].phone = resData.data.record.Phone
        mockData.userInfo[0].menuLists = resData.data.record.Module
        // commonFunc.myConsole(mockData.userInfo[0])
        // mockData.userInfo[0].menuLists = setModule(mockData.userInfo[0].menuLists, resData.data.record.Module)
        localStorage.setItem('userData', JSON.stringify(mockData.userInfo[0]))
        localStorage.setItem('userDataInfo', JSON.stringify(resData.data.record))
        localStorage.setItem('isLogin', true)
        localStorage.setItem('issupplierLogin', true) // 标识区分后勤人员还是供应商登录 用于点击退出时判断回到那个登录页面
        // this.getrolelist()
        // this.getdepartmentlist()
        this.$router.push({
          path: mockData.userInfo[0].menuLists[0].children[0].link,
          query: {
            link: mockData.userInfo[0].menuLists[0].children[0].link,
            name: mockData.userInfo[0].menuLists[0].name,
            itemname: mockData.userInfo[0].menuLists[0].children[0].name
          }
        })
      } else {
        this.$message.error('用户名或密码错误')
      }
    },
    async getrolelist() {
      let conditionsParams = {}
      let resData = await roleApi.getRolelist(conditionsParams)
      if (resData.status === '000') {
        mockData.rolelist = resData.data.record
        // commonFunc.myConsole(resData)
        localStorage.setItem('rolelist', JSON.stringify(resData.data.record))
      } else {
        // this.$message.error('用户名或密码错误')
      }
    },
    async getdepartmentlist() {
      let conditionsParams = {
        'DepName': ''
      }
      let resData = await departmentApi.getDepartmentlist(conditionsParams)
      if (resData.status === '000') {
        mockData.cascader = resData.data.record
        localStorage.setItem('departmentcascader', JSON.stringify(mockData.cascader))
        // commonFunc.myConsole(resData)
        this.departmentArr(resData.data.record)
      } else {
        // this.$message.error('用户名或密码错误')
      }
    },
    async departmentArr(children) {
      let item = {}
      let arr2 = []
      let selectedOptions = []
      let ParentName = ''
      let ParentID = ''
      if (!commonFunc.isDefine(children)) {
        return
      }
      let fn = function(children) {
        for (let i = 0; i < children.length; i++) {
          // let lastselectedOptions = selectedOptions.concat(selectedOptions)
          item = {
            ID: children[i].ID,
            Level: children[i].Level,
            DepartmentName: children[i].DepartmentName,
            ParentID: ParentID,
            ParentName: ParentName,
            selectedOptions: []
          }
          if (selectedOptions) {
            item.selectedOptions = selectedOptions.concat()
          }
          arr2.push(item)
          if (children[i].SubDeps) {
            selectedOptions.push(children[i].ID)
            ParentID = children[i].ID
            ParentName = children[i].DepartmentName
            fn(children[i].SubDeps)
          } else if (i === children.length - 1) {
            selectedOptions = []
            ParentID = ''
            ParentName = ''
          }
        }
      }
      fn(children)
      this.departmentlist = arr2
      commonFunc.myConsole(arr2)
      localStorage.setItem('departmentArr', JSON.stringify(arr2))
    }
  }
}
</script>
<style scoped lang="scss">
.el-input.is-active .el-input__inner, .el-input__inner:focus {
    border-color: #FF6D18;
    outline: 0;
}
.el-button--primary {
    //按钮正常状态
    color: #fff;
    background-color: #FF6D18;
    border-color: #FF6D18;
}

.el-button--primary:focus,
.el-button--primary:hover {
    //鼠标悬停至按钮
    background-color: #ff7e33;
    border-color: #FF6D18;
}
.el-button--primary:active {
    //鼠标点击按钮
    background-color: #f16513;
}
.el-button--primarydel {
    color: #505050;
    border-color: #dcdfe6;
}
.el-button--primarydel:hover {
    color: #ff7e33;
    border-color: #ff7e33;
    background-color: #ecf5ff;
}
.el-button--primarydel:active,
.el-button--primarydel:focus {
    color: #505050;
    border-color: #dcdfe6;
}

.login-container {
    position: relative;
    height: 100%;
    width: 100%;
    background: url("../../assets/images/bg.png") no-repeat;
    background-size: cover;
    overflow: hidden;
    .bg-shadow {
        top: 0;
        left: 0;
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: rgba(0,0,0,0.4);
    }
    .login-content {
        padding-right: 12%;
        padding-top: 12%;
        .login-title {
            font-weight: bolder;
            color: #FFFFFF;
            font-size: 36px;
        }
        .form {
            width: 350px;
            background: #fff;
            border-radius: 5px;
            margin-top: 30px;
            padding: 24px;
            .logo-content {
                margin-bottom: 2rem;
                img {
                    height: 40px;
                    width: auto;
                }
            }
            .body-content {
                .input-style {
                    margin-bottom: 16px;
                }
                .btn-style {
                    width: 100%;
                    margin-top: 34px;
                    .login-btn {
                        width: 100%;
                        word-spacing: 30px;
                        font-size: 16px;
                    }
                }
                .login-input {
                    font-size: 16px;
                }
            }
            .footer-content {
                display: flex;
                justify-content: space-between;
            }
        }
    }
}
.code-btn {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-around;
    line-height: 40px;
    background: #ecf5ff;
    color: #00A3E0;
    border: 1px solid #BBE6EB;
    font-size: 14px;
    outline: none;
    border-radius: 5px;
}
</style>
