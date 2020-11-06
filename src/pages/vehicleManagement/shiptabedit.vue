<template>
<div class="hdp-uf main-container hdp-w-100">
  <div class="hdp-uf hdp-uf-dc hdp-w-100">
    <div class="hdp-uf hdp-uf-hsb menu-title hdp-w-100" style="max-width:1000px">
      <div class="hdp-uf hdp-uf-dc form" style="width:100%;background:#FFFFFF;padding:10px 40px 20px 20px">
        <div class="hdp-uf psc-font-3" style="">
          部门编辑
        </div>
        <div class="hdp-uf" style="margin-top:15px">
          <div class="hdp-uf hdp-w-50">
            <div class="hdp-uf hdp-uf-vc psc-font-1">
              上级部门
            </div>
            <div class="hdp-uf hdp-w-80" style="margin-left:15px">
              <el-cascader expand-trigger="hover" :options="cascader" :props="optionProps" change-on-select clearable v-model="selectedOptions" size="small" @change="handleChange" style="width:100%;">
              </el-cascader>
            </div>
          </div>
        </div>
        <div class="hdp-uf" style="margin-top:15px">
          <div class="hdp-uf hdp-w-50">
            <div class="hdp-uf hdp-uf-vc psc-font-1">
              新增部门
            </div>
            <div class="hdp-uf" style="margin-left:15px">
              <el-input @change="departmentNameChange" style="width:376px" v-model="input" size="small " placeholder="请输入部门名称"></el-input>
            </div>
          </div>
        </div>
        <div class="hdp-uf" style="margin-top:15px">
          <div class="hdp-uf hdp-w-50">
            <div class="hdp-uf hdp-uf-vc psc-font-1">
              部门属性
            </div>
            <div class="hdp-uf" style="margin-left:15px">
              <el-select v-model="departmentopt" @change="typeChange" size="small" placeholder="请选择">
                <el-option v-for="item in departmentoptlist" :key="item.ID" :label="item.departmentoptName" :value="item.ID">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div v-if="departmentopt === 2" class="hdp-uf" style="margin-top:15px">
          <div class="hdp-uf hdp-w-50">
            <div class="hdp-uf hdp-uf-vc psc-font-1">
              配送路线
            </div>
            <div class="hdp-uf" style="margin-left:15px">
              <el-select v-model="deliveryline" @change="lineChange" size="small" placeholder="请选择">
                <el-option v-for="item in deliverylinelist" :key="item.ID" :label="item.Name" :value="item.ID">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="hdp-uf" style="margin-top:20px">
          <div class="hdp-uf hdp-uf-hfe" style="width:13%">
            <el-button @click="departmentedit()" type="primary" size="small ">保存</el-button>
            <!-- <el-button type="primaryAll" size="small ">批量导入</el-button> -->
          </div>
        </div>
      </div>
    </div>
  </div>

</div>
</template>
<script>
import mockData from '../../api/mockData.js'
import commonFunc from '../../api/common/common.js'
import departmenteditApi from '../../api/departmentedit.js'
import departmentApi from '../../api/department.js'
export default {
  data() {
    return {
      currentMenuLeadListsData: [{
        'name': '部门编辑',
        'url': '/#/systemManagement/departmentedit'
      }],
      title: {
        firstTitle: '部门编辑'
      },
      input: '',
      inputNumb: '',
      departmentopt: '',
      departmentoptlist: [{
        ID: 0,
        departmentoptName: '机关办公室'
      }, {
        ID: 1,
        departmentoptName: '中心站'
      }, {
        ID: 2,
        departmentoptName: '井站'
      }],
      deliveryline: '',
      deliverylinelist: [],
      cascader: JSON.parse(localStorage.getItem('departmentcascader')) || [],
      selectedOptions: [], // 修改时  默认选中
      optionProps: {
        value: 'ID', // value="ParentID"
        label: 'DepartmentName',
        children: 'SubDeps'
      },
      ParentID: 0,
      ID: 0,
      DepartmentName: ''
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
      this.currentMenuLeadListsData.unshift(JSON.parse(this.$route.query.currentMenuLeadListsData)[1])
      this.currentMenuLeadListsData.unshift(JSON.parse(this.$route.query.currentMenuLeadListsData)[0])
      let Options = this.$route.query.selectedOptions
      if (commonFunc.isDefine(Options)) {
        this.input = Options.DepartmentName
        this.DepartmentName = Options.DepartmentName
        this.ID = Options.ID
        this.ParentID = Options.ParentID || 0
        this.selectedOptions = Options.selectedOptions
        this.departmentopt = Options.Type
        this.deliveryline = Options.Line || ''
      }
      this.getdeliveryline()
    },
    handleChange(value) {
      let len = value.length
      this.ParentID = value[len - 1]
      commonFunc.myConsole(this.ParentID)
    },
    departmentNameChange(value) {
      this.DepartmentName = this.input
    },
    typeChange(value) {
      if (value !== 2) {
        this.deliveryline = ''
      }
      // commonFunc.myConsole(value)
    },
    lineChange(value) {
      // commonFunc.myConsole(value)
    },
    async getdepartmentlist() {
      let conditionsParams = {}
      let resData = await departmentApi.getDepartmentlist(conditionsParams)
      this.cascader = resData.data.record
      localStorage.setItem('departmentcascader', JSON.stringify(mockData.cascader))
    },
    async getdeliveryline() {
      let conditionsParams = {}
      let resData = await departmenteditApi.getDeliveryline(conditionsParams)
      this.deliverylinelist = resData.data.record
    },
    async departmentedit() {
      // commonFunc.myConsole(this.input)
      if (!commonFunc.isDefine(this.input)) {
        this.$message.error('请输入部门名称')
        return
      }
      if (!commonFunc.isDefine(this.departmentopt)) {
        this.$message.error('请选择部门属性')
        return
      }
      if (!commonFunc.isDefine(this.deliveryline) && this.departmentopt === 2) {
        this.$message.error('请选择部门配送路线')
        return
      }
      if (this.departmentopt === '') {
        this.departmentopt = 0
      }
      if (this.ID === this.ParentID && this.ID !== 0) {
        this.$message.error('请选择正确的上级部门')
        return
      }
      let conditionsParams = {
        'ID': this.ID,
        'ParentID': this.ParentID || 0,
        'DepartmentName': this.DepartmentName,
        'Type': this.departmentopt || 0,
        'Line': this.deliveryline || 0
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await departmenteditApi.departmentedit(conditionsParams)
      if (resData.status === '000') {
        this.selectedOptions = []
        this.$message.success('保存成功')
        this.getdepartmentlist()
        this.DepartmentName = ''
        this.input = ''
        this.$router.push({
          name: 'department',
          query: ''
        })
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
