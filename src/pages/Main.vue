<template>
  <div class="hdp-uf PSC-MainPage" id="PSC-MainPage">
    <div class="hdp-uf hdp-uf-dc ms-container">
      <PSCHeader
        :paramsObj="pscHeaderParams"
        @Changepswd="Changepswd"
        @act="logout"
      ></PSCHeader>
      <!-- 忘记密码 弹窗 -->
      <el-dialog
        :close-on-click-modal="false"
        title="修改密码"
        :visible.sync="ChangepswdDialogVisible"
        v-if="ChangepswdDialogVisible"
        width="500px"
      >
        <div class="dialog-content">
          <el-form
            ref="forgetForm"
            :model="forgetForm"
            :rules="forgetRules"
            label-width="100px"
          >
            <el-form-item label="新密码" prop="password" style="width: 400px">
              <el-input
                type="password"
                v-model="forgetForm.password"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="确认密码"
              prop="passwordRel"
              style="width: 400px"
            >
              <el-input
                type="password"
                v-model="forgetForm.passwordRel"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            size="small"
            @click="ChangepswdDialogVisible = false"
            type="primarydel"
            >取 消</el-button
          >
          <el-button size="small" @click="editinfo()" type="primary"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <div id="MS-Main" class="hdp-uf hdp-uf-vc ms-main">
        <div class="hdp-uf hdp-uf-dc psc-container">
          <!-- 顶部路由导航和用户信息显示 -->
          <ProHeader :paramsObj="proHeaderParams"></ProHeader>
          <div class="hdp-uf psc-container" style="padding-bottom: 20px">
            <div class="hdp-uf psc-side">
              <div class="psc-side-content">
                <el-row class="tac">
                  <el-col :span="12" style="width: 200px">
                    <el-menu
                      :default-active="defaultactive"
                      background-color=""
                      unique-opened
                      text-color=""
                      active-text-color="#FF6D18"
                      class="el-menu-vertical-demo"
                      @select="handleselect"
                      @open="handleOpen"
                      @close="handleClose"
                    >
                      <div v-for="item in menuLists" :key="item.code">
                        <el-menu-item v-if="!item.children" :index="item.code">
                          <router-link
                            to="/index"
                            class="hdp-uf hdp-uf-vc hdp-ut-s"
                            style="text-decoration: none"
                          >
                            <div class="psc-menu-item">
                              <i
                                class="fa fa-home fa-fw"
                                aria-hidden="true"
                                style="color: #666666"
                              ></i>
                              <span
                                slot="title"
                                class="psc-menu-item-text psc-color-3"
                                >{{ item.name }}</span
                              >
                            </div>
                          </router-link>
                        </el-menu-item>
                        <el-submenu v-if="item.children" :index="item.code">
                          <template slot="title">
                            <div class="psc-menu-item">
                              <i
                                class="fa fa-fw"
                                :class="item.icon"
                                style="color: #ff6d18"
                                aria-hidden="true"
                              ></i>
                              <span slot="title" class="psc-menu-item-text">{{
                                item.name
                              }}</span>
                              <el-badge
                                v-if="
                                  showTodo === true &&
                                  item.code === '95' &&
                                  badgevalue > 0
                                "
                                :value="badgevalue"
                                :max="10"
                                class="item"
                              >
                              </el-badge>
                            </div>
                          </template>
                          <el-menu-item-group>
                            <div
                              v-for="item_children01 in item.children"
                              :key="item_children01.code"
                            >
                              <el-menu-item
                                style="height: 32px; line-height: 32px"
                                v-if="item_children01.children.length === 0"
                                :index="item_children01.code"
                              >
                                <router-link
                                  :to="{
                                    path: item_children01.link,
                                    query: {
                                      link: item_children01.link,
                                      name: item.name,
                                      itemname: item_children01.name,
                                      code: item_children01.code,
                                    },
                                  }"
                                  :key="item_children01.code"
                                  @click.native="flushCom(item_children01.code)"
                                  class="hdp-uf hdp-uf-vc hdp-ut-s"
                                  style="text-decoration: none"
                                >
                                  <div
                                    class="psc-menu-item-noicon"
                                    style="margin-left: 10%; height: 32px"
                                  >
                                    <i
                                      class="fa fa-file-text-o fa-fw fa-children"
                                      style="color: #fcb852"
                                      aria-hidden="true"
                                    ></i>
                                    <span slot="title" class="psc-color-3">{{
                                      item_children01.name
                                    }}</span>
                                  </div>
                                </router-link>
                              </el-menu-item>
                              <el-submenu
                                v-if="item_children01.children.length > 0"
                                :index="item_children01.code"
                              >
                                <template slot="title">{{
                                  item_children01.name
                                }}</template>
                                <div
                                  v-for="item_children02 in item_children01.children"
                                  :key="item_children02.code"
                                >
                                  <el-menu-item :index="item_children02.code">{{
                                    item_children02.name
                                  }}</el-menu-item>
                                </div>
                              </el-submenu>
                            </div>
                          </el-menu-item-group>
                        </el-submenu>
                      </div>
                    </el-menu>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="hdp-uf psc-main hdp-uf-dc" id="Psc-Main">
              <div class="" style="overflow-y: scroll">
                <router-view :key="activeDate"> </router-view>
                <div
                  class="hdp-uf"
                  style="height: 50px; background-color: #eeeeee"
                ></div>
              </div>
            </div>
          </div>
          <!-- <div class="hdp-uf hdp-w-100" style="height:30px;background-color:#000;-moz-opacity:0.2;opacity: 0.2;margin-top:-20px;z-index:666">
        </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import commonFunc from "../api/common/common.js";
import demoApi from "../api/login.js";
import statisticschartsApi from "../api/statisticscharts.js";
import truckapplyApi from "../api/truckapply.js";
export default {
  name: "Main",
  data() {
    let validatePass4 = (rule, value, callback) => {
      if (this.forgetForm.passwordRel !== "") {
        this.$refs.forgetForm.validateField("passwordRel");
        callback();
      } else {
        callback();
      }
    };
    let validatePass5 = (rule, value, callback) => {
      if (this.forgetForm.password && value !== this.forgetForm.password) {
        callback(new Error("新密码和确认密码不一致!"));
      } else {
        callback();
      }
    };
    let passwordReg = /^[a-zA-Z0-9]{5,}$/;
    // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{8,15}$/
    return {
      ChangepswdDialogVisible: false,
      forgetForm: {
        password: "",
        passwordRel: "",
      },
      forgetRules: {
        phone: [
          {
            required: true,
            message: "请输入手机",
            trigger: "blur",
          },
          {
            pattern: /^\d{1,14}$/,
            message: "请输入手机号码",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur",
          },
          {
            pattern: passwordReg,
            message: "密码为长度至少5位的数字或字母", // '请输入8-15位数字和大、小写字母组合密码',
            trigger: "blur",
          },
          {
            validator: validatePass4,
            trigger: "blur",
          },
        ],
        passwordRel: [
          {
            required: true,
            message: "请输入确认密码",
            trigger: "blur",
          },
          {
            pattern: passwordReg,
            message: "密码为长度至少5位的数字或字母", // '请输入8-15位数字和大、小写字母组合密码',
            trigger: "blur",
          },
          {
            validator: validatePass5,
            trigger: "blur",
          },
        ],
        vaildCode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
        ],
      },
      pscHeaderParams: {},
      proHeaderParams: {
        // 顶部header传入参数
        userNickName: "PSC", // 用户信息
      },
      menuLists: [],
      defaultactive: "5",
      activeDate: "0",
      duration: 0,
      message: "",
      messageItem: "",
      Timeoutapply: "",
      Timeout: "",
      badgevalue: 0,
      showTodo: false, // 是否显示 审查列表  未处理数量 标记
    };
  },
  computed: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let userData = JSON.parse(localStorage.getItem("userData"));
      this.menuLists = userData.menuLists;
      this.proHeaderParams.userNickName = userData.nickName;
      this.defaultactive =
        localStorage.getItem("handleselectkey") ||
        userData.menuLists[0].children[0].code;
      this.showbadge();
      this.isnew();
    },
    isnew() {
      // code 判断是否有审批用车的权限 有则轮训
      this.menuLists[0].children.forEach((item, index, arr) => {
        if (item.code === "93") {
          this.messageItem = item;
          this.getCarApply_isnew();
          this.Timeoutapply = window.setInterval(() => {
            setTimeout(this.getCarApply_isnew, 0);
          }, 15000);
        }
      });
    },
    open1() {
      this.message = this.$notify({
        title: "提醒",
        message:
          '<span style="cursor:pointer;border-bottom: 1px solid #fff;color:#fff ">有新的用车申请未处理(点击跳转处理)</span>',
        // type: 'success',
        dangerouslyUseHTMLString: true,
        position: "bottom-right",
        offset: 100,
        duration: this.duration,
        onClick: this.noticlick,
      });
    },
    noticlick() {
      this.message.close();
      this.$router.push({
        path: this.messageItem.link,
        query: {
          link: this.messageItem.link,
          name: this.menuLists[0].name,
          code: this.messageItem.code,
          itemname: this.messageItem.name,
        },
      });
    },
    async getCarApply_isnew() {
      let conditionsParams = {};
      let resData = await truckapplyApi.getCarApply_isnew(conditionsParams);
      if (resData.status === "000") {
        if (resData.data.record) {
          this.open1();
        }
      } else {
      }
    },
    showbadge() {
      let newArr = this.menuLists.filter((item, index, arr) => {
        return item.code === "95";
      });
      let arr = [];
      if (newArr.length > 0) {
        arr = newArr[0].children.filter((item, index, arr) => {
          return item.code === "97";
        });
      }
      if (arr.length > 0) {
        this.showTodo = true;
        this.getQuestion_todo();
        this.Timeout = window.setInterval(() => {
          setTimeout(this.getQuestion_todo, 0);
        }, 5000);
      }
    },
    flushCom(val) {
      this.activeDate = val;
    },
    handleselect(key, keyPath) {
      localStorage.setItem("handleselectkey", key);
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath)
    },
    getServerData() {},
    logout() {
      this.$confirm("是否确认退出？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          window.clearTimeout(this.Timeout);
          window.clearTimeout(this.Timeoutapply);
          document.title = "青橄榄智慧后勤";
          localStorage.removeItem("userData");
          localStorage.removeItem("isLogin");
          localStorage.removeItem("userDataInfo");
          localStorage.removeItem("handleselectkey");
          localStorage.clear();
          this.$commonFunc.myConsole("ok");
          if (localStorage.getItem("issupplierLogin") === "true") {
            // localStorage存值 boolean变 string
            this.$router.push("/Loginsupplier");
          } else {
            this.$router.push("/");
          }
          localStorage.removeItem("Loginsupplier");
        })
        .catch(() => {
          this.$commonFunc.myConsole("cancel");
        });
    },

    async getQuestion_todo() {
      let conditionsParams = {};
      let resData = await statisticschartsApi.getQuestion_todo(
        conditionsParams
      );
      if (resData.status === "000") {
        this.badgevalue = resData.data.record;
      } else {
        this.$message.error("获取失败！");
      }
    },
    Changepswd() {
      this.ChangepswdDialogVisible = true;
      this.forgetForm.password = "";
      this.forgetForm.passwordRel = "";
    },
    async editinfo() {
      if (!this.forgetForm.password || !this.forgetForm.passwordRel) {
        this.$message.warning("请设置供应商密码");
        return;
      } else if (!(this.forgetForm.password === this.forgetForm.passwordRel)) {
        this.$message.warning("密码不一致");
        return;
      }
      let resData;
      // localStorage存值 boolean变 string
      // if (localStorage.getItem('issupplierLogin') === 'true') {
      commonFunc.myConsole(JSON.parse(localStorage.getItem("userData")));
      // UserType 3供应商下的配送员
      if (JSON.parse(localStorage.getItem("userData")).UserType === 3) {
        let conditionsParams = {
          Password: this.forgetForm.password,
        };
        commonFunc.myConsole(conditionsParams);
        resData = await demoApi.Employee_newpass(conditionsParams);
      } else if (JSON.parse(localStorage.getItem("userData")).UserType === 2) {
        // UserType 2 供应商
        let conditionsParams = {
          Password: this.forgetForm.password,
          NickName: JSON.parse(localStorage.getItem("userData")).nickName,
          Phone: JSON.parse(localStorage.getItem("userData")).phone,
          Address: JSON.parse(localStorage.getItem("userData")).address,
        };
        commonFunc.myConsole(conditionsParams);
        resData = await demoApi.Supplier_newpass(conditionsParams);
      } else if (JSON.parse(localStorage.getItem("userData")).UserType === 0) {
        // UserType0企业人员
        let conditionsParams = {
          Password: this.forgetForm.password,
          NickName: JSON.parse(localStorage.getItem("userData")).nickName,
          Phone: JSON.parse(localStorage.getItem("userData")).phone,
        };
        commonFunc.myConsole(conditionsParams);
        resData = await demoApi.Manager_editinfo(conditionsParams);
      }
      commonFunc.myConsole(resData);
      if (resData.status === "000") {
        this.ChangepswdDialogVisible = false;
        // localStorage.removeItem('userData')
        // localStorage.removeItem('isLogin')
        // this.$router.push('/')
        this.$message({
          type: "success",
          message: "修改成功!",
        });
      } else {
        this.$message({
          type: "error",
          message: "修改失败!",
        });
      }
    },
  },
};
</script>
<style lang="scss">
.el-notification__closeBtn:hover {
  color: #fff;
}
.el-notification__closeBtn {
  position: absolute;
  top: 18px;
  right: 15px;
  cursor: pointer;
  color: #fff;
  font-size: 16px;
}
.el-notification__title {
  text-align: left !important;
  padding: 0 !important;
  font-weight: 700;
  font-size: 16px;
  color: #fff !important;
  margin: 0;
}
.el-notification__content {
  font-size: 14px;
  line-height: 21px;
  margin: 6px 0 0;
  color: #fff;
  text-align: justify;
}
.el-notification {
  color: #f56c6c;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 330px;
  padding: 14px 26px 14px 13px;
  border-radius: 8px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid #fde2e2;
  position: fixed;
  background-color: #f87f38 !important;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  -webkit-transition: opacity 0.3s, left 0.3s, right 0.3s, top 0.4s, bottom 0.3s,
    -webkit-transform 0.3s;
  transition: opacity 0.3s, left 0.3s, right 0.3s, top 0.4s, bottom 0.3s,
    -webkit-transform 0.3s;
  transition: opacity 0.3s, transform 0.3s, left 0.3s, right 0.3s, top 0.4s,
    bottom 0.3s;
  transition: opacity 0.3s, transform 0.3s, left 0.3s, right 0.3s, top 0.4s,
    bottom 0.3s, -webkit-transform 0.3s;
  overflow: hidden;
}
#MS-Main {
  // .el-tabs--bottom .el-tabs__item.is-bottom:last-child, .el-tabs--bottom .el-tabs__item.is-top:last-child, .el-tabs--top .el-tabs__item.is-bottom:last-child, .el-tabs--top .el-tabs__item.is-top:last-child {
  //     padding-right: 20px;
  // }
  // .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
  //     padding-left: 20px;
  // }
  .el-table {
    font-size: 12px;
    color: #606266;
  }
  .fa {
    font: normal normal normal 16px/1 FontAwesome;
  }
  .fa-children {
    font: normal normal normal 14px/1 FontAwesome;
  }
  .el-submenu__title {
    font-size: 12px;
  }
  .el-menu-item {
    font-size: 12px;
  }
  .el-menu-item-group__title {
    padding: 0;
    line-height: normal;
    font-size: 12px;
    color: #909399;
  }

  .el-message-box__btns > .el-button--default:focus,
  .el-button--default:hover {
    color: #ff7e33 !important;
    border-color: #ff7e33 !important;
    background-color: #ecf5ff !important;
  }
  .el-message-box__btns > .el-button--primary:focus,
  .el-button--primary:hover {
    color: #fff !important;
    background-color: #ff6d18 !important;
    border-color: #ff6d18 !important;
  }

  .el-button--primary {
    //按钮正常状态scoped
    color: #fff !important;
    background-color: #ff6d18 !important;
    border-color: #ff6d18 !important;
  }
  .el-button--primary:focus,
  .el-button--primary:hover {
    //鼠标悬停至按钮
    color: #fff !important;
    background-color: #ff7e33 !important;
    border-color: #ff6d18 !important;
  }
  .el-button--primary:active {
    //鼠标点击按钮
    background-color: #f16513 !important;
  }
  .el-button--primarydel {
    color: #505050 !important;
    border-color: #dcdfe6 !important;
  }
  .el-button--primarydel:hover {
    color: #ff7e33 !important;
    border-color: #ff7e33 !important;
    background-color: #ecf5ff !important;
  }
  .el-button--primarydel:active,
  .el-button--primarydel:focus {
    color: #505050 !important;
    border-color: #dcdfe6 !important;
  }
  .el-submenu__icon-arrow {
    position: absolute;
    top: 50%;
    right: 13px;
    margin-top: -7px;
    -webkit-transition: -webkit-transform 0.3s;
    transition: -webkit-transform 0.3s;
    transition: transform 0.3s;
    transition: transform 0.3s, -webkit-transform 0.3s;
    transition: transform 0.3s, -webkit-transform 0.3s;
    font-size: 12px;
  }
  .el-menu-item,
  .el-submenu__title {
    padding-left: 5px !important;
    height: 32px;
    line-height: 32px;
    position: relative;
    -webkit-box-sizing: border-box;
    white-space: nowrap;
    list-style: none;
  }
}
#Psc-Main {
  .el-button + .el-button {
    margin-left: 5px;
  }
  .el-dialog__title {
    line-height: 22px;
    font-size: 16px;
  }
  .el-dialog__footer {
    padding: 0px 20px 10px;
  }
  .el-dialog__header {
    padding: 10px 20px 0px;
  }
  .el-form-item--small .el-form-item__content,
  .el-form-item--small .el-form-item__label {
    line-height: 40px;
  }
  .el-form-item {
    margin-bottom: 5px;
  }
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 5px;
  }
  .el-divider {
    display: block;
    height: 1px;
    width: 100%;
    margin: 24px 0;
  }
  .el-input__inner {
    font-size: 12px;
  }
  .el-dialog__body {
    padding: 10px 20px 10px 20px;
  }
  .el-form-item__label {
    font-size: 12px;
  }
  .el-input-number--small {
    width: 175px;
    line-height: 30px;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 175px;
  }
  .block .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 350px;
  }
  .el-form--inline .el-form-item__content {
    display: inline-block;
    vertical-align: top;
    width: 175px;
  }
  #tag-el-form-item__content .el-form-item__content {
    display: inline-block;
    vertical-align: top;
    width: 175px;
  }
  // .el-select {
  //     display: block;
  //     position: relative;
  // }
  .cell .el-button--small,
  .el-button--small.is-round {
    padding: 5px 10px;
  }
  .el-table thead {
    color: #333333;
    // font-weight: bold;
  }
  .el-table td,
  .el-table th {
    padding: 5px 0;
    min-width: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    text-align: left;
  }
  .el-pagination__sizes .el-input .el-input__inner:hover {
    border-color: #ff6d18;
  }
  .el-tag {
    margin-right: 10px;
  }
  .button-new-tag {
    margin-left: 0px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}
#PSC-MainPage {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  .ms-container {
    width: 100%;
    .ms-main {
      width: 100%;
      height: 100%;
      overflow-y: hidden;
      padding-top: 60px;
      .psc-side {
        width: 200px;
        background-color: #ffffff;
        overflow: hidden;
        .psc-side-content {
          width: 215px;
          height: 100%;
          overflow-y: scroll;
          overflow-x: hidden;
          margin-right: -15px;
          .psc-menu-item {
            padding: 0 8px;
            .psc-menu-item-text {
              padding-left: 0px;
            }
          }
          .psc-menu-item-noicon {
            padding: 0;
          }
        }
      }
      .psc-main {
        width: calc(100% - 195px);
        background-color: #eeeeee;
        padding: 10px 10px;
        // overflow-y: scroll;
      }
    }
  }
}
</style>
