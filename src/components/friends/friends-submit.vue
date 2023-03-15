<!--  -->
<template>
  <div class="submit-container">
    <div class="self left">
      <button class="button1" @click="goBack">
        <span class="iconfont icon-jiantou_xiangzuo"></span>
        返回
      </button>
      <h1>自助申请</h1>
      <div class="content">
        <div class="webname display">
          <span>网站名称：</span>
          <form class="form">
            <input class="input" placeholder="你的网站的名称(请与内部名称一致)" required="" type="text" v-model="webname">
            <button class="reset" type="reset" @click="nameClear">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </form>
        </div>
        <div class="webintroduce display">
          <span>网站简介：</span>
          <form class="form">
            <input class="input" placeholder="描述一下你的网站吧！" required="" type="text" v-model="webintroduce">
            <button class="reset" type="reset" @click="introClear">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </form>
        </div>
        <div class="weblink display">
          <span>网站链接：</span>
          <form class="form">
            <input class="input" placeholder="你的网站的链接(带http://或者https://)" required="" type="text" v-model="weblink">
            <button class="reset" type="reset" @click="linkClear">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </form>
        </div>
        <div class="webicon display">
          <span>网站图标：</span>
          <form class="form">
            <input class="input" placeholder="网站的图标的完整网络地址" required="" type="text" v-model="webicon">
            <button class="reset" type="reset" @click="iconClear">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </form>
        </div>
        <button @click="submitRequire" class="sub">Subscribe</button>
      </div>
      <copyright></copyright>
    </div>
  </div>
</template>

<script>
import copyright from '@/components/normalize/normalize-copyright.vue'
export default {
  data() {
    return {
      webname: '',
      webintroduce: '',
      weblink: '',
      webicon: ''
    };
  },

  components: {
    copyright
  },

  computed: {},

  methods: {
    goBack() {
      this.$store.state.component.componentName = 'normal'
    },
    introClear() {
      this.webintroduce = ''
    },
    nameClear() {
      this.webname = ''
    },
    iconClear() {
      this.webicon = ''
    },
    linkClear() {
      this.weblink = ''
    },
    submitRequire() {
      this.$http.post(
        '/friend-link/apply',
        {
          name: this.webname,
          avatar: this.webicon,
          intro: this.webintroduce,
          address: this.weblink
        }, {
      }
      ).then(res => {
        if (this.webname === '' || this.webicon === '' || this.webintroduce === '' || this.weblink === '') {
          this.$Notice.error({
            title: '表单内容没有填写完整哦！',
            desc: '请完整填写每一项内容我们才能更好的审核是否将贵站的友链加入本站哦！'
          })
        } else if (res.data.message === '友链已存在') {
          this.$Notice.error({
            title: '这条友链已经被提交过啦！',
            desc: '请勿重复提交友链增加审核难度哦！'
          })
        } else {
          this.$Notice.success({
            title: '友链提交成功！',
            desc: '请耐心等待我们审核，我们会在看到申请后第一时间给您答复！'
          })
        }
      }).catch(Error => {
        this.$store.state.isLogin.Login = false
        this.$Notice.error({
          title: '服务器请求繁忙！',
          desc: '很抱歉给您带来的不便，但是服务器也是会累的哦！检查一下网络状态是否良好再试试吧'
        })
      })
    }
  }
}

</script>
<style lang='less' scoped>
.submit-container {
  .self {
    box-shadow: 3px 3px 12px -2px #ccc;
    background-color: #fff;
    border-radius: 8px;
  }

  .left {
    position: relative;
    float: left;
    width: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .button1 {
      .iconfont {
        display: inline-block;
      }

      cursor: pointer;
      width: 80px;
      height: 40px;
      border-radius: 20px;
      background-color: #fff;
      position: absolute;
      left: 30px;
      font-size: 16px;
      color: #409EFF;
      top: 20px;
      border: none;
    }

    .button1:hover .iconfont {
      animation: back .5s infinite alternate ease-in-out;

    }

    @keyframes back {
      to {
        transform: translate(-5px);
      }
    }


    .content {
      display: flex;
      flex-direction: column;
      align-items: center;

      .sub {
        cursor: pointer;
        margin-top: 50px;
        margin-bottom: -20px;
        border-radius: 1.4em;
        height: 2.8em;
        width: 9em;
        background: transparent;
        -webkit-animation: jello-horizontal 0.9s both;
        animation: jello-horizontal 0.9s both;
        border: 2px solid #409EFF;
        outline: none;
        color: #409EFF;
        font-size: 17px;
      }

      .sub:hover {
        background: #409EFF;
        color: #ffffff;
        animation: squeeze3124 0.9s both;
      }

      @keyframes squeeze3124 {
        0% {
          -webkit-transform: scale3d(1, 1, 1);
          transform: scale3d(1, 1, 1);
        }

        30% {
          -webkit-transform: scale3d(1.25, 0.75, 1);
          transform: scale3d(1.25, 0.75, 1);
        }

        40% {
          -webkit-transform: scale3d(0.75, 1.25, 1);
          transform: scale3d(0.75, 1.25, 1);
        }

        50% {
          -webkit-transform: scale3d(1.15, 0.85, 1);
          transform: scale3d(1.15, 0.85, 1);
        }

        65% {
          -webkit-transform: scale3d(0.95, 1.05, 1);
          transform: scale3d(0.95, 1.05, 1);
        }

        75% {
          -webkit-transform: scale3d(1.05, 0.95, 1);
          transform: scale3d(1.05, 0.95, 1);
        }

        100% {
          -webkit-transform: scale3d(1, 1, 1);
          transform: scale3d(1, 1, 1);
        }
      }

    }

    h1 {
      margin-top: 30px;
    }

    .display {
      width: 500px;
      line-height: 36px;
      font-size: 16px;
      font-weight: 500;
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }

    .form {
      --timing: 0.3s;
      --width-of-input: 400px;
      --height-of-input: 36px;
      --border-height: 2px;
      --input-bg: rgba(182, 182, 182, 0.25);
      --border-color: #409EFF;
      --border-radius: 30px;
      --after-border-radius: 1px;
      position: relative;
      width: var(--width-of-input);
      height: var(--height-of-input);
      display: flex;
      align-items: center;
      padding-inline: 0.8em;
      border-radius: var(--border-radius);
      transition: border-radius 0.5s ease;
      background: var(--input-bg, #fff);
    }

    ::-webkit-input-placeholder {
      font-size: 13px;
      color: rgb(189, 189, 189);
    }

    ::-moz-placeholder {
      font-size: 13px;
      color: rgb(189, 189, 189);
    }

    :-moz-placeholder {
      font-size: 13px;
      color: rgb(189, 189, 189);
    }

    ::-ms-input-placeholder {
      font-size: 13px;
      color: rgb(189, 189, 189);
    }

    /* styling of Input */
    .input {
      font-size: 0.9rem;
      background-color: transparent;
      width: 100%;
      height: 100%;
      padding-inline: 0.5em;
      padding-block: 0.7em;
      border: none;
    }

    /* styling of animated border */
    .form:before {
      content: "";
      position: absolute;
      background: var(--border-color);
      transform: scaleX(0);
      transform-origin: center;
      width: 100%;
      height: var(--border-height);
      left: 0;
      bottom: 0;
      border-radius: 1px;
      transition: transform var(--timing) ease;
    }

    /* Hover on Input */
    .form:focus-within {
      border-radius: var(--after-border-radius);
    }

    input:focus {
      outline: none;
    }

    /* here is code of animated border */
    .form:focus-within:before {
      transform: scale(1);
    }

    /* styling of close button */
    /* == you can click the close button to remove text == */
    .reset {
      transform: translateY(4px);
      cursor: pointer;
      border: none;
      background: none;
      opacity: 0;
      visibility: hidden;
    }

    /* close button shown when typing */
    input:not(:placeholder-shown)~.reset {
      opacity: 1;
      visibility: visible;
    }

    /* sizing svg icons */
    .form svg {
      width: 17px;
      margin-top: 3px;
    }
  }
}
</style>