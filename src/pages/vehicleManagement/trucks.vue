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
      <div class="hdp-uf">
        <!-- <div class="hdp-uf hdp-w-10 psc-font-3" style="padding-left:10px">
          车辆列表
        </div> -->
        <div class="hdp-uf">
          <!-- <template>
            <el-select v-model="truckTypevalue" size="small" @change="selectchange" placeholder="请选择">
              <el-option key="0" label="全部" value="0"></el-option>
              <el-option key="1" label="凝析油" value="1"></el-option>
              <el-option key="2" label="气田水" value="2"></el-option>
            </el-select>
          </template> -->
          <template>
            <el-tabs v-model="truckTypevalue" @tab-click="selectchange">
              <el-tab-pane label="凝析油" name="1"></el-tab-pane>
              <el-tab-pane label="气田水" name="2"></el-tab-pane>
            </el-tabs>
          </template>
        </div>
        <div class="psc-font-3"  style="margin-left:45px;margin-top:6px">
          <el-button @click="updateRow('', [])" type="primary" size="small" style="height:28px;line-height: 10px">新增</el-button>
        </div>
      </div>
      <el-dialog :close-on-click-modal="false" title="编辑" :visible.sync="TruckFormDialogVisible" v-if="TruckFormDialogVisible" width="500px">
        <div class="dialog-content">
          <el-form ref="TruckForm" :model="TruckForm" label-width="150px">
            <el-form-item label="车牌" prop="CarNo" size="small" style=" width: 343px">
              <el-input type="text" v-model="TruckForm.CarNo"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="Type" style="width: 400px">
              <el-select v-model="TruckForm.Type" size="small" @change="TruckFormselect" placeholder="请选择">
                <el-option key="1" label="凝析油" value="1"></el-option>
                <el-option key="2" label="气田水" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="TruckForm.Type === '1'" label="核定空高-前(cm)" prop="CalHeightFront" size="small" style=" width: 343px">
              <el-input type="number" min="0.0" step="0.000001" v-model="TruckForm.CalHeightFront" @mousewheel.native.prevent></el-input>
            </el-form-item>
            <el-form-item v-if="TruckForm.Type === '1' " label="核定空高-后(cm)" prop="CalHeightBack" size="small" style=" width: 343px">
              <el-input type="number" min="0.0" step="0.000001" v-model="TruckForm.CalHeightBack" @mousewheel.native.prevent></el-input>
            </el-form-item>
            <el-form-item v-if="TruckForm.Type === '1' " label="核定毛重(t)" prop="TotalWeight" size="small" style=" width: 343px">
              <el-input type="number" min="0.0" step="0.000001" @blur="calRealWeight" v-model="TruckForm.TotalWeight" @mousewheel.native.prevent></el-input>
            </el-form-item>
            <el-form-item v-if="TruckForm.Type === '1' " label="核定皮重(t)" prop="ShellWeight" size="small" style=" width: 343px">
              <el-input type="number" min="0.0" step="0.000001" @blur="calRealWeight" v-model="TruckForm.ShellWeight" @mousewheel.native.prevent></el-input>
            </el-form-item>
            <el-form-item v-if="TruckForm.Type === '1' " label="净重(t)" prop="RealWeight" size="small" style=" width: 343px">
              <el-input type="number" :disabled="true" readonly="readonly"  v-model="TruckForm.RealWeight" @mousewheel.native.prevent></el-input>
            </el-form-item>
            <el-form-item v-if="TruckForm.Type === '1' " label="脱水(t)" prop="Dewater" size="small" style=" width: 343px">
              <el-input type="number" min="0.0" step="0.000001" v-model="TruckForm.Dewater" @mousewheel.native.prevent></el-input>
            </el-form-item>
            <el-form-item v-if="TruckForm.Type === '1' " label="铅封数量(个)" prop="SealNum" size="small" style=" width: 343px">
              <el-input type="number"  v-model="TruckForm.SealNum" @mousewheel.native.prevent></el-input>
            </el-form-item>
            <el-form-item v-if="TruckForm.Type === '1' " label="核罐密度(吨/方)" prop="Density" size="small" style=" width: 343px">
              <el-input type="number" min="0.0" step="0.000001" v-model="TruckForm.Density" @mousewheel.native.prevent></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="TruckFormDialogVisible = false" type="primarydel">取 消</el-button>
          <el-button size="small" @click="editinfo()" type="primary">确 定</el-button>
        </span>
      </el-dialog>
      <div class="hdp-uf hdp-w-100" style="margin-top:10px">
        <el-table :data="Trucklist" stripe border>
          <el-table-column prop="CarNo" label="车牌" width="120">
          </el-table-column>
          <el-table-column v-if="truckTypevalue === '1' " prop="CalHeightFront" label="核定空高-前(cm)" width="110">
          </el-table-column>
          <el-table-column v-if="truckTypevalue === '1' " prop="CalHeightBack" label="核定空高-后(cm)" width="110">
          </el-table-column>
          <el-table-column v-if="truckTypevalue === '1' " prop="TotalWeight" label="核定毛重(t)" width="100">
          </el-table-column>
          <el-table-column v-if="truckTypevalue === '1' " prop="ShellWeight" label="核定皮重(t)" width="100">
          </el-table-column>
          <el-table-column v-if="truckTypevalue === '1' " prop="RealWeight" label="净重(t)" width="60">
          </el-table-column>
          <el-table-column v-if="truckTypevalue === '1' " prop="Dewater" label="脱水(t)" width="60">
          </el-table-column>
          <el-table-column v-if="truckTypevalue === '1' " prop="SealNum" label="铅封数量(t)" width="100">
          </el-table-column>
          <!--
          <el-table-column prop="Density" label="核罐密度" width="100">
          </el-table-column>
          <el-table-column label="编辑时间" width="200">
            <template slot-scope="scope">
              <span>{{scope.row.EditTime.substr(0,10)}} {{scope.row.EditTime.substr(11,5)}}</span>
            </template>
          </el-table-column>
           -->
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click.native.prevent="updateRow(scope.$index, Trucklist)" type="primarydel" size="small">
                编辑
              </el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, Trucklist)" type="primarydel" size="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <div v-else-if="truckTypevalue === '2'" class="hdp-uf hdp-w-100" style="margin-top:10px">
        <el-table :data="Trucklist" stripe border>
          <el-table-column prop="CarNo" label="车牌" width="100">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click.native.prevent="updateRow(scope.$index, Trucklist)" type="primarydel" size="small">
                编辑
              </el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, Trucklist)" type="primarydel" size="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div> -->
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
import trucksApi from '../../api/trucks.js'
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
      TruckFormDialogVisible: false,
      TruckForm: {
        ID: 0,
        Type: '',
        CarNo: '',
        CalHeightFront: '',
        CalHeightBack: '',
        TotalWeight: '',
        ShellWeight: '',
        RealWeight: '',
        Dewater: '',
        SealNum: '',
        Density: ''
      },
      truckTypevalue: '1',
      Trucklist: []
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
      this.gettrucks(1)
    },
    async gettrucks(Type) {
      let conditionsParams = {
        'Type': parseInt(Type)
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await trucksApi.getalltruckslist(conditionsParams)
      if (resData.status === '000') {
        this.Trucklist = resData.data.record
        // this.pagination.totalNum = resData.data.totalNum
      } else {
        this.$message.error('获取失败！')
      }
    },
    async getOiltrucks() {
      let conditionsParams = {
        // 'PageNo': this.pagination.currentPage,
        // 'PageSize': this.pagination.pagesize
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await trucksApi.getOiltruckslist(conditionsParams)
      if (resData.status === '000') {
        this.Trucklist = resData.data.record
        localStorage.setItem('truckOillist', JSON.stringify(resData.data.record))
        // this.pagination.totalNum = resData.data.totalNum
      } else {
        this.$message.error('获取失败！')
      }
    },
    async getWatertrucks() {
      let conditionsParams = {
        // 'PageNo': this.pagination.currentPage,
        // 'PageSize': this.pagination.pagesize
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await trucksApi.getWatertruckslist(conditionsParams)
      if (resData.status === '000') {
        this.Trucklist = resData.data.record
        localStorage.setItem('truckWaterlist', JSON.stringify(resData.data.record))
        // this.pagination.totalNum = resData.data.totalNum
      } else {
        this.$message.error('获取失败！')
      }
    },
    deleteRow(index, resMembersDataArr) {
      this.$confirm('是否确认删除该车辆信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.Truckdel(index, resMembersDataArr)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async Truckdel(index, resMembersDataArr) {
      let conditionsParams = {
        'ArrayID': [resMembersDataArr[index].ID]
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await trucksApi.trucksdel(conditionsParams)
      if (resData.status === '000') {
        this.Trucklist.splice(index, 1)
        // this.selectchange(this.truckTypevalue)
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
      this.TruckFormDialogVisible = true
      if (index === '') {
        this.TruckForm.CarNo = ''
        // this.TruckForm.Type = ''
        this.TruckForm.ID = 0
        this.TruckForm.CalHeightFront = '' || 0
        this.TruckForm.CalHeightBack = '' || 0
        this.TruckForm.TotalWeight = '' || 0
        this.TruckForm.ShellWeight = '' || 0
        this.TruckForm.RealWeight = '' || 0
        this.TruckForm.Dewater = '' || 0
        this.TruckForm.SealNum = '' || 0
        this.TruckForm.Density = '' || 0
      } else {
        this.TruckForm.ID = resMembersDataArr[index].ID
        this.TruckForm.CarNo = resMembersDataArr[index].CarNo
        this.TruckForm.Type = resMembersDataArr[index].Type + ''
        this.TruckForm.CalHeightFront = resMembersDataArr[index].CalHeightFront
        this.TruckForm.CalHeightBack = resMembersDataArr[index].CalHeightBack
        this.TruckForm.TotalWeight = resMembersDataArr[index].TotalWeight
        this.TruckForm.ShellWeight = resMembersDataArr[index].ShellWeight
        this.TruckForm.RealWeight = resMembersDataArr[index].RealWeight
        this.TruckForm.Dewater = resMembersDataArr[index].Dewater
        this.TruckForm.SealNum = resMembersDataArr[index].SealNum
        this.TruckForm.Density = resMembersDataArr[index].Density
      }
    },
    calRealWeight() {
      let RealWeight = commonFunc.amcSub(this.TruckForm.TotalWeight, this.TruckForm.ShellWeight)
      if (RealWeight <= 0) {
        this.TruckForm.RealWeight = ''
        this.$message.warning('请核对车辆毛重和皮重')
      } else {
        this.TruckForm.RealWeight = RealWeight
      }
    },
    async editinfo() {
      if (!this.TruckForm.CarNo) {
        this.$message.warning('请输入车牌')
        return
      }
      if (!this.TruckForm.Type) {
        this.$message.warning('请选择车辆类型')
        return
      }
      if (this.TruckForm.Type === '1') {
        if (!this.TruckForm.CalHeightFront && !this.TruckForm.CalHeightBack) {
          this.$message.warning('请输入核定空高')
          return
        }
        if (!this.TruckForm.TotalWeight) {
          this.$message.warning('请输入核定毛重')
          return
        }
        if (!this.TruckForm.ShellWeight) {
          this.$message.warning('请输入核定皮重')
          return
        }
        if (!this.TruckForm.RealWeight) {
          this.$message.warning('请重新计算车辆净重')
          return
        }
        if (!(this.TruckForm.Dewater >= 0)) {
          this.$message.warning('请输入脱水量')
          return
        }
        if (!this.TruckForm.SealNum) {
          this.$message.warning('请输入铅封数量')
          return
        }
        if (!(this.TruckForm.Density >= 0)) {
          this.$message.warning('请输入核定罐密度')
          return
        }
      }
      if (!this.TruckForm.CalHeightFront) {
        this.TruckForm.CalHeightFront = this.TruckForm.CalHeightBack
        this.TruckForm.CalHeightBack = 0
      }
      if (!this.TruckForm.CalHeightBack) {
        this.TruckForm.CalHeightBack = 0
      }
      let conditionsParams = this.TruckForm
      commonFunc.myConsole(conditionsParams)
      let resData = await trucksApi.trucks_edit(conditionsParams)
      if (resData.status === '000') {
        this.TruckFormDialogVisible = false
        this.selectchange(this.truckTypevalue)
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
      } else {
        this.$message.error('保存失败！')
      }
    },
    selectchange(value) {
      this.TruckForm.Type = this.truckTypevalue
      this.gettrucks(this.truckTypevalue)
      // commonFunc.myConsole(this.TruckForm.Type)
      // switch (this.truckTypevalue) {
      //   case '1':
      //     this.getOiltrucks()
      //     break
      //   case '2':
      //     this.getWatertrucks()
      //     break
      //   default:
      //     break
      // }
    },
    TruckFormselect(value) {
      this.TruckForm.Type = value + ''
    }
    // ,
    // handleSizeChange(val) {
    //   this.pagination.pagesize = val
    //   this.pagination.currentPage = 1
    //   this.selectchange(this.truckTypevalue)
    // },
    // handleCurrentChange(val) {
    //   this.pagination.currentPage = val
    //   this.selectchange(this.truckTypevalue)
    // }
  }
}
</script>
<style lang="scss">
// 处理input type = number的上下箭头
input::-webkit-inner-spin-button,
input::-webkit-outer-spin-button {
    -webkit-appearance: none;
}
input[type="number"] {
    -moz-appearance: textfield;
}
.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
    margin-bottom: 12px;
}
.el-form-item {
    margin-bottom: 12px;
}
.el-table td,
.el-table th {
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
