<!--  -->
<template>
  <div class="albums-container">
    <normalHeader></normalHeader>
    <div class="bkimg">
      <div class="alltitle">照片墙</div>
      <img :src="bkimg" alt="" />
    </div>
    <div class="album self">
      <div class="image" v-for="(item, index) in imgList" :key="item">
        <div class="tip" ref="tip">点击查看大图</div>
        <el-image
          :src="item"
          class="img"
          :preview-src-list="imgList"
          @mousemove="tip(index, $event)"
          @mouseenter="show(index)"
          @mouseleave="hide(index)"
          lazy
        >
          <div class="loader" slot="placeholder">
            <div class="conta">
              <h3>正在努力寻找图片ing...</h3>
              <div>
                <span class="l">L</span>
                <span class="o">o</span>
                <span class="a">a</span>
                <span class="d">d</span>
                <span class="i">i</span>
                <span class="n">n</span>
                <span class="g">g</span>
                <span class="d1">.</span>
                <span class="d2">.</span>
              </div>
            </div>
          </div>
          <div slot="error" class="image-slot error">
            <span>很抱歉，图片走丢啦~</span>
            <span class="iconfont icon-tupian-jiazaishibai"></span>
          </div>
        </el-image>
      </div>
    </div>
    <normalFooter></normalFooter>
  </div>
</template>

<script>
import normalHeader from "@/components/normalize/normalize-head.vue";
import normalFooter from "@/components/normalize/normalize-footer.vue";
export default {
  data() {
    return {
      imgList: [],
      bkimg: "",
    };
  },

  components: {
    normalHeader,
    normalFooter,
  },
  async created() {
    this.$http
      .get("/page", {})
      .then((res) => {
        this.bkimg = res.data.data[3];
      })
      .catch((Error) => {});
    await this.$http
      .get(`/photo/list`, {})
      .then((res) => {
        this.imgList = res.data.data;
        // var request = window.indexedDB.open("imgDatabase");
        // request.onerror = function error(err) {
        //   console.error(err);
        // };
        // request.onsuccess = function (event) {
        //   db = event.target.result;
        // };
        // request.onupgradeneeded = function (event) {
        //   // 保存 IDBDataBase 接口
        //   var db = event.target.result;

        //   // 为该数据库创建一个对象仓库
        //   var objectStore = db.createObjectStore("image", {
        //     autoIncrement: true,
        //   });
        //   objectStore.createIndex("url", "url", { unique: false });
        //   console.log(1);
        //   objectStore.transaction.oncomplete = (e) => {
        //     // 将数据保存到新创建的对象仓库
        //     var imageObjectStore = db
        //       .transaction("image", "readwrite")
        //       .objectStore("image");
        //     console.log(this);
        //     this.imgList.forEach((image) => {
        //       imageObjectStore.add(image);
        //     });
        //   };
        // };
      })
      .catch((Error) => {});
  },
  computed: {},
  mounted() {},
  methods: {
    tip(index, e) {
      this.$refs.tip[index].style.left = e.offsetX + 5 + "px";
      this.$refs.tip[index].style.top = e.offsetY + 5 + "px";
    },
    show(index) {
      this.$refs.tip[index].style.opacity = 1;
    },
    hide(index) {
      this.$refs.tip[index].style.opacity = 0;
    },
  },
};
</script>
<style lang="less" scoped>
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

.bkimg {
  animation: img 1s alternate;
  width: 100%;
  height: 400px;
  overflow: hidden;

  @keyframes title {
    50% {
      opacity: 0;
      transform: translate(-50%) scale(0);
    }

    to {
      opacity: 1;
      transform: translate(-50%) scale(1);
    }
  }

  .alltitle {
    animation: title 1s;
    position: absolute;
    left: 50%;
    font-weight: 600;
    transform: translate(-50%);
    margin-top: 200px;
    font-size: 40px;
    color: white;
  }

  img {
    width: 100%;
  }
}

@keyframes all {
  from {
    opacity: 0;
    transform: translateY(-200px);
  }

  to {
    opacity: 1;
  }
}

.albums-container {
  animation: all 1s alternate;

  .self {
    padding: 15px;
    box-shadow: 3px 3px 12px -2px #ccc;
    background-color: #fff;
    border-radius: 8px;
    margin: 30px auto;
  }

  .album {
    max-width: 1400px;
    column-count: 5;
    column-gap: 15px;

    .image {
      @keyframes img {
        from {
          opacity: 0.4;
          transform: scale(0.4);
        }

        to {
          transform: scale(1);
          opacity: 1;
        }
      }

      position: relative;
      margin-bottom: 15px;

      .tip {
        opacity: 0;
        font-weight: 500;
        padding: 2px 5px;
        width: 85px;
        border: 1px solid #409eff;
        border-radius: 5px;
        z-index: 1;
        position: absolute;
        background-color: #fff;
      }

      .img {
        cursor: pointer;
        animation: img 1.5s;
        transition: all 0.5s;
        border-radius: 5px;
        width: 100%;

        .error {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 200px;
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
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
          background-color: rgb(236, 236, 236);

          .conta {
            display: flex;
            flex-direction: column;
            align-items: center;

            h3 {
              font-size: 16px;
            }
          }
        }

        .l {
          color: black;
          opacity: 0;
          animation: pass 2s ease-in-out infinite;
          animation-delay: 0.2s;
          letter-spacing: 0.5em;
          text-shadow: 2px 2px 3px #919191;
        }

        .o {
          color: black;
          opacity: 0;
          animation: pass 2s ease-in-out infinite;
          animation-delay: 0.4s;
          letter-spacing: 0.5em;
          text-shadow: 2px 2px 3px #919191;
        }

        .a {
          color: black;
          opacity: 0;
          animation: pass 2s ease-in-out infinite;
          animation-delay: 0.6s;
          letter-spacing: 0.5em;
          text-shadow: 2px 2px 3px #919191;
        }

        .d {
          color: black;
          opacity: 0;
          animation: pass 2s ease-in-out infinite;
          animation-delay: 0.8s;
          letter-spacing: 0.5em;
          text-shadow: 2px 2px 3px #919191;
        }

        .i {
          color: black;
          opacity: 0;
          animation: pass 2s ease-in-out infinite;
          animation-delay: 1s;
          letter-spacing: 0.5em;
          text-shadow: 2px 2px 3px #919191;
        }

        .n {
          color: black;
          opacity: 0;
          animation: pass 2s ease-in-out infinite;
          animation-delay: 1.2s;
          letter-spacing: 0.5em;
          text-shadow: 2px 2px 3px #919191;
        }

        .g {
          color: black;
          opacity: 0;
          animation: pass 2s ease-in-out infinite;
          animation-delay: 1.4s;
          letter-spacing: 0.5em;
          text-shadow: 2px 2px 3px #919191;
        }

        .d1 {
          color: black;
          opacity: 0;
          animation: pass1 2s ease-in-out infinite;
          animation-delay: 1.6s;
          letter-spacing: 0.5em;
          text-shadow: 2px 2px 3px #919191;
        }

        .d2 {
          color: black;
          opacity: 0;
          animation: pass1 2s ease-in-out infinite;
          animation-delay: 2s;
          letter-spacing: 0.5em;
          text-shadow: 2px 2px 3px #919191;
        }

        @keyframes pass {
          0% {
            opacity: 1;
          }

          50% {
            opacity: 0;
          }

          100% {
            opacity: 1;
          }
        }

        @keyframes pass1 {
          0% {
            opacity: 1;
          }

          50% {
            opacity: 0;
          }

          100% {
            opacity: 1;
          }
        }
      }

      .img:hover {
        transform: scale(1.03);
      }
    }
  }

  @media (max-width: 1200px) {
    .album {
      column-count: 4;
    }
  }

  @media (max-width: 800px) {
    .album {
      column-count: 3;
    }
  }

  @media (max-width: 650px) {
    .album {
      column-count: 2;
    }
  }
}
</style>
