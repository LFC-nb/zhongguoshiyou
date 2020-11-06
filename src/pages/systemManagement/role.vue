<template>
<div class="hdp-uf main-container hdp-w-100">
  <div class="hdp-uf hdp-uf-dc hdp-w-100">
    <div class="hdp-uf hdp-uf-hsb menu-title hdp-w-100">
      <div class="hdp-uf hdp-uf-dc" style="width:100%;background:#FFFFFF;padding:10px">
        <div class="hdp-uf hdp-w-90" style="margin-top:15px">
          <div class="hdp-uf">
            <div class="hdp-uf hdp-uf-vc psc-font-1">
              选择角色
            </div>
            <div class="hdp-uf" style="margin-left:15px">
              <el-select @change="roleNameChange" v-model="roleType" size="small" placeholder="请选择">
                <el-option v-for="item in rolelist" :key="item.ID" :label="item.RoleName" :value="item.ID">
                </el-option>
              </el-select>
            </div>
          </div>
          <!-- <div class="hdp-uf hdp-w-10 hdp-uf-hfe" style="margin-left:15px">
            <el-button @click="getRoleauthority()" type="primarydel" size="small ">查询</el-button>
          </div> -->
          <div v-if="edittype" class="hdp-uf psc-font-3" style="margin-left:15px">
            <el-button @click="roleedit(0)" type="primarydel" size="small">编辑</el-button>
          </div>
          <div class="hdp-uf hdp-w-10 " style="margin-left:15px">
            <el-button @click="roleedit(1)" type="primary" size="small ">新增角色</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="hdp-uf hdp-w-100 hdp-uf-dc" style="background:#FFFFFF;margin-top:20px;padding:10px">
      <div class="hdp-uf hdp-w-80" style="margin-top:10px">
        <el-table :data="roleauthority" stripe border>
          <el-table-column prop="RoleName" label="角色" width="180">
          </el-table-column>
          <el-table-column prop="name" label="功能模块" width="180">
          </el-table-column>
          <el-table-column label="权限" >
            <template slot-scope="scope">
              <el-tag v-for="Privilege in scope.row.children.filter(item => item.checked === true )" :key='Privilege.code'>{{ Privilege.name }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
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
        'name': this.$route.query.name,
        'url': '/#' + this.$route.query.link
      }, {
        'name': this.$route.query.itemname,
        'url': '/#' + this.$route.query.link
      }],
      title: {
        firstTitle: this.$route.query.itemname
      },
      RoleName: this.$route.query.RoleName || '',
      roleType: parseInt(this.$route.query.roleType) || '',
      rolelist: JSON.parse(localStorage.getItem('rolelist')),
      roleauthority: [],
      allroleauthority: [],
      edittype: false
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
      this.allRoleauthority()
      if (!this.roleType) {
        if (!commonFunc.isDefine(this.rolelist)) {
          return
        }
        if (this.rolelist.length > 0) {
          this.roleType = this.rolelist[0].ID
          this.RoleName = this.rolelist[0].RoleName
        }
      }
      this.getRoleauthority()
    },
    async allRoleauthority() { // 获取角色 所有能选择的权限  直接添加角色的时候使用
      let conditionsParams = {
        'ID': 0
      }
      commonFunc.myConsole(111111)
      commonFunc.myConsole(conditionsParams)
      let resData = await roleApi.getRoleset(conditionsParams)
      commonFunc.myConsole(resData)
      if (resData.status === '000') {
        this.allroleauthority = resData.data.record
      }
    },
    async getRoleauthority() {
      if (!this.roleType) {
        this.$message.error('请选择角色')
        return
      }
      let conditionsParams = {
        'ID': this.roleType
      }
      commonFunc.myConsole(conditionsParams)
      let resData = await roleApi.getRoleset(conditionsParams)
      commonFunc.myConsole(resData)
      if (resData.status === '000') {
        if (resData.data.record) {
          this.edittype = true
          resData.data.record[0].RoleName = this.RoleName
          //   let checkedPrivilege = []
          //   let allPrivilege = []
          //   let indeterminate = false
          //   let checkAll = false
          //   for (let i = 0; i < resData.data.record.length; i++) {
          //     for (let j = 0; j < resData.data.record[i].children.length; j++) {
          //       if (resData.data.record[i].children[j].checked === true) {
          //         checkAll = true
          //         checkedPrivilege.push(resData.data.record[i].children[j].code)
          //       }
          //       allPrivilege.push(resData.data.record[i].children[j].code)
          //     }
          //     if (checkedPrivilege.length === allPrivilege.length) {
          //       indeterminate = true
          //     }
          //     resData.data.record[i].checkedPrivilege = checkedPrivilege.concat()
          //     resData.data.record[i].allPrivilege = allPrivilege.concat()
          //     resData.data.record[i].checkAll = checkAll
          //     resData.data.record[i].indeterminate = indeterminate
          //     checkedPrivilege = []
          //     allPrivilege = []
          //     indeterminate = false
          //     checkAll = false
          //   }
        }
        this.roleauthority = resData.data.record
        // this.RoleName = ''
        // this.roleType = ''
      } else {
        // commonFunc.myConsole('返回错误')
        // 封装公共函数统一进行错误码处理
      }
    },
    roleNameChange(value) {
      this.RoleName = this.rolelist.find(item => item.ID === value).RoleName
      this.getRoleauthority()
    },
    roleedit(val) {
      this.$router.push({
        name: 'roleedit',
        query: {
          roleauthority: val === 1 ? this.allroleauthority : this.roleauthority,
          RoleName: val === 1 ? '' : this.RoleName,
          roleType: val === 1 ? '' : this.roleType,
          type: this.edittype,
          currentMenuLeadListsData: JSON.stringify(this.currentMenuLeadListsData)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-tag {
    background-color: #FFFFFF;
    border: 0px solid rgba(64,158,255,.2);
    margin: 2px;
    padding: 0;
    height: 34px;
    min-width: 126px;
    line-height: 30px;
    font-size: 14px;
    color: #FF6D18;
    // text-align: center;
}
</style>
