<template>
<div id="app">
  <router-view />
</div>
</template>

<script>
export default {
  name: 'App',
  beforeCreate() { // 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
    // this.$commonFunc.myConsole('beforeCreate ======> App')
    // 获取 apiServerHost--仅开发阶段使用
    if (this.$config.BASE === 'development') {
      this.$config.getApiServerHost()
    }
  },
  beforeUpdate() { // 数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。
    // this.$commonFunc.myConsole('beforeUpdate ======> App')
    // 获取 apiServerHost--仅开发阶段使用
    if (this.$config.BASE === 'development') {
      this.$config.getApiServerHost()
    }
  }
}
</script>

<style  lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;

  .el-textarea__inner:focus {
      outline: 0;
      border-color: #FF6D18;
  }
  .el-range-editor.is-active, .el-range-editor.is-active:hover {
      border-color: #FF6D18;
  }
  .el-input.is-active .el-input__inner, .el-input__inner:focus {
      border-color: #FF6D18;
      outline: 0;
  }
  .el-message-box__btns .el-button--primary {
      color: #fff !important;
      background-color: #FF6D18 !important;
      border-color: #FF6D18 !important;
  }
  .el-button--primary {
      //按钮正常状态
      color: #fff;
      background-color: #FF6D18;
      border-color: #FF6D18;
  }

  .el-button--primary:focus,
  .el-button--primary:hover {
      //鼠标悬停至按钮
      background-color: #ff7e33;
      border-color: #FF6D18;
  }
  .el-button--primary:active {
      //鼠标点击按钮
      background-color: #f16513;
  }
  .el-button--primarydel {
      color: #505050;
      border-color: #dcdfe6;
  }
  .el-button--primarydel:hover {
      color: #ff7e33;
      border-color: #ff7e33;
      background-color: #ecf5ff;
  }
  .el-button--primarydel:active,
  .el-button--primarydel:focus {
      color: #505050;
      border-color: #dcdfe6;
  }
  .font1 {
      color: #202020; //重要信息文字，标题文字
  }
  .font2 {
      color: #505050; //可选文字（未选中状态），次要信息文字
  }
  .font3 {
      color: #808080; //一般性文字
  }
  .font4 {
      color: #c0c0c0; //提示性文字（例如输入框提示文字）
  }
  .psc-color-1 {
      color: #808080;
  }
  .el-checkbox.is-bordered+.el-checkbox.is-bordered {
      margin: 5px;
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
  .el-checkbox__inner {
      border: 1px solid #808080;
  }
  .el-badge__content {
      background-color: #FF6D18;
      border-radius: 8px;
      color: #fff;
      display: inline-block;
      font-size: 12px;
      height: 16px;
      line-height: 16px;
      padding: 0 4px;
      text-align: center;
      white-space: nowrap;
      border: 1px solid #fff;
      // margin-left: -3px;
  }

  .el-submenu__title * {
      vertical-align: baseline;
  }
  .el-radio-button:last-child .el-radio-button__inner {
      border-radius: 4px;
  }
  .el-radio-button__orig-radio:checked+.el-radio-button__inner {
      color: #fff;
      background-color: #409EFF;
      border-color: #409EFF;
      -webkit-box-shadow: none!important;
      box-shadow: none!important;
  }

  .el-radio-button:first-child .el-radio-button__inner {
      border-left: 1px solid #dcdfe6;
      border-radius: 4px;
      -webkit-box-shadow: none!important;
      box-shadow: none!important;
  }
  .el-radio-button__inner {
      height: 32px;
      white-space: nowrap;
      background: #fff;
      border: 1px solid #dcdfe6;
      font-weight: 500;
      color: #606266;
      -webkit-appearance: none;
      text-align: center;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      margin: 0;
      cursor: pointer;
      -webkit-transition: all .3s cubic-bezier(.645,.045,.355,1);
      transition: all .3s cubic-bezier(.645,.045,.355,1);
      padding: 9px 20px;
      font-size: 12px;
      border-radius: 0;
  }
}
</style>
