<template>
  <div class="index-container">
    <normalHeader></normalHeader>
    <indexBannner></indexBannner>
    <indexBody></indexBody>
    <normalFooter></normalFooter>
  </div>
</template>

<script>
import normalFooter from '@/components/normalize/normalize-footer.vue'
import normalHeader from '@/components/normalize/normalize-head.vue'
import indexBannner from '@/components/index/index-banner.vue'
import indexBody from '@/components/index/index-body.vue'
import '@/assets/base.css'
import '@/assets/iconfont/iconfont.css'
export default {
  data() {
    return {
    }
  },
  components: {
    indexBannner,
    indexBody,
    normalFooter,
    normalHeader
  },
  mounted() {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth'
    });
  }

}
</script>

<style lang="less" scoped>
@keyframes all {
  from {
    opacity: 0;
    transform: translateY(-200px);

  }

  to {
    opacity: 1;
  }
}

.index-container {
  animation: all 1s;
  width: 100%;
  height: 100%;
}
</style>