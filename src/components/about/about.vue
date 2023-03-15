<template>
  <div class="about-container">
    <normalHeader></normalHeader>
    <div class="bannerimg">
      <el-image :src=bkimg id="bannerImg" class="img4">
        <div class="loader" slot="placeholder">
          <div class="load"></div>
        </div>
        <div slot="error" class="image-slot error">
          <div class="error"></div>
        </div>
      </el-image>
      <div class="glass">
        <h1>今日格言</h1>
        <p>{{ dictum }}----{{ author }}</p>
      </div>
    </div>
    <div class="typeSetting">
      <div class="right">
        <div class="business-card self">
          <div class="header">
            <div class="left">
              <el-image :src=portrait id="bannerImg" class="img4 myPic" lazy>
                <div class="loader" slot="placeholder">
                  <div class="load"></div>
                </div>
                <div slot="error" class="image-slot error">
                  <div class="error"></div>
                </div>
              </el-image>
            </div>
            <div class="right">
              <h1 class="name">{{ name }}</h1>
              <div class="message">
                <div class="location iconfont icon-dingwei">
                  <span class="content">{{ position }}</span>
                </div>
                <div class="email iconfont icon-youxiang">
                  <span class="content">{{ email }}</span>
                </div>
              </div>
            </div>
            <div class="column">
              <span class="iconfont icon-QQ-circle-fill" @click="noTell"></span>
              <span class="iconfont icon-weixin" @click="noTell"></span>
              <router-link :to=github>
                <span class="iconfont icon-github-fill"></span>
              </router-link>
              <router-link :to=gitee>
                <span class="iconfont icon-gitee-fill-round"></span>
              </router-link>
            </div>
            <div class="aboutMe">
              <i> About me</i>
            </div>
          </div>
          <p class="intro">{{ introduceme }}</p>
          <div class="footer">
            <div class="nb">{{ show }}</div>
            <div class="like">
              <p>{{ likeNumber }}</p>
              <label for="checkbox" class="xin">
                <input type="checkbox" id="checkbox" hidden ref="like" @click.prevent="like">
                <svg t="1639041971928" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="3128">
                  <path
                    d="M512 896a42.666667 42.666667 0 0 1-30.293333-12.373333l-331.52-331.946667a224.426667 224.426667 0 0 1 0-315.733333 223.573333 223.573333 0 0 1 315.733333 0L512 282.026667l46.08-46.08a223.573333 223.573333 0 0 1 315.733333 0 224.426667 224.426667 0 0 1 0 315.733333l-331.52 331.946667A42.666667 42.666667 0 0 1 512 896z"
                    p-id="3129" id="heart"></path>
                </svg>
                <span></span>
              </label>
            </div>
          </div>
        </div>
        <div class="team self">
          <div class="img">
            <el-image :src=teamImg id="bannerImg" class="img4" lazy>
              <div class="loader" slot="placeholder">
                <div class="load"></div>
              </div>
              <div slot="error" class="image-slot error">
                <div class="error"></div>
              </div>
            </el-image>
          </div>
          <div class="title">About Our Developer team</div>
          <div class="mask"></div>
          <div class="cooperation">
            <span>商务合作</span>
            <el-image :src=QRcode class="img2 QRcode" lazy>
              <div class="loader" slot="placeholder">
                <div class="load"></div>
              </div>
              <div slot="error" class="image-slot error">
                <el-empty description="图片不见啦~" :image-size="100"></el-empty>
              </div>
            </el-image>
          </div>
          <div class="we">
            <span class="member front">
              <el-image :src=frontImg id="bannerImg" class="img4" lazy>
                <div class="loader" slot="placeholder">
                  <div class="load"></div>
                </div>
                <div slot="error" class="image-slot error">
                  <div class="error"></div>
                </div>
              </el-image>
              <div class="content">
                <div class="circle-breath"></div>
                <span class="make">本站前端制作</span>
                <div class="maker">{{ frontId }}</div>
              </div>
            </span>
            <span class="member after">
              <el-image :src=afterImg id="bannerImg" class="img4" lazy>
                <div class="loader" slot="placeholder">
                  <div class="load"></div>
                </div>
                <div slot="error" class="image-slot error">
                  <div class="error"></div>
                </div>
              </el-image>
              <div class="content">
                <div class="circle-breath"></div>
                <span class="make">本站后端制作</span>
                <div class="maker">{{ afterId }}</div>
              </div>
            </span>
          </div>
        </div>
      </div>
      <div class="experience">
        <div class="one-piece self" v-for="item in experienceList" :key="item.id">
          <div class="context" v-if="item.id % 2">
            <h1>{{ item.title }}</h1>
            <p>{{ item.content }}</p>
          </div>
          <div class="pic">
            <el-image :src=item.pic class="img1" lazy>
              <div class="loader" slot="placeholder">
                <div class="load"></div>
              </div>
              <div slot="error" class="image-slot error">
                <el-empty description="图片不见啦~" :image-size="100"></el-empty>
              </div>
            </el-image>
          </div>
          <div class="context" v-if="item.id % 2 == 0">
            <h1>{{ item.title }}</h1>
            <p>{{ item.content }}</p>
          </div>
        </div>
      </div>
    </div>
    <normalFooter></normalFooter>
  </div>
</template>

<script>
import normalFooter from '@/components/normalize/normalize-footer.vue'
import normalHeader from '@/components/normalize/normalize-head.vue'
import { mapState } from 'vuex';
export default {
  data() {
    return {
      gitee:'',
      github:'',
      bkimg:'',
      noshake: false,
      QRcode: '',
      teamImg: '',
      frontImg: '',
      frontId: '',
      afterId: '',
      afterImg: '',
      dictum: '',
      author: '',
      introduceme: '',
      show: ``,
      position: '',
      email: '',
      likeNumber: 0,
      experienceList: []
    };
  },
  mounted() {

  },
  created() {
    this.$http.get(
      '/page',{
    }).then(res => {
      this.bkimg=res.data.data[1]
    }).catch(Error => {
    })
    this.$http.get(
      '/home', {
    }).then(res => {
      this.gitee=res.data.data.blogConfig.gitee
      this.github=res.data.data.blogConfig.github
    }).catch(Error => {
    })
    this.$http.get(
      '/about', {
    }).then(res => {
      this.afterImg = res.data.data.backend_img
      this.frontImg = res.data.data.frontend_img
      this.afterId = res.data.data.backend_id
      this.frontId = res.data.data.frontend_id
      this.dictum = res.data.data.dictum.content
      this.author = res.data.data.dictum.author
      this.email = res.data.data.email
      this.experienceList = res.data.data.experience
      this.likeNumber = res.data.data.like_count
      this.teamImg = res.data.data.team_img
      this.QRcode = res.data.data.qr_code
      this.introduceme = res.data.data.introduction
      this.position = res.data.data.location
      this.show = res.data.data.show
    }).catch(Error => {
      this.$Notice.error({
        title: '服务器请求繁忙！',
        desc: '很抱歉给您带来的不便，但是服务器也是会累的哦！检查一下网络状态是否良好再试试吧'
      })
    })
    let token = this.$cookies.get('token')
    this.$http.post(
      '/about/islike', {}, {
      headers: {
        'Authorization': token,

      },
    }).then(res => {
      if (res.data.data) {
        this.$refs.like.checked = 'true'
      }
    }).catch(Error => {
    })
  },
  components: {
    normalFooter,
    normalHeader
  },

  computed: {
    ...mapState('me', ['portrait', 'name'])
  },

  methods: {
    async like() {
      let token = this.$cookies.get('token')
      await this.$http.post(
        '/about-like', {}, {
        headers: {
          'Authorization': token,

        },
      }).then(res => {

        if (res.data.message === 'OK') {
          this.likeNumber++
          this.$refs.like.checked = 'true'
        }
        else if (res.data.message === 'FAIL') {
          this.$Notice.error({
            title: '已经点过赞啦！',
            desc: '很感谢你的支持，但是一个用户只能点一次赞哦~'
          })
        }
        else {
          this.$Notice.error({
            title: '还没有登陆不能点赞哦！',
            desc: '登陆信息可能过期或者没有登陆哦！重新登陆试试吧~'
          })
        }
      }).catch(Error => {
      })
    },
    noTell(){
      this.$Message.warning('这是博主的个人隐私哦！不可以随便告诉别人的');
    }
  }
}

</script>
<style lang='less' scoped>
@keyframes enterenter {
  0% {
    /* 加上文字间距 */
    // letter-spacing: 1em;
    /* Z轴变换 */
    letter-spacing: -2rem;
    transform: translateZ(300px);
    /* filter: blur(); 像素模糊效果 */
    filter: blur(12px);
    /* 透明度也要改变 */
  }

  100% {
    letter-spacing: 0;
    transform: translateZ(12px);
    filter: blur(0);
  }
}

.img4 {
  width: 100%;

  .error,
  .loader {
    width: 100%;
    background-color: rgb(95, 95, 95);
  }

}

.img1 {
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
    transform: translate(-.8em);
    color: hsl(0, 0%, 61%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 250px;
    height: 100%;

    .load {
      display: inline-block;
      position: relative;
      position: absolute;
      transform: rotate(165deg) translate(-20px, -15px);
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
      transform: rotate(165deg) translate(-15px, -15px);
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

@keyframes all {
  from {
    opacity: 0;
    transform: translateY(-200px);

  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.about-container {
  animation: all 1s;

  @keyframes img {
    20% {
      opacity: 0;
      transform: translateY(-200px);
    }

    to {
      opacity: 1;
      transform: translate(0);
    }
  }

  .bannerimg {
    animation: img 1s;
    overflow: hidden;
    width: 100%;
    height: 400px;

    img {
      width: 100%;
    }

    .glass {
      display: flex;
      padding: 0 30px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      position: absolute;
      top: 400px;
      left: 50%;
      border-radius: 5px;
      font-weight: 500;
      color: rgb(255, 255, 255);
      transform: translate(-50%, -100%);
      width: 500px;
      height: 200px;
      background: rgba(142, 142, 142, 0.55);
      backdrop-filter: blur(1.5px);
      -webkit-backdrop-filter: blur(1.5px);
      border: 1px solid rgba(0, 0, 0, 0.18);

      h1 {
        margin-bottom: 20px;
      }

      h1,
      p {
        animation: enterenter 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
      }
    }
  }

  .self {
    margin-bottom: 20px;
    padding: 25px 20px;
    width: 100%;
    box-shadow: 3px 3px 12px -2px #ccc;
    background-color: #fff;
    border-radius: 8px;
  }

  @keyframes banner {
    from {
      opacity: 0;
      transform: translate(-400px) rotateY(90deg);
    }

    to {
      opacity: 1;
    }
  }

  .typeSetting {
    animation: banner 1s;
    margin-top: 40px;
    display: flex;
    justify-content: center;

    @keyframes fromLeft {

      50% {
        opacity: .2;
        transform: translateX(-480px);
      }

      55% {
        transform: translateX(0);
      }

      65% {
        transform: translateX(-13px);
      }

      75% {
        transform: translateX(0);
      }

      82% {
        transform: translateX(-6.5px);
      }

      87% {
        transform: translateX(0);
      }

      93% {
        transform: translateX(-4px);
      }

      98% {
        transform: translateX(0);
      }

      100% {
        transform: translateX(0);
      }
    }

    .business-card {
      animation: fromLeft 1.5s alternate;
      position: relative;
      width: 500px;
      height: 350px;
      margin-right: 30px;
      margin-bottom: 20px;
      padding: 20px 30px;

      .intro {
        margin-top: 5px;
        font-size: 16px;
      }

      .xin {
        cursor: pointer;
        --c: #ff6b81;
        z-index: 200;
        width: 30px;

        #heart {
          /* 填充颜色 */
          fill: rgb(207, 207, 207);
          /* stroke属性可应用于任何种类的线条，文字和元素，就像一个圆的轮廓 */
          stroke: var(--c);
          /* 线条宽度 */
          stroke-width: 20px;
          /* 设置线条为虚线，虚线的长度 */
          stroke-dasharray: 2600;
          /* 线条的位移 */
          stroke-dashoffset: 2600;
          /* 端点为圆头 */
          stroke-linecap: round;
        }

        span {
          display: block;
          display: inline-block;
          width: 8px;
          height: 8px;
          background-color: transparent;
          border-radius: 50%;
          /* 绝对定位 居中 */
          position: absolute;
          top: 35%;
          left: 63%;
          transform: translate(-50%, -50%) scale(0);
          /* 设置各个方向的阴影 */
          /* 通过var函数调用自定义属性--c,设置阴影颜色 */
          box-shadow: 0 -20px 0 var(--c),
            0 20px 0 var(--c),
            -20px 0 0 var(--c),
            20px 0 0 var(--c),
            15px -15px 0 var(--c),
            -15px -15px 0 var(--c),
            15px 15px 0 var(--c),
            -15px 15px 0 var(--c);
        }

        /* 勾选复选框执行各个动画 */
        #checkbox:checked+svg #heart {
          /* 执行动画: 动画名 时长 线性的 停留在最后一帧 */
          animation: drawHeart 1s linear forwards;
        }

        #checkbox:checked~span {
          /* 执行动画: 动画名 时长 加速后减速 停留在最后一帧 */
          animation: blink 0.5s ease-in-out forwards;
          /* 动画延迟时间 */
          animation-delay: 0.85s;
        }

        #checkbox:checked+svg {
          /* 执行动画: 动画名 时长 线性的 停留在最后一帧 */
          animation: beat 1.2s linear forwards;
        }

        label {
          /* 鼠标移入,光标变小手 */
          cursor: pointer;
        }

        /* 定义动画 */
        /* 画心的动画 */
        @keyframes drawHeart {
          0% {
            stroke-dashoffset: 2600;
          }

          80% {
            fill: #eee;
            stroke-dashoffset: 0;
          }

          100% {
            fill: var(--c);
            stroke-dashoffset: 0;
          }
        }

        /* 小圆点闪出的动画 */
        @keyframes blink {
          0% {
            transform: translate(-10%, -10%) scale(0.5);
            opacity: 0.2;
          }

          80% {
            transform: translate(-10%, -10%) scale(1.5);
            opacity: .6;
          }

          100% {
            transform: translate(-10%, -10%) scale(2.5);
            opacity: 0;
          }
        }

        /* 心跳动的动画 */
        @keyframes beat {
          0% {
            transform: scale(1);
          }

          70% {
            transform: scale(1);
          }

          80% {
            transform: scale(1.2);
          }

          100% {
            transform: scale(1);
          }
        }
      }

      .aboutMe {
        position: absolute;
        font-size: 14px;
        color: #ccc;
        right: 30px;
        top: 10px;
      }

      .header {
        display: flex;
        align-items: center;

        .myPic {
          transition: all .5s;
          width: 100px;
          border-radius: 50%;
        }

        .myPic:hover {
          transform: rotate(360deg);
        }

        .right {

          h1 {
            margin-left: 20px;
            font-size: 40px;
          }

          .name {
            font-family: 'PingFang SC';
            background: -webkit-linear-gradient(135deg,
                rgb(117, 222, 147),
                rgb(234, 134, 182),
                rgb(128, 220, 225),
                rgb(212, 165, 114),
                rgb(93, 215, 203),
                rgb(142, 110, 223));
            /* 文字颜色填充设置为透明 */
            -webkit-text-fill-color: transparent;
            /* 背景裁剪，即让文字使用背景色 */
            background-clip: text;
            /* 背景图放大一下，看着柔和一些 */
            background-size: 200% 100%;
            /* 应用动画flowCss 12秒速度 无限循环 线性匀速动画*/
            animation: flowCss 12s infinite linear;
            font-weight: 600;

          }

          .name:hover {
            animation: flowCss 4s infinite linear;
          }

          @keyframes flowCss {
            0% {
              /* 移动背景位置 */
              background-position: 0 0;
            }

            100% {
              background-position: -400% 0;
            }
          }

          .message {
            margin-left: 20px;
            color: rgb(161, 161, 161);
            display: flex;

            .content {
              margin-left: 3px;
              margin-right: 8px;
              font-size: 13px;
            }
          }
        }

        .column {
          position: absolute;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          top: 47px;
          right: 30px;
          width: 135px;
          height: 50px;

          .iconfont {
            cursor: pointer;
            color: rgb(60, 152, 249);
            font-size: 25px;
          }

          .iconfont:hover {
            color: rgb(94, 172, 255)
          }
        }

      }

      .footer {
        width: 90%;
        position: absolute;
        bottom: 20px;
        display: flex;
        align-items: center;

        p {
          margin-top: 7px;
          font-size: 16px;
        }

        .nb {
          transition: all .3s;
          color: white;
          padding: 4px 10px;
          display: grid;
          place-content: center;
          border-radius: 4px;
          background-color: rgb(117, 111, 244);
        }

        .nb:hover {
          background-color: rgb(139, 134, 243);
        }

        .like {
          position: absolute;
          // right: -140px;
          right:0px;
          display: flex;
          align-items: center;

          p {
            transform: translate(4px, -3px);
            font-size: 18px;
            margin-right: 10px;
          }

          .iconfont {
            font-size: 24px;
          }
        }

        .icon-dianzan:hover {
          color: orange;
        }

        .active {
          animation: shake 1s alternate;
        }

        @keyframes shake {
          to {
            transform: rotate(-90deg) translateY(-6px);
            transform-origin: -50% -50%;
          }
        }

      }
    }

    .team {
      animation: fromLeft 1.5s alternate;
      position: relative;
      overflow: hidden;
      width: 500px;
      height: 490px;
      padding: 0;

      .cooperation {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: center;
        left: 50%;
        top: 16%;
        z-index: 20;
        transform: translate(-50%);
        width: 200px;
        height: 250px;

        img {
          width: 200px;
          height: 200px;
        }

        span {
          font-weight: 600;
          color: white;
          font-size: 28px;
        }

      }

      .title {
        font-size: 20px;
        color: #fff;
        z-index: 10;
        position: absolute;
        left: 50%;
        top: 10px;
        transform: translate(-50%);
      }

      .mask {
        transition: all .5s;
        position: absolute;
        z-index: 2;
        top: 0;
        opacity: 0;
        background-color: rgba(0, 0, 0, .4);
        width: 500px;
        height: 100%;
      }

      .img {
        transition: all .5s;
        height: 100%;
        box-shadow: 3px 3px 12px -2px #ccc;
      }

      .img4 {
        transition: all .5s;
        width: 100%;
        height: 100%;
      }

      .we {
        position: absolute;
        bottom: 0;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        height: 100px;

        // background-color: pink;
        .front {
          border-right: 1px solid #ccc;
        }

        .member {
          margin-top: 15px;
          display: flex;
          align-items: center;
          height: 70px;
          transition: all .5s;

          .content {
            position: relative;
            width: 95px;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-weight: 600;
            margin-left: 20px;

            .circle-breath {
              position: absolute;
              left: -42px;
              top: -8px;
              background: #409EFF;
              box-shadow: 0 0 0 0 #409EFF;
              height: 12px;
              width: 12px;
              border-radius: 50%;
              animation: donghua 2.4s infinite;
            }

            @keyframes donghua {
              0% {
                transform: scale(0.60);
                /* 注意rgba中的a的设置 */
                box-shadow: 0 0 0 0 rgba(162, 205, 255, 0.6);
              }

              60% {
                transform: scale(1);
                box-shadow: 0 0 0 10px rgba(204, 73, 152, 0%);
              }

              100% {
                transform: scale(0.60);
                box-shadow: 0 0 0 0 rgba(204, 73, 152, 0%);
              }
            }
          }

          .make {
            font-size: 15px;
          }

          .maker {
            font-size: 23px;
          }

          opacity: 0;

          .img4 {
            cursor: pointer;
            transition: all .5s;
            margin-left: 20px;
            width: 65px;
            height: 65px;
            border-radius: 50%;
          }

          .img4:hover {
            transform: rotate(360deg);
          }

        }
      }
    }

    .team:hover .mask {
      opacity: 1;
      transform: translateY(-100px);
    }

    .team:hover .QRcode {
      box-shadow: 3px 3px 12px -2px #000;
    }

    .team:hover .img {
      transform: translateY(-100px);
    }

    .team:hover .member {
      opacity: 1;
    }

    @keyframes experience {

      50% {
        opacity: .2;
        transform: translateX(480px);
      }

      55% {
        transform: translateX(0);
      }

      60% {
        transform: translateX(26px);
      }

      65% {
        transform: translateX(13px);
      }

      75% {
        transform: translateX(0);
      }

      82% {
        transform: translateX(6.5px);
      }

      87% {
        transform: translateX(0);
      }

      93% {
        transform: translateX(4px);
      }

      98% {
        transform: translateX(0);
      }

      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .experience {
      animation: experience 1.5s alternate;

      .one-piece {
        transition: all .5s;
        padding: 0;
        overflow: hidden;
        display: flex;
        width: 600px;
        height: 200px;

        .pic {
          overflow: hidden;
          width: 240px;

          .img1 {
            transition: all .5s;
            width: 240px;
            height: 100%;
          }
        }

        .context {
          // top: 0;
          // right: 0;
          width: 360px;
          // position: absolute;
          padding: 20px;
          height: 100%;

          h1 {
            margin-bottom: 10px;
          }
        }

      }

      .one-piece:hover .img1 {
        transform: scale(1.1);
      }

      .one-piece:hover {
        transform: scale(1.03);
        box-shadow: 3px 3px 12px -2px #ccc
      }
    }
  }
}
</style>