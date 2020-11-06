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
      <el-dialog :close-on-click-modal="false" title="编辑" :visible.sync="locationFormDialogVisible" v-if="locationFormDialogVisible" width="500px">
        <div class="dialog-content">
          <el-form ref="locationForm" :model="locationForm"  label-width="150px">
            <el-form-item label="故障位置" prop="locationName" size="small" style="width:343px">
              <el-input type="text" v-model="locationForm.locationName"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="locationFormDialogVisible = false" type="primarydel">取 消</el-button>
          <el-button size="small" @click="editinfo()" type="primary">确 定</el-button>
        </span>
      </el-dialog>
      <div class="hdp-uf hdp-w-100" style="margin-top:10px">
        <el-table :data="locationlist" stripe border>
          <el-table-column prop="LocationName" label="名称" width="200">
          </el-table-column>
          <el-table-column label="编辑时间" width="200">
            <template slot-scope="scope">
              <span>{{scope.row.EditTime.substr(0,10)}}  {{scope.row.EditTime.substr(11,5)}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click.native.prevent="updateRow(scope.$index, locationlist)" type="primarydel" size="small">
                编辑
              </el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, locationlist)" type="primarydel" size="small">
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
import locationApi from '../../api/location.js'
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
      locationFormDialogVisible: false,
      locationForm: {
        ID: 0,
        locationName: ''
      },
      locationTypevalue: '0',
      locationlist: []
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
      this.getlocation()
    },
    async getlocation() {
      let conditionsParams = {
        // 'PageNo': this.pagination.currentPage,
        // 'PageSize': this.pagination.pagesize
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await locationApi.getalllocationlist(conditionsParams)
      if (resData.status === '000') {
        this.locationlist = resData.data.record
        localStorage.setItem('locationlist', JSON.stringify(resData.data.record))
        // this.pagination.totalNum = resData.data.totalNum
      } else {
        this.$message.error('获取失败！')
      }
    },
    deleteRow(index, resMembersDataArr) {
      this.$confirm('是否确认删除该签认人信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.locationdel(index, resMembersDataArr)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async locationdel(index, resMembersDataArr) {
      let conditionsParams = {
        'ArrayID': [resMembersDataArr[index].ID]
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await locationApi.locationdel(conditionsParams)
      if (resData.status === '000') {
        this.locationlist.splice(index, 1)
        this.getlocation()
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
      this.locationFormDialogVisible = true
      commonFunc.myConsole(index)
      commonFunc.myConsole(resMembersDataArr[index])
      if (index === '') {
        this.locationForm.locationName = ''
        this.locationForm.ID = 0
      } else {
        this.locationForm.ID = resMembersDataArr[index].ID
        this.locationForm.locationName = resMembersDataArr[index].LocationName
      }
    },
    async editinfo() {
      if (!this.locationForm.locationName) {
        this.$message.warning('请输入故障位置')
        return
      }
      let conditionsParams = {
        'ID': this.locationForm.ID,
        'LocationName': this.locationForm.locationName
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await locationApi.location_edit(conditionsParams)
      if (resData.status === '000') {
        this.locationFormDialogVisible = false
        this.getlocation()
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
      } else {
        this.$message.error('保存失败！')
      }
    },
    locationFormselect(value) {
      this.locationForm.Type = value + ''
    }
    // ,
    // handleSizeChange(val) {
    //   this.pagination.pagesize = val
    //   this.pagination.currentPage = 1
    //   this.getlocation()
    // },
    // handleCurrentChange(val) {
    //   this.pagination.currentPage = val
    //   this.getlocation()
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
