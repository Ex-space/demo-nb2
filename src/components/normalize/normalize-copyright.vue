<!--  -->
<template>
  <div class="copyright-container">
    <div class="tipEnd">------The End------</div>
    <div class="copyright">
      非转载声明，本站所有文章均由博主原创
      <span>如需转载，请声明出处：{{ weburl }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
    };
  },

  components: {},

  computed: {
    ...mapState('me', ['weburl'])
  },

  methods: {}
}

</script>
<style lang='less' scoped>
@keyframes copy {
  0% {
    transform: translateZ(-800px) rotateX(90deg);
    opacity: 0;
  }

  50% {
    transform: translateZ(-160px) rotateX(87deg);
    opacity: 1;
  }
  100%{
    transform:translateZ(0) rotateX(0);
  }
}

.copyright-container {
  animation: copy 2s alternate;
  margin: 40px auto 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;

  .tipEnd {
    margin-top: 20px;
    font-size: 18px;
    font-style: italic;
    color: #ccc;
  }

  .copyright {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #000;
    font-weight: 500;
    margin-top: 20px;
    width: 80%;
    padding: 20px 40px;
    border-radius: 5px;
    background-color: rgba(173, 173, 173, 0.3);
  }
}
</style>