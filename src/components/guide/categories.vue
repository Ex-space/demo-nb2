<!--  -->
<template>
  <div class="categories-container">
    <normalHeader></normalHeader>
    <Carousel>
      <template v-slot:title>
        <p>分类</p>
      </template>
    </Carousel>
    <div class="banner self">
      <div class="title">分类---{{ categoryList.length }}</div>
      <div class="content">
        <router-link :to="'categories/' + item.id" class="category" v-for="item in categoryList">
          <div class="dot"></div>
          <span class="name">{{ item.name }}</span>
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
      categoryList: []
    };
  },

  components: {
    normalFooter,
    normalHeader,
    Carousel
  },
  created() {
    this.$http.get(
      '/category/list', {
    }).then(res => {
      this.categoryList = res.data.data.list
    }).catch(Error => {
      this.$Notice.error({
        title: '服务器请求繁忙！',
        desc: '很抱歉给您带来的不便，但是服务器也是会累的哦！检查一下网络状态是否良好再试试吧'
      })
    })
  },
  computed: {},


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

.categories-container {
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
      font-weight: 500;
      margin-top: 20px;
      width: 80%;

      .category {
        cursor: pointer;
        float: left;
        transform: translate(-30px);
        margin-left: 30px;
        display: flex;
        margin-top: 5px;

        .name {
          transition: all .3s;
          font-weight: 600;
        }

        .dot {
          transition: all .3s;
          transform: translateY(3px);
          margin-right: 8px;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          border: 4px solid #409EFF;
        }
      }

      .category:hover .dot {
        border: 4px solid orange;
      }

      .category:hover .name {
        color: #409EFF;
        transform: scale(1.2);
      }
    }
  }
}
</style>