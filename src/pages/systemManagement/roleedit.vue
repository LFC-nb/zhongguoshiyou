<template>
<div class="hdp-uf main-container hdp-w-100">
  <div class="hdp-uf hdp-uf-dc hdp-w-100">
    <div class="hdp-uf hdp-uf-hsb menu-title hdp-w-100">
      <div class="hdp-uf hdp-uf-dc form" style="width:100%;background:#FFFFFF;padding:10px 40px 20px 20px">
        <div class="hdp-uf psc-font-3" style="">
          设置
        </div>
        <div class="hdp-uf" style="margin-top:20px">
          <div class="hdp-uf">
            <div class="hdp-uf hdp-uf-vc psc-font-1">
              角色名称
            </div>
            <div class="hdp-uf" style="margin-left:15px">
              <el-input v-model="RoleName" size="small" placeholder="请输角色名称"></el-input>
            </div>
          </div>
          <div class="hdp-uf" style="margin-left:15px">
            <el-button @click="confirm(1)" type="primary" size="small ">保存</el-button>
          </div>
          <div v-if="roleType" class="hdp-uf" style="margin-left:15px">
            <el-button @click="confirm(0)" size="small" type="danger" plain>删除</el-button>
          </div>
        </div>
        <div class="hdp-uf hdp-w-100 hdp-uf-dc" style="background:#FFFFFF;margin-top:10px;padding:10px 0">
          <div class="hdp-uf hdp-w-80">
            <el-table :data="roleauthority" stripe border>
              <el-table-column prop="name" label="功能模块" width="180">
                <template slot-scope="scope">
                  <el-checkbox :indeterminate="scope.row.indeterminate" v-model="scope.row.checkAll" @change="checked=>handleCheckAllChange(checked, scope.$index)">{{scope.row.name}}</el-checkbox>
                  <!-- <el-tag v-if="Editable"  v-else>{{scope.row.name}}</el-tag> -->
                </template>
              </el-table-column>
              <el-table-column label="权限">
                <template slot-scope="scope">
                  <el-checkbox-group v-model="scope.row.checkedPrivilege" @change="checked=>handleCheckedCitiesChange(checked, scope.$index)">
                    <el-checkbox border v-for="Privilege in scope.row.children" :key='Privilege.code' :label="Privilege.code">{{ Privilege.name }}
                    </el-checkbox>
                  </el-checkbox-group>
                  <!-- <el-tag v-if="Editable" v-else v-for="Privilege in scope.row.children">{{ Privilege.name }}</el-tag> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>
</template>
<script>
import commonFunc from '../../api/common/common.js'
import roleApi from '../../api/role.js'
export default {
  data() {
    return {
      currentMenuLeadListsData: [{
        'name': '角色编辑',
        'url': '/#/systemManagement/roleedit'
      }],
      title: {
        firstTitle: '角色编辑'
      },
      RoleName: this.$route.query.RoleName || '',
      roleType: '',
      roleauthority: [],
      ModulePrivilege: {}
    }
  },
  mounted() { // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
    this.$commonFunc.myConsole('mounted ======> members')
    document.title = this.title.firstTitle
    this.init()
  },
  methods: {
    handleCheckAllChange(val, index) {
      this.roleauthority[index].checkedPrivilege = val ? this.roleauthority[index].allPrivilege : []
      this.roleauthority[index].indeterminate = false
    },
    handleCheckedCitiesChange(value, index) {
      let checkedCount = value.length
      this.roleauthority[index].checkAll = checkedCount === this.roleauthority[index].allPrivilege.length
      this.roleauthority[index].indeterminate = checkedCount > 0 && checkedCount < this.roleauthority[index].allPrivilege.length
    },
    async init() {
      this.$commonFunc.myConsole('渲染完成后 ===> 开始默认加载相应的逻辑')
      this.$store.dispatch('menuLeadLists/setMenuLeadListsData', this.currentMenuLeadListsData)
      this.currentMenuLeadListsData.unshift(JSON.parse(this.$route.query.currentMenuLeadListsData)[1])
      this.currentMenuLeadListsData.unshift(JSON.parse(this.$route.query.currentMenuLeadListsData)[0])
      this.getRoleauthority()
    },
    getRoleauthority() {
      // if (!this.roleType) {
      //   this.$message.error('请选择角色')
      //   return
      // }
      // let conditionsParams = {
      //   'ID': this.roleType
      // }

      let resData = this.$route.query.roleauthority
      commonFunc.myConsole(resData)
      this.RoleName = this.$route.query.RoleName
      this.roleType = this.$route.query.roleType
      if (resData) {
        let checkedPrivilege = []
        let allPrivilege = []
        let indeterminate = false
        let checkAll = false
        for (let i = 0; i < resData.length; i++) {
          for (let j = 0; j < resData[i].children.length; j++) {
            if (resData[i].children[j].checked === true) {
              checkAll = true
              checkedPrivilege.push(resData[i].children[j].code)
            }
            allPrivilege.push(resData[i].children[j].code)
          }
          if (checkedPrivilege.length > 0 && checkedPrivilege.length === allPrivilege.length) {
            indeterminate = true
          }
          resData[i].checkedPrivilege = checkedPrivilege.concat()
          resData[i].allPrivilege = allPrivilege.concat()
          resData[i].checkAll = checkAll
          resData[i].indeterminate = indeterminate
          checkedPrivilege = []
          allPrivilege = []
          indeterminate = false
          checkAll = false
        }
      }
      commonFunc.myConsole(resData)
      this.roleauthority = resData
    },
    confirm(val) {
      if (val) {
        if (!this.RoleName) {
          this.$message.warning('请输入角色名称')
          return
        }
      }
      this.$confirm(val ? '是否确认保存?' : '是否确认删除该角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (val) {
          this.edit()
        } else {
          this.del()
        }
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
    },
    async edit() {
      for (let i = 0; i < this.roleauthority.length; i++) {
        if (this.roleauthority[i].checkedPrivilege.length > 0) {
          this.ModulePrivilege[this.roleauthority[i].code] = 1
          // commonFunc.myConsole(this.roleauthority[i].checkedPrivilege.length)
          for (let j = 0; j < this.roleauthority[i].checkedPrivilege.length; j++) {
            this.ModulePrivilege[this.roleauthority[i].checkedPrivilege[j]] = 1
          }
        }
      }
      let conditionsParams = {
        'ID': this.roleType || 0,
        'RoleName': this.RoleName,
        'Privilege': {
          ModulePrivilege: this.ModulePrivilege
        }
      }
      // commonFunc.myConsole(conditionsParams)
      let resData = await roleApi.getRoleedit(conditionsParams)
      if (!commonFunc.isDefine(this.roleType)) {
        this.roleType = resData.data.record.ID
        this.RoleName = resData.data.record.RoleName
      }
      if (resData.status === '000') {
        this.getrolelist(1)
        this.$message.success('保存成功')
      } else {
        this.$message.error('保存失败')
      }
    },
    async getrolelist(val) {
      let conditionsParams = {}
      let resData = await roleApi.getRolelist(conditionsParams)
      if (resData.status === '000') {
        localStorage.setItem('rolelist', JSON.stringify(resData.data.record))
        this.$router.push({
          name: 'role',
          query: {
            roleType: val ? this.roleType : '',
            RoleName: val ? this.RoleName : ''
          }
        })
      } else {
        // this.$message.error('用户名或密码错误')
      }
    },
    async del() {
      let conditionsParams = {
        'ArrayID': [this.roleType]
      }
      let resData = await roleApi.getRoledel(conditionsParams)
      this.roleType = ''
      this.RoleName = ''
      if (resData.status === '000') {
        this.getrolelist(0)
        this.$message.success('删除成功')
      } else {
        this.$message.error('删除失败')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-checkbox.is-bordered+.el-checkbox.is-bordered {
    margin-left: 0;
}
.el-checkbox.is-bordered {
    padding: 6px 20px 6px 10px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: normal;
    height: 34px;
    min-width: 126px;
    margin: 2px;
}
.el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #FF6D18;
}
.el-checkbox__inner:hover {
    border-color: #FF6D18;
}
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #FF6D18;
    border-color: #FF6D18;
}
.el-checkbox__input.is-checked+.el-checkbox__label {
    color: #FF6D18;
}
.el-checkbox.is-bordered.is-checked {
    border-color: #FF6D18;
}
</style>
