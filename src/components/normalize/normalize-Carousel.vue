<!--  -->
<template>
  <div class="Carousel-container">
    <transition name="slide-fade">
      <div class="setting self" v-if="toggleVisible">
        <Form :model="setting" :label-width="100">
          <Form-item label="自动切换">
            <i-switch v-model="setting.autoplay">
              <span slot="open">开</span>
              <span slot="close">关</span>
            </i-switch>
          </Form-item>
          <Form-item label="自动切换间隔">
            <Slider
              v-model="setting.autoplaySpeed"
              :min="300"
              :max="10000"
              :step="100"
            ></Slider>
          </Form-item>
          <Form-item label="指示器位置">
            <Radio-group v-model="setting.dots" type="button">
              <Radio label="inside">内部</Radio>
              <Radio label="outside">外部</Radio>
              <Radio label="none">不显示</Radio>
            </Radio-group>
          </Form-item>
          <Form-item label="切换箭头">
            <Radio-group v-model="setting.arrow" type="button">
              <Radio label="hover">悬停时显示</Radio>
              <Radio label="always">一直显示</Radio>
              <Radio label="never">不显示</Radio>
            </Radio-group>
          </Form-item>
          <Form-item label="指示器触发方式">
            <Radio-group v-model="setting.trigger" type="button">
              <Radio label="click">点击</Radio>
              <Radio label="hover">悬停</Radio>
            </Radio-group>
          </Form-item>
        </Form>
        <div class="triangle"></div>
      </div>
    </transition>
    <div class="title">
      <slot name="title"></slot>
    </div>
    <Carousel
      class="carousel"
      v-model="value3"
      :autoplay="setting.autoplay"
      :autoplay-speed="setting.autoplaySpeed"
      :dots="setting.dots"
      :trigger="setting.trigger"
      :arrow="setting.arrow"
    >
      <Carousel-item v-for="item in imgList" :key="item">
        <div class="demo-carousel">
          <el-image :src="item" id="bannerImg" class="img4">
            <div class="loader" slot="placeholder">
              <div class="load"></div>
            </div>
            <div slot="error" class="image-slot error">
              <div class="error"></div>
            </div>
          </el-image>
        </div>
      </Carousel-item>
    </Carousel>
    <div class="toggle" @click="changeVisible">
      <div class="iconfont icon-gerenzhongxin-shezhi-"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      height: "600px",
      toggleVisible: false,
      imgList: [],
      value3: 0,
      setting: {
        autoplay: true,
        autoplaySpeed: 4000,
        dots: "inside",
        trigger: "hover",
        arrow: "hover",
      },
    };
  },
  async created() {
    await this.$http
      .get(`/carousel`, {})
      .then((res) => {
        this.imgList = res.data.data;
      })
      .catch((Error) => {});
  },
  methods: {
    changeVisible() {
      this.toggleVisible = !this.toggleVisible;
    },
  },
};
</script>
<style lang="less" scoped>
.img4 {
  width: 100%;
  height: 100%;

  .error,
  .loader {
    width: 100%;
    height: 100%;
    background-color: rgb(81, 81, 81);
  }
}
.slide-fade-enter-active {
  transition: all 0.5s ease;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to

/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-10px);
  opacity: 0;
}

@keyframes title {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
  }

  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes all {
  20% {
    opacity: 0;
    transform: translateY(-200px);
  }

  to {
    opacity: 1;
    transform: translate(0);
  }
}

.title {
  animation: title 1s;
  font-weight: 600;
  color: white;
  font-size: 40px;
  z-index: 11;
  position: absolute;
  top: 300px;
  left: 50%;
  transform: translate(-50%, -50%);
}

.Carousel-container {
  animation: all 1s;
  min-width: 1000px;

  .carousel {
    min-width: 800px;
    height: 600px;
    overflow: hidden;
    cursor: pointer;

    .img4 {
      min-width: 1000px;
      // width: 100%;
      height: 600px;
    }
  }

  .toggle {
    position: absolute;
    border-radius: 50%;
    left: 30px;
    top: 530px;
    width: 40px;
    height: 40px;
    box-shadow: 0 0 6px rgb(0 0 0 / 12%);
    cursor: pointer;
    background-color: #fff;
    display: grid;
    place-content: center;

    .iconfont {
      font-size: 26px;
      color: #409eff;
      animation: rotate 8s infinite linear;
    }

    @keyframes rotate {
      to {
        transform: rotate(360deg);
      }
    }
  }

  .self {
    margin-bottom: 20px;
    padding: 25px 60px;
    font-size: 15px;
    font-weight: 500;
    width: 100%;
    box-shadow: 3px 3px 12px -2px #ccc;
    background-color: #fff;
    border-radius: 8px;
    border: 0;
  }

  .setting {
    z-index: 10000;
    position: absolute;
    left: 90px;
    top: 383px;
    width: 500px;
    border: 0;

    .triangle {
      position: absolute;
      display: inline-block;
      left: -18px;
      top: 50%;
      transform: translateY(-50%);
      height: 0px;
      width: 0px;
      border: 10px solid #fff;
      border-left-color: transparent;
      border-top-color: transparent;
      border-bottom-color: transparent;
      // border-right-color: #fff;
    }
  }

  .toggle:hover,
  .backtop:hover {
    background-color: rgb(226, 247, 255);
  }
}
</style>
