<!--  -->
<template>
  <div class="forget-container">
    <vue-particles color="#409EFF" :particleOpacity="0.7" :particlesNumber="80" shapeType="circle" :particleSize="4"
      linesColor="#000" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="3"
      :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push" class="lizi"> </vue-particles>
    <div class="banner">
      <div class="title">找回密码</div>
      <Steps :current="step" class="step">
        <Step title="邮箱验证"></Step>
        <Step title="获取验证码"></Step>
        <Step title="重置账户信息"></Step>
        <Step title="获取用户名和密码"></Step>
      </Steps>
      <div class="emailcontent" v-if="step === 0">
        <section>
          <div class="input-group">
            <input class="input" autocomplete="off" name="text" type="text" required="" @blur="testemail"
              v-model="email">
            <label class="user-label">请输入您的邮箱</label>
          </div>
        </section>
        <button @click="sendemail">
          <p>发送验证码</p>
          <svg stroke-width="4" stroke="currentColor" viewBox="0 0 24 24" fill="none" class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
        </button>
      </div>
      <div class="emailcontent" v-if="step === 1">
        <section>
          <div class="input-group">
            <input class="input" autocomplete="off" name="text" type="text" required="" v-model="vericode">
            <label class="user-label">请输入您的验证码</label>
          </div>
        </section>
        <button @click="sendVericode">
          <p>校验验证码</p>
          <svg stroke-width="4" stroke="currentColor" viewBox="0 0 24 24" fill="none" class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
        </button>
      </div>
      <div class="resetcontent" v-if="step === 2">
        <section>
          <div class="input-group">
            <input class="input" autocomplete="off" name="text" type="text" required="" v-model="username"
              @blur="testUsername">
            <label class="user-label">请输入您的新用户名</label>
          </div>
          <div class="tip">用户名4~12位</div>
        </section>
        <section>
          <div class="input-group">
            <input class="input" autocomplete="off" name="text" type="password" required="" v-model="password"
              @blur="testPassword">
            <label class="user-label">请输入您的新密码</label>
          </div>
        </section>
        <section>
          <div class="input-group">
            <input class="input" autocomplete="off" name="text" type="password" required="" v-model="confirmPassword"
              @blur="testTwice">
            <label class="user-label">再次输入您的新密码</label>
          </div>
        </section>
        <button @click="sendmessage">
          <p>确认信息</p>
          <svg stroke-width="4" stroke="currentColor" viewBox="0 0 24 24" fill="none" class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
        </button>
      </div>
      <div class="backcontent" v-if="step === 3">
        <div class="new">
          <span>您的新用户名是:{{ username }}</span>
          <span>您的新密码是:{{ password }}</span>
        </div>
        <button @click="backLogin">
          <p>返回登录页面</p>
          <svg stroke-width="4" stroke="currentColor" viewBox="0 0 24 24" fill="none" class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
        </button>
        <div class="tip">请勿轻易将密码告知他人，谨防密码泄露！</div>
      </div>
      <div class="back" v-if="step !== 0 && step !== 3">
        <button class="backbutton" @click="step--">
          <span class="iconfont icon-jiantou_yemian_xiangzuo"></span>
          返回上一步
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canIuse: {
        noEmpty: false,
        usernameRight: false,
        passwordRight: true,
        twiceConsistent: true,
      }
      ,
      usernameMaxLength:12,
      vericode: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      step: 0
    };
  },
  watch: {
    username() {
      if (this.username.length > this.usernameMaxLength) {
        this.username = String(this.username).slice(0, this.usernameMaxLength);
      }
      var reg = /^[^[\u4E00-\u9FA5\w]+$]*$/
      this.username = this.username.replace(reg, '')
    },
    vericode() {
      if (this.vericode.length > this.vericodeMaxLength) {
        this.vericode = String(this.vericode).slice(0, this.vericodeMaxLength);
      }
      var reg = /^[^[A-Za-z0-9]+$]*$/
      this.vericode = this.vericode.replace(reg, '')
    }
  },
  components: {},

  computed: {},

  methods: {
    testemail() {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (reg.exec(this.email) === null && this.email !== '') {
        this.$Notice.error({
          title: '邮箱格式错误！',
        })
      } else if (this.email !== '') {
        this.$Notice.success({
          title: '邮箱格式正确！',
        })
      }

    },
    sendemail() {
      this.$http.post(
        '/fw-vcode',
        {
          email: this.email
        }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      ).then(res => {
        if (res.data.message === '邮箱格式错误') {
          this.$Notice.error({
            title: '邮箱格式输入不正确哦！',
            desc: '请输入正确的邮箱格式再发送验证码哦！'
          })
        }
        else if (res.data.message === '不合法的请求参数') {
          this.$Notice.error({
            title: '请输入邮箱',
            desc: '请输入正确的邮箱再发送验证码哦！'
          })
        } else if (res.data.message === 'OK') {
          this.$Notice.success({
            title: '验证码已发送！'
          })
          this.step++
        }
        else if (res.data.message === '邮箱未注册') {
          this.$Notice.error({
            title: '该邮箱还没有被注册过哦！'
          })
        }
      }).catch(Error => {
        this.$Notice.error({
          title: '验证码发送失败啦！',
          desc: '服务器繁忙哦，等一会再发送一次验证码试试吧！'
        })
      })
    },
    testUsername() {
      this.$http.post(
        '/register-check',
        {
          code: this.vericode,
          username: this.username,
          password: this.password,
          email: this.email
        }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      ).then(res => {
        if (res.data.messages[0] === '用户名已存在') {
          this.canIuse.usernameRight = false
          this.$Notice.error({
            title: '该用户名已被注册！',
          })
        } else {
          this.canIuse.usernameRight = true
          const reg = /^[\u4E00-\u9FA5\w]{4,12}$/
          if (reg.exec(this.username) === null && this.username !== '') {
            this.$Notice.error({
              title: '用户名格式错误！',
            })
            this.canIuse.usernameformat = false
          } else if (this.username !== '') {
            this.$Notice.success({
              title: '该用户名可以被使用！',
            })
            this.canIuse.usernameformat = true
          }
        }
      }).catch(Error => {
      })

    },
    sendVericode() {
      this.$http.post(
        '/fw-vcode',
        {
          email: this.email,
          code: this.vericode
        }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      ).then(res => {
        if (res.data.message === 'OK') {
          this.$Notice.success({
            title: '验证码正确！',
          })
          this.step++
        }
        else {
          this.$Notice.error({
            title: '验证码输入错误！',
            desc: '验证码输入错误，再检查一下哪里输错了吧！'
          })
        }
      }).catch(Error => {
        this.$Notice.error({
          title: '验证码发送失败啦！',
          desc: '服务器繁忙哦，等一会再发送一次验证码试试吧！'
        })
      })
    },
    testPassword() {
      const reg = /^[\w]{6,16}$/
      if (reg.exec(this.password) === null) {
        this.$Notice.error({
          title: '密码格式错误!',
          desc: '密码必须为6~16位,包含大小写字母和数字的组合！',
        })
        this.canIuse.passwordRight = false
      } else if (this.password !== this.confirmPassword) {
        this.$Notice.error({
          title: '两次输入密码不一致哦!',
        })
        if (reg.exec(this.password) === null) {
          this.canIuse.passwordRight = false
        } else {
          this.canIuse.passwordRight = true
        }
        this.canIuse.twiceConsistent = false
      } else {
        this.$Notice.success({
          title: '恭喜，密码正确且可用！',
        })
        this.canIuse.passwordRight = true
        this.canIuse.twiceConsistent = true
      }
    },
    testTwice() {
      const reg = /^[\w]{6,16}$/
      if (this.password !== this.confirmPassword) {
        this.$Notice.error({
          title: '两次输入密码不一致哦!',
        })
        this.canIuse.twiceConsistent = false
      } else if (reg.exec(this.confirmPassword) !== null) {
        this.$Notice.success({
          title: '恭喜，密码正确且可用！',
        })
        this.canIuse.twiceConsistent = true
      }
    },
    sendmessage() {
      if (this.username == '' || this.password == '' || this.confirmPassword == '') {
        this.$Notice.error({
          title: '请认真完善注册内容哦！',
          desc: `有必填内容没有填入,认真填好需要的每一项内容才能开始属于你的旅程哦！ (๑•̀ㅂ•́)و✧`
        });
        this.canIuse.noEmpty = false
      } else {
        this.canIuse.noEmpty = true
        var arr = Object.values(this.canIuse)
        if (arr.every(item => item === true)) {
          this.$Notice.success({
            title: '新的账户信息设置成功！',
            desc: `您的账户信息已经设置成功，可以使用新的用户名和密码登陆啦！！！`
          });
          this.$http.post(
            '/forgot-password',
            {
              code: this.vericode,
              new_username: this.username,
              new_password: this.password,
              email: this.email
            }, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          }
          ).then(res => {
          }).catch(Error => {
            this.$router.push('/login')
            this.$Notice.error({
              title: '服务器请求繁忙！',
              desc: '很抱歉给您带来的不便，但是服务器也是会累的哦！检查一下网络状态是否良好再试试吧'
            })
          })
          this.step++
        }
        else if (!this.canIuse.passwordRight) {
          this.$Notice.error({
            title: '密码格式错误啦！',
            desc: '注意密码格式必须是6~16位,由英文字母或者数字组成的字符串哦！必须所有信息正确才能完成注册，开始属于你的旅程哦！'
          })
        }
        else if (!this.canIuse.usernameRight) {
          this.$Notice.error({
            title: '这个用户名已经被用过啦！',
            desc: '很可惜被抢先一步了呢，换个用户名再试试看吧！必须所有信息正确才能完成注册，开始属于你的旅程哦！'
          })
        }
        else if (!this.canIuse.twiceConsistent) {
          this.$Notice.error({
            title: '两次的密码不一致哦！',
            desc: '再仔细检查一下密码信息吧！必须所有信息正确才能完成注册，开始属于你的旅程哦！'
          })
        }
      }
    },
    backLogin() {
      this.$router.push('/login')
    }
  }
}

</script>
<style lang='less' scoped>
html,
body {
  height: 100%;
}
@keyframes all {
  from{
    opacity: 0;

  }
  to{
    opacity: 1;
  }
}
@keyframes forget {
  from{
    opacity: .5;
    transform:translate(-800px) scale(.4);

  }
  to{
    opacity: 1;
    transform:scale(1);
  }
}
.forget-container {
  animation: all 1s;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .lizi {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .banner {
    z-index: 2;
    animation: forget .5s;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(136, 136, 136, 0.25), 0 10px 10px rgba(116, 116, 116, 0.22);
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    height: 400px;
    min-height: 480px;

    .back {
      position: absolute;
      bottom: 30px;
      left: 40px;

      .iconfont {
        display: inline-block;
        transform: translateY(2px);
        font-size: 20px;
      }

      button {
        cursor: pointer;
        --color: #2196f3;
        font-family: inherit;
        display: inline-block;
        width: 7em;
        height: 2.6em;
        line-height: 2.5em;
        overflow: hidden;
        margin: 20px;
        font-size: 17px;
        z-index: 1;
        color: var(--color);
        border: 0;
        background-color: rgb(253, 253, 253);
        // border: 2px solid #ccc;
        border-radius: 6px;
        position: relative;
      }

      button::before {
        position: absolute;
        content: "";
        background: var(--color);
        width: 200px;
        height: 200px;
        z-index: -1;
        border-radius: 50%;
      }

      button:hover {
        color: white;
      }

      button:before {
        top: 100%;
        left: 100%;
        transition: .3s all;
      }

      button:hover::before {
        top: -30px;
        left: -30px;
      }
    }

    .title {
      margin-top: 30px;
      font-weight: 500;
      font-size: 30px;
    }

    .step {
      margin-left: 40px;
      margin-top: 20px;
    }

    .emailcontent {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 600px;
      height: 300px;

      button {
        transition: all .3s;
        cursor: pointer;
        margin-top: 50px;
        padding: 10px 20px;
        border-radius: 4px;
        border: 1px solid #ccc;
        background: none;
      }

      button {
        --primary-color: #fff;
        --hovered-color: #2196f3;
        background-color: #2196f3;
        position: relative;
        display: flex;
        font-weight: 600;
        font-size: 20px;
        gap: 0.5rem;
        align-items: center;
      }

      button p {
        margin: 0;
        position: relative;
        font-size: 15px;
        color: var(--primary-color)
      }

      button p::before {
        position: absolute;
        /*   box-sizing: border-box; */
        content: "点击发送";
        width: 0%;
        inset: 0;
        color: var(--hovered-color);
        overflow: hidden;
        transition: 0.3s ease-out;
      }

      button:hover p::before {
        width: 100%;
      }

      button:hover {
        background-color: #fff;
      }

      button:hover svg {

        animation: right .5s infinite alternate;
        color: var(--hovered-color)
      }

      @keyframes right {
        to {
          transform: translateX(4px);
        }
      }

      button svg {
        color: var(--primary-color);
        transition: 0.2s;
        position: relative;
        width: 15px;
        transition-delay: 0.2s;
      }

      .input-group {
        position: relative;
      }

      .input {
        margin-top: 75px;
        width: 300px;
        border-radius: 20px;
        height: 40px;
        // border-radius: 50%;
        border: 3px solid rgb(213, 213, 213);
        background: none;
        padding: 1rem;
        font-size: 1rem;
        color: black;
      }

      .user-label {
        position: absolute;
        top: 85px;
        left: 15px;
        color: #ccc;
        pointer-events: none;
        transition: 350ms;
      }

      .input:focus,
      input:valid {
        outline: none;
      }

      .input:focus~label,
      input:valid~label {
        background-color: #fff;
        transform: translate(10px, -19px) scale(1);
        padding: 0 .2em;
        color: #2196f3;
      }
    }

    .backcontent {
      width: 600px;
      height: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      margin-top: 50px;
      margin-bottom: 10px;

      .new {
        display: flex;
        flex-direction: column;
        font-weight: 600;
        font-size: 25px;
      }

      .tip {
        position: absolute;
        bottom: 30px;
        left: 50%;
        font-size: 16px;
        color: #ccc;
        transform: translate(-50%);
      }

      button {
        transition: all .3s;
        cursor: pointer;
        margin-top: 50px;
        padding: 10px 20px;
        border-radius: 4px;
        border: 1px solid #ccc;
        background: none;
      }

      button {
        --primary-color: #fff;
        --hovered-color: #2196f3;
        background-color: #2196f3;
        position: relative;
        display: flex;
        font-weight: 600;
        font-size: 20px;
        gap: 0.5rem;
        align-items: center;
      }

      button p {
        margin: 0;
        position: relative;
        font-size: 15px;
        color: var(--primary-color)
      }

      button p::before {
        position: absolute;
        /*   box-sizing: border-box; */
        content: "点击返回";
        width: 0%;
        inset: 0;
        color: var(--hovered-color);
        overflow: hidden;
        transition: 0.3s ease-out;
      }

      button:hover p::before {
        width: 100%;
      }

      button:hover {
        background-color: #fff;
      }

      button:hover svg {

        animation: right .5s infinite alternate;
        color: var(--hovered-color)
      }

      @keyframes right {
        to {
          transform: translateX(4px);
        }
      }

      button svg {
        color: var(--primary-color);
        transition: 0.2s;
        position: relative;
        width: 15px;
        transition-delay: 0.2s;
      }
    }

    .resetcontent {
      button {
        transform: translateY(-10px);
        margin-left: 90px;
        transition: all .3s;
        cursor: pointer;
        margin-top: 50px;
        padding: 10px 20px;
        border-radius: 4px;
        border: 1px solid #ccc;
        background: none;
      }

      button {
        --primary-color: #fff;
        --hovered-color: #2196f3;
        background-color: #2196f3;
        position: relative;
        display: flex;
        font-weight: 600;
        font-size: 20px;
        gap: 0.5rem;
        align-items: center;
      }

      button p {
        margin: 0;
        position: relative;
        font-size: 15px;
        color: var(--primary-color)
      }

      button p::before {
        position: absolute;
        /*   box-sizing: border-box; */
        content: "下一步";
        width: 0%;
        inset: 0;
        color: var(--hovered-color);
        overflow: hidden;
        transition: 0.3s ease-out;
      }

      button:hover p::before {
        width: 100%;
      }

      button:hover {
        background-color: #fff;
      }

      button:hover svg {

        animation: right .5s infinite alternate;
        color: var(--hovered-color)
      }

      @keyframes right {
        to {
          transform: translateX(4px);
        }
      }

      button svg {
        color: var(--primary-color);
        transition: 0.2s;
        position: relative;
        width: 15px;
        transition-delay: 0.2s;
      }

      .tip {
        color: #ccc;
        position: absolute;
        right: 240px;
        top: 168px;

      }

      .input-group {
        position: relative;
      }

      .input {
        width: 340px;
        margin-top: 35px;
        height: 40px;
        border-radius: 20px;
        border: 3px solid #ccc;
        background: none;
        padding: 1rem;
        font-size: 1rem;
        color: black;
      }

      .user-label {
        position: absolute;
        left: 15px;
        top: 30px;
        color: #ccc;
        pointer-events: none;
        transform: translateY(1rem);
        transition: 350ms;
      }

      .input:focus,
      input:valid {
        outline: none;
        --angle: 0deg;
        animation: 3s rotate9234 linear infinite;
      }

      @keyframes rotate9234 {
        to {
          --angle: 360deg;
        }
      }

      @property --angle {
        syntax: '<angle>';
        initial-value: 0deg;
        inherits: false;
      }

      .input:focus~label,
      input:valid~label {
        transform: translate(10px, -2px) scale(1);
        background-color: #fff;
        padding: 0 .2em;
        color: #2196f3;
      }
    }

  }
}
</style>