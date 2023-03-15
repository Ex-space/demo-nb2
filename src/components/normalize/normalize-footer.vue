<!--  -->
<template>
  <div class="foot-container">
    <span>Copyright ©2023 {{ name }}.All Rights Reserved</span>
    <span>{{ record }}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      record: '',
    };
  },
  async created() {
    const { data: reshome } = await this.$http.get('/home')
    this.record = reshome.data.blogConfig.website_record
  },

  components: {},

  computed: {
    ...mapState('me', ['name'])
  },
  methods: {
  }
}

</script>
<style lang='less' scoped>
@keyframes footerbc {
  to {
    background-position: 100%;
  }
}


.foot-container {
  position: relative;
  width: 100%;
  display: flex;
  bottom: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  height: 150px;
  background-image: linear-gradient(135deg, rgb(163, 255, 243), rgb(200, 199, 255), rgb(230, 255, 153), rgb(255, 189, 198), rgb(184, 199, 255), rgb(248, 194, 255), rgb(255, 176, 168), rgb(194, 233, 255), rgb(163, 255, 243), rgb(200, 199, 255), rgb(230, 255, 153));
  background-size: 900%;
  animation: footerbc 12s infinite alternate;


  span {
    font-size: 14px;
    color: rgb(0, 0, 0);
  }
}
</style>