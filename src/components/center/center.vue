<!--  -->
<template>
  <div class="center-container" ref="center">
    <normalHeader></normalHeader>
    <carousel>
      <template v-slot:title>
        <p>{{ temporaryName }}的个人中心</p>
      </template>
    </carousel>
    <div class="self form">
      <div class="myName">
        <div class="name">
          我的昵称:
          <span v-if="flag">{{ name }}</span>
          <input placeholder="My Name" ref="name" v-model="name" type="text" class="input" required="" v-if="!flag"
            @click.stop="" @focus="temporary" @blur="changeSuccess">
        </div>
        <span class="iconfont icon-xiugai" @click.stop="changeName"></span>
      </div>
      <div class="uploadPic">
        <span class="special ad" style="display:inline-block;">我的头像：</span>
        <div class="imgX">
          <div class="mask">
            <span class="iconfont icon-yulan" @click="seeBig"></span>
          </div>
          <el-image :src=data[0] class="img5" lazy>
            <div class="loader" slot="placeholder">
              <div class="load"></div>
            </div>
            <div slot="error" class="image-slot error">
              <div class="mask"></div>
              <el-empty description="图片不见了~" :image-size="60"></el-empty>
            </div>
          </el-image>
        </div>
        <el-upload :action="uploadURL" :headers="headObj" :auto-upload="true" list-type="picture-card"
          style="display:inline-block" class="avatar a1" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
          :on-error="handleError" :on-change="handleChange" show-file-list :on-success="handleSuccess"
          :on-exceed="warning" :on-progress="handleProgress" :limit="1" accept="image/*">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" class="dialog">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
      <div class="myArticle">
        <div class="head">
          <span class="circle">
            <span class="iconfont icon-xihuan1"></span>
          </span>
          <span class="title">我点赞的文章</span>
        </div>
        <div class="contentA">
          <div class="none" v-if="likeList.length === 0">
            ~暂时还未发现您喜欢的文章哦~
          </div>
          <router-link :to="'/articles/' + item.id" class="article" v-for="(item, index) in likeList" :key="item.id">
            <el-image :src=item.img class="img1" lazy>
              <div class="loader" slot="placeholder">
                <div class="load"></div>
              </div>
              <div slot="error" class="image-slot error">
                <el-empty description="图片不见了~" :image-size="60"></el-empty>
              </div>
            </el-image>
            <div class="tit">{{ item.title }}</div>
            <div class="con">{{ item.content }}</div>
            <div class="mask"></div>
            <div class="iconfont icon-shanchu" @click.prevent="deleteIt1(index, item.id)"></div>
          </router-link>
        </div>
      </div>
      <div class="collection">
        <div class="head">
          <span class="circle">
            <span class="iconfont icon-gerenzhongxinwodezuji"></span>
          </span>
          <span class="title">我的足迹</span>
          <div class="clear" @click="clearAll2" v-if="collectList.length !== 0">
            <span class="iconfont icon-shanchu"></span>
            清空全部
          </div>
        </div>
        <div class="contentA">
          <div class="none" v-if="collectList.length === 0">
            ~快去走走吧，还未发现您在博客有留下足迹哦~
          </div>
          <router-link :to="'/articles/' + item.id" class="article" v-for="(item, index) in collectList" :key="item.id">
            <el-image :src=item.img class="img2" lazy>
              <div class="loader" slot="placeholder">
                <div class="load"></div>
              </div>
              <div slot="error" class="image-slot error">
                <el-empty description="图片不见了~" :image-size=100></el-empty>
              </div>
            </el-image>
            <div class="tit">{{ item.title }}</div>
            <div class="con">{{ item.content }}</div>
            <div class="mask"></div>
            <div class="iconfont icon-shanchu" @click.prevent="deleteIt2(index, item.id)"></div>
          </router-link>
        </div>
      </div>
    </div>
    <normalFooter></normalFooter>
  </div>
</template>
<script>
import carousel from '@/components/normalize/normalize-Carousel.vue'
import normalHeader from '@/components/normalize/normalize-head.vue'
import normalFooter from '@/components/normalize/normalize-footer.vue'
import router from '@/router';
export default {
  data() {
    return {
      uploadURL: "http://124.222.30.146:4396/api/front/upload",
      headObj: {
        Authorization: this.$cookies.get('token')
      },
      data: [],
      id: '',
      likeList: [],
      collectList: [],
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      imageUrl: '',
      upImgurl: '',
      defaultList: [
      ],
      imgName: '',
      visible: false,
      uploadList: [],
      temporaryName: '',
      flag: true,
      name: '',
      nameMaxLength: 12
    };
  },

  components: {
    carousel,
    normalHeader,
    normalFooter,
    router
  },
  async created() {
    let token = this.$cookies.get('token')
    await this.$http.post(
      '/user/info', {}, {
      headers: {
        'Authorization': token,

      },
    }).then(res => {
      this.id = res.data.data.id
      this.data[0] = res.data.data.avatar
      this.name = res.data.data.nickname
      this.temporaryName = this.name
      this.likeList = res.data.data.articleLikeSet
      this.collectList = res.data.data.footstep
      var reg = /[\u4E00-\u9FA5\w]+/g
      var i
      for (i = 0; i < this.likeList.length; i++) {
        this.likeList[i].content = this.likeList[i].content.match(reg).join('')
      }
      for (i = 0; i < this.collectList.length; i++) {
        this.collectList[i].content = this.collectList[i].content.match(reg).join('')
      }
    }).catch(Error => {
    })
  },
  watch: {
    name() {
      if (this.name.length > this.nameMaxLength) {
        this.name = String(this.name).slice(0, this.nameMaxLength);
      }
      var reg = /^[^[\u4E00-\u9FA5\w]+$]*$/
      this.name = this.name.replace(reg, '')
    },
  },
  mounted() {
    // this.uploadList = this.$refs.upload.fileList;
    this.$refs.center.addEventListener('click', () => {
      this.flag = true
    })
  },
  computed: {},

  methods: {
    warning() {
      this.$Message.warning('最多只能同时上传一个头像哦！')
    },
    deleteIt1(index, id) {
      this.$confirm('您确定要将这篇文章移出您喜欢的文章吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let token = this.$cookies.get('token')
        this.$http.post(
          `/article/like/${id}`, { article_id: id }, {
          headers: {
            'Authorization': token,

          },
        }).then(res => {
          if (res.data.message === 'OK') {
            this.likeList.splice(index, 1);
          }
          else {
            this.$message({
              type: 'error',
              message: '删除失败'
            });
            this.$Notice.error({
              title: '出错啦！',
              desc: '因为不明原因删除失败，待会再来试试吧~'
            })
          }
        }).catch(Error => {
          this.$Notice.error({
            title: '服务器请求繁忙！',
            desc: '很抱歉给您带来的不便，但是服务器也是会累的哦！检查一下网络状态是否良好再试试吧'
          })

        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    deleteIt2(index, id) {

      this.$confirm('您确定要清除这条足迹吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let token = this.$cookies.get('token')
        this.$http.delete(
          `/footstep/${id}`, {
          params: {
            article_id: id
          },
          headers: {
            'Authorization': token,

          },
        }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.collectList.splice(index, 1);
        }).catch(Error => {
          this.$Notice.error({
            title: '服务器请求繁忙！',
            desc: '很抱歉给您带来的不便，但是服务器也是会累的哦！检查一下网络状态是否良好再试试吧'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    clearAll2() {
      this.$confirm('您确定要清空您的全部足迹吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let token = this.$cookies.get('token')
        this.$http.delete(
          `/footstep/0`, {
          params: {
            article_id: 0
          },
          headers: {
            'Authorization': token,

          },
        }).then(res => {
          this.$message({
            type: 'success',
            message: '清空成功!'
          });
          this.collectList = [];
        }).catch(Error => {
          this.$Notice.error({
            title: '服务器请求繁忙！',
            desc: '很抱歉给您带来的不便，但是服务器也是会累的哦！检查一下网络状态是否良好再试试吧'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消清空'
        });
      });
    },
    changeName() {
      this.flag = false
    },
    temporary() {
      this.temporaryName = this.name
    },
    changeSuccess() {
      let token = this.$cookies.get('token')
      this.flag = true
      if (this.name === '') {
        this.name = this.temporaryName
      }
      this.temporaryName = this.name
      this.$http.put(
        `/user/info`, {
        id: this.id,
        nickname: this.temporaryName,
        avatar: this.data[0],
      }, {
        headers: {
          'Authorization': token,
        },
      }).then(res => {
      }).catch(Error => {
      })
    },
    handleRemove(file) {
      this.$Message.success('移除图片文件成功！');;
    },
    handleError(file) {
      this.$Message.error('图片因不明原因走丢啦~/(ㄒoㄒ)/~~！');
    },
    handleChange(file) {
      // let token = this.$cookies.get('token')
      // var data=file.url
      // this.$http.post(
      //   `/upload`, {
      //   file:file
      // }, {
      //   headers: {
      //     'Content-Type':'application/x-www-form-urlencoded',
      //     'Authorization': token,
      //   },
      // }).then(res => {
      //   console.log(res.data);
      // }).catch(Error => {
      // })
      // this.$Message.success('图片上传成功！');
      // this.$http.put(
      //   `/user/info`, {
      //   id: this.id,
      //   nickname: this.temporaryName,
      //   avatar:this.data[0],
      // }, {
      //   headers: {
      //     'Authorization': token,
      //   },
      // }).then(res => {
      //   console.log(res.data);
      // }).catch(Error => {
      // })
    },
    handleSuccess(response, fileList) {
      let token = this.$cookies.get('token')
      if (response.message === 'OK') {
        var spe = document.querySelector('.ad')
        spe.style.transform = 'translateY(0px)'
        this.$Message.success('图片上传成功！');
        var length = response.data.length
        var last = response.data.substring(33, length)
        last = 'http://www.revocat.tech/img/uploaded/' + last
        this.$store.state.avatar.avatar = last
        this.$http.put(
          `/user/info`, {
          id: this.id,
          nickname: this.temporaryName,
          avatar: last,
        }, {
          headers: {
            'Authorization': token,
          },
        }).then(res => {
        }).catch(Error => {
        })
      } else {
        this.$Message.error('图片上传失败！');
      }
    },
    handleProgress() {
      var initImg = document.querySelector('.imgX')
      initImg.style.display = 'none'
      var up = document.querySelector('.a1')
      up.style.transform = 'translateY(7px)'
      this.$Message.loading('正在努力上传中...', 0)
    },
    seeBig() {
      this.dialogImageUrl = this.data[0];
      this.dialogVisible = true;
    },
    handlePictureCardPreview(file) {

      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}

</script>
<style lang='less' scoped>
@keyframes all {
  from {
    opacity: 0.8;
    transform: translateY(-600px) scale(.1);

  }

  60% {
    transform: translateY(100px) scale(.2);

  }

  to {
    opacity: 1;
  }
}

.imgX {
  cursor: pointer;
  position: relative;
  width: 148px;
  height: 148px;
  margin-right: 10px;
  border-radius: 6px;
  overflow: hidden;

  .mask {
    display: grid;
    place-content: center;
    transition: all .5s;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: rgba(0, 0, 0, .3);
    opacity: 0;

    .iconfont {
      font-size: 25px;
      color: #fff
    }
  }
}

.imgX:hover .mask {
  opacity: 1;
}

.popconfirm {
  height: 80px;
}

.dialog::-webkit-scrollbar-track {
  font-family: test;
  background: rgb(230, 230, 230);
}


.dialog::-webkit-scrollbar {
  width: 12px;
}

.dialog::-webkit-scrollbar-button {
  display: none;
}

/* 
    body::-webkit-scrollbar-track-piece {
      background-color: black;

    } */

.dialog::-webkit-scrollbar-thumb {
  position: relative;
  background-color: rgb(185, 185, 185);
  border-radius: 10px;
}

.dialog::-webkit-scrollbar-thumb:hover {
  background-color: rgb(163, 163, 163);
}

@keyframes allall {
  from {
    opacity: 0;
    transform: translateY(-200px);

  }

  to {
    opacity: 1;
  }
}

.center-container {
  animation: allall 1s alternate;

  .self {
    margin-bottom: 20px;
    padding: 25px 40px;
    font-size: 15px;
    font-weight: 500;
    width: 100%;
    box-shadow: 3px 3px 12px -2px #ccc;
    background-color: #fff;
    border-radius: 8px;
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
      width: 240px;
      height: 100%;

      .load {
        display: inline-block;
        position: relative;
        position: absolute;
        transform: rotate(165deg) translate(-25px, -15px);
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

  .img2 {
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
      width: 362px;
      height: 100%;

      .load {
        display: inline-block;
        position: relative;
        position: absolute;
        transform: rotate(165deg) translate(-25px, -15px) scale(1.3);
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

  .img5 {
    cursor: pointer;
    position: relative;
    margin-right: 10px;
    height: 100%;
    width: 100%;
    overflow: hidden;


    .mask {
      transition: all .5s;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      background-color: rgba(0, 0, 0, .3);
      opacity: 0;
    }

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
      color: hsl(0, 0%, 61%);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;

      .load {
        display: inline-block;
        position: relative;
        position: absolute;
        transform: rotate(165deg) translate(-15px, -20px) scale(1);
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

  .img5:hover .mask {
    opacity: 1;
  }

  .form {
    animation: all 1s;
    margin: 0 auto;
    margin-top: 40px;
    width: 800px;

    .myName {
      display: flex;
      text-align: center;
      line-height: 40px;

      span {
        margin-left: 10px;
      }

      .iconfont {
        cursor: pointer;
        margin-left: 10px;
        font-size: 20px;

      }

      /* From uiverse.io by @alexruix */
      .input {
        width: 160px;
        margin-left: 10px;
        line-height: 28px;
        border: 2px solid transparent;
        border-bottom-color: #777;
        padding: .2rem 0;
        outline: none;
        background-color: transparent;
        color: #0d0c22;
        transition: .3s cubic-bezier(0.645, 0.045, 0.355, 1);
      }

      .input:focus,
      input:hover {
        outline: none;
        padding: .2rem 1rem;
        border-radius: 1rem;
        border-color: #7a9cc6;
      }

      .input::placeholder {
        color: #777;
      }

      .input:focus::placeholder {
        opacity: 0;
        transition: opacity .3s;
      }







    }


    .uploadPic {
      height: 148px;
      margin-left: 15px;
      margin: 20px 0;
      display: flex;
      align-items: center;

      .upload {
        margin-left: 15px;
      }


    }

    .myArticle {
      .error {
        span {
          font-size: 13px;
        }

        .iconfont {
          font-size: 17px;
        }
      }

      .head {
        position: relative;
        display: flex;
        align-items: end;
        font-size: 25px;
        font-weight: 600;
        margin-bottom: 20px;

        .circle {
          margin-right: 10px;
          display: inline-block;
          display: grid;
          place-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 3px solid pink;

          span {
            transform: translateY(2px);
            font-size: 25px;
            color: pink;
          }
        }

        .title::before {
          content: '';
          transition: all .5s;
          position: absolute;
          bottom: -2px;
          width: 0px;
          border-bottom: 3px solid #ccc;
        }

        .title:hover::before {
          width: 150px;
        }

      }

      .contentA {

        .none {
          margin-left: 100%;
          font-style: italic;
          color: #ccc;
          display: block;
          width: 100%;
          text-align: center;
        }

        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 20px;

        .article {
          position: relative;
          border-radius: 8px;
          height: 130px;
          overflow: hidden;

          div {
            position: absolute;
          }

          .tit {
            z-index: 100;
            width: 208px;
            bottom: 30px;
            left: 10px;
            color: #fff;
            font-weight: 600;
            font-size: 20px;
            word-break: break-all;

            text-overflow: ellipsis;

            display: -webkit-box;

            -webkit-box-orient: vertical;

            -webkit-line-clamp: 1;

            overflow: hidden;
          }

          .con {
            z-index: 100;
            font-size: 13px;
            width: 208px;
            color: #fff;
            // font-size: 12px;
            bottom: 10px;
            left: 10px;
            word-break: break-all;

            text-overflow: ellipsis;

            display: -webkit-box;

            -webkit-box-orient: vertical;

            -webkit-line-clamp: 1;

            overflow: hidden;
          }

          .mask {
            transition: all .5s;
            z-index: 0;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: .6;
            background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, .4));
          }

          .icon-shanchu {
            transition: all .5s;
            top: 5px;
            font-size: 20px;
            color: white;
            opacity: 0;
            right: -15px;
          }

          .img1 {
            transition: all .5s;
            width: 100%;
            height: 100%;
          }
        }

        .article:hover .img1 {
          transform: scale(1.2);
        }

        .article:hover .mask {
          opacity: 1;
        }

        .article:hover .icon-shanchu {
          opacity: 1;
          right: 10px;
        }
      }
    }


    .clear {
      // transform: translateY(6px);
      position: absolute;
      right: 0;
      font-weight: normal;
      font-size: 16px;
      cursor: pointer;

      .iconfont {
        display: inline-block;
        transform: translate(3px, 1.5px);
        font-size: 18px;
      }
    }

    .collection {
      margin-top: 20px;

      .head {
        position: relative;
        display: flex;
        align-items: end;
        font-size: 25px;
        font-weight: 600;
        margin-bottom: 20px;

        .circle {
          margin-right: 10px;
          display: inline-block;
          display: grid;
          place-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 3px solid orange;

          span {
            transform: translate(1px, 1px);
            font-size: 25px;
            color: orange;
          }
        }

        .title::before {
          content: '';
          transition: all .5s;
          position: absolute;
          bottom: -2px;
          width: 0px;
          border-bottom: 3px solid #ccc;
        }

        .title:hover::before {
          width: 100px;
        }

      }

      .contentA {
        .none {
          margin-left: 50%;
          font-style: italic;
          color: #ccc;
          display: block;
          width: 100%;
          text-align: center;
        }

        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 20px;

        .article {
          position: relative;
          border-radius: 8px;
          height: 200px;
          overflow: hidden;

          div {
            position: absolute;
          }

          .tit {
            z-index: 100;
            width: 320px;
            bottom: 30px;
            left: 10px;
            color: #fff;
            font-weight: 600;
            font-size: 25px;
            word-break: break-all;

            text-overflow: ellipsis;

            display: -webkit-box;

            -webkit-box-orient: vertical;

            -webkit-line-clamp: 1;

            overflow: hidden;
          }

          .con {
            z-index: 100;
            width: 320px;
            color: #fff;
            font-size: 15px;
            bottom: 10px;
            left: 10px;
            word-break: break-all;

            text-overflow: ellipsis;

            display: -webkit-box;

            -webkit-box-orient: vertical;

            -webkit-line-clamp: 1;

            overflow: hidden;
          }

          .mask {
            transition: all .5s;
            z-index: 0;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: .6;
            background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, .4));
          }

          .icon-shanchu {
            transition: all .5s;
            top: 5px;
            font-size: 24px;
            color: white;
            opacity: 0;
            right: -15px;
          }

          .img2 {
            transition: all .5s;
            width: 100%;
            height: 100%;
          }
        }

        .article:hover .img2 {
          transform: scale(1.2);
        }

        .article:hover .mask {
          opacity: 1;
        }

        .article:hover .icon-shanchu {
          opacity: 1;
          right: 10px;
        }
      }
    }
  }
}
</style>