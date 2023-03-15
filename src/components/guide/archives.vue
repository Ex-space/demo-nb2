<!--  -->
<template>
  <div class="archives-container">
    <normalHeader></normalHeader>
    <Carousel>
      <template v-slot:title>
        <p>归档</p>
      </template>
    </Carousel>
    <div class="timeLine self">
      <Timeline>
        <Timeline-item class="top">
          <template slot="dot">
            <span class="iconfont icon-lichengbei"></span>
          </template>
          <div class="content">目前共计<b>{{ articleLength }}</b>篇文章，未来将更加精彩！</div>
        </Timeline-item>
        <Timeline-item v-for="p in monthList" :key="p.id">
          <div class="month">{{ p.time }}</div>
          <Timeline>
            <Timeline-item v-for="item in articleList[p.id]" :key="item.id">
              <router-link :to="'/articles/'+item.id">
                <span class="content">
                  {{ item.created_at }}
                </span>
                <span style="margin-left:10px;" class="content">{{ item.title }}</span>
              </router-link>
            </Timeline-item>
          </Timeline>
        </Timeline-item>
        <Timeline-item>
          <template slot="dot">
            <span class="iconfont icon-jiangbei" style="font-size:32px"></span>
          </template>
          <div class="content" style="font-weight:600;transform:translate(3px,-3px)">{{ name }}的个人博客创立啦！</div>
        </Timeline-item>
      </Timeline>
      <div class="tipEnd">------The End------</div>
      <Page :total=monthList.length class-name="divide-page" page-size="4" :show-elevator=elevator></Page>
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
      obj: {},
      elevator: true,
      monthList: [],
      articleLength: 0,
      articleList: []
    }
  }
  ,
  async created() {
    await this.$http.get(
      '/article/archive', {
    }).then(res => {
      console.log(res.data.data);
      this.articleList = res.data.data[0]
      this.monthList = res.data.data[1]
      this.articleList.some(item => {
        item = item.reverse()
      })
      this.monthList = this.monthList.reverse()
    }).catch(Error => {
      this.$Notice.error({
        title: '服务器请求繁忙！',
        desc: '很抱歉给您带来的不便，但是服务器也是会累的哦！检查一下网络状态是否良好再试试吧'
      })
    })
    this.articleLength = this.articleList.reduce((amount, item) => {
      return amount += item.length
    }, 0)
  },
  mounted() {
    if (this.monthList.length <= 4) {
      this.elevator = false
    }
  },
  components: {
    normalFooter,
    normalHeader,
    Carousel
  },

  computed: {
    ...mapState('me', ['name'])
  },

  methods: {}
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

.archives-container {
  animation: all 1s;

  .self {
    margin-bottom: 20px;
    padding: 40px 60px;
    font-size: 15px;
    font-weight: 500;
    width: 100%;
    box-shadow: 3px 3px 12px -2px #ccc;
    background-color: #fff;
    border-radius: 8px;
  }

  @keyframes banner {
    from {
      opacity: 0;
      transform: translate(-400px);
    }

    to {
      opacity: 1;
    }
  }

  .timeLine {
    animation: banner 1s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 15%;
    margin-top: 30px;
    width: 70%;

    .tipEnd {
      margin-top: 20px;
      font-size: 18px;
      font-style: italic;
      color: #ccc;
    }

    .iconfont {
      font-size: 22px;
    }

    .content {
      color: #333;
      font-size: 16px;
    }

    .month {
      transform: translateY(-10px);
      font-size: 26px;
    }

    .divide-page {
      margin-top: 40px;
    }
  }
}
</style>