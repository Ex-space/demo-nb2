<!--  -->
<template>
  <div class="search-container self">
    <div class="modal">
      <div class="hidden">
        <div class="iconfont icon-guanbi" @click="closeModal"></div>
        <div class="modalheader">
          <form class="form">
            <label for="search">
              <input class="input" type="text" required="" placeholder="请输入搜索内容" id="search" v-model="keyword"
                @input="search">
              <div class="fancy-bg"></div>
              <div class="search" @click="search">
                <svg viewBox="0 0 24 24" aria-hidden="true"
                  class="r-14j79pv r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-4wgw6l r-f727ji r-bnwqim r-1plcrui r-lrvibr">
                  <g>
                    <path
                      d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
                    </path>
                  </g>
                </svg>
              </div>
              <button class="close-btn" type="reset" @click="clear">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
              </button>
            </label>
          </form>
        </div>
        <div class="scroll">
          <div class="modalfooter">
            <div v-if="!noresult && !start" class="result">为您找到共{{ data.length }}篇文章</div>
            <div class="noResult" v-if="start">输入关键词搜索你想要的文章</div>
            <div v-if='noresult' class="noResult">很遗憾，没有匹配的搜索结果哦！</div>
            <router-link :to="'/articles/' + item.id" class="context" :style="index === 0 ? noborder : ''"
              v-for="(item, index) in data" :key="item.id">
              <div class="title" v-html="item.highlight.title"  @click="closeModal()"></div>
              <div class="content" v-html="item.highlight.content" @click="closeModal()"></div>
            </router-link>
          </div>
        </div>

      </div>
      <div class="tips">
        没有更多了~
      </div>
    </div>

    <div class="backdrop">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      start: true,
      noresult: false,
      noborder: 'border:none;',
      data: [],
      keyword: '',
    };
  },
  components: {},
  mounted() {
    let m = function (e) { e.preventDefault(); };
    document.body.style.overflow = 'hidden';
    document.addEventListener("touchmove", m, { passive: false });//禁止页面滑动
  },
  computed: {
    ...mapState('modal', ['Visible'])
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.close)
  },
  created() {
    this.close = document.addEventListener('keydown', () => {
      if (window.event.keyCode === 27) {
        this.closeModal()
      }
      else if (window.event.keyCode === 13) {
        this.search()
      }
    })
  },
  methods: {
    clear() {
      this.data = []
      this.noresult = true
    },
    search() {
      this.$http({
        method: 'post',
        url: '/article/search',
        data: {
          "keyword": this.keyword
        },
      }).then(res => {
        this.start = false
        this.data = res.data.data
        if (res.data.message === 'OK') {
          this.noresult = false
        } else {
          this.noresult = true
        }
      }).catch(Error => {
      })
    },
    closeModal() {
      this.$store.state.modal.Visible = false
      let m = function (e) { e.preventDefault(); };
      document.body.style.overflow = '';//出现滚动条
      document.removeEventListener("touchmove", m, { passive: true });
    }
  }
}

</script>
<style lang='less' scoped>
.search-container {
  height: 100%;
  width: 100%;

  @keyframes all {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.2);

    }

    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  .modal {
    animation: all .5s;
    display: block;
    z-index: 100000;
    position: fixed;
    left: 50%;
    top: 50%;
    width: 600px;
    margin-bottom: 20px;
    padding: 25px 20px 25px;
    box-shadow: 3px 3px 12px -2px #ccc;
    background-color: #fff;
    border-radius: 8px;
    min-height: 480px;

    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;

    .tips {
      position: absolute;
      bottom: 10px;
      font-weight: 500;
      color: #ccc;
      font-style: italic;
      font-size: 12px;
    }


    ::-webkit-scrollbar-track {
      height: 30px;
      background: gainsboro;
      border-radius: 5px;
    }

    /* Designing for scroll-bar */
    ::-webkit-scrollbar {
      height: 30px;

      width: 6px;
    }

    ::-webkit-scrollbar-thumb {
      height: 30px;

      background: black;
      border-radius: 5px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      height: 30px;

      background: #555;
    }


    .icon-guanbi {
      cursor: pointer;
      font-size: 12px;
      position: absolute;
      right: 20px;
      top: 10px;
    }

    .modalheader {
      transform: translateY(10px);

      /* this is a recreation of twitter search in css */
      .form {

        --input-text-color: rgb(0, 0, 0);
        --input-bg-color: #ffffff;
        --focus-input-bg-color: transparent;
        --text-color: #949faa;
        --active-color: #1b9bee;
        --width-of-input: 560px;
        --inline-padding-of-input: 1.2em;
        --gap: 0.9rem;
      }

      /* form style */
      .form {
        font-size: 0.9rem;
        display: flex;
        gap: 0.5rem;
        align-items: center;
        width: var(--width-of-input);
        position: relative;
        isolation: isolate;
      }

      /* a fancy bg for showing background and border when focus. */
      .fancy-bg {
        position: absolute;
        border: 1px solid rgb(202, 202, 202);
        width: 100%;
        inset: 0;
        background: var(--input-bg-color);
        border-radius: 30px;
        height: 100%;
        z-index: -1;
        pointer-events: none;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
      }

      /* label styling */
      label {
        width: 100%;
        padding: 0.8em;
        height: 40px;
        padding-inline: var(--inline-padding-of-input);
        display: flex;
        align-items: center;
      }

      .search,
      .close-btn {
        cursor: pointer;
        position: absolute;
      }

      /* styling search-icon */
      .search {
        fill: var(--text-color);
        left: var(--inline-padding-of-input);
      }

      /* svg -- size */
      svg {
        width: 17px;
        display: block;
      }

      /* styling of close button */
      .close-btn {
        border: none;
        right: var(--inline-padding-of-input);
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        padding: 0.1em;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--active-color);
        opacity: 0;
        visibility: hidden;
      }

      /* styling of input */
      .input {
        color: var(--input-text-color);
        width: 100%;
        margin-inline: min(2em, calc(var(--inline-padding-of-input) + var(--gap)));
        background: none;
        border: none;
      }

      .input:focus {
        outline: none;
      }

      .input::placeholder {
        color: var(--text-color)
      }

      /* input background change in focus */
      .input:focus~.fancy-bg {
        border: 1px solid var(--active-color);
        background: var(--focus-input-bg-color);
      }

      /* search icon color change in focus */
      .input:focus~.search {
        fill: var(--active-color);
      }

      /* showing close button when typing */
      .input:valid~.close-btn {
        opacity: 1;
        visibility: visible;
      }

      /* this is for the default background in input,when selecting autofill options -- you can remove this code if you do not want to override the browser style.  */
      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus,
      input:-webkit-autofill:active {
        -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
        -webkit-transition-delay: 9999s;
      }

    }

    .scroll {
      margin: 20px auto;
      width: 98%;
      height: 380px;
      margin-top: 30px;
      margin-bottom: 20px;
      overflow-y: auto;
    }

    .modalfooter {
      transform: translateY(-3px);
      width: 95%;
      height: 100%;

      .noResult {
        font-style: italic;
        font-size: 16px;
        transform: translateY(170px);
        text-align: center;
        font-weight: 600;
      }

      .result {
        font-style: italic;
        font-size: 14px;
        text-align: center;
        font-weight: 600;
        margin-bottom: -7px;
        // transform: translateY(5px);
      }

      .context {
        display: block;
        color: black;
        padding: 5px 0 10px 0;
        border-top: 1px solid #ccc;

        .content {
          font-size: 14px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          overflow: hidden;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
        }

        .title {
          font-weight: 600;
          font-size: 20px;
        }
      }
    }

  }

  .backdrop {
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 90000;
    background-color: rgba(0, 0, 0, .4);
  }
}
</style>