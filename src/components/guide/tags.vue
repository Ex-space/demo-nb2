<!--  -->
<template>
  <div class="tags-container">
    <normalHeader></normalHeader>
    <Carousel>
      <template v-slot:title>
        <p>标签</p>
      </template>
    </Carousel>
    <div class="banner self">
      <div class="title">标签---{{ tagsList.length }}</div>
      <div class="content">
        <router-link :to="'tags/'+item.id" v-for="item in tagsList" :key="item.id">
          <Tag @click.native="changeTagID(item.id)" :color=styleList[item.id-1] class="tag">{{ item.name }}</Tag>
        </router-link>
      </div>
    </div>
    <normalFooter></normalFooter>
  </div>
</template>

<script>
import Carousel from '@/components/normalize/normalize-Carousel.vue'
import normalHeader from '@/components/normalize/normalize-head.vue'
import normalFooter from '@/components/normalize/normalize-footer.vue'
export default {
  data() {
    return {
      styleList: [],
      tagsList: [
      ]
    };
  },
  components: {
    normalFooter,
    normalHeader,
    Carousel
  },
  async created() {
    await this.$http.get(
      '/tag/list', {
    }).then(res => {
      this.tagsList = res.data.data.list
    }).catch(Error => {
      this.$Notice.error({
        title: '服务器请求繁忙！',
        desc: '很抱歉给您带来的不便，但是服务器也是会累的哦！检查一下网络状态是否良好再试试吧'
      })
    })
  },
  beforeMount() {
    this.tagsList.length = 100
    var i
    for (i = 0; i < this.tagsList.length; i++) {
      this.styleList[i] = this.Color()
    }
  },
  computed: {},


  methods: {
    changeTagID(id) {
      this.$store.state.subGuide.tagID=id
    },
    Color() {
      var colorList = ['red', 'purple', 'green', 'blue']
      var x = Math.floor(Math.random() * 4);
      return colorList[x];
    }
  }
}

</script>
<style lang='less' scoped>
@keyframes all {
  from{
    opacity: 0;
    transform:translateY(-200px);

  }
  to{
    opacity: 1;
  }
}
.tags-container {
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
  .banner {
    animation: banner 1s;
    margin-top: 30px;
    margin-left: 15%;
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @keyframes title {
      from {
        opacity: 0;
      }

      20% {
        transform:scale(.5);
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }
    .title {
      animation: title 1s;
      font-size: 35px;
      font-weight: 600;
    }
    @keyframes content {
      from {
        opacity: 0;
      }

      20% {
        transform:translateX(400px);
        opacity: 0.3;
      }
      70% {
        transform:translateX(-50px);
      }
      90% {
        transform:translateX(50px);
      }

      to {
        opacity: 1;
      }
    }

    .content {
      animation: content 1s;
      margin-top: 20px;
      width: 90%;

      .tag {
        transition: all .3s;
        margin: 5px 10px;
        height: 28px;
        padding: 3px 10px;
      }

      .tag:hover {
        transform: scale(1.05) translateY(-4px);
      }
    }
  }

}
</style>