<template>
<div class="hdp-uf main-container hdp-w-100">
  <div class="hdp-uf hdp-uf-dc hdp-w-100">
    <div class="hdp-uf hdp-uf-hsb menu-title hdp-w-100">
      <div class="hdp-uf hdp-uf-dc" style="width:100%;background:#FFFFFF;padding:10px">
        <div class="hdp-uf" style="margin-top:15px">
          <div class="hdp-uf">
            <div class="hdp-uf hdp-uf-vc psc-font-1">
              部门名称
            </div>
            <div class="hdp-uf" style="margin-left:15px;">
              <el-input @change="departmentNameChange" v-model="departmentkey" size="small" placeholder="请输入正确的部门名称"></el-input>
            </div>
          </div>
          <div class="hdp-uf" style="margin-left:15px;">
            <el-button @click="searchDepartment()" type="primary" size="small ">查询</el-button>
          </div>
          <div class="hdp-uf" style="margin-left:15px;">
            <el-button @click="departmentAdd()" type="primary" size="small ">新增部门</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="hdp-uf hdp-w-100 hdp-uf-dc" style="background:#FFFFFF;margin-top:20px;padding:10px">
      <div class="hdp-uf hdp-w-80" style="margin-top:10px">
        <el-table :data="departmentlist" stripe border>
          <el-table-column prop="DepartmentName" label="当前部门" width="200">
          </el-table-column>
          <el-table-column prop="ParentName" label="上级部门" width="300">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click.native.prevent="updateRow(scope.$index, departmentlist)" type="primarydel" size="small">
                编辑
              </el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, departmentlist)" type="primarydel" size="small">
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
import mockData from '../../api/mockData.js'
import commonFunc from '../../api/common/common.js'
import departmentApi from '../../api/department.js'
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
      departmentkey: '',
      DepName: '',
      departmentlist: []
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
      this.getdepartmentlist()
    },
    async getdepartmentlist() {
      let conditionsParams = {
        'DepName': this.DepName || ''
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await departmentApi.getDepartmentlist(conditionsParams)
      commonFunc.myConsole(resData)
      if (resData.status === '000') {
        this.departmentArr(resData.data.record)
        mockData.cascader = resData.data.record
        localStorage.setItem('departmentcascader', JSON.stringify(mockData.cascader))
      } else {
        // this.$message.error('用户名或密码错误')
      }
    },
    departmentNameChange(value) {
      this.DepName = this.departmentkey
    },
    async departmentArr(children) {
      let that = this
      let item = {}
      let arr2 = []
      let selectedOptions = []
      let ParentName = ''
      let ParentID = ''
      if (!commonFunc.isDefine(children)) {
        this.departmentlist = []
        return
      }
      let fn = function(children) {
        for (let i = 0; i < children.length; i++) {
          // let lastselectedOptions = selectedOptions.concat(selectedOptions)
          item = {
            ID: children[i].ID,
            Level: children[i].Level,
            Type: children[i].Type,
            Line: children[i].Line,
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
      // this.departmentlist = arr2
      commonFunc.myConsole(arr2)
      this.departmentlist = arr2.filter(function(item) {
        // commonFunc.myConsole(item.DepartmentName.indexOf(that.DepName))
        return (item.DepartmentName.indexOf(that.DepName) > -1)
      })
      localStorage.setItem('departmentArr', JSON.stringify(arr2))
    },
    departmentAdd() {
      this.updateRow(0, [])
    },
    updateRow(index, rows) {
      this.$router.push({
        name: 'departmentedit',
        query: {
          selectedOptions: rows[index],
          currentMenuLeadListsData: JSON.stringify(this.currentMenuLeadListsData)
        }
      })
    },
    searchDepartment() {
      if (!this.departmentkey) {
        this.$message.error('请输入部门名称')
        return
      }
      this.getdepartmentlist()
    },
    deleteRow(index, rows) {
      let ArrayID = []
      ArrayID.push(this.departmentlist[index].ID)
      this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.department_del(ArrayID)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async department_del(ArrayID) {
      let conditionsParams = {
        'ArrayID': ArrayID
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await departmentApi.departmentdel(conditionsParams)
      if (resData.status === '000') {
        // rows.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getdepartmentlist()
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
