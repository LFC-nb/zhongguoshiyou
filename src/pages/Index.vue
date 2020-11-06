<template>
<div class="main-container">
  <div class="hdp-uf hdp-uf-dc hdp-w-100">
    <div class="hdp-uf hdp-uf-dc">
      <p class="psc-color-main psc-font-1">首页页面展示</p>
      <p class="psc-color-main psc-font-2">首页页面展示</p>
      <p class="psc-color-main psc-font-3">首页页面展示</p>
      <p class="psc-color-main psc-font-4">首页页面展示</p>
      <p class="psc-color-main psc-font-5">首页页面展示</p>
      <p class="psc-color-main psc-font-6">首页页面展示</p>
      <p class="psc-color-main psc-font-7">首页页面展示</p>
    </div>
  </div>
</div>
</template>
<script>
import commonFunc from '../api/common/common.js'
export default {
  data() {
    return {
      currentMenuLeadListsData: [{
        'name': '首页',
        'url': '/#/index'
      }]
    }
  },
  // 选项--生命周期钩子
  beforeCreate() { // 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
    // this.$commonFunc.myConsole('beforeCreate ======> demo')
  },
  created() { // 在实例创建完成后被立即调用
    // this.$commonFunc.myConsole('created ======> demo')
  },
  beforeMount() { // 在挂载开始之前被调用：相关的 render 函数首次被调用。
    // this.$commonFunc.myConsole('beforeMount ======> demo')
  },
  mounted() { // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
    // this.$commonFunc.myConsole('mounted ======> demo')
    document.title = '中石油-首页'
    this.init()
  },
  beforeUpdate() { // 数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。
    // this.$commonFunc.myConsole('beforeUpdate ======> demo')
  },
  updated() { // 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
    // this.$commonFunc.myConsole('updated ======> demo')
  },
  activated() { // keep-alive 组件激活时调用。
    this.$commonFunc.myConsole('activated ======> demo')
  },
  deactivated() { // keep-alive 组件停用时调用。
    this.$commonFunc.myConsole('deactivated ======> demo')
  },
  beforeDestroy() { // 实例销毁之前调用。在这一步，实例仍然完全可用。
    this.$commonFunc.myConsole('beforeDestroy ======> demo')
  },
  destroyed() { // Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
    this.$commonFunc.myConsole('destroyed ======> demo')
  },
  errorCaptured() { // 当捕获一个来自子孙组件的错误时被调用。
    this.$commonFunc.myConsole('errorCaptured ======> demo')
  },
  methods: {
    init() {
      this.$commonFunc.myConsole('渲染完成后 ===> 开始默认加载相应的逻辑')
      this.$store.dispatch('menuLeadLists/setMenuLeadListsData', this.currentMenuLeadListsData)
      commonFunc.myConsole('index')
      var echarts = require('echarts')

      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
