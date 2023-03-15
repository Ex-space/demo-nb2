<!--  -->
<template>
  <div class="head-container">
    <div class="navbar">
      <router-link class="name" to="/index">{{ name }}</router-link>
      <div class="nav">
        <div class="subnav" style="cursor:pointer" @click="openSearch">
          <span class="iconfont icon-sousuo"></span>
          <div>搜索</div>
        </div>
        <router-link to="/index" class="subnav">
          <span class="iconfont icon-shouye"></span>
          <div>首页</div>
        </router-link>
        <Dropdown class="down">
          <div class="subnav specialfx" style="cursor:pointer">
            <span class="iconfont icon-faxian"></span>
            <div>发现</div>
            <span class="iconfont icon-xiangxia"></span>
          </div>
          <Dropdown-menu slot="list">
            <Dropdown-item>
              <router-link to="/archives" class="subnav subsubnav">
                <span class="iconfont icon-guidang"></span>
                <div>归档</div>
              </router-link>
            </Dropdown-item>
            <Dropdown-item>
              <router-link to="/categories" class="subnav subsubnav">
                <span class="iconfont icon-fenlei"></span>
                <div>分类</div>
              </router-link>
            </Dropdown-item>
            <Dropdown-item>
              <router-link to="/tags" class="subnav subsubnav">
                <span class="iconfont icon-biaoqian"></span>
                <div>标签</div>
              </router-link>
            </Dropdown-item>
          </Dropdown-menu>
        </Dropdown>
        <router-link to="/friends" class="subnav">
          <span class="iconfont icon-fenxiang" style="font-size:23px;margin-right: 2px;"></span>
          <div>友链</div>
        </router-link>
        <router-link to="/albums" class="subnav">
          <span class="iconfont icon-xiangce"
            style="font-size:23px;margin-right: 4px;transform: scaleX(.97) scaleY(1..07);"></span>
          <div>相册</div>
        </router-link>
        <router-link to="/about" class="subnav">
          <span class="iconfont icon-a-fabufeihangzhifeiji
                        "></span>
          <div>关于</div>
        </router-link>
        <router-link to="/resources" class="subnav">
          <span class="iconfont icon-ziyuan" style="font-size:15px;transform:scaleX(1.2) ;"></span>
          <div style="margin-left:2.5px">资源</div>
        </router-link>
        <router-link to="/messages" class="subnav">
          <span class="iconfont icon-liuyan"></span>
          <div>留言</div>
        </router-link>
        <Dropdown class="down" v-if="this.$cookies.get('isLogin') === 'true'">
          <router-link to="/center" class="yd subnav special">
            <div class="avatar">
              <img :src=avatar alt="">
            </div>
            <div>个人中心</div>
          </router-link>
          <Dropdown-menu slot="list">
            <Dropdown-item>
              <router-link to="/center" class="subnav subsubnav" style="transform:translateX(-13px);">
                <span class="iconfont icon-gerenzhongxin-shezhi-"></span>
                <div>设置</div>
              </router-link>
            </Dropdown-item>
            <Dropdown-item>
              <router-link to="/login" class="subnav subsubnav">
                <span class="iconfont icon-a-ziyuan674"></span>
                <div>切换账户</div>
              </router-link>
            </Dropdown-item>
            <Dropdown-item>
              <div @click="LogOut" class="subnav subsubnav">
                <span class="iconfont icon-tuichudenglu"></span>
                <div>退出登录</div>
              </div>
            </Dropdown-item>
          </Dropdown-menu>
        </Dropdown>
        <router-link to="/login" class="subnav" v-else>
          <span class="iconfont icon-denglu"></span>
          <div>登录</div>
        </router-link>
      </div>
    </div>
    <search v-if="Visible"></search>
  </div>
</template>

<script>
import search from '@/components/search/search.vue'
import { mapState } from 'vuex';
export default {
  data() {
    return {
      searchVisiable: false,
    };
  },

  components: {
    search
  },
  watch:{
    avatar(){
      var yd=document.querySelector('.yd')
      yd.style.transform='translateY(0px)'
    }
  },
  async created() {
    let token = this.$cookies.get('token')
    if (token) {
      this.$http.post(
        '/user/info', {}, {
        headers: {
          'Authorization': token,

        },
      }).then(res => {
        this.$store.state.avatar.avatar = res.data.data.avatar
      }).catch(Error => {
        this.$Notice.error({
          title: '登录信息可能过期了！',
          desc: '很抱歉因为某种不明原因您的登录信息丢失了！重新登陆再试试吧！'
        })
      })
    }
  },
  computed: {
    ...mapState('me', ['name']),
    ...mapState('modal', ['Visible']),
    ...mapState('avatar', ['avatar'])
  },

  methods: {
    openSearch() {
      this.$store.state.modal.Visible = true
    },
    LogOut() {
      this.$store.state.isLogin.Login = false
      this.$cookies.remove('token')
      this.$cookies.remove('isLogin')
      location.reload()
    }
  }
}

</script>
<style lang='less' scoped>
@keyframes flowCss {
  0% {
    /* 移动背景位置 */
    background-position: 0 0;
  }

  100% {
    background-position: -400% 0;
  }
}

.head-container {


  .avatar {
    transition: all .5s;
    width: 30px;
    height: 30px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 7px;

    img {
      transition: all .5s;
      width: 100%;
      height: 100%;
    }
  }

  .navbar {
    top: 0;
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: rgba(0, 0, 0, 0.6);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(7px);
    -webkit-backdrop-filter: blur(5.5px);

    .nav {
      float: right;
      margin-right: 10px;
      display: flex;
      justify-content: end;
      height: 100%;

      .down {
        transform: translateY(17px);
      }

      .subnav {
        margin-left: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        transition: all .3s;

        .iconfont {
          font-size: 18px;
          margin-right: 6px;
        }

        .icon-xiangxia {
          margin-right: 0;
          margin-left: 4px;
          font-size: 12px;
          transform: scale(.8);
        }
      }

      .subnav::before {
        content: '';
        height: 1.5px;
        background: rgb(255, 255, 255);
        /* 伪元素默认样式 display: inline;所以需要转成inline-block宽高才会生效 */
        display: inline-block;
        /* 通过定位使下划线在最低层 */
        position: absolute;
        bottom: 13px;
        width: 0;
        /* 加上一个过渡效果，使之丝滑一些 */
        transition: width 0.36s;
      }

      .subnav:hover::before {
        /* 悬浮时候，让下划线伪元素宽度变成100%即可出现效果 */
        width: 50px;
      }

      .special::before {
        content: '';
        height: 2px;
        background: rgb(255, 255, 255);
        /* 伪元素默认样式 display: inline;所以需要转成inline-block宽高才会生效 */
        display: inline-block;
        /* 通过定位使下划线在最低层 */
        position: absolute;
        bottom: -2px;
        width: 0;
        /* 加上一个过渡效果，使之丝滑一些 */
        transition: width 0.36s;
      }

      .special:hover::before {
        /* 悬浮时候，让下划线伪元素宽度变成100%即可出现效果 */
        width: 85px;
      }

      .special:hover .avatar {
        /* 悬浮时候，让下划线伪元素宽度变成100%即可出现效果 */
        transform: scale(.8);
      }

      .specialfx::before {
        content: '';
        height: 2px;
        background: rgb(255, 255, 255);
        /* 伪元素默认样式 display: inline;所以需要转成inline-block宽高才会生效 */
        display: inline-block;
        /* 通过定位使下划线在最低层 */
        position: absolute;
        bottom: -2px;
        width: 0;
        /* 加上一个过渡效果，使之丝滑一些 */
        transition: width 0.36s;
      }

      .specialfx:hover::before {
        /* 悬浮时候，让下划线伪元素宽度变成100%即可出现效果 */
        width: 68px;
      }

      .special1::before {
        content: '';
        height: 2px;
        background: rgb(255, 255, 255);
        /* 伪元素默认样式 display: inline;所以需要转成inline-block宽高才会生效 */
        display: inline-block;
        /* 通过定位使下划线在最低层 */
        position: absolute;
        bottom: 12px;
        width: 0;
        /* 加上一个过渡效果，使之丝滑一些 */
        transition: width 0.36s;
      }

      .special1:hover::before {
        /* 悬浮时候，让下划线伪元素宽度变成100%即可出现效果 */
        width: 68px;
      }

      .subsubnav::before {
        height: 0;
      }

      .subsubnav {
        margin: 0 -30px;
        height: 15px;
        color: #000;
      }

      .subnav:hover {
        color: #fcbc5b;
      }
    }

    .name {
      font-family: 'PingFang SC';
      background: -webkit-linear-gradient(135deg,
          rgb(179, 255, 200),
          rgb(255, 137, 194),
          rgb(179, 251, 255),
          rgb(255, 230, 204),
          rgb(179, 255, 247),
          rgb(186, 158, 255));
      /* 文字颜色填充设置为透明 */
      -webkit-text-fill-color: transparent;
      /* 背景裁剪，即让文字使用背景色 */
      background-clip: text;
      /* 背景图放大一下，看着柔和一些 */
      background-size: 200% 100%;
      /* 应用动画flowCss 12秒速度 无限循环 线性匀速动画*/
      animation: flowCss 12s infinite linear;
      position: absolute;
      left: 20px;
      top: 12px;
      font-weight: 600;
      font-size: 25px;

    }

    .name:hover {
      animation: flowCss 4s infinite linear;
    }

    .tips {
      font-size: 30px;
    }

    .form-control {
      position: relative;
      margin: 20px 0 40px;
      width: 190px;
    }

    .form-control input {
      background-color: transparent;
      border: 0;
      border-bottom: 2px #fff solid;
      display: block;
      width: 100%;
      padding: 15px 0;
      font-size: 18px;
      color: #fff;
    }

    .form-control input:focus,
    .form-control input:valid {
      outline: 0;
      border-bottom-color: lightblue;
    }

    .form-control label {
      position: absolute;
      top: 15px;
      left: 0;
      pointer-events: none;
    }

    .form-control label span {
      display: inline-block;
      font-size: 18px;
      min-width: 5px;
      color: #fff;
      transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .form-control input:focus+label span,
    .form-control input:valid+label span {
      color: lightblue;
      transform: translateY(-30px);
    }

    .login {

      /deep/.loginButton {
        width: 200px !important;
      }

      .tips {
        font-size: 30px;
      }
    }

  }
}
</style>