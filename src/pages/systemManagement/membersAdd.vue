<template>
<div class="hdp-uf main-container hdp-w-100">
  <div class="hdp-uf hdp-uf-dc hdp-w-100">
    <div class="hdp-uf hdp-uf-hsb menu-title hdp-w-100" style="max-width:1000px">
      <div class="hdp-uf hdp-uf-dc hdp-w-100" style="background:#FFFFFF;padding:10px 40px 20px 20px">
        <div class="hdp-uf psc-font-3" style="">
          人员编辑
        </div>
        <div class="hdp-uf" style="margin-top:23px">
          <div class="hdp-uf hdp-w-80">
            <div class="hdp-uf hdp-uf-vc psc-font-1">
              登录名称
            </div>
            <div class="hdp-uf hdp-w-60" style="margin-left:15px">
              <el-input v-model="inputlogin" size="small " placeholder="请输入登录名"></el-input>
            </div>
          </div>
        </div>
        <div class="hdp-uf" style="margin-top:15px">
          <div class="hdp-uf hdp-w-80">
            <div class="hdp-uf hdp-uf-vc psc-font-1">
              登录密码
            </div>
            <div class="hdp-uf hdp-w-60" style="margin-left:15px">
              <el-input v-model="inputpswd" type="password" size="small " placeholder="请输入密码"></el-input>
            </div>
          </div>
        </div>
        <div class="hdp-uf" style="margin:15px 0 8px 0">
          <div class="hdp-uf hdp-w-80">
            <div class="hdp-uf hdp-uf-vc psc-font-1">
              人员姓名
            </div>
            <div class="hdp-uf hdp-w-60" style="margin-left:15px">
              <el-input v-model="input" size="small " placeholder="请输入姓名"></el-input>
            </div>
          </div>
        </div>
        <!-- <div v-if="DepType===0" class="hdp-uf" style="margin-top:15px">
          <div class="hdp-uf hdp-w-50">
            <div class="hdp-uf hdp-uf-vc psc-font-1">
              人员身份
            </div>
            <div class="hdp-uf" style="margin-left:15px">
              <el-radio fill="FF6D18" size="mini" text-color="FF6D18" v-model="radio" @change="diningpershow" label='0'>企业人员</el-radio>
              <el-radio fill="FF6D18" size="medium" text-color="FF6D18" v-model="radio" @change="diningpershow" label='1'>临时人员</el-radio>
            </div>
          </div>
        </div> -->
        <!-- <div class="hdp-uf" style="margin-top:15px">
          <div class="hdp-uf hdp-w-50">
            <div class="hdp-uf hdp-uf-vc psc-font-1">
              免费就餐
            </div>
            <div class="hdp-uf" style="margin-left:15px">
              <el-radio fill="FF6D18" size="medium" text-color="FF6D18" v-model="radio4" label='1' >是</el-radio>
              <el-radio fill="FF6D18" size="mini" text-color="FF6D18" v-model="radio4" label='0' >否</el-radio>
            </div>
          </div>
        </div> v-if="diningpermission"-->
        <!-- <div v-if="radio==='1'" class="hdp-uf" style="margin:23px 0 0px;">
          <div class="hdp-uf hdp-w-50">
            <div class="hdp-uf hdp-uf-vc psc-font-1">
              常驻人员
            </div>
            <div class="hdp-uf" style="margin-left:15px">
              <el-radio fill="FF6D18" size="mini" text-color="FF6D18" v-model="radio5" label="0">否&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-radio>
              <el-radio fill="FF6D18" size="medium" text-color="FF6D18" v-model="radio5" label="1">是</el-radio>
            </div>
          </div>
        </div> -->
        <!-- <div class="hdp-uf" style="margin:23px 0 8px;">
          <div class="hdp-uf hdp-w-50">
            <div class="hdp-uf hdp-uf-vc psc-font-1">
              就餐权限
            </div>
            <div class="hdp-uf" style="margin-left:15px">
              <el-radio fill="FF6D18" size="mini" text-color="FF6D18" v-model="radio2" label="0">未授权&nbsp;&nbsp;&nbsp;&nbsp;</el-radio>
              <el-radio fill="FF6D18" size="medium" text-color="FF6D18" v-model="radio2" label="1">已授权</el-radio>
            </div>
          </div>
        </div> -->
        <div v-if="radio==='0'" class="hdp-uf" style="margin-top:15px">
          <div class="hdp-uf hdp-w-80">
            <div class="hdp-uf hdp-uf-vc psc-font-1">
              员工编码
            </div>
            <div class="hdp-uf hdp-w-60" style="margin-left:15px">
              <el-input v-model="inputUserNumber" size="small" maxlength="11" placeholder="请输入员工编码"></el-input>
            </div>
          </div>
        </div>
        <div v-if="radio==='0'" class="hdp-uf" style="margin-top:10px">
          <div class="hdp-uf hdp-w-80">
            <div class="hdp-uf hdp-uf-vc psc-font-1">
              角色选择
            </div>
            <div class="hdp-uf hdp-w-60" style="margin-left:15px">
              <el-select @change="roleNameChange" v-model="RoleID" size="small" placeholder="请选择" style="width:100%;">
                <el-option v-for="item in rolelist" :key="item.ID" :label="item.RoleName" :value="item.ID">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div v-if="radio==='0'" class="hdp-uf" style="margin-top:10px">
          <div class="hdp-uf hdp-w-80">
            <div class="hdp-uf hdp-uf-vc psc-font-1">
              部门选择
            </div>
            <div class="hdp-uf hdp-w-60" style="margin-left:15px">
              <el-cascader expand-trigger="hover" :options="cascader" :props="optionProps" change-on-select v-model="selectedOptions" size="small" @change="handleChange" style="width:100%;">
              </el-cascader>
            </div>
          </div>
        </div>
        <div class="hdp-uf" style="margin-top:15px">
          <div class="hdp-uf hdp-w-80">
            <div class="hdp-uf hdp-uf-vc psc-font-1">
              联系电话
            </div>
            <div class="hdp-uf hdp-w-60" style="margin-left:15px">
              <el-input v-model="inputNumb" size="small" maxlength="11" placeholder="请输入员工手机号"></el-input>
            </div>
          </div>
        </div>
        <div class="hdp-uf" style="margin:23px 0 0px;">
          <div class="hdp-uf hdp-w-50">
            <div class="hdp-uf hdp-uf-vc psc-font-1" style="width:60px">
              用车上报
            </div>
            <div class="hdp-uf" style="margin-left:15px">
              <el-checkbox-group v-model="checkList" style="width:350px">
                <el-checkbox label="1">凝析油</el-checkbox>
                <el-checkbox label="2">气田水</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
        <div class="hdp-uf" style="margin:23px 0 0px;">
          <div class="hdp-uf hdp-w-50">
            <div class="hdp-uf hdp-uf-vc psc-font-1">
              卸载点限定
            </div>
            <div class="hdp-uf" style="margin-left:15px">
              <el-radio fill="FF6D18" size="mini" text-color="FF6D18" v-model="radioShipWaterAdjust" label="1">是&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-radio>
              <el-radio fill="FF6D18" size="medium" text-color="FF6D18" v-model="radioShipWaterAdjust" label="0">否</el-radio>
            </div>
          </div>
        </div>
        <div v-if="typeVal === '0'" class="hdp-uf" style="margin-top:15px">
          <div class="hdp-uf hdp-w-70">
            <div class="hdp-uf hdp-uf-vc psc-font-1" style="width:60px">
              帐号状态
            </div>
            <div class="hdp-uf" style="margin-left:15px">
              <el-radio-group v-model="radio3">
                <el-radio class="hdp-uf" :label="1">可用&nbsp;&nbsp;&nbsp;&nbsp;</el-radio>
                <el-radio class="hdp-uf" :label="2">不可用</el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>
        <div class="hdp-uf hdp-w-90" style="margin-top:10px">
          <div class="hdp-uf hdp-uf-hfe" style="width:60%">
            <el-button @click="menbersupdate()" type="primary" size="small ">确定</el-button>
            <!-- <el-button type="primaryAll" size="small ">批量导入</el-button> -->
          </div>
        </div>
      </div>
    </div>
  </div>

</div>
</template>
<script>
import commonFunc from '../../api/common/common.js'
import membersAddApi from '../../api/membersAdd.js'
export default {
  data() {
    return {
      currentMenuLeadListsData: [{
        'name': '用户编辑',
        'url': '/#/systemManagement/membersAdd'
      }],
      title: {
        firstTitle: '用户编辑'
      },
      DepType: JSON.parse(localStorage.getItem('userDataInfo')).DepType,
      RoleID: '',
      rolelist: JSON.parse(localStorage.getItem('rolelist')) || [],
      cascader: JSON.parse(localStorage.getItem('departmentcascader')) || [],
      optionProps: {
        value: 'ID', // value="ParentID"
        label: 'DepartmentName',
        children: 'SubDeps'
      },
      DepartmentID: '',
      departmentArr: JSON.parse(localStorage.getItem('departmentArr')) || [],
      DepartmentLev: '',
      selectedOptions: [],
      radio: '0',
      diningpermission: 0,
      radio2: '0',
      radio3: 1,
      radio4: '0',
      radio5: '0',
      CarInputRight: 0,
      radioShipWaterAdjust: '0',
      checkList: [1, 2],
      inputlogin: '',
      inputpswd: '',
      input: '',
      inputUserNumber: '',
      inputNumb: '',
      menbersItem: '',
      typeVal: this.$route.query.typeVal,
      pagination: ''
    }
  },
  mounted() { // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
    this.$commonFunc.myConsole('mounted ======> members')
    document.title = this.title.firstTitle
    this.init()
  },
  methods: {
    init() {
      this.$commonFunc.myConsole('渲染完成后 ===> 开始默认加载相应的逻辑')
      this.$store.dispatch('menuLeadLists/setMenuLeadListsData', this.currentMenuLeadListsData)
      this.$commonFunc.myConsole(this.$route.query)
      this.pagination = this.$route.query.pagination
      this.currentMenuLeadListsData.unshift(JSON.parse(this.$route.query.currentMenuLeadListsData)[1])
      this.currentMenuLeadListsData.unshift(JSON.parse(this.$route.query.currentMenuLeadListsData)[0])
      this.$commonFunc.myConsole(this.currentMenuLeadListsData)
      if (this.typeVal === '0') {
        this.menbersItem = JSON.parse(this.$route.query.menbersItem)
        if (this.menbersItem.IdentityType === 0) {
          let departmentPro = this.departmentArr[this.departmentArr.findIndex(item => item.ID === this.menbersItem.DepartmentID)]
          this.selectedOptions = departmentPro.selectedOptions
          this.DepartmentLev = departmentPro.Level
          this.selectedOptions.push(this.menbersItem.DepartmentID)
        }

        this.radio = this.menbersItem.IdentityType + ''
        this.diningpermission = this.radio === '1' ? 0 : 1
        this.radio2 = this.menbersItem.NoApply + ''
        this.radio3 = this.menbersItem.IsEnabled
        this.radio4 = this.menbersItem.IsFreeMeal + ''
        this.radio5 = this.menbersItem.IsLongTerm + ''
        this.CarInputRight = this.menbersItem.CarInputRight
        if (this.CarInputRight === 0) {
          this.checkList = ['1', '2']
        } else if (this.CarInputRight === 2) {
          this.checkList = ['2']
        } else if (this.CarInputRight === 1) {
          this.checkList = ['1']
        }
        this.radioShipWaterAdjust = this.menbersItem.ShipWaterAdjust + ''
        this.inputlogin = this.menbersItem.LoginName
        // this.inputpswd = this.menbersItem.Password
        this.input = this.menbersItem.NickName
        this.inputUserNumber = this.menbersItem.UserNumber
        this.inputNumb = this.menbersItem.Phone
        if (!commonFunc.isDefine(this.rolelist.find(element => element.RoleID === this.menbersItem.RoleID))) {
          this.RoleID = this.menbersItem.RoleID === 0 ? '' : this.menbersItem.RoleID
        }
        this.DepartmentID = this.menbersItem.DepartmentID
      }
    },
    diningpershow(value) {
      this.diningpermission = this.radio === '1' ? 0 : 1
      if (this.radio === '1') {
        this.radio2 = '0'
      } else {
        this.RoleID = this.RoleID === 0 ? '' : this.RoleID
      }
    },
    handleChange(value) {
      let len = value.length
      this.DepartmentID = value[len - 1]
    },
    roleNameChange(value) {
      commonFunc.myConsole(value)
    },
    async menbersupdate() {
      if (!this.inputlogin) {
        this.$message.error('请输入登录名')
        return
      }
      if (!this.menbersItem.ID && !this.inputpswd) {
        this.$message.error('请输入登录密码')
        return
      }
      if (!this.input) {
        this.$message.error('请输入姓名')
        return
      }
      if (this.radio === '0') {
        if (!this.DepartmentID) {
          this.$message.error('请选择部门')
          return
        }
        this.DepartmentLev = this.departmentArr[this.departmentArr.findIndex(item => item.ID === this.DepartmentID)].Level
        // if (!this.inputUserNumber) {
        //   this.$message.error('请输入员工编码')
        //   return
        // }
        // if (!this.RoleID) {
        //   this.$message.error('请选择角色')
        //   return
        // }
      } else {
        this.DepartmentID = '0'
        this.DepartmentLev = ''
        this.RoleID = ''
        this.inputUserNumber = ''
      }
      if (!this.radioShipWaterAdjust) {
        this.$message.error('请选择是否负责卸载点')
        return
      }
      // if (this.checkList.length === 0) {
      //   this.$message.warning('请选择用车类型')
      //   return
      // }
      if (this.checkList.length === 1 && this.checkList[0] === '1') {
        this.CarInputRight = 1
      } else if (this.checkList.length === 1 && this.checkList[0] === '2') {
        this.CarInputRight = 2
      } else if (this.checkList.length === 2) {
        this.CarInputRight = 0
      }
      let conditionsParams = {
        'DepartmentID': this.DepartmentID,
        'DepartmentLev': this.DepartmentLev,
        'ID': this.menbersItem.ID || 0,
        'IdentityType': '0',
        'LoginName': this.inputlogin,
        'NickName': this.input,
        'Phone': this.inputNumb,
        'Password': this.inputpswd,
        'UserNumber': this.inputUserNumber,
        'IsLongTerm': this.radio5 === '1' ? 1 : 0,
        'CarInputRight': this.CarInputRight,
        'ShipWaterAdjust': this.radioShipWaterAdjust === '1' ? 1 : 0,
        'RoleID': this.RoleID || 0,
        'IsEnabled': this.radio3,
        'IsFreeMeal': this.radio4 === '1' ? 1 : 0,
        'NoApply': '1' // 是否需要申请就餐，功能显示已经隐藏，字段暂时保留
      }
      commonFunc.myConsole(conditionsParams)
      // this.$store.dispatch('membersAddApi/updateManager', conditionsParams)
      let resData = await membersAddApi.updateManager(conditionsParams)
      if (resData.status === '000') {
        this.$message({
          type: 'success',
          message: '提交成功!'
        })
        let that = this
        setTimeout(function() {
          that.$router.push({
            name: 'members',
            query: {
              pagination: that.pagination,
              upmenbersItem: JSON.stringify(resData.data.record)
            }
          })
        }, 1000)
      } else if (resData.status === '4001') {
        this.$message.error('该用户已存在')
      } else {
        this.$message.error('提交失败')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-radio__input.is-checked .el-radio__inner {
    border-color: #FF6D18;
    background: #FF6D18;
}
.el-radio__input.is-checked+.el-radio__label {
    color: #FF6D18;
}
</style>
