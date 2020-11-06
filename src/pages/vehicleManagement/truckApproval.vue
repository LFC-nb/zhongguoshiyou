<template>
<div class="hdp-uf hdp-uf-dc main-container hdp-w-100">
  <div class="hdp-uf hdp-uf-dc hdp-w-100">
    <div class="hdp-uf hdp-w-100 hdp-uf-dc" style="background:#FFFFFF;padding:10px">
      <div class="hdp-uf" style="margin-top:15px;display: inline-block;">
        <div class="hdp-uf" style="width:270px;display: inline;margin-right:15px">
          <template>
            <el-date-picker style="width: 125px;;display: inline-block;"
              v-model="datepickervalue[0]" size="small" @change="datepickerValuechange"
              align="right"
              type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
              placeholder="开始日期">
            </el-date-picker>
            <div class="hdp-uf" style="display: inline-block;">
              <el-col class="line" :span="2" style="text-align: center;width:10px;line-height:16px;">-</el-col>
            </div>
            <el-date-picker style="width: 125px;;display: inline-block;"
              v-model="datepickervalue[1]" size="small" @change="datepickerValuechange"
              align="right"
              type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
              placeholder="结束日期">
            </el-date-picker>
          </template>
        </div>
        <div class="hdp-uf" style="margin:0 15px 5px 0;display: inline-block;">
          <el-cascader expand-trigger="hover" :options="departmentwelllist" :props="departwellcenterProps" v-model="search.selectedwellOptions" @change="getDepartinsearch" change-on-select size="small" placeholder="所属井站" clearable style="width:125px">
          </el-cascader>
        </div>
        <div class="hdp-uf" style="margin:0 15px 5px 0;display: inline-block;">
          <el-select v-model="QueryStatus" size="small" @change="handleClick" placeholder="状态" clearable  style="width:125px">
            <el-option key="1" label="提交" value="1"></el-option>
            <!-- <el-option key="2" label="撤销" value="2"></el-option> -->
            <el-option key="3" label="完成" value="3"></el-option>
          </el-select>
        </div>
        <div class="hdp-uf" style="margin:0 15px 5px 0;display: inline-block;">
          <el-button @click="gettruckApplyconfirm" size="small" type="primarydel">查询</el-button>
        </div>
        <div class="hdp-uf" style="margin:0 15px 5px 0;display: inline-block;">
          <a target="_self" :href='reportfile' class="el-button el-button--primary el-button--small">
            导出excel</a>
        </div>
      </div>
      <el-dialog :close-on-click-modal="false" title="详情" :visible.sync="shipplaceFormDialogVisible" v-if="shipplaceFormDialogVisible" width="800px">
        <div class="dialog-content">
          <el-form ref="shipplaceForm" :inline="true" :model="shipplaceForm"  label-width="150px">
          <el-form-item label="是否备用车" prop="" size="small" style="width:350px">
            <el-radio v-model="Form.IsBackUp" disabled label="1" style="margin-left:10px">是</el-radio>
            <el-radio v-model="Form.IsBackUp" disabled label="0">否</el-radio>
          </el-form-item>
            <el-form-item label="用车机构" prop="DepartmentId" style="width: 350px">
              <el-select v-model="Form.DepartmentId" disabled size="small" @change="getDepartinform" placeholder="请选择">
                <el-option v-for="item in tranStationlist" :key="item.DepartmentId" :label="item.DepartmentName" :value="item.DepartmentId"></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="车辆个数" prop="Num" style="width: 350px">
              <el-input-number v-model="Form.Num" disabled @blur="NumChange" size="small" :min="1" :max="100" label="数量" style="width;100%"></el-input-number>
            </el-form-item> -->
            <el-form-item v-if="CarType === '2'" label="车型" prop="AmountNum" style="width: 350px">
              <el-select v-model="Form.AmountNum" size="small" disabled placeholder="请选择">
                <el-option key="16" label="16方" value="16"></el-option>
                <el-option key="25" label="25方" value="25"></el-option>
                <el-option key="30" label="30方" value="30"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="CarType === '1'" label="车型" prop="AmountNum" style="width: 350px">
              <el-select v-model="Form.AmountNum" size="small" disabled placeholder="请选择">
                <el-option key="7" label="7吨" value="7"></el-option>
                <el-option key="11" label="11吨" value="11"></el-option>
                <el-option key="13" label="13吨" value="13"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用车日期" prop="Date" style="width: 350px">
              <el-date-picker v-model="Form.Date" disabled type="date" size="small" placeholder="选择日期" :picker-options="pickerOptions2" :clearable="false"></el-date-picker>
            </el-form-item>
            <el-form-item v-if="Form.IsBackUp === '0'" label="到站时间" prop="ArrivalTime" style="width: 350px">
              <el-time-picker v-model="Form.ArriveTime" disabled format="HH:mm" size="small" :clearable="false"></el-time-picker>
            </el-form-item>
            <el-form-item label="备注" prop="" size="small" style="width:700px">
              <el-input v-model="Form.Description" disabled type="textarea" :rows="3" placeholder="请输入备注" style="width:540px"></el-input>
            </el-form-item>
            <el-form-item v-if="Form.Status === 2" label="撤销原因" prop="" size="small" style="width:700px">
              <el-input v-model="Form.Remark" :disabled='Form.Status === 2' type="textarea" :rows="3" placeholder="" style="width:540px"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="shipplaceFormDialogVisible = false" type="primarydel">取 消</el-button>
          <el-button v-if="Form.Status === 1" size="small" @click="editinfo(3)" type="primary">确 认</el-button>
        </span>
      </el-dialog>
    </div>
    <div id='Applytab' class="hdp-uf hdp-w-100 hdp-uf-dc" style="background:#FFFFFF;padding: 10px 10px 20px 10px;;margin-top:10px">
      <template>
        <el-tabs v-model="CarType" type="card" @tab-click="tabsClick">
          <el-tab-pane v-if="this.carInputRight === '1' || this.carInputRight === '0'" label="凝析油" name="1"></el-tab-pane>
          <el-tab-pane v-if="this.carInputRight === '2' || this.carInputRight === '0'" label="气田水" name="2"></el-tab-pane>
        </el-tabs>
      </template>
      <el-table :data="truckApplylist" stripe border>
        <el-table-column prop="DepartmentName" label="用车机构" width="200">
        </el-table-column>
        <el-table-column prop="CarType" label="车辆类别" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.CarType === 1">油车</span>
            <span v-else-if="scope.row.CarType === 2">水车</span>
          </template>
        </el-table-column>
        <el-table-column prop="AmountNum" label="车型" width="80">
          <template slot-scope="scope">
            <span v-if="CarType === '2'">{{scope.row.AmountNum}}方</span>
            <span v-if="CarType === '1'">{{scope.row.AmountNum}}吨</span>
          </template>
        </el-table-column>
        <el-table-column prop="Num" label="车辆数" width="80">
          <template slot-scope="scope">
            <span>{{scope.row.ShipNum}} / {{scope.row.Num}}</span>
          </template>
        </el-table-column>
        <el-table-column label="用车日期" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.Date.substr(0,10)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="到站时间" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.ArriveTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="编辑时间" width="150">
          <template slot-scope="scope">
            <span>{{scope.row.AddTime.substr(0,10)}}  {{scope.row.AddTime.substr(11,5)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否为备车" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.IsBackUp === 1">是</span>
            <span v-else-if="scope.row.IsBackUp === 0">否</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.Description}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.Status === 0" >待提交</span>
            <span v-else-if="scope.row.Status === 1" style="color:#409EFF">提交</span>
            <span v-else-if="scope.row.Status === 2" style="color:#f56c6c">撤销</span>
            <span v-else-if="scope.row.Status === 3" style="color:#67c23a">完成</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.Status === 1" @click.native.prevent="updateRow(scope.$index, truckApplylist)" type="primarydel" size="small">
              调派
            </el-button>
            <el-button v-if="scope.row.Status === 3 || scope.row.Status === 2" @click.native.prevent="updateRow(scope.$index, truckApplylist)" type="primarydel" size="small">
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="hdp-uf hdp-w-90" style="margin-top:15px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="pagination.pagesizes" :page-size="pagination.pagesize" layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.totalNum">
      </el-pagination>
    </div>
  </div>
</div>
</template>
<script>
import config from '../../config/config.js'
import commonFunc from '../../api/common/common.js'
import truckapplyApi from '../../api/truckapply.js'
import departmentApi from '../../api/department.js'
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
      datepickervalue: [commonFunc.getnowDate(new Date(), -30), commonFunc.getnowDate(new Date(), 1)], // 时间段选择
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      pickerOptions2: {
        disabledDate(time) {
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
          return time.getTime() < start
        }
      },
      CarType: '1',
      QueryStatus: '',

      filepdf: config.APISERVER.filepdf,
      reportfile: '',

      shipplaceFormDialogVisible: false,
      shipplaceForm: {
        ID: 0,
        radio: '1',
        Type: '',
        Place: ''
      },
      shipplaceTypevalue: '0',

      tranStationlist: [],
      Form: {
        'ID': 0,
        'Status': 0,
        'IsBackUp': '0',
        'Remark': '',
        'Date': new Date(),
        'ArriveTime': '',
        'Num': 1,
        'CarType': '',
        'DepartmentId': '',
        'DepartmentLev': '',
        'DepartmentName': ''
      },
      carInputRight: '0',
      shipplacelist: [],
      search: {
        'TagId': '',
        'Tag_DepartmentId': '',
        'selectedTagsOptions': [],
        'selectedwellOptions': [],
        'DepartmentId': '', // 部门id
        'DepartmentLev': '', // 部门层级
        'DepartmentName': '' // 部门名称
      },
      departmentwelllist: [], // 处理前 接口返回的 的部门 数据结构
      departwellcenterProps: {
        expandTrigger: 'hover',
        value: 'ID', // value="ParentID"
        label: 'DepartmentName',
        children: 'SubDeps'
      },
      departwellcenterlist: [], // 处理后的部门 数据结构
      truckApplylist: [],
      pagination: {
        totalNum: 0,
        currentPage: 1,
        pagesizes: [5, 8, 10, 20],
        pagesize: 10
      }
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

      this.carInputRight = localStorage.getItem('CarInputRight')
      if (this.carInputRight === '2') {
        this.CarType = '2'
      }
      if (this.CarType === '1') {
        this.getTranStationOillist()
        this.getshipOilplaces()
      } else {
        this.getTranStationWaterlist()
        this.getshipWaterplaces()
      }
      this.getDepartment_wkcenter()
      this.gettruckApplyconfirm()
      this.assemblelinks()
    },
    async gettruckApplyconfirm() {
      let conditionsParams = {
        'CarType': this.CarType,
        'QueryStatus': this.QueryStatus,
        'DepartmentLev': this.search.DepartmentLev,
        'StartTime': this.datepickervalue[0] || '', // 开始日期
        'EndTime': this.datepickervalue[1] || '', // 结束日期
        'PageNo': this.pagination.currentPage,
        'PageSize': this.pagination.pagesize
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await truckapplyApi.getApplylistconfirm(conditionsParams)
      if (resData.status === '000') {
        this.truckApplylist = resData.data.record
        this.pagination.totalNum = resData.data.totalNum
      } else {
        this.$message.error('获取失败！')
      }
    },
    tabsClick(tab, event) {
      this.CarType = tab.name
      this.gettruckApplyconfirm()
      this.assemblelinks()
    },
    handleClick() {},
    NumChange(value) {
      this.Form.Num = Math.floor(this.Form.Num)
    },
    deleteRow(index, resMembersDataArr) {
      this.$confirm('是否确认删除该申请信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.CarApplydel(index, resMembersDataArr)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async CarApplydel(index, resMembersDataArr) {
      let conditionsParams = {
        'ArrayID': [resMembersDataArr[index].ID]
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await truckapplyApi.CarApply_del(conditionsParams)
      if (resData.status === '000') {
        this.truckApplylist.splice(index, 1)
        this.gettruckApplyconfirm()
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
    async getTranStationOillist() {
      let conditionsParams = {}
      let resData = await tranStationApi.getTranStation_listOil(conditionsParams)
      if (resData.status === '000') {
        this.tranStationlist = resData.data.record
      } else {
        this.$message.error('获取失败！')
      }
    },
    async getTranStationWaterlist() {
      let conditionsParams = {}
      let resData = await tranStationApi.getTranStation_listWater(conditionsParams)
      if (resData.status === '000') {
        this.tranStationlist = resData.data.record
      } else {
        this.$message.error('获取失败！')
      }
    },
    getDepartinform(value) { // DepartmentLev 等信息组装
      let arr = this.tranStationlist.filter(function(obj) {
        return obj.DepartmentId === value
      })
      if (commonFunc.isDefine(arr)) {
        this.Form.DepartmentLev = arr[0].DepartmentLev
        this.Form.DepartmentName = arr[0].DepartmentName
      } else {
        this.Form.DepartmentLev = ''
        this.Form.DepartmentName = ''
      }
    },
    async getshipWaterplaces() {
      let conditionsParams = {
        // 'PageNo': this.pagination.currentPage,
        // 'PageSize': this.pagination.pagesize
      }
      let resData = await shipplaceApi.getWatershipplacelist(conditionsParams)
      if (resData.status === '000') {
        this.shipplacelist = resData.data.record
      } else {
        this.$message.error('获取失败！')
      }
    },
    async getshipOilplaces() {
      let conditionsParams = {
        // 'PageNo': this.pagination.currentPage,
        // 'PageSize': this.pagination.pagesize
      }
      let resData = await shipplaceApi.getOilshipplacelist(conditionsParams)
      if (resData.status === '000') {
        this.shipplacelist = resData.data.record
      } else {
        this.$message.error('获取失败！')
      }
    },
    updateRow(index, resMembersDataArr) {
      commonFunc.myConsole(resMembersDataArr[index])
      if (this.CarType === '1') {
        this.getTranStationOillist()
        this.getshipOilplaces()
      } else {
        this.getTranStationWaterlist()
        this.getshipWaterplaces()
      }
      this.shipplaceFormDialogVisible = true
      if (index === '') {
        this.Form.ID = 0
        this.Form.DepartmentId = ''
        this.Form.DepartmentLev = ''
        this.Form.DepartmentName = ''
        this.Form.CarType = ''
        this.Form.Date = new Date()
        this.Form.ArriveTime = ''
        this.Form.AmountNum = ''
        this.Form.Description = ''
        this.Form.Num = 1
        this.Form.IsBackUp = '0'
        this.Form.Remark = ''
        this.Form.Status = 0
      } else {
        this.Form.ID = resMembersDataArr[index].ID
        this.Form.DepartmentId = resMembersDataArr[index].DepartmentId
        this.Form.DepartmentLev = resMembersDataArr[index].DepartmentLev
        this.Form.DepartmentName = resMembersDataArr[index].DepartmentName
        this.Form.CarType = resMembersDataArr[index].CarType
        this.Form.Date = resMembersDataArr[index].Date
        this.Form.ArriveTime = resMembersDataArr[index].ArriveTime ? (resMembersDataArr[index].Date.substr(0, 10) + ' ' + resMembersDataArr[index].ArriveTime) : ''
        this.Form.Num = resMembersDataArr[index].Num
        this.Form.AmountNum = resMembersDataArr[index].AmountNum + ''
        this.Form.Description = resMembersDataArr[index].Description
        this.Form.IsBackUp = resMembersDataArr[index].IsBackUp + ''
        this.Form.Remark = resMembersDataArr[index].Remark
        this.Form.Status = resMembersDataArr[index].Status
      }
    },
    async editinfo(Status) {
      // if (!this.Form.DepartmentId) {
      //   this.$message.warning('请选择用车机构')
      //   return
      // }
      // if (!this.Form.ArriveTime) {
      //   this.$message.warning('请选择到站时间')
      //   return
      // }
      let conditionsParams = {
        'ID': this.Form.ID
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await truckapplyApi.CarApply_confirm(conditionsParams)
      if (resData.status === '000') {
        this.shipplaceFormDialogVisible = false
        this.gettruckApplyconfirm()
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
      } else {
        this.$message.error('操作失败！')
      }
    },

    async getDepartment_wkcenter() {
      let conditionsParams = {}
      let resData = await departmentApi.getDepartmentwkcenter(conditionsParams)
      if (resData.status === '000') {
        this.departmentwelllist = resData.data.record
        if (resData.data.record.length > 0) {
          this.departmentwelArr(resData.data.record, 'Well')
        }
      } else {
        this.$message.error('获取失败！')
      }
    },
    getDepartinsearch(value) { // DepartmentLev 等信息组装
      let len = value.length
      if (len > 0) {
        this.search.DepartmentID = value[len - 1]
        this.search.DepartmentLev = this.departwellcenterlist[this.departwellcenterlist.findIndex(item => item.ID === this.search.DepartmentID)].Level
        this.search.DepartmentName = this.departwellcenterlist[this.departwellcenterlist.findIndex(item => item.ID === this.search.DepartmentID)].DepartmentName
      } else {
        this.search.DepartmentID = ''
        this.search.DepartmentLev = ''
        this.search.DepartmentName = ''
      }
    },
    async departmentwelArr(children, key) {
      let item = {}
      let arr2 = []
      let selectedOptions = []
      let ParentName = ''
      let ParentID = ''
      if (!commonFunc.isDefine(children)) {
        if (key === 'Repair') {
          this.departRepaircenterlist = []
        } else if (key === 'Well') {
          this.departwellcenterlist = []
        }
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
      if (key === 'Repair') {
        this.departRepaircenterlist = arr2
      } else if (key === 'Well') {
        this.departwellcenterlist = arr2
      }
    },
    datepickerValuechange() {
      if (!commonFunc.isDefine(this.datepickervalue)) {
        this.datepickervalue = [0, 0]
      }
      // this.gettruckApplyconfirm()
      this.assemblelinks()
    },
    assemblelinks() {
      this.reportfile = this.filepdf + 'ImportExcel.aspx?action=apply&CarType=' + this.CarType + '&QueryStatus=' + this.QueryStatus + '&StartTime=' + this.datepickervalue[0] + '&EndTime=' + this.datepickervalue[1] + '&DepartmentLev=' + this.search.DepartmentLev
    },
    handleSizeChange(val) {
      this.pagination.pagesize = val
      this.pagination.currentPage = 1
      this.gettruckApplyconfirm()
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val
      this.gettruckApplyconfirm()
    }
  }
}
</script>
<style lang="scss">
#Applytab {
  .el-tabs--card>.el-tabs__header {
      border-bottom: 2px solid #FF6D18;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
      border-bottom-color: #FF6D18;
  }
  .el-tabs__item:hover {
      color: #606266;
      cursor: pointer;
  }
  .el-tabs__item:focus {
      color: #FF6D18;
  }
  .el-tabs__item.is-active {
      color: #FFF;
      background-color: #FF6D18;
  }
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
