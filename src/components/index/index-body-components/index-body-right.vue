<!--  -->
<template>
  <div class="index-body-right-container" ref="container">
    <div class="me self demo-affix">
      <div class="background">
        <img :src=webavatarBG alt="" class="backgroundpic">
      </div>
      <img class="avatarimg" :src=webavatar alt="" style="z-index:1" @click="goAbout">
      <div class="name">{{ name }}</div>
      <div style="font-size:14px;color:#000;">{{ signature }}</div>
      <div class="statistics">
        <span class="com">文章<div>{{ article }}</div></span>
        <span class="com">分类<div>{{ category }}</div></span>
        <span class="com">标签<div>{{ tags }}</div></span>
      </div>
      <button class="button" :plain="true" @click="open2" :duration="durationTime">
        <span class="iconfont icon-bookmark-full"></span>
        <div style="font-size:14px ;">标签</div>
      </button>
      <div class="aboutme">
        <a href="javascript:;" class="iconfont icon-weixin" @click="noTell" ></a> 
        <a href="javascript:;" class="iconfont icon-QQ-circle-fill" @click="noTell"></a>
        <a :href=github class="iconfont icon-github-fill"></a>
        <a :href=gitee class="iconfont icon-gitee-fill-round"
          style="font-size:26px; transform:translateY(2px);"></a>
      </div>
    </div>
    <div class="loginTip self" v-if="this.$cookies.get('isLogin') !== 'true'">
      <h1>Hi!请登录</h1>
      <div class="button">
        <Button type="warning" @click="goLogin">
          <span class="iconfont icon-denglu1"></span>
          <span class="login">登录</span>
        </Button>
        <Button type="primary" @click="goRegister">
          <span class="iconfont icon-jiahao"></span>
          <span class="login">注册</span>
        </Button>
      </div>
    </div>

    <div class="affix" ref="affix">
      <div class="calendar self">
        <div class="calendar-box">
          <div class="calendar-wrapper">
            <div class="calendar-toolbar">
              <div class="prev" @click="prevMonth">上个月</div>
              <div class="current">{{ currentDateStr }}</div>
              <div class="next" @click="nextMonth">下个月</div>
            </div>

            <div class="calendar-week">
              <div class="week-item calendarBorder" v-for="item of weekList" :key="item">
                {{ item }}
              </div>
            </div>
            <div class="calendar-inner">
              <div class="calendar-item calendarBorder" v-for="(item, index) of calendarList" :key="index" :class="{
                'calendar-item': true,
                calendarBorder: true,
                'calendar-item-hover': !item.disable,
                'calendar-item-disabled': item.disable,
                'calendar-item-checked':
                  dayChecked && dayChecked.value == item.value,
              }">
                {{ item.date }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="poetry self">
        {{ poetry }}
        <span style="margin-left:16px">---{{ author }}</span>
      </div>
      <div class="notice self">
        <div class="head">
          <span class="iconfont icon-lingdang"></span>
          <span class="gg">公告</span>
        </div>
        <div class="content">
          <span v-html="notice"></span>
        </div>
      </div>
      <div class="message self">
        <span class="iconfont big icon-zixunlanmu"></span>
        <span class="big">网站咨询</span>
        <div class="content">
          <div class="time" style="margin-top:8px ;">
            运行时间：{{ time }}
          </div>
          <div class="time">
            浏览次数：{{ visits }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { date, visits } from '@/hooks/webmessage.js'
export default {
  data() {
    return {
      gitee:'',
      github:'',
      rightHeight: 0,
      flag: undefined,
      absoluteTop: 0,
      top: 0,
      author: '白居易',
      poetry: '',
      showYearMonth: {}, // 显示的年月
      calendarList: [], // 用于遍历显示
      shareDate: new Date(), // 享元模式，用来做 日期数据转换 优化
      dayChecked: {}, // 当前选择的天
      weekList: ["一", "二", "三", "四", "五", "六", "日"], // 周
      signature: '',
      article: 0,
      category: 0,
      tags: 0,
      webavatarBG: '',
      webavatar: '',
      ceiling: document.documentElement.scrollTop,
      durationTime: 2000,
      time: '',
      visits: 0,
      notice: '',
    };
  },

  mounted() {
    setTimeout(() => {
      this.top = this.$refs.affix.offsetTop
      this.rightHeight = this.$refs.affix.offsetHeight
      var scrollTop = document.documentElement.scrollTop
      var fn = () => {
        if (this.$store.state.articleNumber.fixFlag) {
          this.$refs.affix.classList.remove('affix')
          if (document.documentElement.scrollTop <= this.top - 35) {
            this.$refs.affix.classList.remove('affix1')
          } else {
            this.$refs.affix.classList.add('affix1')
          }
          if (document.documentElement.scrollTop - this.$store.state.articleNumber.indexLength * 325 - 45 > 0) {
            this.$refs.affix.classList.remove('affix1')
            this.$refs.affix.classList.add('affix2')
            this.$refs.affix.style.top = this.$store.state.articleNumber.indexLength * 325 + 45 + 'px'

          } else if (document.documentElement.scrollTop > this.top - 35) {
            this.$refs.affix.classList.add('affix1')
            this.$refs.affix.style.top = '35px'
            this.$refs.affix.classList.remove('affix2')
          }
          if (document.documentElement.scrollTop <= this.top - 35) {
            this.$refs.affix.classList.remove('affix2')
          }
        } else {
          this.$refs.affix.classList.remove('affix1')
          this.$refs.affix.classList.remove('affix2')
        }
      }
      var fn1 = () => {
        if (this.$store.state.messages.number >= 7) {
          this.$refs.affix.classList.remove('affix')
          if (document.documentElement.scrollTop <= 900 - 35) {
            this.$refs.affix.classList.remove('affix1')
          } else {
            this.$refs.affix.classList.add('affix1')
          }
          if (this.rightHeight + document.documentElement.scrollTop - this.$store.state.messages.height > 430) {
            this.$refs.affix.classList.remove('affix1')
            this.$refs.affix.classList.add('affix2')
            this.$refs.affix.style.top = this.$store.state.messages.height - 278 + 'px'

          }
          else if (document.documentElement.scrollTop > 900 - 35) {
            this.$refs.affix.classList.add('affix1')
            this.$refs.affix.style.top = '35px'
            this.$refs.affix.classList.remove('affix2')
          }
          if (document.documentElement.scrollTop <= 900 - 35) {
            this.$refs.affix.classList.remove('affix2')
          }
        } else {
          this.$refs.affix.classList.remove('affix1')
          this.$refs.affix.classList.remove('affix2')
        }
      }
      if (window.location.pathname === '/index' && this.$store.state.articleNumber.indexLength >= 4) {
        fn()
      }
      if (window.location.pathname === '/messages' && this.$store.state.messages.height > 1200) {
        fn1()

      }
      if (window.location.pathname === '/messages' && this.$store.state.messages.height > 1200) {
        window.addEventListener('scroll', () => {
          fn1()
        })
      }
      if (window.location.pathname === '/index' && this.$store.state.articleNumber.indexLength >= 4) {
        window.addEventListener('scroll', () => {
          fn()
        })
      }
    }, 1000)
  },
  watch: {
  },
  created() {
    this.initDataFun(); // 初始化数据
    this.$http.get(
      '/home', {
    }).then(res => {
      this.gitee=res.data.data.blogConfig.gitee
      this.github=res.data.data.blogConfig.github
      this.poetry = res.data.data.sentence.sentence
      this.author = res.data.data.sentence.author
      this.article = res.data.data.articleCount
      this.$store.state.articleNumber.allNumber = res.data.data.articleCount
      this.visits = res.data.data.viewCount
      this.tags = res.data.data.tagCount
      this.category = res.data.data.categoryCount
      this.webavatar = res.data.data.blogConfig.website_avatar
      this.signature = res.data.data.blogConfig.website_intro
      this.notice = res.data.data.blogConfig.website_notice
      this.webavatarBG = res.data.data.blogConfig.author_bk_img
      this.time = date()
      setInterval(() => {
        this.time = date()
      }, 500);
      this.show = res.data.data.show
    }).catch(Error => {
      this.$store.state.isLogin.Login = false
      this.$Notice.error({
        title: '服务器请求繁忙！',
        desc: '很抱歉给您带来的不便，但是服务器也是会累的哦！检查一下网络状态是否良好再试试吧'
      })
    })
  },
  components: {},

  computed: {
    // 显示当前时间
    currentDateStr() {
      let { year, month } = this.showYearMonth;
      return `${year}年${this.pad(month + 1)}月`;
    },
    ...mapState('me', ['name']),
    ...mapState('isLogin', ['hasLogin'])
  },

  methods: {
    //#region 计算日历数据
    // 初始化数据
    noTell(){
      this.$Message.warning('这是博主的个人隐私哦！不可以随便告诉别人的');
    },
    initDataFun() {
      // 初始化当前时间
      this.setCurrentYearMonth(); // 设置日历显示的日期（年-月）
      this.createCalendar(); // 创建当前月对应日历的日期数据
      this.getCurrentDay(); // 获取今天
    },
    // 设置日历显示的日期（年-月）
    setCurrentYearMonth(d = new Date()) {
      let year = d.getFullYear();
      let month = d.getMonth();
      let date = d.getDate();
      this.showYearMonth = {
        year,
        month,
        date,
      };
    },
    getCurrentDay(d = new Date()) {
      let year = d.getFullYear();
      let month = d.getMonth();
      let date = d.getDate();
      this.dayChecked = {
        year,
        month,
        date,
        value: this.stringify(year, month, date),
        disable: false
      };
    },
    // 创建当前月对应日历的日期数据
    createCalendar() {
      // 一天有多少毫秒
      const oneDayMS = 24 * 60 * 60 * 1000;
      let list = [];
      let { year, month } = this.showYearMonth;

      // #region
      // ---------------仅仅只算某月的天---------------
      //   // 当前月，第一天和最后一天的毫秒数
      //   let begin = new Date(year, month, 1).getTime();
      //   let end = new Date(year, month + 1, 0).getTime();

      // ---------------计算某月前后需要填补的天---------------
      // 当前月份第一天是星期几, 0-6
      let firstDay = this.getFirstDayByMonths(year, month);
      // 填充多少天，因为我将星期日放到最后了，所以需要另外调整下
      let prefixDaysLen = firstDay === 0 ? 6 : firstDay - 1;
      // 向前移动之后的毫秒数
      let begin = new Date(year, month, 1).getTime() - oneDayMS * prefixDaysLen;
      // 当前月份最后一天是星期几, 0-6
      let lastDay = this.getLastDayByMonth(year, month);
      // 填充多少天，因为我将星期日放到最后了，所以需要另外调整下
      let suffixDaysLen = lastDay === 0 ? 0 : 7 - lastDay;
      // 向后移动之后的毫秒数
      let end = new Date(year, month + 1, 0).getTime() + oneDayMS * suffixDaysLen;
      // // 计算左侧时间段的循环数
      // let rowNum = Math.ceil((end - begin) / oneDayMS / 7);
      // let newPeriod = [];
      // for (let i = 0; i < rowNum; i++) {
      //   newPeriod.push({});
      // }
      // #endregion

      // 填充天
      while (begin <= end) {
        // 享元模式，避免重复 new Date
        this.shareDate.setTime(begin);
        let year = this.shareDate.getFullYear();
        let curMonth = this.shareDate.getMonth();
        let date = this.shareDate.getDate();
        list.push({
          year: year,
          month: curMonth + 1, // 月是从0开始的
          date: date,
          value: this.stringify(year, curMonth, date),
          disable: curMonth !== month,
        });
        begin += oneDayMS;
      }

      this.calendarList = list;
    },
    // 格式化时间
    stringify(year, month, date) {
      let str = [year, this.pad(month + 1), this.pad(date)].join("-");
      return str;
    },
    // 对小于 10 的数字，前面补 0
    pad(str) {
      return str < 10 ? `0${str}` : str;
    },
    // 点击上一月
    prevMonth() {
      this.showYearMonth.month--;
      this.recalculateYearMonth(); // 因为 month的变化 会超出 0-11 的范围， 所以需要重新计算
      this.createCalendar(); // 创建当前月对应日历的日期数据
    },
    // 点击下一月
    nextMonth() {
      this.showYearMonth.month++;
      this.recalculateYearMonth(); // 因为 month的变化 会超出 0-11 的范围， 所以需要重新计算
      this.createCalendar(); // 创建当前月对应日历的日期数据
    },
    // 重算：显示的某年某月
    recalculateYearMonth() {
      let { year, month, date } = this.showYearMonth;

      let maxDate = this.getDaysByMonth(year, month);
      // 预防其他月跳转到2月，2月最多只有29天，没有30-31
      date = Math.min(maxDate, date);

      let instance = new Date(year, month, date);
      this.setCurrentYearMonth(instance);
    },
    // 判断当前月有多少天
    getDaysByMonth(year, month) {
      return new Date(year, month + 1, 0).getDate();
    },
    // 当前月的第一天是星期几
    getFirstDayByMonths(year, month) {
      return new Date(year, month, 1).getDay();
    },
    // 当前月的最后一天是星期几
    getLastDayByMonth(year, month) {
      return new Date(year, month + 1, 0).getDay();
    },
    // #endregion 计算日历数据
    open2() {
      this.$message({
        showClose: true,
        message: '按住ctrl + D收藏此页面哦 !',
        type: 'success'
      });
    },
    goLogin() {
      this.$router.push('/login')
    },
    goAbout() {
      this.$router.push('/about')
    },
    goRegister() {
      this.$router.push('/login')
      this.$store.state.isLogin.slide = true
    }
  }
}

</script>
<style lang='less' scoped>
@keyframes lingdang {
  from {
    transform: scale(.9);
  }

  to {
    transform: scale(1.2);
  }
}

@calendarWidth: 287px; // 90 * 7 + 7 * 1

@keyframes flowCss {
  0% {
    /* 移动背景位置 */
    background-position: 0 0;
  }

  100% {
    background-position: -400% 0;
  }
}

.affix1 {
  position: fixed;
  top: 35px;
  width: 300px;
}

.affix2 {
  position: absolute;
  width: 300px;
}

@keyframes all {
  from {
    opacity: 0;

  }

  to {
    opacity: 1;
  }
}

.index-body-right-container {
  animation: all 1s;
  margin-left: 18px;
  display: flex;
  flex-direction: column;
  width: 300px;
  // height: 810px;

  .content {
    font-size: 15px;
    font-weight: 450;
    line-height: 25px;
  }

  .self {
    margin-bottom: 20px;
    padding: 25px 20px;
    width: 100%;
    box-shadow: 3px 3px 12px -2px #ccc;
    background-color: #fff;
    border-radius: 8px;
  }

  .poetry {
    color: #333;
    font-weight: 500;
    font-style: italic;
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .loginTip {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 140px;

    @keyframes h1 {
      from {
        opacity: 0;
        color: #ccc;
        letter-spacing: .3em;

        transform: translateY(-60px) scale(0.5);
      }

      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    h1 {
      animation: h1 1s;
    }

    @keyframes button {
      from {
        opacity: 0;
        transform: scale(0.5);
      }

      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .button {
      animation: button 1s;
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      width: 80%;

      .iconfont {
        font-size: 23px;
      }

      .icon-denglu1 {
        font-size: 25px;
      }

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        width: 100px;

        .login {
          display: inline-block;
          margin-left: 4px;
          transform: translateY(-5px);
        }
      }
    }
  }

  .calendar {
    .calendar-box {
      display: flex;
      justify-content: center;
      align-items: center;

      .calendar-wrapper {
        .calendar-toolbar {
          width: @calendarWidth;
          height: 50px;
          display: flex;
          justify-content: space-evenly;
          align-items: center;

          .current {
            font-size: 18px;
            font-weight: 550;
          }

          .prev,
          .next,
          .current {
            cursor: pointer;

            &:hover {
              color: #438bef;
            }
          }
        }

        .calendar-week {
          transform: translate(17px);
          width: @calendarWidth;
          border-left: 1px solid #eee;
          display: flex;
          flex-wrap: wrap;

          .week-item {
            width: 36px;
            height: 30px;
            border-top: 1px solid #eee;
          }
        }

        .calendar-inner {
          transform: translate(17px);
          width: @calendarWidth;
          border-left: 1px solid #eee;
          display: flex;
          flex-wrap: wrap;

          .calendar-item {
            width: 36px;
            height: 30px;
          }

          .calendar-item-hover {
            cursor: pointer;

            &:hover {
              color: #fff;
              background-color: #bad7fe;
            }
          }

          .calendar-item-disabled {
            color: #acacac;
            cursor: not-allowed;
          }

          .calendar-item-checked {
            color: #fff;
            background-color: #438bef;
          }
        }

        .calendarBorder {
          display: flex;
          justify-content: center;
          align-items: center;
          border-bottom: 1px solid #eee;
          border-right: 1px solid #eee;
        }
      }
    }
  }

  .me {
    overflow: hidden;
    position: relative;
    padding: 45px 10px;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 440px;

    .background {
      overflow: hidden;
      position: absolute;
      top: 0;
      width: 100%;
      height: 98px;

      .backgroundpic {
        border-radius: 0;
        width: 100%;
      }
    }

    @keyframes title {
      0% {
        transform: scale(0);
      }

      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .name {
      font-family: 'PingFang SC';
      background: -webkit-linear-gradient(135deg,
          rgb(117, 222, 147),
          rgb(234, 134, 182),
          rgb(128, 220, 225),
          rgb(212, 165, 114),
          rgb(93, 215, 203),
          rgb(142, 110, 223));
      /* 文字颜色填充设置为透明 */
      -webkit-text-fill-color: transparent;
      /* 背景裁剪，即让文字使用背景色 */
      background-clip: text;
      /* 背景图放大一下，看着柔和一些 */
      background-size: 200% 100%;
      /* 应用动画flowCss 12秒速度 无限循环 线性匀速动画*/
      animation: flowCss 12s infinite linear;
      font-weight: 900 !important;
      font-size: 25px;

    }

    .name:hover {
      animation: flowCss 4s infinite linear;
    }

    .aboutme {
      display: flex;
      transform: translate(-12px);

      a {
        display: block;
        border-radius: 50%;
      }

      .iconfont {
        margin-left: 12px;
        font-size: 28px;
        color: rgb(151, 150, 150);
      }

      .iconfont:hover {
        color: rgb(255, 212, 152)
      }
    }

    .button {
      animation: title 1s;
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      --color: #409EFF;
      padding: 0.8em 1.7em;
      background-color: transparent;
      border-radius: .3em;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      transition: 1s;
      font-weight: 400;
      font-size: 17px;
      border: 1px solid;
      font-family: inherit;
      text-transform: uppercase;
      color: var(--color);
      z-index: 1;
    }

    .button::before,
    .button::after {
      content: '';
      display: block;
      width: 50px;
      height: 50px;
      transform: translate(-50%, -50%);
      position: absolute;
      border-radius: 50%;
      z-index: -1;
      background-color: var(--color);
      transition: .6s ease;
    }

    .button::before {
      top: -1em;
      left: -1em;
    }

    .button::after {
      left: calc(100% + 1em);
      top: calc(100% + 1em);
    }

    .button:hover::before,
    .button:hover::after {
      height: 410px;
      width: 410px;
    }

    .button:hover {
      color: white;
    }

    .button:active {
      filter: brightness(.8);
    }


    .name {
      font-weight: 550;
      font-size: 28px;

    }

    .avatarimg {
      transition: all .5s;
      cursor: pointer;
      border-radius: 50%;
      width: 100px;
    }

    .avatarimg:hover {
      transform: rotate(360deg);
    }

    .statistics {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      height: 50px;
      width: 100%;

      .com {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
      }
    }
  }

  .notice {
    height: 180px;

    .head {
      width: 60px;
      height: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;

      .icon-lingdang {
        font-size: 20px;
        color: rgb(255, 0, 0);
        animation: lingdang 1s infinite linear alternate;
      }

      .gg {
        font-weight: 500;
        font-size: 18px;
      }
    }

  }

  .message {
    height: 150px;

    .big {
      font-weight: 500;
      font-size: 18px;
    }

    .iconfont {
      margin-right: 6px;
    }
  }
}
</style>