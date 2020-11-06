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
        <div class="hdp-uf">
          <!-- <template>
            <el-select v-model="diverTypevalue" size="small" @change="selectchange" placeholder="请选择">
              <el-option key="0" label="全部" value="0"></el-option>
              <el-option key="1" label="凝析油" value="1"></el-option>
              <el-option key="2" label="气田水" value="2"></el-option>
            </el-select>
          </template> -->
          <template>
            <el-tabs v-model="diverTypevalue"  @tab-click="selectchange">
              <el-tab-pane label="凝析油" name="1"></el-tab-pane>
              <el-tab-pane label="气田水" name="2"></el-tab-pane>
            </el-tabs>
          </template>
        </div>
        <div class="hdp-uf hdp-w-10 psc-font-3" style="margin-left:45px;margin-top:6px">
          <el-button @click="updateRow('', [])" type="primary" size="small" style="height:28px;line-height: 10px">新增</el-button>
        </div>
      </div>
      <el-dialog :close-on-click-modal="false" title="编辑" :visible.sync="driverFormDialogVisible" v-if="driverFormDialogVisible" width="500px">
        <div class="dialog-content">
          <el-form ref="driverForm" :model="driverForm"  label-width="150px">
            <el-form-item label="姓名" prop="DriverName" size="small" style="width: 343px">
              <el-input type="text" v-model="driverForm.DriverName"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="Type" style="width: 400px">
              <el-select v-model="driverForm.Type" size="small" @change="driverFormselect" placeholder="请选择">
                <el-option key="1" label="凝析油" value="1"></el-option>
                <el-option key="2" label="气田水" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="driverFormDialogVisible = false" type="primarydel">取 消</el-button>
          <el-button size="small" @click="editinfo()" type="primary">确 定</el-button>
        </span>
      </el-dialog>
      <div class="hdp-uf hdp-w-100" style="margin-top:10px">
        <el-table :data="driverlist" stripe border>
          <el-table-column prop="DriverName" label="驾驶员姓名" width="200">
          </el-table-column>
          <el-table-column label="运输类型" width="200">
            <template slot-scope="scope">
              <span v-if="scope.row.Type === 1">凝析油</span>
              <span v-else-if="scope.row.Type === 2">气田水</span>
            </template>
          </el-table-column>
          <el-table-column label="编辑时间" width="200">
            <template slot-scope="scope">
              <span>{{scope.row.EditTime.substr(0,10)}}  {{scope.row.EditTime.substr(11,5)}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click.native.prevent="updateRow(scope.$index, driverlist)" type="primarydel" size="small">
                编辑
              </el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, driverlist)" type="primarydel" size="small">
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
import driversApi from '../../api/drivers.js'
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
      driverFormDialogVisible: false,
      driverForm: {
        ID: 0,
        DriverName: '',
        Type: ''
      },
      diverTypevalue: '1',
      driverlist: []
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
      this.getdrivers(1)
    },
    async getdrivers(Type) {
      let conditionsParams = {
        'Type': parseInt(Type)
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await driversApi.getalldriverslist(conditionsParams)
      if (resData.status === '000') {
        this.driverlist = resData.data.record
      } else {
        this.$message.error('获取失败！')
      }
    },
    async getOildrivers() {
      let conditionsParams = {
        // 'PageNo': this.pagination.currentPage,
        // 'PageSize': this.pagination.pagesize
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await driversApi.getOildriverslist(conditionsParams)
      if (resData.status === '000') {
        this.driverlist = resData.data.record
        // localStorage.setItem('driversOillist', JSON.stringify(resData.data.record))
      } else {
        this.$message.error('获取失败！')
      }
    },
    async getWaterdrivers() {
      let conditionsParams = {
        // 'PageNo': this.pagination.currentPage,
        // 'PageSize': this.pagination.pagesize
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await driversApi.getWaterdriverslist(conditionsParams)
      if (resData.status === '000') {
        this.driverlist = resData.data.record
        localStorage.setItem('driversWaterlist', JSON.stringify(resData.data.record))
      } else {
        this.$message.error('获取失败！')
      }
    },
    deleteRow(index, resMembersDataArr) {
      this.$confirm('是否确认删除该驾驶员信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.Driverdel(index, resMembersDataArr)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async Driverdel(index, resMembersDataArr) {
      let conditionsParams = {
        'ArrayID': [resMembersDataArr[index].ID]
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await driversApi.Driverdel(conditionsParams)
      if (resData.status === '000') {
        this.driverlist.splice(index, 1)
        this.selectchange(this.diverTypevalue)
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
      this.driverFormDialogVisible = true
      if (index === '') {
        this.driverForm.DriverName = ''
        // this.driverForm.Type = ''
        this.driverForm.ID = 0
      } else {
        this.driverForm.ID = resMembersDataArr[index].ID
        this.driverForm.DriverName = resMembersDataArr[index].DriverName
        this.driverForm.Type = resMembersDataArr[index].Type + ''
      }
    },
    async editinfo() {
      if (!this.driverForm.DriverName) {
        this.$message.warning('请输入驾驶员姓名')
        return
      }
      if (!this.driverForm.Type) {
        this.$message.warning('请选择驾驶员类型')
        return
      }
      let conditionsParams = {
        'ID': this.driverForm.ID,
        'DriverName': this.driverForm.DriverName,
        'Type': this.driverForm.Type
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await driversApi.Driver_edit(conditionsParams)
      if (resData.status === '000') {
        this.driverFormDialogVisible = false
        this.selectchange(this.diverTypevalue)
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
      } else {
        this.$message.error('保存失败！')
      }
    },
    selectchange(value) {
      this.driverForm.Type = this.diverTypevalue
      this.getdrivers(this.diverTypevalue)
      // switch (value) {
      //   case '0':
      //     this.driverForm.Type = ''
      //     this.getdrivers()
      //     break
      //   case '1':
      //     this.driverForm.Type = '1'
      //     this.getOildrivers()
      //     break
      //   case '2':
      //     this.driverForm.Type = '2'
      //     this.getWaterdrivers()
      //     break
      //   default:
      //     break
      // }
    },
    driverFormselect(value) {
      this.driverForm.Type = value + ''
    }
    // ,
    // handleSizeChange(val) {
    //   this.pagination.pagesize = val
    //   this.pagination.currentPage = 1
    //   this.selectchange(this.diverTypevalue)
    // },
    // handleCurrentChange(val) {
    //   this.pagination.currentPage = val
    //   this.selectchange(this.diverTypevalue)
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
