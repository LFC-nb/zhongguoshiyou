<template>
<div class="hdp-uf main-container hdp-w-100">
  <div class="hdp-uf hdp-uf-dc hdp-w-100">
    <div class="hdp-uf hdp-uf-hsb menu-title hdp-w-100" style="max-width:1000px">
      <div class="hdp-uf hdp-uf-dc form" style="width:100%;background:#FFFFFF;padding:10px 40px 20px 20px">
        <div class="hdp-uf psc-font-3" style="">
          分类编辑
        </div>
        <div class="hdp-uf" style="margin-top:15px">
          <div class="hdp-uf hdp-w-50">
            <div class="hdp-uf hdp-uf-vc psc-font-1">
              上级分类
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
              分类名称
            </div>
            <div class="hdp-uf" style="margin-left:15px">
              <el-input @change="TypeNameChange" style="width:376px" v-model="input" size="small " placeholder="请输入分类名称"></el-input>
            </div>
          </div>
        </div>
        <div class="hdp-uf" style="margin-top:20px">
          <div class="hdp-uf hdp-uf-hfe" style="width:10%">
            <el-button @click="questionTypeedit()" type="primary" size="small ">保存</el-button>
            <!-- <el-button type="primaryAll" size="small ">批量导入</el-button> -->
          </div>
        </div>
      </div>
    </div>
  </div>

</div>
</template>
<script>
// import mockData from '../../api/mockData.js'
import commonFunc from '../../api/common/common.js'
import questionTypeeditApi from '../../api/questionTypeedit.js'
import questionTypeApi from '../../api/questionType.js'
export default {
  data() {
    return {
      currentMenuLeadListsData: [{
        'name': '分类编辑',
        'url': '/#/systemManagement/questionTypeedit'
      }],
      title: {
        firstTitle: '分类编辑'
      },
      input: '',
      inputNumb: '',
      cascader: [],
      selectedOptions: [], // 修改时  默认选中
      optionProps: {
        value: 'ID', // value="ParentID"
        label: 'TypeName',
        children: 'SubNodes'
      },
      ParentID: 0,
      ID: 0,
      TypeName: ''
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
        this.input = Options.TypeName
        this.TypeName = Options.TypeName
        this.ID = Options.ID
        this.ParentID = Options.ParentID || 0
        this.selectedOptions = Options.selectedOptions
      }
      this.getlevel1cascader()
    },
    getlevel1cascader() {
      let arr = JSON.parse(localStorage.getItem('questionTypecascader')) || []
      let cascaderArr = []
      arr.forEach((item, index, arr) => {
        let opt = {
          'ID': item.ID,
          'ParentId': item.ParentId,
          'Level': item.Level,
          'TypeName': item.TypeName,
          'EditTime': item.EditTime,
          'ManagerId': item.ManagerId,
          'IsDel': item.IsDel
        }
        cascaderArr.push(opt)
      })
      this.cascader = cascaderArr
    },
    handleChange(value) {
      // commonFunc.myConsole(value)
      let len = value.length
      this.ParentID = value[len - 1]
      // commonFunc.myConsole(this.ParentID)
    },
    TypeNameChange(value) {
      this.TypeName = this.input
    },
    async getquestionTypelist() {
      let conditionsParams = {}
      let resData = await questionTypeApi.getquestionTypelist(conditionsParams)
      // this.cascader = resData.data.record
      localStorage.setItem('questionTypecascader', JSON.stringify(resData.data.record))
      this.getlevel1cascader()
    },
    async questionTypeedit() {
      // commonFunc.myConsole(this.input)
      if (!commonFunc.isDefine(this.input)) {
        this.$message.error('请输入分类名称')
        return
      }
      if (this.ID === this.ParentID && this.ID !== 0) {
        this.$message.error('请选择正确的上级分类')
        return
      }
      let conditionsParams = {
        'ID': this.ID,
        'ParentID': this.ParentID || 0,
        'TypeName': this.TypeName
      }
      let resData = await questionTypeeditApi.questionTypeedit(conditionsParams)
      if (resData.status === '000') {
        this.selectedOptions = []
        this.$message.success('保存成功')
        this.getquestionTypelist()
        this.TypeName = ''
        this.input = ''
        this.$router.push({
          name: 'questionType',
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
