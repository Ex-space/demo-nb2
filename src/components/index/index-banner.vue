<template>
  <div class="index-bannner-container" ref="banner">
    <div class="mask">
      <span class="title">{{ website_name }}</span>
      <div class="poetry" ref="poetry">{{ temporaryPoetry }}</div>
      <button class="button" style="vertical-align:middle" @click="openWorld"><span
          class="iconfont icon-xiangxia1"></span></button>
    </div>
    <Transition name="fade" mode="out-in" appear>
      <el-image :src=indexBkImg id="bannerImg" class="img1">
        <div class="loader" slot="placeholder">
          <div class="load"></div>
        </div>
        <div slot="error" class="image-slot error">
          <div class="error"></div>
        </div>
      </el-image>
    </Transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      website_name: '',
      indexBkImg: '',
      poetry: '',
      temporaryPoetry: '',
      random: 0,
      thisPoetry: '',
      poetryLength: 0,
      account: '',
      password: '',
    };
  },
  async created() {
    this.$http.get(
      '/home', {
    }).then(res => {
      this.poetry = res.data.data.sentence.sentence
      this.website_name = res.data.data.blogConfig.website_name
    }).catch(Error => {
      this.$Notice.error({
        title: '服务器请求繁忙！',
        desc: '很抱歉给您带来的不便，但是服务器也是会累的哦！检查一下网络状态是否良好再试试吧'
      })
    })
    this.$http.get(
      '/page',{
    }).then(res => {
      this.indexBkImg=res.data.data[0]
    }).catch(Error => {
    })
  },
  mounted() {
    setTimeout(() => {
      clearInterval(poetry)
      this.poetryLength = this.poetry.length
      var i = 0
      var poetry = setInterval(() => {
        if (i < this.poetryLength) {
          this.temporaryPoetry += this.poetry.charAt(i)
          i++
        } else {
          clearInterval(poetry)
        }
      }, 300)
    }, 500)

  },
  computed: {
    ...mapState('me', ['name']),
  },
  methods: {
    openWorld() {
      document.documentElement.scrollTo({
        top: 750,
        behavior: 'smooth'
      })
      // animation(document.documentElement, 672)
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/assets/font.css';

@keyframes downup {
  0% {
    transform: translateY(-.25rem);
  }

  100% {
    transform: translateY(0.25rem);
  }
}

@keyframes enterenter {
  0% {
    /* 加上文字间距 */
    letter-spacing: 1em;
    /* Z轴变换 */
    transform: translateZ(300px);
    /* filter: blur(); 像素模糊效果 */
    filter: blur(12px);
    /* 透明度也要改变 */
    opacity: 0;
  }

  100% {
    transform: translateZ(12px);
    filter: blur(0);
    opacity: 1;
  }
}

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

.img1 {
  width: 100%;
  height: 100%;

  .error,
  .loader {
    width: 100%;
    height: 100%;
    background-color: rgb(95, 95, 95);
  }

}

.index-bannner-container {
  animation: img 1s;
  position: relative;
  min-height: 600px;
  height: 100vh;
  overflow: hidden;

  .mask {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(transparent 70%, rgba(0, 0, 0, .8));

    .title {
      font-weight: 600;
      color: white;
      font-size: 50px;
    }

    .title,
    .poetry {
      z-index: 2;
      animation: enterenter 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }

    .poetry {
      font-family: 'webfont1';
      font-size: 3em;
      color: white;
      font-weight: 540;
      /* 要设置不允许换行 */
      white-space: nowrap;
      /* 使用右边框作为打印的指针光标 */
    }

    .poetry::after {
      content: '';
      border-left: 3px solid #fff;
      animation: flash .5s infinite linear alternate;
    }

    @keyframes flash {
      0% {
        opacity: 1;
      }

      70% {
        opacity: 1;
      }

      100% {
        opacity: 0;
      }
    }

    .icon-xiangxia1 {
      animation: downup .5s infinite alternate;
      font-size: 40px;
    }

    .button {
      position: absolute;
      bottom: 5%;
      right: 50%;
      transform: translate(50%);
      display: inline-block;
      border-radius: 7px;
      border: none;
      background: transparent;
      color: white;
      font-family: inherit;
      text-align: center;
      width: 300px;
      transition: all 0.6s;
    }

    .button span {
      cursor: pointer;
      display: inline-block;
      position: relative;
      transition: 0.6s;
    }

    .button span:after {
      content: 'Witness my world';
      position: absolute;
      opacity: 0;
      top: -4px;
      right: -950px;
      width: 350px;
      transition: 0.7s;
    }

    .button:hover {
      transform: translate(110px);
    }

    .button:hover span {
      padding-right: 350px;
    }

    .button:hover span:after {
      opacity: 4;
      right: 0;
    }
  }

  .mask:hover {
    color: red
  }

  #bannerImg {
    height: 100%;
    width: 100%;
  }


}</style>