<!--  -->
<template>
  <div class="index-body-container">
    <bodyLeft></bodyLeft>
    <bodyRight></bodyRight>
  </div>
</template>

<script>
import bodyLeft from '@/components/index/index-body-components/index-body-left.vue'
import bodyRight from '@/components/index/index-body-components/index-body-right.vue'
export default {
  data() {
    return {
    };
  },

  components: {
    bodyLeft,
    bodyRight
  },

  computed: {},

  methods: {}
}

</script>
<style lang='less' scoped>
@keyframes banner {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

  .index-body-container{
    animation: banner 1s;
    margin-top: 40px;
    display: flex;
    justify-content: center;
  }
</style>