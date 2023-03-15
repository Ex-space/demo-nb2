<!--  -->
<template>
  <div class="friends-container">
    <normalHeader></normalHeader>
    <div class="bkimg">
      <div class="alltitle">友链</div>
      <img :src=bkimg alt="">
    </div>
    <div class="content">
      <Transition name="fade" mode="out-in">
        <keep-alive>
          <component :is=componentName></component>
        </keep-alive>
      </Transition>
      <normalRight></normalRight>
    </div>
    <normalFooter></normalFooter>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import normal from '@/components/friends/friends-normal.vue'
import submit from '@/components/friends/friends-submit.vue'
import normalRight from '@/components/index/index-body-components/index-body-right.vue'
import normalHeader from '@/components/normalize/normalize-head.vue'
import normalFooter from '@/components/normalize/normalize-footer.vue'
export default {
  data() {
    return {
      bkimg: 'statics/1.jpeg',
    };
  },
  created() {
    this.$http.get(
      '/page',{
    }).then(res => {
      console.log(res.data.data);
      this.bkimg=res.data.data[2]
    }).catch(Error => {
    })
    this.$http.get(
      '/friend-link/list', {
    }).then(res => {
      this.$store.state.me.weburl = res.data.data.example_url

    }).catch(Error => {
    })
  },
  components: {
    normal,
    submit,
    normalRight,
    normalFooter,
    normalHeader
  },
  computed: {
    ...mapState('component', ['componentName'])
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

.fade-enter-active {
  animation: fade-in 0.5s;
}

.fade-leave-active {
  animation: fade-in 0.5s reverse;
}

.fade-leave-to {
  opacity: 0;
}

@keyframes fade-in {
  0% {
    transform: translate(-450px) scale(.85);
    opacity: 0;
  }

  100% {
    transform: translate(0px) scale(1);
    opacity: 1;
  }
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

.friends-container {
  animation: all 1s alternate;

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
      50%{
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
      color: white
    }

    img {
      width: 100%;
    }
  }


  .content {
    animation: banner 1s;
    display: flex;
    justify-content: center;
    margin-top: 30px;

  }

}
</style>