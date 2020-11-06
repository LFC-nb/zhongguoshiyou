<template>
<div class="hdp-uf main-container hdp-w-100">
  <div class="hdp-uf hdp-uf-dc hdp-w-100">
    <!-- <div class="hdp-uf hdp-uf-hsb menu-title hdp-w-100">
      <div class="hdp-uf hdp-uf-dc" style="width:100%;background:#FFFFFF;padding:10px 40px 20px 20px">
        <div class="hdp-uf psc-font-3" style="">
          条件查询
        </div>
        <div class="hdp-uf" style="margin-top:15px">
          <div class="hdp-uf">
            <div class="hdp-uf hdp-uf-vc psc-font-1">
              部门名称
            </div>
            <div class="hdp-uf" style="margin-left:15px;">
              <el-input @change="departmentNameChange" v-model="departmentkey" size="small" placeholder="请输入正确的部门名称"></el-input>
            </div>
          </div>
          <div class="hdp-uf hdp-w-10 hdp-uf-hfe" style="margin-left:15px;">
            <el-button @click="searchDepartment()" type="primary" size="small ">查询</el-button>
          </div>
          <div class="hdp-uf hdp-w-10 hdp-uf-hfe" style="margin-left:15px;">
            <el-button @click="departmentAdd()" type="primary" size="small ">新增部门</el-button>
          </div>
        </div>
      </div>
    </div> -->
    <div class="hdp-uf hdp-w-100 hdp-uf-dc" style="background:#FFFFFF;margin-top:0px;padding:10px">
      <div class="">凝析油</div>
      <div class="hdp-uf hdp-uf-dc" style="margin-top:10px;padding-left:10px">
        <template>
          <div style="margin: 5px 0;"></div>
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 5px 0;"></div>
          <el-checkbox-group v-model="checkeddeparties" @change="handlecheckeddepartiesChange">
            <el-checkbox v-for="depart in departmentlist" :label="depart.ID" :key="depart.ID">{{depart.DepartmentName}}</el-checkbox>
          </el-checkbox-group>
        </template>
      </div>
      <div class="hdp-uf" style="margin-left:10px;margin-top: 10px;">
        <el-button @click="departmentedit(1)" type="primary" size="small ">保存</el-button>
      </div>
    </div>
    <div class="hdp-uf hdp-w-100 hdp-uf-dc" style="background:#FFFFFF;margin-top:10px;padding:10px">
      <div class="">气田水</div>
      <div class="hdp-uf hdp-uf-dc" style="margin-top:10px;padding-left:10px">
        <template>
          <div style="margin: 5px 0;"></div>
          <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2" @change="handleCheckAllChange2">全选</el-checkbox>
          <div style="margin: 5px 0;"></div>
          <el-checkbox-group v-model="checkeddeparties2" @change="handlecheckeddepartiesChange2">
            <el-checkbox v-for="depart in departmentlist2" :label="depart.ID" :key="depart.ID">{{depart.DepartmentName}}</el-checkbox>
          </el-checkbox-group>
        </template>
      </div>
      <div class="hdp-uf" style="margin-left:10px;margin-top: 10px;">
        <el-button @click="departmentedit(2)" type="primary" size="small ">保存</el-button>
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
      checkAll: false,
      departOptions: [],
      checkeddeparties: [],
      isIndeterminate: false,
      departmentlist: [],
      checkAll2: false,
      departOptions2: [],
      checkeddeparties2: [],
      isIndeterminate2: false,
      departmentlist2: []
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
      this.getdepartmentWaterlist()
      this.getdepartmentOillist()
    },
    async getdepartmentOillist() {
      let conditionsParams = {}
      let resData = await tranStationApi.getTranStation_allOillist(conditionsParams)
      if (resData.status === '000') {
        this.departmentlist = resData.data.record
        this.departOptions = commonFunc.arraySubBybool('isCheck', this.departmentlist)
        this.checkeddeparties = this.departOptions.map(function(item) {
          return item.ID
        })
        if (this.checkeddeparties.length > 0) {
          this.isIndeterminate = true
        }
        // mockData.cascader = resData.data.record
        // localStorage.setItem('departmentcascader', JSON.stringify(mockData.cascader))
      } else {
        this.$message.error('获取失败！')
      }
    },
    async getdepartmentWaterlist() {
      let conditionsParams = {}
      let resData = await tranStationApi.getTranStation_allWaterlist(conditionsParams)
      if (resData.status === '000') {
        this.departmentlist2 = resData.data.record
        this.departOptions2 = commonFunc.arraySubBybool('isCheck', this.departmentlist2)
        this.checkeddeparties2 = this.departOptions2.map(function(item) {
          return item.ID
        })
        if (this.checkeddeparties2.length > 0) {
          this.isIndeterminate2 = true
        }
        // mockData.cascader = resData.data.record
        // localStorage.setItem('departmentcascader', JSON.stringify(mockData.cascader))
      } else {
        this.$message.error('获取失败！')
      }
    },
    handleCheckAllChange(val) {
      this.checkeddeparties = val ? this.departmentlist.map(function(item) {
        return item.ID
      }) : []
      this.isIndeterminate = false
    },
    handlecheckeddepartiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.departmentlist.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.departmentlist.length
    },
    handleCheckAllChange2(val) {
      this.checkeddeparties2 = val ? this.departmentlist2.map(function(item) {
        return item.ID
      }) : []
      this.isIndeterminate2 = false
    },
    handlecheckeddepartiesChange2(value) {
      let checkedCount = value.length
      this.checkAll2 = checkedCount === this.departmentlist2.length
      this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.departmentlist2.length
    },
    departmentedit(Type) {
      this.$confirm('确认提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.subinfo(Type)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    async subinfo(Type) {
      let conditionsParams = []
      let jsonArr = []
      if (Type === 1) {
        jsonArr = this.departmentlist
        this.checkeddeparties.forEach(function(value) {
          let obj = jsonArr.find(function(item) {
            return item.ID === value
          })
          let obj2 = {
            'DepartmentId': obj.ID,
            'DepartmentLev': obj.Level,
            'Type': Type,
            'DepartmentName': obj.DepartmentName,
            'isCheck': true
          }
          conditionsParams.push(obj2)
        })
      } else {
        jsonArr = this.departmentlist2
        this.checkeddeparties2.forEach(function(value) {
          let obj = jsonArr.find(function(item) {
            return item.ID === value
          })
          let obj2 = {
            'DepartmentId': obj.ID,
            'DepartmentLev': obj.Level,
            'Type': Type,
            'DepartmentName': obj.DepartmentName,
            'isCheck': true
          }
          conditionsParams.push(obj2)
        })
      }
      let resData = await tranStationApi.departmentedit(conditionsParams)
      if (resData.status === '000') {
        // this.selectedOptions = []
        if (Type === 1) {
          this.getdepartmentOillist()
        } else {
          this.getdepartmentWaterlist()
        }
        // this.getTranStationlist()
        this.$message.success('保存成功')
      } else {
        this.$message.error('提交失败')
      }
    },
    async getTranStationlist() {
      let conditionsParams = {}
      let resData = await tranStationApi.getTranStation_list(conditionsParams)
      if (resData.status === '000') {
        mockData.tranStationlist = resData.data.record
        localStorage.setItem('tranStationlist', JSON.stringify(mockData.tranStationlist))
      } else {
        // this.$message.error('获取失败！')
      }
    }
  }
}
</script>
<style lang="scss">
  .el-checkbox {
      width: 150px;
      color:
      #606266;
      font-weight: 500;
      font-size: 14px;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
  }
  .el-checkbox + .el-checkbox {
      margin-left: 0px !important;
      width: 150px;
      height: 30px;
  }
  .el-checkbox-group .el-checkbox__label {
      height: 20px;
      display: inline-block;
      padding-left: 0px;
      margin-left: 10px;
      line-height: 19px;
      font-size: 12px;
      // color: #fff !important;
      // background-color: #ff7e33 !important;
      // border: 1px solid #ff7e33;
  }
</style>
