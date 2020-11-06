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
      <el-dialog :close-on-click-modal="false" title="编辑" :visible.sync="signerFormDialogVisible" v-if="signerFormDialogVisible" width="500px">
        <div class="dialog-content">
          <el-form ref="signerForm" :model="signerForm"  label-width="150px">
            <el-form-item label="姓名" prop="NickName" size="small" style="width:343px">
              <el-input type="text" v-model="signerForm.NickName"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="signerFormDialogVisible = false" type="primarydel">取 消</el-button>
          <el-button size="small" @click="editinfo()" type="primary">确 定</el-button>
        </span>
      </el-dialog>
      <div class="hdp-uf hdp-w-100" style="margin-top:10px">
        <el-table :data="signerlist" stripe border>
          <el-table-column prop="NickName" label="签认人" width="200">
          </el-table-column>
          <el-table-column label="编辑时间" width="200">
            <template slot-scope="scope">
              <span>{{scope.row.EditTime.substr(0,10)}}  {{scope.row.EditTime.substr(11,5)}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click.native.prevent="updateRow(scope.$index, signerlist)" type="primarydel" size="small">
                编辑
              </el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, signerlist)" type="primarydel" size="small">
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
import signerApi from '../../api/signer.js'
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
      signerFormDialogVisible: false,
      signerForm: {
        ID: 0,
        NickName: ''
      },
      signerTypevalue: '0',
      signerlist: []
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
      this.getsigners()
    },
    async getsigners() {
      let conditionsParams = {
        // 'PageNo': this.pagination.currentPage,
        // 'PageSize': this.pagination.pagesize
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await signerApi.getallsignerlist(conditionsParams)
      if (resData.status === '000') {
        this.signerlist = resData.data.record
        localStorage.setItem('signerlist', JSON.stringify(resData.data.record))
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
        this.signerdel(index, resMembersDataArr)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async signerdel(index, resMembersDataArr) {
      let conditionsParams = {
        'ArrayID': [resMembersDataArr[index].ID]
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await signerApi.signerdel(conditionsParams)
      if (resData.status === '000') {
        this.signerlist.splice(index, 1)
        this.getsigners()
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
      this.signerFormDialogVisible = true
      if (index === '') {
        this.signerForm.NickName = ''
        this.signerForm.ID = 0
      } else {
        this.signerForm.ID = resMembersDataArr[index].ID
        this.signerForm.NickName = resMembersDataArr[index].NickName
      }
    },
    async editinfo() {
      if (!this.signerForm.NickName) {
        this.$message.warning('请输入签认人姓名')
        return
      }
      let conditionsParams = {
        'ID': this.signerForm.ID,
        'NickName': this.signerForm.NickName
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await signerApi.signer_edit(conditionsParams)
      if (resData.status === '000') {
        this.signerFormDialogVisible = false
        this.getsigners()
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
      } else {
        this.$message.error('保存失败！')
      }
    },
    signerFormselect(value) {
      this.signerForm.Type = value + ''
    }
    // ,
    // handleSizeChange(val) {
    //   this.pagination.pagesize = val
    //   this.pagination.currentPage = 1
    //   this.getsigners()
    // },
    // handleCurrentChange(val) {
    //   this.pagination.currentPage = val
    //   this.getsigners()
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
