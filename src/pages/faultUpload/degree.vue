<template>
<div class="hdp-uf hdp-uf-dc main-container hdp-w-100">
  <div class="hdp-uf hdp-uf-dc hdp-w-100">
    <!-- <div class="hdp-uf hdp-uf-hsb menu-title hdp-w-100" style="background:#FFFFFF;padding:10px 40px 20px 20px">
      <div class="hdp-uf hdp-uf-dc">
        <div class="hdp-uf psc-font-3" style="">
          条件查询
        </div>
        <div class="hdp-uf" style="margin-top:10px">
          <div class="hdp-uf hdp-uf-hfe">
            <div class="hdp-uf hdp-uf-vc psc-font-1">
              输入姓名
            </div>
            <div class="hdp-uf" style="margin-left:15px">
              <el-input v-model="username" size="small" placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div class="hdp-uf hdp-w-10" style="margin-left:15px">
            <el-button @click="searchManeger()" size="small" type="primary">查询</el-button>
          </div>
        </div>
      </div>
    </div> -->
    <div class="hdp-uf hdp-w-100 hdp-uf-dc" style="background:#FFFFFF;padding:10px">
      <div class="hdp-uf hdp-w-90">
        <div class="hdp-uf hdp-w-10 psc-font-3">
          <el-button @click="updateRow('', [])" type="primary" size="small">新增</el-button>
        </div>
      </div>
      <el-dialog :close-on-click-modal="false" title="编辑" :visible.sync="degreeFormDialogVisible" v-if="degreeFormDialogVisible" width="500px">
        <div class="dialog-content">
          <el-form ref="degreeForm" :model="degreeForm"  label-width="150px">
            <el-form-item label="分级名称" prop="DegreeName" size="small" style="width:343px">
              <el-input type="text" v-model="degreeForm.DegreeName"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="degreeFormDialogVisible = false" type="primarydel">取 消</el-button>
          <el-button size="small" @click="editinfo()" type="primary">确 定</el-button>
        </span>
      </el-dialog>
      <div class="hdp-uf hdp-w-100" style="margin-top:10px">
        <el-table :data="degreelist" stripe border>
          <el-table-column prop="DegreeName" label="名称" width="200">
          </el-table-column>
          <el-table-column label="编辑时间" width="200">
            <template slot-scope="scope">
              <span>{{scope.row.EditTime.substr(0,10)}}  {{scope.row.EditTime.substr(11,5)}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click.native.prevent="updateRow(scope.$index, degreelist)" type="primarydel" size="small">
                编辑
              </el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, degreelist)" type="primarydel" size="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <div class="hdp-uf hdp-w-90" style="margin-top:15px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="pagination.pagesizes" :page-size="pagination.pagesize" layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.totalNum">
        </el-pagination>
      </div> -->
    </div>
  </div>
</div>
</template>
<script>
import commonFunc from '../../api/common/common.js'
import degreeApi from '../../api/degree.js'
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
      degreeFormDialogVisible: false,
      degreeForm: {
        ID: 0,
        DegreeName: ''
      },
      degreeTypevalue: '0',
      degreelist: []
      // ,
      // pagination: {
      //   totalNum: 0,
      //   currentPage: 1,
      //   pagesizes: [5, 8, 10, 20],
      //   pagesize: 5
      // }
    }
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
      this.getdegree()
    },
    async getdegree() {
      let conditionsParams = {
        // 'PageNo': this.pagination.currentPage,
        // 'PageSize': this.pagination.pagesize
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await degreeApi.getalldegreelist(conditionsParams)
      if (resData.status === '000') {
        this.degreelist = resData.data.record
        localStorage.setItem('degreelist', JSON.stringify(resData.data.record))
        // this.pagination.totalNum = resData.data.totalNum
      } else {
        this.$message.error('获取失败！')
      }
    },
    deleteRow(index, resMembersDataArr) {
      this.$confirm('是否确认删除该分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.degreedel(index, resMembersDataArr)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async degreedel(index, resMembersDataArr) {
      let conditionsParams = {
        'ArrayID': [resMembersDataArr[index].ID]
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await degreeApi.degreedel(conditionsParams)
      if (resData.status === '000') {
        this.degreelist.splice(index, 1)
        this.getdegree()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      } else {
        this.$message({
          type: 'error',
          message: '删除失败!'
        })
        // this.$message.error('用户名或密码错误')
      }
    },
    updateRow(index, resMembersDataArr) {
      this.degreeFormDialogVisible = true
      if (index === '') {
        this.degreeForm.DegreeName = ''
        this.degreeForm.ID = 0
      } else {
        this.degreeForm.ID = resMembersDataArr[index].ID
        this.degreeForm.DegreeName = resMembersDataArr[index].DegreeName
      }
    },
    async editinfo() {
      if (!this.degreeForm.DegreeName) {
        this.$message.warning('请输入名称')
        return
      }
      let conditionsParams = {
        'ID': this.degreeForm.ID,
        'DegreeName': this.degreeForm.DegreeName
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await degreeApi.degree_edit(conditionsParams)
      if (resData.status === '000') {
        this.degreeFormDialogVisible = false
        this.getdegree()
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
      } else {
        this.$message.error('保存失败！')
      }
    },
    degreeFormselect(value) {
      this.degreeForm.Type = value + ''
    }
    // ,
    // handleSizeChange(val) {
    //   this.pagination.pagesize = val
    //   this.pagination.currentPage = 1
    //   this.getdegree()
    // },
    // handleCurrentChange(val) {
    //   this.pagination.currentPage = val
    //   this.getdegree()
    // }
  }
}
</script>
<style lang="scss">
.el-table td, .el-table th {
    padding: 8px 0;
    min-width: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    text-align: left;
}
.el-pagination__sizes .el-input .el-input__inner:hover {
    border-color: #FF6D18;
}
</style>
