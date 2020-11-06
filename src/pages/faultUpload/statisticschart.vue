<template>
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
          <div>
            <el-radio-group v-model="radio" @change="Invalid1change" >
              <el-radio-button label="1" style="margin-left:15px">本周</el-radio-button>
              <el-radio-button label="2" style="margin-left:15px">本月</el-radio-button>
            </el-radio-group>
          </div>
          <!-- <div class="hdp-uf psc-font-3" style="margin-left:15px">
            <el-button @click="" type="primary" size="small">本周</el-button>
          </div>
          <div class="hdp-uf psc-font-3" style="margin-left:15px">
            <el-button @click="" type="primary" size="small">本月</el-button>
          </div> -->
          <!-- <div class="hdp-uf" style="margin-left:15px">
            <a target="_self" :href='reportfile' class="el-button el-button--primary el-button--small">
              导出excel</a>
          </div> -->
        </div>
      </div>
    </div>
    <el-dialog :close-on-click-modal="false" title="编辑" :visible.sync="centralStationFormDialogVisible" style="z-index: 2021" v-if="centralStationFormDialogVisible" @close="viewdetailsclose" width="800px">
      <div class="dialog-content">
        <el-form ref="form" :inline="true" :model="form" label-width="150px">
          <el-form-item label="井站" prop="ShipPlaceId" style="width: 350px">
            <el-select v-model="form.DepartmentId" size="small" disabled placeholder="请选择">
              <el-option v-for="item in departmentlist" :key="item.ID" :label="item.DepartmentName" :value="item.ID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期" prop="Date" style="width: 350px">
            <el-date-picker v-model="form.Date" type="date" size="small" disabled :picker-options="pickerOptions1" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期">></el-date-picker>
          </el-form-item>
          <el-form-item label="报修人" prop="UserName" size="small" style="width:350px">
            <el-input v-model="form.UserName" disabled @mousewheel.native.prevent></el-input>
          </el-form-item>
          <el-form-item label="故障区域" prop="ShipPlaceId" style="width: 350px">
            <el-select v-model="form.LocationId" size="small" disabled placeholder="请选择">
              <el-option v-for="item in locationlist" :key="item.ID" :label="item.LocationName" :value="item.ID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="优先级" prop="" style="width: 350px">
            <el-select v-model="form.DegreeId" size="small" disabled placeholder="请选择">
              <el-option v-for="item in degreelist" :key="item.ID" :label="item.DegreeName" :value="item.ID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="故障类别" prop="QuestionTypeId" style="width: 350px">
            <el-cascader expand-trigger="hover" :options="questionTypecascader" :props="optionProps" v-model="selectedOptions" disabled change-on-select size="small">
            </el-cascader>
          </el-form-item>
          <el-form-item label="图片" prop="ImagePath" size="small" style="width:700px">
            <!-- <el-upload class="avatar-uploader"
            :action="uploadip" :show-file-list="false"
            :on-success="handlesuccess"
            :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload> -->
            <el-upload style="width:700px" :file-list="ImagePathlist" disabled
              :action="uploadip" :limit="5" list-type="picture-card"
              :on-preview="handlePictureCardPreview" >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="问题描述" prop="Description" size="small" style="width:700px">
            <el-input type="textarea" :rows="3" v-model="form.Description" disabled @mousewheel.native.prevent style="width:538px"></el-input>
          </el-form-item>
          <el-form-item label="初步分析" prop="Description" size="small" style="width:700px">
            <el-input type="textarea" :rows="3" v-model="form.Comments" disabled @mousewheel.native.prevent style="width:538px"></el-input>
          </el-form-item>
          <!-- <el-form-item label="驳回意见" prop="Description" size="small" style="width:1050px">
            <el-input type="textarea" :rows="3" v-model="form.RejectComments" @mousewheel.native.prevent style="width:538px"></el-input>
          </el-form-item> -->
          <el-form-item label="驳回意见" prop="" size="small" style="width:700px">
            <el-input type="textarea" :rows="3" disabled v-model="form.RejectComments" style="width:538px" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="整改负责人" prop="ShipPlaceId" style="width: 700px">
            <!-- <template v-if="identity.Identity === '98'">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <div style="margin: 5px 0;"></div>
              <el-checkbox-group v-model="checkedrepair" @change="handlecheckedrepairChange" style="width:650px">
                <el-checkbox v-for="repair in repairUserlist" :label="repair.ID" :key="repair.ID">{{repair.NickName}}</el-checkbox>
              </el-checkbox-group>
            </template> -->
            <div style="width:650px">
              <el-tag v-for="repair in tagrepair" :label="repair.ID" :key="repair.ID">{{repair.UserName ? repair.UserName : repair.NickName}}</el-tag>
            </div>
          </el-form-item>
          <el-form-item label="最后处理结果" prop="Description" size="small" style="width:700px">
            <el-input type="textarea" :rows="3" v-model="form.Result" disabled @mousewheel.native.prevent style="width:538px"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- <div class="" style="text-align:center;color:#FF6D18;font-size:11px;position: absolute;bottom: 18px;right:600px">* 严格按照运单进行填写 *</div> -->
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="centralStationFormDialogVisible = false" type="primarydel">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" v-if="dialogVisible" @close="imageUrlclose" width="800px"  :modal-append-to-body='false'>
      <img width="100%" :src="imageUrl" alt="">
    </el-dialog>
    <div class="hdp-uf hdp-uf-dc hdp-w-100" style="background: rgb(255, 255, 255);margin-top: 10px">
      <!-- <div id='shiptab' class="hdp-uf hdp-w-100" style="padding:10px 10px 0 10px">
        <template>
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="width:100%">
            <el-tab-pane label="统计图" name="1"></el-tab-pane>
            <el-tab-pane label="明  细" name="2"></el-tab-pane>
          </el-tabs>
        </template>
      </div> -->
      <div v-if="activeName === '2'" class="chart-panel el-row">
        <el-table :data="centralStationlist" stripe border>
          <el-table-column prop="DepartmentName" label="部门" width="120">
          </el-table-column>
          <el-table-column prop="UserName" label="报修人" width="80">
          </el-table-column>
          <el-table-column prop="Date" label="上报日期" width="100">
            <template slot-scope="scope">
              <span>{{scope.row.Date.substr(0,10)}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="LocationName" label="位置" width="80">
          </el-table-column> -->
          <el-table-column prop="DegreeName" label="优先级" width="80">
          </el-table-column>
          <el-table-column prop="QuestionTypeName" label="故障类别" width="80">
          </el-table-column>
          <el-table-column prop="Description" label="问题描述" width="180">
            <template slot-scope="scope">
              <span v-if="scope.row.Description.length < 13">{{scope.row.Description}}</span>
              <span v-else>{{scope.row.Description.substr(0,12) + '...'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="FinishTime" label="处置时间" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.Status === 4">{{scope.row.FinishTime.substr(0,10) + ' ' + scope.row.FinishTime.substr(11,5)}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click.native.prevent="viewdetails(scope.row.Status, scope.$index, centralStationlist)" type="primarydel" size="small">
                查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="hdp-uf hdp-w-90" style="margin-top:15px">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="pagination.pagesizes" :page-size="pagination.pagesize" layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.totalNum">
          </el-pagination>
        </div>
      </div>
      <div v-if="activeName === '1'" class="chart-panel el-row">
        <div class="el-col el-col-8">
          <div class="chart-title">分级统计</div>
          <div id="chart_example" class="pie echarts"></div>
        </div>
        <div class="el-col el-col-8">
          <div class="chart-title">分类统计</div>
          <div id="chart_example4" class="pie echarts"></div>
        </div>
        <div class="el-col el-col-8">
          <div class="chart-title">井站占比</div>
          <div id="chart_example5" class="pie echarts"></div>
        </div>
        <div class="el-col el-col-8">
          <div class="chart-title">技术岗统计</div>
          <div id="chart_example2" class="pie echarts"></div>
        </div>
        <div v-if="disoptionline" class="el-col el-col-9">
          <div class="chart-title">每日增长</div>
          <div id="chart_example3" ref="chart" class="bar echarts hdp-w-90"></div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import config from '../../config/config.js'
import commonFunc from '../../api/common/common.js'
import statisticschartsApi from '../../api/statisticscharts.js'
import centralStationApi from '../../api/centralStation.js'
import departmentApi from '../../api/department.js'
import locationApi from '../../api/location.js'
import questionTypeApi from '../../api/questionType.js'
import degreeApi from '../../api/degree.js'
import Echarts from 'echarts'
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
      activeName: '1',
      filepdf: config.APISERVER.filepdf,
      reportfile: '',
      uploadip: config.APISERVER.uploadip,
      imageip: config.APISERVER.ip,
      imageUrl: '',
      ImagePathlist: [],
      dialogVisible: false,
      pickerOptions: '',
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      date: [this.convertToLateDate(31), commonFunc.getnowDate(new Date(), 0)],
      statisticsFormDialogVisible: false,
      statisticsForm: {
        'DepartmentId': '',
        'ShipPlaceId': '',
        'AverageTime': ''
      },
      locationlist: [],
      departmentlist: [],
      degreelist: [],
      questionTypecascader: [],
      selectedOptions: [],
      optionProps: {
        expandTrigger: 'hover',
        value: 'ID', // value="ParentID"
        label: 'TypeName',
        children: 'SubNodes'
      },
      questionTypelist: [],
      centralStationFormDialogVisible: false,
      form: {
        'ID': '', // 为空新增不为空修改
        'DepartmentId': '', // 部门id
        'DepartmentLev': '', // 部门层级
        'DepartmentName': '', // 部门名称
        'UserId': '0', // 用户id
        'UserName': '', // 用户名称
        'Date': new Date(), // 日期
        'LocationId': '', // 故障位置id
        'LocationName': '', // 故障位置说明
        'QuestionTypeId': '', // 问题类别
        'QuestionTypeLev': '', // 问题类别层级
        'QuestionTypeName': '', // 问题名称
        'DegreeId': '', // 问题级别id
        'DegreeName': '', // 问题级别说明
        'Description': '', // 描述
        'ImagePath': '', // 图片
        'Comments': '', // 初步分析结果
        'RejectComments': '', // 驳回时意见
        'Result': '', // 最后处理结果
        'Status': '', // 状态（0待提交1待处理2驳回3已分配4完成）
        'RepairUser': []
      },
      radio: '0',
      CarType: '1',
      statisticsTypevalue: '0',
      tablelist: [],
      centralStationlist: [],
      disoptionline: true,
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
    handlePictureCardPreview(file) {
      this.imageUrl = file.url
      this.dialogVisible = true
    },
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
      // this.assemblelinks()
      this.getdegree()
      this.getlocation()
      this.getdepartmentlist()
      this.getquestionTypelist()
      this.getstatisticss()
    },
    viewdetails(Status, index, resMembersDataArr) { // 查看
      this.updateRow(index, resMembersDataArr)
    },
    imageUrlclose() {
      this.dialogVisible = false
      // this.identitydisabled()
    },
    viewdetailsclose() {
      // this.identitydisabled()
    },
    updateRow(index, resMembersDataArr) {
      commonFunc.myConsole(resMembersDataArr[index])
      this.ImagePathlist = []
      this.centralStationFormDialogVisible = true
      this.form = {
        'ID': resMembersDataArr[index].ID, // 为空新增不为空修改
        'DepartmentId': resMembersDataArr[index].DepartmentId ? resMembersDataArr[index].DepartmentId : '', // 部门id
        'DepartmentLev': resMembersDataArr[index].DepartmentLev, // 部门层级
        'DepartmentName': resMembersDataArr[index].DepartmentName, // 部门名称
        'UserId': resMembersDataArr[index].UserId, // 用户id
        'UserName': resMembersDataArr[index].UserName, // 用户名称
        'Date': resMembersDataArr[index].Date, // 日期
        'LocationId': resMembersDataArr[index].LocationId ? resMembersDataArr[index].LocationId : '', // 故障位置id
        'LocationName': resMembersDataArr[index].LocationName, // 故障位置说明
        'QuestionTypeId': resMembersDataArr[index].QuestionTypeId ? this.OptionquesTypeinform(resMembersDataArr[index].QuestionTypeId) : '', // 问题类别
        'QuestionTypeLev': resMembersDataArr[index].QuestionTypeLev, // 问题类别层级
        'QuestionTypeName': resMembersDataArr[index].QuestionTypeName, // 问题名称
        'DegreeId': resMembersDataArr[index].DegreeId ? resMembersDataArr[index].DegreeId : '', // 问题级别id
        'DegreeName': resMembersDataArr[index].DegreeName, // 问题级别说明
        'Description': resMembersDataArr[index].Description, // 描述
        'ImagePath': resMembersDataArr[index].ImagePath ? this.showimages(resMembersDataArr[index].ImagePath) : '', // 图片
        'Comments': resMembersDataArr[index].Comments, // 初步分析结果
        'RejectComments': resMembersDataArr[index].RejectComments, // 驳回时意见
        'Result': resMembersDataArr[index].Result, // 最后处理结果
        'Status': resMembersDataArr[index].Status, // 状态（0待提交1待处理2驳回3已分配4完成）
        'RepairUser': this.showRepairUser(resMembersDataArr[index].RepairUser)
      }
    },
    async getstatisticss() {
      if (!this.date) {
        this.$message.warning('请选择时间')
        return
      }
      if (!this.date[0] || !this.date[1]) {
        this.$message.warning('请选择时间')
        return
      }
      let conditionsParams = {
        'Type': 0,
        'StartTime': this.date[0], // 开始日期
        'EndTime': this.date[1]
      }
      let resData = await statisticschartsApi.getQuestion_count(conditionsParams)
      if (resData.status === '000') {
        this.tablelist = resData.data.record
        if (this.activeName === '1') {
          this.showcharts(this.tablelist)
        }
      } else {
        this.$message.error('获取失败！')
      }
    },
    showcharts(data) {
      let pieChart = Echarts.init(document.getElementById('chart_example'))
      let pieChart4 = Echarts.init(document.getElementById('chart_example4'))
      let pieChart5 = Echarts.init(document.getElementById('chart_example5'))
      let barChart = Echarts.init(document.getElementById('chart_example2'))
      let optionpie = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: '65%', // 图例位置
          data: data.ListByDegree.map(function(item) {
            return item.Name
          })
        },
        color: ['#FF7374', '#79D4BA', '#629DF5', '#685CFF', '#C23531'],
        series: [
          {
            name: '分级统计',
            type: 'pie',
            radius: ['40%', '70%'], // 这个属性调整饼状图【内径，外径】
            center: ['35%', '53%'], // 这个属性调整图像的位置
            avoidLabelOverlap: true,
            label: {
              show: true,
              formatter: '{d}%',
              position: 'outside'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '12',
                fontWeight: 'normal'
              }
            },
            labelLine: {
              show: true
            },
            data: data.ListByDegree.map(function(item) {
              return {
                name: item.Name,
                value: item.Value
              }
            })
          }
        ]
      }
      let optionpie4 = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: '60%',
          data: data.ListByType.map(function(item) {
            return item.Name
          })
        },
        color: ['#37A2DA', '#67E0E3', '#FFDB5C', '#FF9F7F', '#E062AE'],
        series: [
          {
            name: '分类统计',
            type: 'pie',
            radius: [0, '50%'],
            center: ['35%', '53%'], // 这个属性调整图像的位置
            itemStyle: {
              borderWidth: 5, // 边框的宽度
              borderColor: '#FFFFFF' // 边框的颜色
            },
            avoidLabelOverlap: true,
            label: {
              show: true,
              formatter: '{b} {d}%',
              position: 'insideBottomLeft'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '12',
                fontWeight: 'normal'
              }
            },
            labelLine: {
              show: true
            },
            data: data.ListByType.map(function(item) {
              return {
                name: item.Name,
                value: item.Value
              }
            })
          }
        ]
      }
      let optionpie5 = {
        color: ['#5B8FF9'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: data.ListWellCenter.map(function(item) {
              return item.Name
            }),
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '数量',
            type: 'bar',
            barWidth: '20%',
            data: data.ListWellCenter.map(function(item) {
              return item.Value
            })
          }
        ]
      }
      let optionbar = {
        color: ['#FF6D18'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        dataZoom: [],
        xAxis: [
          {
            type: 'category',
            data: data.ListByRepairUser.map(function(item) {
              return item.Name
            }),
            axisLabel: {
              show: true,
              interval: 0, // 让所有坐标值全部显示
              rotate: 40, // 让坐标值旋转一定的角度
              textStyle: {
                color: '#303133', // 刻度颜色
                fontSize: 10 // 刻度大小
              }
              // color: '#303133',
              // fontSize: 10,
              // fontWeight: 'normal',
              // fontFamily: '微软雅黑'
            },
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '维修量',
            type: 'bar',
            barWidth: '20%',
            barGap: '60%',
            data: data.ListByRepairUser.map(function(item) {
              return item.Value
            })
          }
        ]
      }

      pieChart.setOption(optionpie)
      pieChart4.setOption(optionpie4)
      pieChart5.setOption(optionpie5)
      barChart.setOption(optionbar)
      // 建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener('resize', function() { pieChart.resize() })
      window.addEventListener('resize', function() { pieChart4.resize() })
      window.addEventListener('resize', function() { pieChart5.resize() })
      window.addEventListener('resize', function() { barChart.resize() })
      if (data.ListByDate.ListByDate === '' || data.ListByDate.ListByDate.length === 0) {
        this.disoptionline = false
        return
      } else {
        this.disoptionline = true
      }
      commonFunc.myConsole(data.ListByDate.ListByDate.length)
      let lineChart = Echarts.init(document.getElementById('chart_example3'))
      // let bar_dv = this.$refs.chart
      // let lineChart = Echarts.init(bar_dv)
      let data1 = data
      let depart = data1.ListByDate.ListClass.map(function(item) {
        return item.ClassName
      })
      const uniqueSet = new Set(depart)
      const backToArray = [...uniqueSet]

      // let departID = data1.ListByDate.ListClass.map(function(item) {
      //   return item.ID
      // })
      // const uniqueSetID = new Set(departID)
      // const backToArrayID = [...uniqueSetID]

      let Timedepart = data1.ListByDate.ListByDate.map(function(item) {
        return item.Name.substr(0, 10)
      })
      Timedepart = this.sortData(Timedepart, 'order')
      const TimeuniqueSet = new Set(Timedepart)
      const TimebackToArray = [...TimeuniqueSet]

      let timearr = this.getDateArr(TimebackToArray[0], TimebackToArray[TimebackToArray.length - 1])

      let timearrsss = timearr
      let seriesdata = data1.ListByDate.ListClass.map(function(item) {
        let iesdata = data1.ListByDate.ListByDate.filter(item2 => {
          if (item2.ClassId === item.ID) {
            return item2
          }
        })
        commonFunc.myConsole(iesdata)
        let optdata = timearr.map(function(item3) {
          let reopt = 0
          iesdata.map(function(item4) {
            if (item4.Name.substr(0, 10) === item3) {
              reopt = item4.Value ? item4.Value : 0
            }
          })
          return reopt
        })
        let opt = {
          name: item.ClassName,
          type: 'line',
          // stack: '总量',
          data: optdata
        }
        return opt
      })
      let optionline = {
        // title: {
        //   text: '折线图堆叠'
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        toolbox: { // 保存图片
          feature: {
            saveAsImage: {}
          }
        },
        legend: {
          data: backToArray
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: timearrsss
        },
        yAxis: {
          scale: true,
          minInterval: 1,
          type: 'value'
        },
        series: seriesdata
      }
      lineChart.setOption(optionline)
      window.addEventListener('resize', function() { lineChart.resize() })
    },
    showRepairUser(RepairUser) {
      // this.departOptions = commonFunc.arraySubBybool('isCheck', RepairUser)
      commonFunc.myConsole(RepairUser)
      this.tagrepair = RepairUser
      this.checkedrepair = RepairUser.map(function(item) {
        return item.UserId
      })
      if (this.checkedrepair.length > 0) {
        this.isIndeterminate = true
      }
      return RepairUser
    },
    showimages(fileStr) {
      let arr = fileStr.split(',')
      let opt = {}
      this.ImagePathlist = arr.map((value, key, arr) => {
        opt = {
          response: {
            original: '',
            state: '',
            title: '',
            url: value
          },
          name: '',
          url: this.imageip + value
        }
        return opt
      })
      return fileStr
    },
    OptionquesTypeinform(QuestionTypeId) {
      let questionPro = this.questionTypelist[this.questionTypelist.findIndex(item => item.ID === QuestionTypeId)]
      this.selectedOptions = questionPro.selectedOptions
      this.selectedOptions.push(QuestionTypeId)
      return QuestionTypeId
    },
    async getdegree() {
      let conditionsParams = {}
      let resData = await degreeApi.getalldegreelist(conditionsParams)
      if (resData.status === '000') {
        this.degreelist = resData.data.record
      } else {}
    },
    async getlocation() {
      let conditionsParams = {}
      let resData = await locationApi.getalllocationlist(conditionsParams)
      if (resData.status === '000') {
        this.locationlist = resData.data.record
      } else {
        this.$message.error('获取失败！')
      }
    },
    async getdepartmentlist() {
      let conditionsParams = {}
      let resData = await departmentApi.getDepartmentwell(conditionsParams)
      if (resData.status === '000') {
        this.departmentlist = resData.data.record
      } else {
        // this.$message.error('用户名或密码错误')
      }
    },
    datepickerValuechange() {
      this.radio = '0'
      if (!commonFunc.isDefine(this.date)) {
        this.date = [0, 0]
      }
      // this.assemblelinks()
      if (this.activeName === '2') {
        this.getcentralStationlist()
      } else {
        this.getstatisticss()
      }
    },
    async getquestionTypelist() {
      let conditionsParams = ''
      let resData = await questionTypeApi.getquestionTypelist(conditionsParams)
      if (resData.status === '000') {
        this.questionTypecascader = resData.data.record
        this.questionTypeArr(resData.data.record)
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
    Invalid1change(value) {
      if (value === '1') {
        this.$set(this.date, 0, this.convertToLateDate('week'))
      } else if (value === '2') {
        this.$set(this.date, 0, this.convertToLateDate('month'))
      } else {
        this.$set(this.date, 0, this.convertToLateDate(7))
      }
      if (this.activeName === '2') {
        this.getcentralStationlist()
      } else {
        this.getstatisticss()
      }
    },
    convertToLateDate(value) { // 格式化时间，获取当前时间的一个月后的时间值
      let data = new Date()
      let days = data.getDay()
      let dMonth = data.getDate()
      let num = 0
      if (value === 'week') {
        if (days === 0) {
          num = 6
        } else {
          num = days - 1
        }
      } else if (value === 'month') {
        num = dMonth - 1
      } else {
        num = value
      }
      let Da = new Date(data.getTime() - 24 * 60 * 60 * 1000 * num)
      let y = Da.getFullYear()
      let m = Da.getMonth() + 1
      let d = Da.getDate()
      return y + '-' + m + '-' + d
    },
    sortData(data, way) {
      // 这个函数大致的作用就是根据传过来的第二个参数来判断是倒叙还是顺序排列
      // 原理其实就是：利用隐式转换，达到了自动求毫秒的目的，以此来排序
      if (way === 'order') {
        return data.sort(function(a, b) {
          // 这里的time要根据本身的数据来，后面的正则匹配也要根据自己数据来
          return Date.parse(a.replace(/-/g, '/')) - Date.parse(b.replace(/-/g, '/'))
        })
      } else if (way === 'back') {
        return data.sort(function(a, b) {
          return Date.parse(b.replace(/-/g, '/')) - Date.parse(a.replace(/-/g, '/'))
        })
      }
    },
    getDateArr(day1, day2) {
      let getDate = function(str) {
        let tempDate = new Date()
        let list = str.split('-')
        tempDate.setFullYear(list[0])
        tempDate.setMonth(list[1] - 1)
        tempDate.setDate(list[2])
        return tempDate
      }
      let date1 = getDate(day1)
      let date2 = getDate(day2)
      if (date1 > date2) {
        let tempDate = date1
        date1 = date2
        date2 = tempDate
      }
      date1.setDate(date1.getDate() + 1)
      let dateArr = []
      let i = 0
      while (!(date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate())) {
        let dayStr = date1.getDate().toString()
        if (dayStr.length === 1) {
          dayStr = '0' + dayStr
        }
        dateArr[i] = date1.getFullYear() + '-' + ((date1.getMonth() + 1) > 9 ? (date1.getMonth() + 1) : ('0' + (date1.getMonth() + 1))) + '-' + dayStr
        i++
        date1.setDate(date1.getDate() + 1)
      }
      dateArr.splice(0, 0, day1)
      dateArr.push(day2)
      return dateArr
    },
    async getcentralStationlist() {
      let conditionsParams = {
        'DepartmentLev': '',
        'DegreeId': '',
        'QuestionTypeLev': '',
        'Finish': 1,
        'PageNo': this.pagination.currentPage,
        'PageSize': this.pagination.pagesize,
        'StartTime': this.date[0], // 开始日期
        'EndTime': this.date[1]
      }
      let resData = await centralStationApi.getQuestionlistaudit(conditionsParams)
      if (resData.status === '000') {
        this.pagination.totalNum = resData.data.totalNum
        this.centralStationlist = resData.data.record
      } else {
        // this.$message.error('用户名或密码错误')
      }
    },
    handleClick(tab, event) {
      this.activeName = tab.name
      if (this.activeName === '2') {
        this.getcentralStationlist()
      } else {
        this.getstatisticss()
      }
    },
    handleSizeChange(val) {
      this.pagination.pagesize = val
      this.pagination.currentPage = 1
      this.getcentralStationlist()
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val
      this.getcentralStationlist()
    }
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
h2{
  text-align: center;
  padding: 30px;
  font-size: 18px;
}
.chart_example{
  width: 100%;
  min-height: 240px;
  border: 1px solid red;
  margin: 0 auto;
}
.chart-panel {
  padding: 15px;
  background:#FFFFFF;
  // margin-top:10px;
}
.el-row {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.el-col-8 {
  margin: 15px 0;
  width: 50% !important;
}
.el-col-9 {
  margin: 15px 0;
  width: 100% !important;
}
[class*=el-col-] {
  float: left;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.chart-panel .el-col:not(:nth-child(2n+1)) {
  border-left: 1px solid #e6e6e6;
}
.echarts {
  border-bottom: 1px solid #e6e6e6;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  height: 250px;
}
.chart-title::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  width: 2px;
  height: 12px;
  background-color: #61c5c1;
}
.chart-title {
  overflow: hidden;
  position: relative;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding-left: 12px;
  font-size: 14px;
  color: #333;
  // height: 40px;
}
#shiptab .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    border-bottom-color: #FF6D18;
}
#shiptab .el-tabs__item.is-active {
    color: #FFF;
    background-color: #FF6D18;
}
</style>
