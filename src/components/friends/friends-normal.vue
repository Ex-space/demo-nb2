<!--  -->
<template>
  <div class="normal-container">
    <div class="left self">
      <div class="title">Link to my friend's blog</div>
      <div class="noProblem">友链随机排列，无有意排序之意！</div>
      <div class="carousel">
        <el-carousel :interval="4000" :initial-index="randomShow" indicator-positio="none" type="card" height="150px"
          indicator-position="inside">
          <el-carousel-item v-for="item in friendsList" :key="item.id">
            <a :href="getURL(item.address)" class="friend self" target="_blank">
              <el-image :src=item.avatar class="img2" lazy>
                <div class="loader" slot="placeholder">
                  <div class="load"></div>
                </div>
                <div slot="error" class="image-slot error">
                  <el-empty description="" :image-size=30></el-empty>
                </div>
              </el-image>
              <div class="context">
                <div class="name">{{ item.name }}</div>
                <div class="introduce">{{ item.intro }}</div>
              </div>
            </a>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="all">
        <div class="d1">
          <div class="subtitle">申请友链自助</div>
          <button @click="goSubmit"><span class="text">点击申请</span><span>Welcome!</span></button>
        </div>
        <div class="requirement d2">
          <div class="subtitle1">友链申请说明</div>
          <div class="requireContext" v-for="item in requirementList" :key="item.id">
            {{ item.id }}. {{ item.content }}
          </div>
        </div>
        <div class="ourMessage d3">
          <div class="subtitle2">本站信息</div>
          <div class="name">本站名称：{{ webname }}</div>
          <div class="introduce">本站简介：{{ webintroduce }}</div>
          <div class="link">本站链接：{{ weburl }}</div>
          <div class="icon">本站图标：{{ webicon }}</div>
        </div>
        <copyright></copyright>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import copyright from '@/components/normalize/normalize-copyright.vue'
export default {
  data() {
    return {
      randomShow: 0,
      webname: '',
      webintroduce: '',
      webicon: '',
      requirementList: [],
      friendsList: [],
    };
  },

  components: {
    copyright
  },
  created() {
    this.$http.get(
      '/friend-link/list', {
    }).then(res => {
      this.webname = res.data.data.example_name
      this.webintroduce = res.data.data.example_intro
      this.webicon = res.data.data.example_avatar
      this.requirementList = res.data.data.requirement
      this.friendsList = res.data.data.friend_link_list

    }).catch(Error => {
      this.$Notice.error({
        title: '服务器请求繁忙！',
        desc: '很抱歉给您带来的不便，但是服务器也是会累的哦！检查一下网络状态是否良好再试试吧'
      })
    })
  },
  mounted() {
    this.randomShow = Math.floor(Math.random() * this.friendsList.length)
  },
  computed: {
    ...mapState('me', ['weburl']),
    ...mapState('component', ['componentName'])
  },

  methods: {
    getURL(url) {
      let strURL = "";
      if (url.substr(0, 7).toLowerCase() == "http://" || url.substr(0, 8).toLowerCase() == "https://") {
        strURL = url;
      } else {
        strURL = "http://" + url;
      }
      return strURL;
    },
    goSubmit() {
      this.$store.state.component.componentName = 'submit'
    }
  }
}

</script>
<style lang='less' scoped>
.normal-container {
  .img2 {
    position: relative;
    width: 100%;
    overflow: hidden;
    height: 100%;

    .error {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-color: rgb(236, 236, 236);

      span {
        color: rgb(176, 176, 176);
        font-weight: 500;
        font-size: 16px;
      }

      .iconfont {
        font-size: 24px;
        transform: translateY(1.5px);
        margin-left: 4px;
      }
    }

    /deep/.loader {
      background-color: rgb(244, 244, 244);
      position: relative;
      color: hsl(0, 0%, 61%);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;


      .load {
        display: inline-block;
        position: relative;
        position: absolute;
        transform: rotate(165deg) translate(-10px, -20px) scale(1);
      }

      .load:before,
      .load:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        width: 0.5em;
        height: 0.5em;
        border-radius: 0.25em;
        transform: translate(-50%, -50%);
      }

      .load:before {
        animation: before8 2s infinite;
      }

      .load:after {
        animation: after6 2s infinite;
      }

      @keyframes before8 {
        0% {
          width: 0.5em;
          box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75);
        }

        35% {
          width: 2.5em;
          box-shadow: 0 -0.5em rgba(225, 20, 98, 0.75), 0 0.5em rgba(111, 202, 220, 0.75);
        }

        70% {
          width: 0.5em;
          box-shadow: -1em -0.5em rgba(225, 20, 98, 0.75), 1em 0.5em rgba(111, 202, 220, 0.75);
        }

        100% {
          box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75);
        }
      }

      @keyframes after6 {
        0% {
          height: 0.5em;
          box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75);
        }

        35% {
          height: 2.5em;
          box-shadow: 0.5em 0 rgba(61, 184, 143, 0.75), -0.5em 0 rgba(233, 169, 32, 0.75);
        }

        70% {
          height: 0.5em;
          box-shadow: 0.5em -1em rgba(61, 184, 143, 0.75), -0.5em 1em rgba(233, 169, 32, 0.75);
        }

        100% {
          box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75);
        }
      }

      .load {
        position: absolute;
        top: calc(50% - 1.25em);
        left: calc(50% - 1.25em);
      }

    }

  }

  .self {
    box-shadow: 3px 3px 12px -2px #ccc;
    background-color: #fff;
    border-radius: 8px;
  }

  .left {
    float: left;
    width: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      animation: change 1.5s alternate;
      font-size: 40px;
      font-style: italic;
      margin: 30px 0 0;
      color: black;
    }

    .noProblem {
      animation: change 1.5s alternate;
      margin-bottom: 20px;
      color: #ccc;
      font-style: italic;
    }

    .all {
      width: 800px;
      margin-bottom: 0px;

      @keyframes d1 {
        0% {
          opacity: 0;
        }

        50% {
          opacity: 0;
          transform: translate(100px);
        }

        100% {
          opacity: 1;
          transform: translate(0);
        }
      }

      @keyframes d2 {
        0% {
          opacity: 0;
        }

        50% {
          opacity: 0;
          transform: translate(200px);
        }

        100% {
          opacity: 1;
          transform: translate(0);
        }
      }

      @keyframes d3 {
        0% {
          opacity: 0;
        }

        50% {
          opacity: 0;
          transform: translate(300px);
        }

        100% {
          opacity: 1;
          transform: translate(0);
        }
      }

      .d1 {
        animation: d1 1.5s linear alternate;
      }

      .d2 {
        animation: d2 1.5s linear alternate;
      }

      .d3 {
        animation: d3 1.5s linear alternate;
      }

      button {
        margin-top: 15px;
        position: relative;
        overflow: hidden;
        border: 1px solid #409EFF;
        color: #409EFF;
        display: inline-block;
        font-size: 15px;
        line-height: 15px;
        padding: 10px 14px;
        border-radius: 20px;
        text-decoration: none;
        cursor: pointer;
        background: #fff;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
      }

      button span:first-child {
        position: relative;
        transition: color 600ms cubic-bezier(0.48, 0, 0.12, 1);
        z-index: 10;
      }

      button span:last-child {
        color: white;
        display: block;
        position: absolute;
        bottom: 0;
        transition: all 500ms cubic-bezier(0.48, 0, 0.12, 1);
        z-index: 100;
        opacity: 0;
        top: 50%;
        left: 50%;
        transform: translateY(225%) translateX(-50%);
        height: 14px;
        line-height: 13px;
      }

      button:after {
        content: "";
        position: absolute;
        bottom: -50%;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #409EFF;
        transform-origin: bottom center;
        transition: transform 600ms cubic-bezier(0.48, 0, 0.12, 1);
        transform: skewY(9.3deg) scaleY(0);
        z-index: 50;
      }

      button:hover:after {
        transform-origin: bottom center;
        transform: skewY(9.3deg) scaleY(2);
      }

      button:hover span:last-child {
        transform: translateX(-50%) translateY(-50%);
        opacity: 1;
        transition: all 900ms cubic-bezier(0.48, 0, 0.12, 1);
      }

      .subtitle {
        position: relative;
        margin-top: 20px;
        transition: all 1s;
        font-size: 20px;
        width: 130px;
        font-weight: 550;
        font-style: normal;

      }

      .subtitle::before {
        content: '';
        width: 0;
        display: inline-block;
        height: 3px;
        position: absolute;
        bottom: -6px;
        background-color: rgb(93, 155, 255);
        transition: width 0.36s;
      }

      .subtitle:hover::before {
        width: 120px;
      }

      .requirement {
        .subtitle1 {
          position: relative;
          margin-top: 15px;
          margin-bottom: 10px;
          transition: all 1s;
          font-size: 20px;
          width: 130px;
          font-weight: 550;
          font-style: normal;

        }

        .subtitle1::before {
          content: '';
          width: 0;
          display: inline-block;
          height: 3px;
          position: absolute;
          bottom: -6px;
          background-color: rgb(93, 155, 255);
          transition: width 0.36s;
        }

        .subtitle1:hover::before {
          width: 120px;
        }

        .requireContext {
          font-size: 14px;
          line-height: 24px;
        }
      }

      .ourMessage {
        margin-bottom: -10px;
        font-size: 14px;
        line-height: 24px;

        .subtitle2 {
          position: relative;
          margin-top: 15px;
          margin-bottom: 15px;
          transition: all 1s;
          font-size: 20px;
          width: 130px;
          font-weight: 550;
          font-style: normal;

        }

        .subtitle2::before {
          content: '';
          width: 0;
          display: inline-block;
          height: 3.5px;
          position: absolute;
          bottom: -6px;
          background-color: rgb(93, 155, 255);
          transition: width 0.36s;
        }

        .subtitle2:hover::before {
          width: 80px;
        }
      }
    }

    @keyframes change {
      50% {
        opacity: 0;
        transform: scale(.4);
      }


      100% {
        opacity: 1;
        transform: translate(0);
      }
    }

    .carousel {
      animation: change 1.5s alternate;
      width: 600px;
      height: 150px;
      margin-bottom: 30px;
    }

    .el-carousel__item {
      width: 300px;
    }

    .friend {
      display: flex;
      align-items: center;
      width: 300px;
      backdrop-filter: blur(9px);
      color: #fff;
      background-color: rgba(196, 196, 196, 0.7);
      height: 150px;

    .img2 {
        transition: all .5s;
        margin-left: 20px;
        width: 90px;
        height: 90px;
        border-radius: 50%;
      }

      .img2:hover {
        transform: rotate(360deg);
      }

      .context {
        height: 100%;
        width: 160px;
        margin-left: 10px;
        padding: 20px 10px;
        font-weight: 600;

        .name {
          font-size: 25px;
        }

        .introduce {
          font-size: 14px;
          font-weight: 500;
        }
      }
    }
  }

}</style>