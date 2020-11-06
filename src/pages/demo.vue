<template>
<div class="hdp-uf demo">
  <div class="hdp-uf hdp-uf-vc hdp-uf-dc demo-content">
    <div class="hdp-uf hdp-uf-vc hdp-uf-dc hdp-w-50">
      <h1>{{ msg }}</h1>
      <h2>Demo Basic Page</h2>
    </div>
    <div class="hdp-uf hdp-uf-vc hdp-uf-dc hdp-w-50">
      <ActionBtn :paramsObj="actionBtnParams" @act="getServerData"></ActionBtn>
      <div class="showJson">{{ resDataObj }}</div>
    </div>
  </div>
</div>
</template>

<script>
import {
  mapState,
  mapGetters
} from 'vuex'

export default {
  name: 'Demo',
  // 选项--生命周期钩子
  beforeCreate() { // 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
    this.$commonFunc.myConsole('beforeCreate ======> demo')
  },
  created() { // 在实例创建完成后被立即调用
    this.$commonFunc.myConsole('created ======> demo')
  },
  beforeMount() { // 在挂载开始之前被调用：相关的 render 函数首次被调用。
    this.$commonFunc.myConsole('beforeMount ======> demo')
  },
  mounted() { // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
    this.$commonFunc.myConsole('mounted ======> demo')
    document.title = 'VUE-WEB-Demo'
    this.init()
  },
  beforeUpdate() { // 数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。
    this.$commonFunc.myConsole('beforeUpdate ======> demo')
  },
  updated() { // 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
    this.$commonFunc.myConsole('updated ======> demo')
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
  // 选项--数据
  data() {
    return {
      msg: 'Welcome to VUE-WEB',
      actionBtnParams: {
        'btnText': 'TEST -- 从后端取数据'
      }
    }
  },
  computed: {
    ...mapState({
      resDataArr: state => state.demo.resDataArr
    }),
    ...mapGetters({
      resDataObj: 'demo/GET_RES_DATA_OBJ'
    }),
    resData() {
      return this.$store.state.demo.resDataObj
    }
  },
  methods: {
    init() {
      this.$commonFunc.myConsole('渲染完成后 ===> 开始默认加载相应的逻辑')
    },
    getServerData() {
      let paramsObj = {
        'userName': 'demo',
        'passWord': '123456'
      }
      this.$store.dispatch('demo/getServerData', paramsObj)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1,
h2 {
    font-weight: normal;
    line-height: 5rem;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

.demo {
    width: 100%;
    height: 100%;
    padding: 3rem 0;
    .demo-content {
        width: 100%;
    }
}

.showJson {
    width: 80%;
    min-height: 20rem;
    padding: 1rem;
    background: rgba(242,242,242,0.7);
    border-radius: 1rem;
}
</style>
