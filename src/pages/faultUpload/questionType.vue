<template>
<div class="hdp-uf main-container hdp-w-100">
  <div class="hdp-uf hdp-uf-dc hdp-w-100">
    <div class="hdp-uf hdp-uf-hsb menu-title hdp-w-100">
      <div class="hdp-uf hdp-uf-dc" style="width:100%;background:#FFFFFF;padding:10px">
        <div class="hdp-uf" style="">
          <!-- <div class="hdp-uf">
            <div class="hdp-uf hdp-uf-vc psc-font-1">
              分类名称
            </div>
            <div class="hdp-uf" style="margin-left:15px;">
              <el-input @change="TypeNameChange" v-model="questionTypekey" size="small" placeholder="请输入正确的分类名称"></el-input>
            </div>
          </div>
          <div class="hdp-uf" style="margin-left:15px;">
            <el-button @click="searchquestionType()" type="primary" size="small ">查询</el-button>
          </div> -->
          <div class="hdp-uf" style="">
            <el-button @click="questionTypeAdd()" type="primary" size="small ">新增分类</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="hdp-uf hdp-w-100 hdp-uf-dc" style="background:#FFFFFF;padding:10px">
      <div class="hdp-uf hdp-w-80" style="">
        <el-table :data="questionTypelist" stripe border>
          <el-table-column prop="TypeName" label="当前分类" width="200">
          </el-table-column>
          <el-table-column prop="ParentName" label="上级分类" width="300">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click.native.prevent="updateRow(scope.$index, questionTypelist)" type="primarydel" size="small">
                编辑
              </el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, questionTypelist)" type="primarydel" size="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>

</div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
// import mockData from '../../api/mockData.js'
import commonFunc from '../../api/common/common.js'
import questionTypeApi from '../../api/questionType.js'
export default {
  data() {
    return {
      currentMenuLeadListsData: [{
        'name': this.$route.query.name,
        'url': '/#' + this.$route.query.link
      }, {
        'name': this.$route.query.itemname,
        'url': '/#' + this.$route.query.link
      }],
      title: {
        firstTitle: this.$route.query.itemname
      },
      questionTypekey: '',
      DepName: '',
      questionTypelist: []
    }
  },
  computed: {
    ...mapGetters({
      resMembersDataArr: 'members/GET_RES_DATA_ARR'
    })
  },
  mounted() { // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
    this.$commonFunc.myConsole('mounted ======> members')
    document.title = this.title.firstTitle
    this.init()
  },
  methods: {
    async init() {
      this.$commonFunc.myConsole('渲染完成后 ===> 开始默认加载相应的逻辑')
      if (commonFunc.isDefine(this.$route.query.link)) {
        localStorage.setItem('currentMenuLeadListsData', JSON.stringify(this.currentMenuLeadListsData))
      } else {
        this.currentMenuLeadListsData = JSON.parse(localStorage.getItem('currentMenuLeadListsData'))
        this.title.firstTitle = this.currentMenuLeadListsData[this.currentMenuLeadListsData.length - 1].name
        document.title = this.title.firstTitle
      }
      this.$store.dispatch('menuLeadLists/setMenuLeadListsData', this.currentMenuLeadListsData)
      this.getquestionTypelist()
    },
    async getquestionTypelist() {
      let conditionsParams = ''
      let resData = await questionTypeApi.getquestionTypelist(conditionsParams)
      if (resData.status === '000') {
        this.questionTypeArr(resData.data.record)
        localStorage.setItem('questionTypecascader', JSON.stringify(resData.data.record))
      } else {
        // this.$message.error('用户名或密码错误')
      }
    },
    async questionTypeArr(children) {
      // let that = this
      let item = {}
      let arr2 = []
      let selectedOptions = []
      let ParentName = ''
      let ParentID = ''
      if (!commonFunc.isDefine(children)) {
        this.questionTypelist = []
        return
      }
      let fn = function(children) {
        for (let i = 0; i < children.length; i++) {
          // let lastselectedOptions = selectedOptions.concat(selectedOptions)
          item = {
            ID: children[i].ID,
            Level: children[i].Level,
            TypeName: children[i].TypeName,
            ParentID: ParentID,
            ParentName: ParentName,
            selectedOptions: []
          }
          if (selectedOptions) {
            item.selectedOptions = selectedOptions.concat()
          }
          arr2.push(item)
          if (children[i].SubNodes) {
            selectedOptions.push(children[i].ID)
            ParentID = children[i].ID
            ParentName = children[i].TypeName
            fn(children[i].SubNodes)
          } else if (i === children.length - 1) {
            selectedOptions = []
            ParentID = ''
            ParentName = ''
          }
        }
      }
      fn(children)
      this.questionTypelist = arr2
      // this.questionTypelist = arr2.filter(function(item) {
      //   return (item.TypeName.indexOf(that.DepName) > -1)
      // })
      localStorage.setItem('questionTypeArr', JSON.stringify(arr2))
    },
    questionTypeAdd() {
      this.updateRow(0, [])
    },
    updateRow(index, rows) {
      this.$router.push({
        name: 'questionTypeedit',
        query: {
          selectedOptions: rows[index],
          currentMenuLeadListsData: JSON.stringify(this.currentMenuLeadListsData)
        }
      })
    },
    searchquestionType() {
      if (!this.questionTypekey) {
        this.$message.error('请输入部门名称')
        return
      }
      this.getquestionTypelist()
    },
    deleteRow(index, rows) {
      let ArrayID = []
      ArrayID.push(this.questionTypelist[index].ID)
      this.$confirm('此操作将永久删除该分级, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.questionType_del(ArrayID)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async questionType_del(ArrayID) {
      let conditionsParams = {
        'ArrayID': ArrayID
      }
      let resData = await questionTypeApi.questionTypedel(conditionsParams)
      if (resData.status === '000') {
        // rows.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getquestionTypelist()
      } else {
        this.$message({
          type: 'error',
          message: '删除失败!'
        })
        // this.$message.error('用户名或密码错误')
      }
    }
  }
}
</script>
<style lang="scss"></style>
