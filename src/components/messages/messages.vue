<!--  -->
<template>
  <div class="messages-container">
    <normalHeader></normalHeader>
    <ul class="stacks">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li>
        <span>留言墙</span>
      </li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <div class="bkimg">
      <div class="container">
        <div class="title">
          留言请遵守规则：
        </div>
        <div class="context">
          <div class="tip" v-for="item in rule" :key="item.id">
            {{ item.id }}.{{ item.context }}
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="body">
        <div class="left self">
          <div class="head">
            <span>留言墙</span>
          </div>
          <div class="comment">
            <div class="body">
              <div class="tipLogin" v-if="!Login">
                登录后才能评论和点赞哦！
                <button class="btn" @click="goLogin">
                  <span class="btn-text-one">
                    <span class="iconfont icon-denglu1" style="font-size: 23px;
                                                        display: inline-block;transform: translateY(2px);"></span>
                    <span class="login">去登录</span>
                  </span>
                  <span class="btn-text-two">Go!</span>
                </button>
              </div>
              <div class="hasLogin" v-if="Login">
                <div class="me">
                  <div class="img">
                    <img :src=mycomment.avatar alt="">
                  </div>
                  <div class="introme">
                    <div class="nickname">{{ mycomment.nickname }}</div>
                    <div class="ip">IP属地:{{ mycomment.ip_source }}</div>
                  </div>
                </div>
                <div class="commenting">
                  <textarea name="" id="" rows="5" cols="20" placeholder="足迹是无声的语言，留言是友谊的风帆~" maxlength="100"
                    v-model="commenting" ref="bigArea" wrap="hard">
                                                    </textarea>
                  <span>{{ commentBig.length }}/100</span>
                </div>
                <el-button @click="sendLeave" class="submit" type="primary">发布</el-button>
              </div>
              <div class="list">
                <div class="context" v-for="(item, index) in leaveList" :key="item.id"
                  :style="'background-color:' + colorTe[index] + ';'">
                  <div class="header">
                    <div class="time">
                      {{ item.created_at }}
                    </div>
                    <div class="title">
                      留言
                    </div>
                  </div>
                  <div class="body">
                    {{ item.content }}
                  </div>
                  <span class="like">
                    <label class="xin">
                      <input type="checkbox" id="checkbox" :checked="isLikeList[index]" hidden ref="leaveLike"
                        @click.prevent="leaveLike(item.id, index)">
                      <svg t="1639041971928" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="3128">
                        <path
                          d="M512 896a42.666667 42.666667 0 0 1-30.293333-12.373333l-331.52-331.946667a224.426667 224.426667 0 0 1 0-315.733333 223.573333 223.573333 0 0 1 315.733333 0L512 282.026667l46.08-46.08a223.573333 223.573333 0 0 1 315.733333 0 224.426667 224.426667 0 0 1 0 315.733333l-331.52 331.946667A42.666667 42.666667 0 0 1 512 896z"
                          p-id="3129" id="heart"></path>
                      </svg>
                      <span></span>
                    </label>
                    <span style="transform:translateY(-4.5px);
                                                        margin-left:3px;
                                                        display: inline-block;"> {{ item.like_count }}</span>
                  </span>
                  <div class="name">
                    —— {{ item.nickname }}
                  </div>
                  <div class="avatar">
                    <img :src=item.avatar alt="">
                  </div>
                </div>

              </div>
            </div>
          </div>
          <Page :total="total" @on-change="changePage" class-name="divide-page" :page-size="15"></Page>
        </div>
        <normalRight></normalRight>
      </div>
    </div>
    <normalFooter></normalFooter>
  </div>
</template>

<script>
import normalRight from '@/components/index/index-body-components/index-body-right.vue'
import normalFooter from '@/components/normalize/normalize-footer.vue'
import normalHeader from '@/components/normalize/normalize-head.vue'
import { mapState } from 'vuex';
export default {
  data() {
    return {
      rule: [
        { id: 1, context: '发言请遵守社会公序良俗，禁止色情暴力内容。' },
        { id: 2, context: '友善发言，禁止攻击性语言和政治敏感词汇。' },
        { id: 3, context: '欢迎您留言发表对博客的看法和改进的意见。' },
        { id: 4, context: '每次博客迭代更新时将清除当前拥有的所有用户的发言。' },
        { id: 5, context: '网络并非法外之地，您的一切不当发言将承担法律责任。' }
      ],
      total: 0,
      colorTe: [],
      colorList: ['rgb(217,217,217)', 'rgb(236,203,195)', 'rgb(251,239,213)', 'rgb(211,247,253)', 'rgb(218,251,209)', 'rgb(254,247,210', 'rgb(220,249,211)', '#ffe1d3', '#ffd7ff', '#ffe7d2', '#ffe5ff', '#ffe5ff'],
      isLikeList: '',
      masterisLiked: '',
      articleisLiked: '',
      replyCommentLikeNumber: 0,
      masterCommentLikeNumber: [],
      articleLikeNumber: '',
      Login: '',
      type: '',
      commenting: '',
      leaveList: [],
      commentReply: [],
      commentFloor: [[]],
      replyerReply: [],
      masterReply: [],
      commentBig: '',
      top: '',
      scrollTop: '',
      data: {},
      commentList: [{}],
      mycomment: {}
    };
  },

  components: {
    normalRight,
    normalFooter,
    normalHeader
  },

  computed: {},
  watch: {
    commenting() {
      var reg = /[^\S]/
      this.commenting = this.commenting.replace(reg, '')
    },
  },
  async created() {
    let token = this.$cookies.get('token')
    await this.$http.get(
      `/message/list`, {
      params: {
        page_size: 15,
        page_num: 1
      }
    }).then(res => {
      this.leaveList = res.data.data.message_list
      var i
      for (i = 0; i < this.leaveList.length; i++) {
        this.leaveList[i].created_at = this.leaveList[i].created_at.substring(0, 10)
      }
      for (i = 0; i < this.leaveList.length; i++) {
        var how = Math.floor(Math.random() * this.colorList.length)
        this.colorTe.push(this.colorList[how])
      }
      this.$store.state.messages.number = this.leaveList.length
      this.total = res.data.data.total
    }).catch(Error => {
    })
    await this.$http.post(
      '/user/info', {}, {
      headers: {
        'Authorization': token,

      },
    }).then(res => {
      this.mycomment = res.data.data
    }).catch(Error => {
    })
    await this.$http.post(
      `/message/islike`, {}, {
      headers: {
        'Authorization': token,
      },
    }).then(res => {
      if (res.data.message === 'OK') {
        var i
        this.isLikeList = res.data.data
      }
      else {

      }
    }).catch(Error => {
    })
  },
  mounted() {
    this.Login = this.$cookies.get('isLogin')
  },
  updated() {
    var left = document.querySelector('.left')
    this.$store.state.messages.height = left.offsetHeight
  },
  methods: {
    async changePage(index) {
      window.scrollTo({
        left: 0,
        top: 400,
        behavior:'smooth'
      });
      await this.$http.get(
        `/message/list`, {
        params: {
          page_size: 15,
          page_num: index
        }
      }).then(res => {
        this.leaveList = res.data.data.message_list
        this.total = res.data.data.total
        var i
        for (i = 0; i < this.leaveList.length; i++) {
          this.leaveList[i].created_at = this.leaveList[i].created_at.substring(0, 10)
        }
        for (i = 0; i < this.leaveList.length; i++) {
          var how = Math.floor(Math.random() * this.colorList.length)
          this.colorTe.push(this.colorList[how])
        }
        this.$store.state.messages.number = this.leaveList.length
      }).catch(Error => {
      })
    },
    sendLeave() {
      let token = this.$cookies.get('token')
      if (this.commenting) {
        this.$confirm('您确定要发送这条留言吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(
            '/message', { content: this.commenting }, {
            headers: {
              'Authorization': token,
            },
          }).then(res => {
            location.reload()
            this.$message({
              type: 'success',
              message: '发送成功!'
            });
          }).catch(Error => {
            this.$message({
              type: 'error',
              message: '发送失败!'
            });
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
      }
    },
    noWrap() {
      let reg = /^./
      if (reg.exec() !== null) {
      }
    },
    async leaveLike(id, index) {
      let token = this.$cookies.get('token')
      await this.$http.post(
        `/message/like/${id}`, { message_id: id }, {
        headers: {
          'Authorization': token,

        },
      }).then(res => {
        if (res.data.message === 'OK') {
          if (!this.$refs.leaveLike[index].checked) {
            this.leaveList[index].like_count++
            this.$refs.leaveLike[index].checked = true
          } else {
            this.leaveList[index].like_count--
            this.$refs.leaveLike[index].checked = false
          }

        }
        else {
          this.$Notice.error({
            title: '还没有登陆不能点赞哦！',
            desc: '登陆信息可能过期或者没有登陆哦！重新登陆试试吧~'
          })
        }
      }).catch(Error => {
        this.$Notice.error({
          title: '服务器请求繁忙！',
          desc: '很抱歉给您带来的不便，但是服务器也是会累的哦！检查一下网络状态是否良好再试试吧'
        })

      })
    },
    goLogin() {
      this.$router.push('/login')
    },
  }
}

</script>
<style lang='less' scoped>
@import '@/assets/font.css';

@keyframes all {
  from {
    opacity: 0;
    transform: translateY(-200px);

  }

  to {
    opacity: 1;
  }
}
.messages-container {
  animation: all 1s;

  .divide-page {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 20px);
  }

  .self {
    margin-bottom: 20px;
    padding: 25px 20px;
    width: 100%;
    box-shadow: 3px 3px 12px -2px #ccc;
    background-color: #fff;
    border-radius: 8px;
  }

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

  @keyframes banner {
    from {
      opacity: 0;
      transform: translate(-400px) rotateY(90deg);
    }

    to {
      opacity: 1;
    }
  }

  ul.stacks {
    animation: img 1s;
    z-index: 5;
    position: absolute;
    top: 0;
    left: 0;
    list-style: none;
    display: flex;
    height: 400px;
    width: 100%;
    flex-direction: row;

    li {
      transition: 1s;
      animation: slideUp 1s ease-in-out infinite;
      background-color: #ccc;
      flex: 1;
      overflow: hidden;
      position: relative;
    }

    li:nth-child(2) {
      transition-delay: .1s;
    }

    li:nth-child(3) {
      transition-delay: .2s;
    }

    li:nth-child(4) {
      transition-delay: .3s;
    }

    li:nth-child(5) {
      transition-delay: .4s;
    }

    li:nth-child(6) {
      transition-delay: .5s;
    }

    li:nth-child(7) {
      transition-delay: .6s;
    }

    li:nth-child(8) {
      transition-delay: .7s;
    }

    li:nth-child(9) {
      transition-delay: .8s;
    }

    li:nth-child(10) {
      transition-delay: .9s;
    }

    li:nth-child(2)::after {
      left: -10vw;
    }

    li:nth-child(3)::after {
      transition-delay: .2s;
      left: -20vw;
    }

    li:nth-child(4)::after {
      transition-delay: .3s;
      left: -30vw;
    }

    li:nth-child(5)::after {
      transition-delay: .4s;
      left: -40vw;
    }

    li:nth-child(6)::after {
      transition-delay: .5s;
      left: -50vw;
    }

    li:nth-child(7)::after {
      transition-delay: .6s;
      left: -60vw;
    }

    li:nth-child(8)::after {
      transition-delay: .7s;
      left: -70vw;
    }

    li:nth-child(9)::after {
      transition-delay: .8s;
      left: -80vw;
    }

    li:nth-child(10)::after {
      transition-delay: .9s;
      left: -90vw;
    }

    li::after {
      // transition: all .5s;
      animation: slideUp 1s;
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-image:url("@/assets/img/j52.jpg");
      background-position: center center;
      background-size: cover;
    }

    li:nth-child(5)::after {

      content: '留言墙';
      line-height: 400px;
      font-size: 40px;
      font-weight: 600;
      color: white;
      text-align: center;
    }

    li:nth-child(6)::after {

      content: '留言墙';

      font-size: 40px;
      line-height: 400px;
      font-weight: 600;
      color: white;
      text-align: center;
    }

    &:hover li {
      transform: translateY(-100%);
    }

    @keyframes sildeUp {
      to {
        transform: translateY(-100%);
      }
    }
  }


  .bkimg {
    animation: img 1s;
    width: 100%;
    height: 400px;
    overflow: hidden;
    background-image: url("@/assets/img/day.jpg");

    @keyframes title {
      50% {
        opacity: 0;
        transform: translate(-50%) scale(0);
      }

      to {
        opacity: 1;
        transform: translate(-50%) scale(1);
      }
    }

    .container {
      display: flex;
      flex-direction: column;
      align-items: start;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -20%);
      color: black;

      .title {
        margin-bottom: 20px;
        animation: title 1s;
        left: 50%;
        font-weight: 600;
        margin-top: 200px;
        font-size: 40px;
      }

      .context {
        font-size: 20px;

        font-weight: 500;
      }
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

  .container {
    animation: banner 1s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .body {
    // background-color:pink;
    display: flex;
    margin-top: 40px;

    .left {
      padding-bottom: 70px;
      position: relative;
      height: 100%;
      width: 1000px;

      @keyframes title {
        from {
          opacity: .5;
          transform: translate(-50%) scale(0);
        }

        to {
          transform: translate(-50%) scale(1);
        }
      }

      .head {
        animation: title 1s;
        position: absolute;
        left: 50%;
        font-size: 30px;
        font-weight: 600;
        transform: translate(-50%);
      }

      .comment {
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .tipLogin {
          margin-bottom: 20px;
        }

        @keyframes body {
          from {
            opacity: 0;
            transform: translate(0%) scale(0);
          }

          50% {
            opacity: .2;
          }

          to {
            opacity: 1;
            transform: translate(0) scale(1);
          }
        }

        .body {
          animation: body 1s;
          display: flex;
          align-items: center;
          flex-direction: column;
          position: relative;
          width: 100%;
          font-weight: 500;
          margin-top: 15px;
          font-size: 18px;
          vertical-align: middle;
          line-height: 50px;
          font-style: italic;
          font-weight: 600;

          .btn {
            transform: translateY(-5px);
            transition: all .5s;
            width: 120px;
            height: 40px;
            background: linear-gradient(to top, orange, rgb(255, 170, 12), rgb(255, 182, 46));
            color: #fff;
            border-radius: 5px;
            border: none;
            outline: none;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }

          .btn:hover {
            background: linear-gradient(to top, rgb(255, 188, 62), rgb(253, 200, 102), rgb(255, 209, 125));
            ;
          }

          .btn span {
            font-size: 18px;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: top 0.5s;
          }

          .btn-text-one {
            position: absolute;
            width: 100%;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
          }

          .btn-text-two {
            position: absolute;
            width: 100%;
            top: 150%;
            left: 0;
            transform: translateY(-50%);
          }

          .btn:hover .btn-text-one {
            top: -100%;
          }

          .btn:hover .btn-text-two {
            top: 50%;
            animation: scalego .5s infinite alternate ease-in-out;
          }

          @keyframes scalego {
            0% {}

            100% {
              transform: translateY(-50%) scale(1.1);
              letter-spacing: .05rem;
            }
          }

          .hasLogin {
            margin-bottom: 15px;

          }

          .hasLogin,
          .tipLogin {
            width: 100%;

            .me {
              display: flex;
              align-items: center;

              .img {
                transition: all .5s;
                margin-right: 10px;
                width: 80px;
                height: 80px;
                border-radius: 50%;
                overflow: hidden;
              }

              img {
                transition: all .8s;
                width: 100%;
                height: 100%;
              }

              .img:hover {
                transform: rotate(360deg);
              }

              .img:hover img {
                transform: scale(1.2);
              }

              .introme {
                .nickname {
                  font-weight: 600;
                  font-size: 18px;
                }

                .ip {
                  font-size: 12px;
                }
              }
            }

            .submit {
              color: #fff;
              float: right;
              font-weight: 500;
              font-size: 16px;
              padding: 10px 15px;
              border: none;
              background-color: #00a5e0;
              margin-top: 10px;
            }

            .submit:hover {
              background-color: #12b5f1;
            }

            .commenting {
              margin-top: 20px;
              position: relative;
              line-height: 20px;

              span {
                color: #ccc;
                font-size: 14px;
                font-style: italic;
                position: absolute;
                right: 20px;
                bottom: 15px;
              }

              ::-webkit-scrollbar-track {
                height: 8px;
                background: gainsboro;
                border-radius: 4px;
              }

              /* Designing for scroll-bar */
              ::-webkit-scrollbar {
                height: 8px;

                width: 6px;
              }

              ::-webkit-scrollbar-thumb {
                height: 8px;

                background: #75daff;
                border-radius: 4px;
              }

              /* Handle on hover */
              ::-webkit-scrollbar-thumb:hover {
                height: 8px;

                background: #00bbff;
              }

              textarea {

                color: #000;
                font-size: 14px;
                transition: height .2s;

                outline: none;
                resize: none;
                width: 100%;
                height: 50px;
                border: none;
                padding: 15px 70px 10px 15px;
                background-color: rgb(234, 234, 234);
                border-radius: 6px;
              }
            }

            ::-webkit-input-placeholder {
              color: rgb(162, 162, 162)
            }

            ;

            textarea:palceholder {
              color: #ccc
            }

            textarea:hover {
              background-color: #fff;
              border: 1px solid #ccc;
              padding: 14px 70px 9px 14px;
            }

            textarea:focus {
              height: 150px;
              padding: 14px 14px 9px 14px;
              background-color: #fff;
              border: 1px solid #00a5e0;
            }
          }
        }
      }

      .list {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 20px;

        .context {
          position: relative;
          font-family: 'webfont1';
          height: 250px;
          margin-top: 20px;
          background-color: #97d6ff;
          display: flex;
          flex-direction: column;
          align-items: center;

          .header {
            display: flex;
            font-style: normal;
            color: rgb(96, 96, 96);
            font-size: 16px;
            width: 90%;
            font-weight: normal;
            line-height: 40px;

            .time {
              flex: 1;
            }
          }

          .body {
            display: flex;
            align-items: start;
            justify-content: start;
            line-height: normal;
            font-weight: lighter;
            color: #000;
            font-style: normal;
            letter-spacing: 0;
            padding: 0;
            margin: 0;
            font-size: 16px;
            width: 90%;
          }

          .like {
            margin-bottom: -20px;
            position: absolute;
            left: 5%;
            bottom: 5%;

            span {
              font-size: 16px;
              font-style: normal;
              font-weight: normal;
            }

            .xin {
              animation: scale 6s infinite alternate ease-in-out;
              display: inline-block;
              position: relative;
              cursor: pointer;
              --c: #ff6b81;

              svg {
                width: 20px;
              }

              #heart {
                /* 填充颜色 */
                fill: rgb(152, 152, 152);
                /* stroke属性可应用于任何种类的线条，文字和元素，就像一个圆的轮廓 */
                stroke: var(--c);
                /* 线条宽度 */
                stroke-width: 20px;
                /* 设置线条为虚线，虚线的长度 */
                stroke-dasharray: 2600;
                /* 线条的位移 */
                stroke-dashoffset: 2600;
                /* 端点为圆头 */
                stroke-linecap: round;
              }

              span {
                display: inline-block;
                width: 8px;
                height: 8px;
                background-color: transparent;
                border-radius: 50%;
                /* 绝对定位 居中 */
                position: absolute;
                top: 30%;
                left: 30%;
                transform: translate(-50%, -50%)scale(0);
                /* 设置各个方向的阴影 */
                /* 通过var函数调用自定义属性--c,设置阴影颜色 */
                box-shadow: 0 -20px 0 var(--c),
                  0 20px 0 var(--c),
                  -20px 0 0 var(--c),
                  20px 0 0 var(--c),
                  15px -15px 0 var(--c),
                  -15px -15px 0 var(--c),
                  15px 15px 0 var(--c),
                  -15px 15px 0 var(--c);
              }

              /* 勾选复选框执行各个动画 */
              #checkbox:checked+svg #heart {
                /* 执行动画: 动画名 时长 线性的 停留在最后一帧 */
                animation: drawHeart 1s linear forwards;
              }

              #checkbox:checked~span {
                /* 执行动画: 动画名 时长 加速后减速 停留在最后一帧 */
                animation: blink 0.5s ease-in-out forwards;
                /* 动画延迟时间 */
                animation-delay: 0.85s;
              }

              #checkbox:checked+svg {
                /* 执行动画: 动画名 时长 线性的 停留在最后一帧 */
                animation: beat 1.2s linear forwards;
              }

              label {
                /* 鼠标移入,光标变小手 */
                cursor: pointer;
              }

              /* 定义动画 */
              /* 画心的动画 */
              @keyframes drawHeart {
                0% {
                  stroke-dashoffset: 2600;
                }

                80% {
                  fill: #eee;
                  stroke-dashoffset: 0;
                }

                100% {
                  fill: var(--c);
                  stroke-dashoffset: 0;
                }
              }

              /* 小圆点闪出的动画 */
              @keyframes blink {
                0% {
                  transform: scale(0.5);
                  opacity: 0.2;
                }

                80% {
                  transform: scale(1);
                  opacity: .6;
                }

                100% {
                  transform: scale(2.1);
                  opacity: 0;
                }
              }

              /* 心跳动的动画 */
              @keyframes beat {
                0% {
                  transform: scale(1);
                }

                70% {
                  transform: scale(1);
                }

                80% {
                  transform: scale(1.2);
                }

                100% {
                  transform: scale(1);
                }
              }
            }
          }

          .name {
            font-weight: 500 !important;
            line-height: normal;
            color: #000;
            font-size: 18px;
            letter-spacing: 0;
            padding: 0;
            margin: 0;
            position: absolute;
            right: 5%;
            bottom: 5%;
          }

          .avatar {
            position: absolute;
            transform: translateY(-50%);
            width: 60px;
            height: 60px;
            overflow: hidden;
            border-radius: 50%;
            border: 3px solid #fff;

            img {
              transition: all .5s;
              width: 100%;
              height: 100%;
            }
          }
        }

        .avatar:hover img {
          transform: scale(1.2);
        }

      }
    }

  }
}
</style>