<!--  -->
<template>
  <div class="base-container">
    <normalHeader></normalHeader>
    <Carousel>
      <template v-slot:title>
        <p>{{ articleList[0].request }}</p>
      </template>
    </Carousel>
    <div class="center">
      <div class="container">
        <div class="result">
          为您找到共{{ total }}篇文章
        </div>
        <router-link :to="'/articles/' + item.id"
          :class="index % 2 == 1 ? 'article self fromRight' : 'article self fromLeft'"
          v-for="(item, index) in articleList" :key="item.id">
          <div class="content" v-if="index % 2 == 1">
            <h2 class="title"> {{ item.title }}</h2>
            <div class="introduce">
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
                <span class="iconfont icon-liulan" style="font-size:20px;display: inline-block;transform: translateY(2.5px);">
                  </span>
                  <span class="last">{{ item.readCount }}</span>
              </Poptip>
              <Poptip trigger="hover" content="文章相关标签" class="tip">
                <div class="tags sub">
                  <span class="iconfont icon-fenlei-copy" v-for="p in item.tags" :key="p.id">
                    <span class="last">{{ p.name }}</span>
                  </span>
                </div>
              </Poptip>
            </div>
            <p class="essay">{{ item.content }}</p>
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
            <p class="essay">{{ item.content }}</p>
          </div>
        </router-link>
        <Page :total="total" @on-change="changePage" class-name="divide-page" :page-size="5"></Page>
      </div>
    </div>
    <normalFooter></normalFooter>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Carousel from '@/components/normalize/normalize-Carousel.vue'
import normalHeader from '@/components/normalize/normalize-head.vue'
import normalFooter from '@/components/normalize/normalize-footer.vue'
export default {
  data() {
    return {
      total:0,
      articleList: []
    };
  },
  props: ['id'],
  components: {
    normalFooter,
    normalHeader,
    Carousel
  },
  computed: {
    ...mapState('subGuide', ['subTitle'])
  },
  async created() {
    if (location.pathname.charAt(1) === 't') {
      await this.$http.get(
        `/article/list`, {
        params: {
          page_size: 5,
          page_num: 1,
          tagID: this.id
        }
      }).then(res => {
        this.total=res.data.data.total
        this.articleList = res.data.data.list
      }).catch(Error => {
        this.$Notice.error({
          title: '服务器请求繁忙！',
          desc: '很抱歉给您带来的不便，但是服务器也是会累的哦！检查一下网络状态是否良好再试试吧'
        })
      })
    } else if (location.pathname.charAt(1) === 'c') {
      await this.$http.get(
        `/article/list`, {
        params: {
          page_size: 5,
          page_num: 1,
          categoryID: this.id
        }
      }).then(res => {
        this.total=res.data.data.total
        this.articleList = res.data.data.list
      }).catch(Error => {
        this.$Notice.error({
          title: '服务器请求繁忙！',
          desc: '很抱歉给您带来的不便，但是服务器也是会累的哦！检查一下网络状态是否良好再试试吧'
        })
      })
    }
    var i
    var reg = /[\u4E00-\u9FA5\w]+/g
    for (i = 0; i < this.articleList.length; i++) {
      this.articleList[i].content = this.articleList[i].content.match(reg).join('')
    }
  },
  methods: {
    async changePage(index){
      if (location.pathname.charAt(1) === 't') {
      await this.$http.get(
        `/article/list`, {
        params: {
          page_size: 5,
          page_num: index,
          tagID: this.id
        }
      }).then(res => {
        this.articleList = res.data.data.list
        this.total=res.data.data.total
      }).catch(Error => {
        this.$Notice.error({
          title: '服务器请求繁忙！',
          desc: '很抱歉给您带来的不便，但是服务器也是会累的哦！检查一下网络状态是否良好再试试吧'
        })
      })
    } else if (location.pathname.charAt(1) === 'c') {
      await this.$http.get(
        `/article/list`, {
        params: {
          page_size: 5,
          page_num: index,
          categoryID: this.id
        }
      }).then(res => {
        this.articleList = res.data.data.list
        this.total=res.data.data.total
      }).catch(Error => {
        this.$Notice.error({
          title: '服务器请求繁忙！',
          desc: '很抱歉给您带来的不便，但是服务器也是会累的哦！检查一下网络状态是否良好再试试吧'
        })
      })
    }
    var i
    var reg = /[\u4E00-\u9FA5\w]+/g
    for (i = 0; i < this.articleList.length; i++) {
      this.articleList[i].content = this.articleList[i].content.match(reg).join('')
    }
    }
  }
}

</script>
<style lang='less' scoped>
@keyframes all {
  from {
    opacity: 0;
    transform: translateY(-200px);

  }

  to {
    opacity: 1;
  }
}
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

.base-container {
  animation: all 1s;

  @keyframes title {
    from {
      transform: scale(0);
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .center {
    display: flex;
    margin-top: 20px;

    .result {
      animation: title 1s;
      font-size: 25px;
      font-weight: 600;
      font-style: italic;
    }

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;

      // background-color: pink;
      margin: 0 auto;
    }
  }

  .self {
    box-shadow: 3px 3px 12px -2px #ccc;
    background-color: #fff;
    border-radius: 8px;
  }

  @keyframes left {
    from {
      opacity: 0;
      transform: translate(-500px);
    }

    to {
      opacity: 1;
    }
  }

  @keyframes right {
    from {
      opacity: 0;
      transform: translate(500px);
    }

    to {
      opacity: 1;
    }
  }

  .fromLeft {
    animation: left 1s;
  }

  .fromRight {
    animation: right 1s;
  }

  .article {
    cursor: pointer;
    display: flex;
    overflow: hidden;
    margin-top: 25px;
    width: 1000px;
    height: 300px;

    .icon-top {
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
        transition: all .5s;
        height: 100%;
        width: 100%;
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