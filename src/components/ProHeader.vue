<template>
<div class="hdp-uf pro-header" id="pro-header">
  <div class="hdp-uf hdp-uf-vc hdp-uf-hc hdp-h-100" style="width:200px;">
    <div class="hdp-uf">
      <p>
        <img class="user-icon" src="../assets/images/demoUserIcon.png" alt="">
      </p>
    </div>
    <div class="hdp-uf hdp-mar-l-1">
      <p class="hdp-uf psc-font-2">{{ paramsObj.userNickName }}</p>
      <!-- <p class="psc-font-1 psc-color-4">超级用户</p> -->
    </div>
  </div>
  <div class="hdp-uf" style="width:calc(100% - 240px);">
    <div class="hdp-uf hdp-uf-vc hdp-w-100 hdp-h-100 psc-font-2" style="padding: 10px 15px;">
      <ul class="hdp-uf">
        <li v-for="(item, index) in menuLeadListsData" :key="index">
          <a :href="cnpcay+item.url" class="psc-color-1">
            <span>{{ item.name }}</span><span v-if="index !== menuLeadListsData.length-1">&nbsp;>&nbsp;</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import config from '../config/config.js'
export default {
  name: 'ProHeader',
  props: ['paramsObj'], // 调用组件传递过来的相关参数
  data() {
    return {
      cnpcay: config.APISERVER.cnpcay
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    menuLeadListsData() {
      return this.$store.state.menuLeadLists.menuLeadListsDataArr
    }
  },
  methods: {
    init() {
      this.$commonFunc.myConsole('pro-header 组件渲染完成')
    },
    btnActivated() {
      this.$emit('act')
    },
    handleCommand(val) {
      this.$commonFunc.myConsole(val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pro-header {
    height: 50px;
    width: 100%;
    background-color: #FFFFFF;
    border-bottom: 1px solid #F4F4F4;
    .user-icon {
        height: 2rem;
        width: auto;
        border-radius: 1.5rem;
    }
    a {
        text-decoration: none;
    }
}
</style>
