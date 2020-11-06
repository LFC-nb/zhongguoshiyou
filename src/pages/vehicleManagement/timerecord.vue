timerecord<template>
<div class="hdp-uf hdp-uf-dc main-container hdp-w-100">
  <div class="hdp-uf hdp-uf-dc hdp-w-100">
    <!-- <div class="hdp-uf hdp-uf-hsb menu-title hdp-w-100" style="background:#FFFFFF;padding:10px 10px 20px 20px">
      <div class="hdp-uf hdp-w-100 hdp-uf-dc">
        <div class="hdp-uf" style="margin-top:10px">
          <div class="hdp-uf">
            <div class="hdp-uf hdp-uf-vc psc-font-1">
              井站
            </div>
            <div class="hdp-uf" style="margin-left:15px">
              <template>
                <el-select v-model="tranStationvalue" size="small" @change="tranStationchange" placeholder="请选择">
                  <el-option
                    v-for="item in tranStationlist"
                    :key="item.DepartmentId"
                    :label="item.DepartmentName"
                    :value="item.DepartmentId">
                  </el-option>
                </el-select>
              </template>
            </div>
            <div class="hdp-uf" style="margin-left:15px">
            </div>
            <div class="hdp-uf hdp-uf-vc psc-font-1">
              卸载地
            </div>
            <div class="hdp-uf" style="margin-left:15px">
              <template>
                <el-select v-model="shipplacevalue" size="small" @change="shipplacechange" placeholder="请选择">
                  <el-option
                    v-for="item in shipplacelist"
                    :key="item.ID"
                    :label="item.Place"
                    :value="item.ID">
                  </el-option>
                </el-select>
              </template>
            </div>
          </div>
          <div class="hdp-uf hdp-w-10" style="margin-left:15px">
            <el-button @click="alltimerecords" size="small" type="primary">全部显示</el-button>
          </div>
        </div>
      </div>
    </div> -->
    <div class="hdp-uf hdp-w-100 hdp-uf-dc" style="background:#FFFFFF;padding: 10px 10px 20px 20px;">
      <div class="hdp-uf hdp-w-100">
        <div class="hdp-uf hdp-w-10 psc-font-3">
          <el-button @click="updateRow('', [])" type="primary" size="small">新增</el-button>
        </div>
      </div>
      <el-dialog :close-on-click-modal="false" title="编辑" :visible.sync="timerecordFormDialogVisible" v-if="timerecordFormDialogVisible" width="500px">
        <div class="dialog-content">
          <el-form ref="timerecordForm" :model="timerecordForm"  label-width="150px">
            <el-form-item label="井站" prop="DepartmentId" style="width: 400px">
              <el-select v-model="timerecordForm.DepartmentId" size="small" placeholder="请选择">
                <el-option
                  v-for="item in tranStationlist"
                  :key="item.DepartmentId"
                  :label="item.DepartmentName"
                  :value="item.DepartmentId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="卸载地" prop="ShipPlaceId" style="width: 400px">
              <el-select v-model="timerecordForm.ShipPlaceId" size="small" placeholder="请选择">
                <el-option
                  v-for="item in shipplacelist"
                  :key="item.ID"
                  :label="item.Place"
                  :value="item.ID">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间(分钟)" prop="AverageTime" size="small" style="width:343px">
              <el-input type="number"  maxLength='5' v-model="timerecordForm.AverageTime" @mousewheel.native.prevent></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="timerecordFormDialogVisible = false" type="primarydel">取 消</el-button>
          <el-button size="small" @click="editinfo()" type="primary">确 定</el-button>
        </span>
      </el-dialog>
      <div class="hdp-uf hdp-w-100" style="margin-top:10px">
        <el-table :data="timerecordlist" stripe border>
          <el-table-column prop="DepartmentName" label="井站" width="200">
          </el-table-column>
          <el-table-column prop="Place" label="卸载地名称" width="200">
          </el-table-column>
          <el-table-column prop="AverageTime" label="在途时间（分钟）" width="200">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click.native.prevent="updateRow(scope.$index, timerecordlist)" type="primarydel" size="small">
                编辑
              </el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, timerecordlist)" type="primarydel" size="small">
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
import timerecordApi from '../../api/timerecord.js'
import shipplaceApi from '../../api/shipplace.js'
import tranStationApi from '../../api/tranStation.js'
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
      timerecordFormDialogVisible: false,
      timerecordForm: {
        'DepartmentId': '',
        'ShipPlaceId': '',
        'AverageTime': ''
      },
      timerecordTypevalue: '0',
      timerecordlist: [],
      shipplacelist: [],
      shipplacevalue: '',
      tranStationlist: [],
      tranStationvalue: ''
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
      this.gettimerecords()
      this.getshipplaces()
      this.getTranStationlist()
    },
    tranStationchange() {
      // commonFunc.myConsole(this.tranStationvalue)
      this.timeRecordget()
    },
    shipplacechange() {
      // commonFunc.myConsole(this.shipplacevalue)
      this.timeRecordget()
    },
    alltimerecords() {
      this.tranStationvalue = ''
      this.shipplacevalue = ''
      this.gettimerecords()
    },
    async gettimerecords() {
      let conditionsParams = {
        // 'PageNo': this.pagination.currentPage,
        // 'PageSize': this.pagination.pagesize
      }
      let resData = await timerecordApi.getalltimerecordlist(conditionsParams)
      if (resData.status === '000') {
        this.timerecordlist = resData.data.record
        localStorage.setItem('timerecordlist', JSON.stringify(resData.data.record))
        // this.pagination.totalNum = resData.data.totalNum
      } else {
        this.$message.error('获取失败！')
      }
    },
    async timeRecordget() {
      if (!commonFunc.isDefine(this.tranStationvalue)) {
        return
      }
      if (!commonFunc.isDefine(this.shipplacevalue)) {
        return
      }
      let conditionsParams = {
        'DepartmentId': this.tranStationvalue,
        'ShipPlaceId': this.shipplacevalue
      }
      let resData = await timerecordApi.TimeRecord_get(conditionsParams)
      if (resData.status === '000') {
        this.timerecordlist = resData.data.record
        // this.pagination.totalNum = resData.data.totalNum
      } else {
        this.$message.error('获取失败！')
      }
    },
    async getshipplaces() {
      let conditionsParams = {
        // 'PageNo': this.pagination.currentPage,
        // 'PageSize': this.pagination.pagesize
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await shipplaceApi.getallshipplacelist(conditionsParams)
      if (resData.status === '000') {
        this.shipplacelist = resData.data.record
      } else {
        this.$message.error('获取失败！')
      }
    },
    async getTranStationlist() {
      let conditionsParams = {}
      commonFunc.myConsole(conditionsParams)
      let resData = await tranStationApi.getTranStation_list(conditionsParams)
      if (resData.status === '000') {
        this.tranStationlist = resData.data.record
      } else {
        this.$message.error('获取失败！')
      }
    },
    deleteRow(index, resMembersDataArr) {
      this.$confirm('是否确认删除该在途时间信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.timerecorddel(index, resMembersDataArr)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async timerecorddel(index, resMembersDataArr) {
      let conditionsParams = {
        'ArrayID': [resMembersDataArr[index].ID]
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await timerecordApi.timerecorddel(conditionsParams)
      if (resData.status === '000') {
        this.timerecordlist.splice(index, 1)
        // this.gettimerecords()
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
      this.timerecordFormDialogVisible = true
      if (index === '') {
        this.timerecordForm.DepartmentId = ''
        this.timerecordForm.ShipPlaceId = ''
        this.timerecordForm.AverageTime = ''
      } else {
        this.timerecordForm.DepartmentId = resMembersDataArr[index].DepartmentId
        this.timerecordForm.ShipPlaceId = resMembersDataArr[index].ShipPlaceId
        this.timerecordForm.AverageTime = resMembersDataArr[index].AverageTime
      }
    },
    async editinfo() {
      if (!this.timerecordForm.DepartmentId) {
        this.$message.warning('请选择井站')
        return
      }
      if (!this.timerecordForm.ShipPlaceId) {
        this.$message.warning('请选择卸载地')
        return
      }
      if (!this.timerecordForm.AverageTime) {
        this.$message.warning('请输入在途时间')
        return
      }
      let conditionsParams = {
        'DepartmentId': parseInt(this.timerecordForm.DepartmentId),
        'ShipPlaceId': parseInt(this.timerecordForm.ShipPlaceId),
        'AverageTime': parseInt(this.timerecordForm.AverageTime)
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await timerecordApi.timerecord_edit(conditionsParams)
      if (resData.status === '000') {
        this.timerecordFormDialogVisible = false
        this.gettimerecords()
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
      } else {
        this.$message.error('保存失败！')
      }
    }
    // ,
    // handleSizeChange(val) {
    //   this.pagination.pagesize = val
    //   this.pagination.currentPage = 1
    //   this.gettimerecords()
    // },
    // handleCurrentChange(val) {
    //   this.pagination.currentPage = val
    //   this.gettimerecords()
    // }
  }
}
</script>
<style lang="scss">
// 处理input type = number的上下箭头
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
 -webkit-appearance: none;
}
input[type="number"]{
 -moz-appearance: textfield;
}
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
