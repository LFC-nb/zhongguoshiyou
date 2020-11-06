statistics<template>
<div class="hdp-uf hdp-uf-dc main-container hdp-w-100">
  <div class="hdp-uf hdp-uf-dc hdp-w-100">
    <div class="hdp-uf hdp-uf-hsb menu-title hdp-w-100" style="background:#FFFFFF;padding:10px 40px 20px 20px">
      <div class="hdp-uf hdp-w-100 hdp-uf-dc">
        <div class="hdp-uf" style="margin-top:10px">
          <div class="hdp-uf">
            <div class="hdp-uf hdp-w-100">
              <!-- <div class="hdp-uf">
                <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="date" size="small" type="daterange" align="center" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </div> -->
              <template>
                <div class="hdp-uf">
                  <el-date-picker
                    v-model="date[0]" size="small" @change="datepickerValuechange"
                    align="right"
                    type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                    placeholder="开始日期"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                </div>
                <el-col class="line" :span="2" style="text-align: center;width: 1.5rem;line-height:32px">-</el-col>
                <div class="hdp-uf">
                  <el-date-picker
                    v-model="date[1]" size="small" @change="datepickerValuechange"
                    align="right"
                    type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                    placeholder="结束日期"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                </div>
              </template>
            </div>
          </div>
          <!-- <div class="hdp-uf" style="margin-left:15px">
            <el-button @click="getstatisticss" size="small" type="primary">查询</el-button>
          </div> -->
          <div class="hdp-uf" style="margin-left:15px">
            <a target="_self" :href='reportfile' class="el-button el-button--primary el-button--small">
              导出excel</a>
          </div>
        </div>
      </div>
    </div>
    <div id="statab" class="hdp-uf hdp-w-100 hdp-uf-dc" style="background:#FFFFFF;padding: 10px 10px 20px 20px;;margin-top:10px">
      <template>
        <el-tabs v-model="CarType" type="card" @tab-click="handleClick">
          <el-tab-pane label="凝析油" name="1"></el-tab-pane>
          <el-tab-pane label="气田水" name="2"></el-tab-pane>
        </el-tabs>
      </template>
      <div class="hdp-uf hdp-w-80" style="margin-top:10px">
        <el-table :data="tablelist" stripe border>
          <el-table-column prop="DepartmentName" label="井站" width="200">
          </el-table-column>
          <el-table-column prop="Num" label="实到车辆数" width="200">
          </el-table-column>
          <el-table-column v-if="this.CarType === '1'" prop="TotalWeight" label="实收数量(t)" width="200">
          </el-table-column>
          <el-table-column v-else-if="this.CarType === '2'" prop="TotalWeight" label="签单量(方)" width="200">
          </el-table-column>
          <el-table-column label="超过平均用时(次)" fixed="right" >
            <template slot-scope="scope">
              <span v-if="scope.row.OverNum === 0" style="color:#409EFF">{{scope.row.OverNum}}</span>
              <span v-else-if="scope.row.OverNum > 0" style="color:#f56c6c">{{scope.row.OverNum}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
            </template>
          </el-table-column> -->
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
import config from '../../config/config.js'
import commonFunc from '../../api/common/common.js'
import statisticsApi from '../../api/statistics.js'
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
      filepdf: config.APISERVER.filepdf,
      reportfile: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      date: [this.convertToLateDate(), commonFunc.getnowDate(new Date(), 0)],
      statisticsFormDialogVisible: false,
      statisticsForm: {
        'DepartmentId': '',
        'ShipPlaceId': '',
        'AverageTime': ''
      },
      CarType: '1',
      statisticsTypevalue: '0',
      tablelist: [],
      statisticslist: {
        ListOil: [],
        ListWater: []
      }
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
      this.assemblelinks()
      this.getstatisticss()
    },
    async getstatisticss() {
      commonFunc.myConsole(this.date)
      if (!this.date) {
        this.$message.warning('请选择时间')
        return
      }
      if (!this.date[0] || !this.date[1]) {
        this.$message.warning('请选择时间')
        return
      }
      let conditionsParams = {
        'DepartmentLev': '',
        'CarNo': '',
        'StartTime': this.date[0], // 开始日期
        'EndTime': this.date[1]
      }
      let resData = await statisticsApi.getallstatisticslist(conditionsParams)
      if (resData.status === '000') {
        if (resData.data.record) { //  !null
          this.statisticslist.ListOil = this.tablelist = resData.data.record.ListOil
          this.statisticslist.ListWater = resData.data.record.ListWater
          if (this.CarType === '1') {
            this.tablelist = this.statisticslist.ListOil
          } else {
            this.tablelist = this.statisticslist.ListWater
          }
        }
      } else {
        this.$message.error('获取失败！')
      }
    },
    datepickerValuechange() {
      if (!commonFunc.isDefine(this.date)) {
        this.date = [0, 0]
      }
      this.assemblelinks()
      this.getstatisticss()
    },
    assemblelinks() {
      this.reportfile = this.filepdf + 'ImportExcel.aspx?action=account&CarType=' + this.CarType + '&StartTime=' + this.date[0] + '&EndTime=' + this.date[1]
    },
    handleClick(tab, event) {
      this.CarType = tab.name
      this.assemblelinks()
      this.getstatisticss()
    },
    convertToLateDate() { // 格式化时间，获取当前时间的一个月后的时间值
      let data = new Date()
      let Da = new Date(data.getTime() - 24 * 60 * 60 * 1000 * 30)
      let y = Da.getFullYear()
      let m = Da.getMonth() + 1
      let d = Da.getDate()
      return y + '-' + m + '-' + d
    }
    // ,
    // handleSizeChange(val) {
    //   this.pagination.pagesize = val
    //   this.pagination.currentPage = 1
    //   this.getstatisticss()
    // },
    // handleCurrentChange(val) {
    //   this.pagination.currentPage = val
    //   this.getstatisticss()
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
#statab {
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
