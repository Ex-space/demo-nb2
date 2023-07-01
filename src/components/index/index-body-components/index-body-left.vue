<!--  -->
<template>
  <div class="index-body-left-container">
    <router-link to="/index" class="self model takeTurns">
      <span class="iconfont icon-_gonggao"></span>
      <div class="container">
        <div class="context wow animate__animated animate__fadeln" ref="noticeContext">
          <div v-for="item in noticeList" :key="item.id" class="wow animate__animated animate__fadeln">
            {{ item.content }}
          </div>
        </div>
      </div>
      <el-tooltip class="item" effect="dark" content="Probably nothing more" placement="top-start" :hide-after="hideTime">
        <span class="iconfont icon-jiantou_yemian_xiangyou"></span>
      </el-tooltip>
    </router-link>
    <router-link :to="'articles/' + item.id" class="article self model" v-for="(item, index) in articleList"
      :key="item.id">
      <div class="iconfont icon-top" v-if="item.isTop == 1"></div>
      <div class="content" v-if="index % 2 == 1">
        <h2 class="title"> {{ item.title }}</h2>
        <div class="introduce">
          <span class="top sub" v-if="item.isTop == 1">
            <span class="iconfont icon-zhiding"></span>
            <span>置顶</span>
          </span>
          <Poptip trigger="hover" content="文章发表时间" class="tip">
            <div class="time sub">
              <span class="iconfont icon-rili"></span>
              {{ item.created_at }}
            </div>
          </Poptip>
          <Poptip trigger="hover" content="文章分类" class="tip">
            <div class="sort sub">
              <span class="iconfont icon-fenlei1"></span>
              {{ item.category.name }}
            </div>
          </Poptip>
          <Poptip trigger="hover" content="浏览次数" class="tip">
            <div class="views sub">
              <span class="iconfont icon-liulan" style="font-size:20px;display: inline-block;transform: translateY(2.5px);">
                  </span>
                  <span class="last">{{ item.readCount }}</span>
            </div>
          </Poptip>
          <Poptip trigger="hover" content="文章相关标签" class="tip">
            <div class="tags sub">
              <span class="iconfont icon-fenlei-copy" v-for="p in item.tags" :key="p.id">
                <span class="last">{{ p.name }}</span>
              </span>
            </div>
          </Poptip>
        </div>
        <p class="essay ht" v-html="item.content"></p>
      </div>
      <div class="img">
        <el-image :src=item.img class="img1" lazy>
          <div class="loader" slot="placeholder">
            <div class="load"></div>
          </div>
          <div slot="error" class="image-slot error">
            <el-empty description="图片不见啦~"></el-empty>
          </div>
        </el-image>
      </div>
      <div class="content" v-if="index % 2 == 0">
        <h2 class="title"> {{ item.title }}</h2>
        <div class="introduce">
          <span class="top sub" v-if="item.isTop == 1">
            <span class="iconfont icon-zhiding"></span>
            <span>置顶</span>
          </span>
          <Poptip trigger="hover" content="文章发表时间" class="tip">
            <div :class="item.isTop == 1 ? 'sub' : 'time sub'">
              <span class="iconfont icon-rili"></span>
              {{ item.created_at }}
            </div>
          </Poptip>
          <Poptip trigger="hover" content="文章分类" class="tip">
            <div class="sort sub">
              <span class="iconfont icon-fenlei1"></span>
              {{ item.category.name }}
            </div>
          </Poptip>
          <Poptip trigger="hover" content="浏览次数" class="tip">
            <div class="views sub">
              <span class="iconfont icon-liulan" style="font-size:20px;display: inline-block;transform: translateY(2.5px);">
                  </span>
                  <span class="last">{{ item.readCount }}</span>
            </div>
          </Poptip>
          <Poptip trigger="hover" content="文章相关标签" class="tip">
            <div class="tags sub">
              <span class="iconfont icon-fenlei-copy" v-for="p in item.tags" :key="p.id">
                <span class="last">{{ p.name }}</span>
              </span>
            </div>
          </Poptip>
        </div>
        <p class="essay ht" v-html="item.content"></p>
      </div>
    </router-link>
    <Page :total="total" @on-change="changePage" class-name="divide-page" :page-size="5"></Page>
  </div>
</template>

<script>
import router from '@/router';

export default {
  data() {
    return {
      total:0,
      displayList: [],
      noticeList: [],
      articleList: {},
      hideTime: 1500
    };
  },

  components: { router },

  computed: {},
  async created() {
    await this.$http.get(
      `/article/list`, {
      params: {
        page_size: 5,
        page_num: 1
      }
    }).then(res => {
      this.articleList = res.data.data.list.slice(0,5)
      var i
      var reg = /[\u4E00-\u9FA5\w]+/g
      for (i = 0; i < this.articleList.length; i++) {
        this.articleList[i].content = this.articleList[i].content.match(reg).join('')
      }
      this.articleList[0].created_at.slice(0, 10)
      this.articleList.some((item, index) => {
        item.created_at = item.created_at.slice(0, 10)
      })
    }).catch(Error => {
    })
    const { data: reshome } = await this.$http.get('/home')
    this.$store.state.articleNumber.indexLength = this.articleList.length
    this.noticeList = reshome.data.banners
    var j = 0;
    for (j = 0; j < this.noticeList.length; j++) {
      this.displayList.push('false')
    }
    // console.log(this.displayList);
  },
  updated(){
    this.total= this.$store.state.articleNumber.allNumber
  },
  mounted() {
    var i = 30
    setInterval(() => {

      this.$refs.noticeContext.style.transform = `translateY(-${i}px)`
      i *= 2
      if (i > this.noticeList.length * 40) {
        this.$refs.noticeContext.style.transform = `translateY(0px)`
        i = 30
      }
    }, 4000);

  },
  methods: {
    getScroll() {
      // 获取页面所有img标签
      const imgs = document.getElementsByTagName('img')
      // 获取可视范围的高度
      const vh = document.documentElement.clientHeight
      // 获取滚动条的高度
      var top = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset
      for (const i in imgs) {
        // 如果图片进入可视范围就替换加载过来的图片
        if (imgs[i].offsetTop < (vh + top)) {
          if (imgs[i].src !== imgs[i].dataset.src) imgs[i].src = imgs[i].dataset.src
        }
      }
    },
    async changePage(index){
      await this.$http.get(
      `/article/list`, {
      params: {
        page_size: 5,
        page_num: index
      }
    }).then(res => {
      this.articleList = res.data.data.list.slice((index-1)*5,index*5)
      console.log(this.articleList);
      if(this.articleList.length<5){
        this.$store.state.articleNumber.fixFlag=false
      }else{
        this.$store.state.articleNumber.fixFlag=true
      }
      var i
      var reg = /[\u4E00-\u9FA5\w]+/g
      for (i = 0; i < this.articleList.length; i++) {
        this.articleList[i].content = this.articleList[i].content.match(reg).join('')
      }
      this.articleList[0].created_at.slice(0, 10)
      this.articleList.some((item, index) => {
        item.created_at = item.created_at.slice(0, 10)
      })
    }).catch(Error => {
    })
    }
  }
}

</script>
<style lang='less' scoped>
.index-body-left-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .divide-page{
    margin-top: 20px;
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
      width: 480px;
      height: 100%;

      .load {
        position: relative;
        width: 2.5em;
        height: 2.5em;
        transform: rotate(165deg) scale(1.5);
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

  @keyframes takeTurns {
    from {
      opacity: 0.7;
      transform: translate(-500px);

    }

    to {
      opacity: 1;
    }
  }

  .takeTurns {
    animation: takeTurns 1s;
    color: #000;
    display: flex;
    align-items: center;
    padding-left: 45px;
    padding-right: 45px;
    font-size: 14px;
    width: 1000px;
    line-height: 40px;
    height: 40px;
    font-weight: 500;
    overflow: hidden;

    .container {
      transition: all .3s;
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: 30px;
      height: 30px;
      width: 100%;

      .context {
        text-align: center;
      }
    }

    .iconfont {
      font-size: 25px;
    }

    .icon-_gonggao {
      position: absolute;
      left: 10px;
    }

    .icon-jiantou_yemian_xiangyou {
      position: absolute;
      float: right;
      top: 0;
      right: 20px;
      animation: right 1s infinite;

      @keyframes right {
        0% {
          opacity: 0;
        }

        45% {
          opacity: 1;
        }

        55% {
          opacity: 1;
        }

        100% {
          opacity: 0;
          transform: translate(20px);
        }
      }
    }

  }

  .takeTurns:hover .container {
    color: rgb(178, 103, 239)
  }

  .right {
    .img {
      float: right;
    }
  }

  @keyframes all {
    from {
      opacity: 0;
      transform: scale(.5);

    }

    to {
      opacity: 1;
    }
  }

  .article {
    animation: all 1s;
    cursor: pointer;
    display: flex;
    overflow: hidden;
    margin-top: 25px;
    width: 1000px;
    height: 300px;

    @keyframes toTop {
      from {
        opacity: 0;

      }

      80% {
        opacity: 0;
        transform: translateY(-40px) scale(.5);
      }

      to {
        opacity: 1;
      }
    }

    .icon-top {
      animation: toTop 1.5s;
      z-index: 10;
      position: absolute;
      top: 50px;
      left: -4px;
      color: orange;
      font-size: 60px;
    }

    .img {
      height: 100%;
      width: 450px;
      overflow: hidden;

      .img1 {
        width: 100%;
        transition: all .5s;
        height: 100%;
      }
    }

    .content {
      color: #000;
      vertical-align: middle;
      width: 550px;
      padding: 60px 20px 30px;

      .tip {
        text-align: center;
      }

      .title {
        font-size: 28px;

      }

      .sub {
        line-height: 20px;
        display: inline-block;
        padding: 0 7px;
        border-right: 2px solid #ccc;
      }

      .es {
        line-height: 20px;
        display: inline-block;
        border-right: 2px solid #ccc;
      }

      .introduce {
        margin: 10px 0 20px;
        height: 20px;

        .time,
        .top {
          padding-left: 0;
        }

        .tags {
          border-right: 0;
        }

        .last {
          font-size: 12px;
          font-weight: 500;
          margin: 0 2px;
        }

        .top {
          display: inline-block;

          .icon-zhiding {
            color: orange;
            font-size: 18px;

            margin-right: 2px;
          }

        }
      }

      .essay {
        font-weight: 500;
        color: rgb(95, 95, 95);
        font-size: 15px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .article:hover .img1 {
    transform: scale(1.1);
  }
}
</style>