<template>
<div class="hdp-uf PSCHeader" id="PSCHeader">
  <nav class="psc-nav">
    <div class="hdp-uf hdp-uf-hc hdp-uf-vc">
      <!-- pc header展示 -->
      <div class="hdp-uf hdp-uf-vc psc-nav-content">
        <div class="hdp-uf hdp-uf-hc hdp-uf-vc hdp-h-100 psc-bg-1" style="width:200px;">
          <img class="logo_deloitte" src="../assets/images/anyue-logo-white.png" alt="">
        </div>
        <div class="hdp-uf hdp-h-100 psc-bg-2" style="width:calc(100% - 200px);">
          <div class="hdp-uf hdp-uf-hsb hdp-uf-vc hdp-w-100" style="padding:0 2rem;">
            <p>
              蜀南气矿安岳采气作业区
            </p>
            <div class="hdp-uf">
              <div class="hdp-uf">
                <div class="hdp-uf hdp-uf-hc hdp-uf-vc hdp-hand-act-1 loginOutBtn" @click="btnActivated">
                  <i class="fa fa-sign-out fa-fw" aria-hidden="true"></i>&nbsp;&nbsp;<span>退出</span>
                </div>
                <div class="hdp-uf hdp-uf-hc hdp-uf-vc hdp-hand-act-1 loginOutBtn" @click="btnChangepswd">
                  <i class="fa fa-stack-exchange fa-fw" aria-hidden="true"></i>&nbsp;&nbsp;<span>修改密码</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</div>
</template>

<script>
export default {
  name: 'PSCHeader',
  props: ['paramsObj'], // 调用组件传递过来的相关参数
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      headerType: 0
    }
  },
  mounted() {
    this.init()
  },
  computed: {},
  methods: {
    init() {
      this.$commonFunc.myConsole('PSCHeader 组件渲染完成')
    },
    btnActivated() {
      this.$emit('act')
    },
    btnChangepswd() {
      this.$emit('Changepswd')
    },
    handleCommand(val) {
      this.$commonFunc.myConsole(val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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

#PSCHeader {
    position: fixed;
    z-index: 1999;
    width: 100%;
    min-width: 1024px;
    a {
        color: #FFFFFF;
        text-decoration: none;
    }
    .psc-nav {
        top: 0;
        right: 0;
        left: 0;
        display: block;
        margin: 0;
        width: 100%;
        height: 60px;
        max-height: 60px;
        color: #FFFFFF;
        font-size: 17px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-backdrop-filter: saturate(180%) blur(20px);
        backdrop-filter: saturate(180%) blur(20px);
        .psc-nav-content {
            width: 100%;
            height: 60px;
            .logo_deloitte {
                height: 40px;
                width: auto;
            }
            .loginOutBtn {
                height: 30px;
                width: auto;
                font-size: 14px;
                padding: 0 1rem;
                color: #FFFFFF;
            }
        }
    }
}
</style>
