<template>
<div class="hdp-uf hdp-uf-dc main-container hdp-w-100">
  <div class="hdp-uf hdp-uf-dc hdp-w-100">
    <div class="hdp-uf hdp-uf-hsb menu-title hdp-w-100" style="background:#FFFFFF;padding:10px ">
      <div class="hdp-uf hdp-uf-dc  hdp-w-100">
        <div class="hdp-uf  hdp-w-100">
          <!-- <div class="hdp-uf">
            <div class="hdp-uf hdp-uf-vc psc-font-1">
              选择身份
            </div>
            <div class="hdp-uf" style="margin-left:15px">
              <el-select v-model="identity" size="small" placeholder="请选择">
                <el-option v-for="item in identitylist" :key="item.ID" :label="item.identityName" :value="item.ID">
                </el-option>
              </el-select>
            </div>
          </div> -->
          <div class="hdp-uf">
            <div class="hdp-uf hdp-uf-vc psc-font-1">
              部门选择
            </div>
            <div class="hdp-uf" style="margin-left:15px">
              <el-cascader expand-trigger="hover" :options="cascader" :props="optionProps" change-on-select clearable v-model="selectedOptions" size="small" @change="handleChange" style="width:100%;">
              </el-cascader>
            </div>
          </div>
          <div class="hdp-uf hdp-uf-hfe" style="margin-left:15px">
            <div class="hdp-uf hdp-uf-vc psc-font-1">
              输入姓名
            </div>
            <div class="hdp-uf" style="margin-left:15px">
              <el-input v-model="username" size="small" placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div class="hdp-uf" style="margin-left:15px">
            <el-button @click="searchManeger()" size="small" type="primarydel">查询</el-button>
          </div>
          <div class="hdp-uf psc-font-3" style="margin-left:15px">
            <el-button @click="updateRow('', [])" type="primary" size="small">新增</el-button>
          </div>
        </div>
      </div>
      <!-- <div class="hdp-uf hdp-uf-dc hdp-uf-hc hdp-uf-vc" style="width:38%;background:#FFFFFF">
        <div class="hdp-uf hdp-w-30" style="margin-top:10px">
          <dl class="hdp-w-50">
            <dt class="psc-font-3 font1">1,000人</dt>
            <dd><span class="psc-font-1 font2">作业人员</span></dd>
          </dl>
          <dl class="hdp-w-50">
            <dt class="psc-font-3 hdp-uf hdp-uf-hfe font1">20人</dt>
            <dd><span class="psc-font-1 hdp-uf hdp-uf-hfe font2">临时人员</span></dd>
          </dl>
        </div>
        <div class="hdp-uf hdp-w-30">
          <el-button @click="menbersAdd()" style="margin-top:20px" class="hdp-w-100" type="primary" size="small ">新增人员</el-button>
        </div>
      </div> -->
    </div>
    <div class="hdp-uf hdp-w-100 hdp-uf-dc" style="background:#FFFFFF;margin-top:10px;padding:10px">
      <div class="hdp-uf hdp-w-100" style="margin-top:10px">
        <el-table :data="resMembersDataArr" stripe border>
          <el-table-column prop="NickName" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="accountsStatus" label="帐号状态" width="80">
          </el-table-column>
          <!-- <el-table-column prop="NoApplyStatus" label="就餐权限" width="80">
          </el-table-column> -->
          <!-- <el-table-column label="免费就餐" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.IsFreeMeal === 1" style="">是</span>
              <span v-else-if="scope.row.IsFreeMeal === 0" style="">否</span>
            </template>
          </el-table-column> -->
          <!-- <el-table-column prop="IdentityName" label="身份" width="120">
          </el-table-column> -->
          <el-table-column prop="DepartmentName" label="所在部门" width="120">
          </el-table-column>
          <el-table-column prop="Phone" label="电话" width="120">
          </el-table-column>
          <el-table-column prop="UserNumber" label="员工编码" width="150">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click.native.prevent="updateRow(scope.$index, resMembersDataArr)" type="primarydel" size="small">
                编辑
              </el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, resMembersDataArr)" type="primarydel" size="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="hdp-uf" style="margin-top:15px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="pagination.pagesizes" :page-size="pagination.pagesize" layout="total, sizes, prev, pager, next, jumper"
          :total="resMembersTotalNum">
        </el-pagination>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
import commonFunc from '../../api/common/common.js'
import membersApi from '../../api/members.js'
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
      identity: '',
      identitylist: [{
        ID: '',
        identityName: '所有人'
      }, {
        ID: '0',
        identityName: '企业人员'
      }, {
        ID: '1',
        identityName: '临时人员'
      }],
      identityProps: {
        children: 'SubDeps'
      },
      username: '',
      cascader: JSON.parse(localStorage.getItem('departmentcascader')) || [],
      optionProps: {
        value: 'ID', // value="ParentID"
        label: 'DepartmentName',
        children: 'SubDeps'
      },
      DepartmentID: '',
      selectedOptions: [],
      pagination: {
        currentPage: 1,
        pagesizes: [5, 8, 10, 20],
        pagesize: 10
      }
    }
  },
  computed: {
    ...mapGetters({
      resMembersDataArr: 'members/GET_RES_DATA_ARR',
      resMembersTotalNum: 'members/GET_RES_DATA_Attr'
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
      if (commonFunc.isDefine(localStorage.getItem('pagination'))) {
        this.pagination = JSON.parse(localStorage.getItem('pagination'))
        localStorage.removeItem('pagination')
      }
      if (commonFunc.isDefine(this.$route.query.link)) {
        localStorage.setItem('currentMenuLeadListsData', JSON.stringify(this.currentMenuLeadListsData))
      } else {
        this.currentMenuLeadListsData = JSON.parse(localStorage.getItem('currentMenuLeadListsData'))
        this.title.firstTitle = this.currentMenuLeadListsData[this.currentMenuLeadListsData.length - 1].name
        document.title = this.title.firstTitle
      }
      this.$store.dispatch('menuLeadLists/setMenuLeadListsData', this.currentMenuLeadListsData)
      this.searchManeger()
    },
    handleSizeChange(val) {
      this.pagination.pagesize = val
      this.pagination.currentPage = 1
      this.searchManeger()
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val
      this.searchManeger()
    },
    async searchManeger() {
      let conditionsParams = {
        'PageNo': this.pagination.currentPage,
        'PageSize': this.pagination.pagesize,
        'Key': this.username,
        'Department': this.DepartmentID,
        'IdentityType': '0',
        'Status': ''
      }
      commonFunc.myConsole(conditionsParams)
      this.$store.dispatch('members/getMembersData', conditionsParams)
    },
    handleChange(value) {
      let len = value.length
      this.DepartmentID = value[len - 1]
    },
    deleteRow(index, rows) {
      let ArrayID = rows[index].ID
      // ArrayID.push(rows[index].ID)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.managers_del(ArrayID, index)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async managers_del(ArrayID, index) {
      let conditionsParams = {
        'ArrayID': ArrayID
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await membersApi.managersdel(conditionsParams)
      if (resData.status === '000') {
        this.resMembersDataArr.splice(index, 1)
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
      localStorage.setItem('pagination', JSON.stringify(this.pagination))
      this.$router.push({
        name: 'membersAdd',
        query: {
          menbersItem: JSON.stringify(resMembersDataArr[index]),
          typeVal: index === '' ? '1' : '0', // 1 新增  0 编辑
          currentMenuLeadListsData: JSON.stringify(this.currentMenuLeadListsData)
        }
      })
    },
    menbersAdd() {}
  }
}
</script>
<style lang="scss">
.el-pagination__sizes .el-input .el-input__inner:hover {
    border-color: #FF6D18;
}
</style>
