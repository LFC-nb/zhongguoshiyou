<template>
<div class="hdp-uf hdp-uf-vc hdp-uf-dc ActionBtn">
  <div class="button-get hdp-hand-act-1" @click="btnActivated">
    <i class="fa fa-sign-out fa-fw" aria-hidden="true"></i>
    {{ btnText }}
  </div>
</div>
</template>

<script>
export default {
  name: 'ActionBtn',
  props: ['paramsObj'], // 调用组件传递过来的相关参数
  data() {
    return {
      btnText: this.paramsObj.btnText || '点击按钮'
    }
  },
  mounted() {
    this.init()
  },
  computed: {},
  methods: {
    init() {
      this.$commonFunc.myConsole('ActionBtn 组件渲染完成')
    },
    btnActivated() {
      this.$emit('act')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.ActionBtn {
    .button-get {
        margin: 2rem 0;
        color: #FFFFFF;
        background-color: #42b983;
        padding: 0.5rem 1rem;
        border-radius: 0.35rem;
    }
}
</style>
