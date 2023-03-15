<!--  -->
<template>
  <div class="login-container">
    <vue-particles color="#409EFF" :particleOpacity="0.7" :particlesNumber="80" shapeType="circle" :particleSize="4"
      linesColor="#000" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="3"
      :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push" class="lizi"> </vue-particles>
    <div class="container" id="login-box" ref="loginBox">
      <div class="form-container sign-up-container">
        <form>
          <h1>Register</h1>
          <div class="form-control">
            <input type="text" required="" ref="username" v-model="username" @blur="testUsername">
            <label>
              <span style="transition-delay:0ms">U</span><span style="transition-delay:50ms">s</span><span
                style="transition-delay:100ms">e</span><span style="transition-delay:150ms">r</span><span
                style="transition-delay:200ms">n</span><span style="transition-delay:250ms">a</span><span
                style="transition-delay:300ms">m</span><span style="transition-delay:350ms">e</span>
            </label>
            <div class="usernametip">用户名4位到{{ usernameMaxLength }}位</div>
          </div>
          <div class="form-control">
            <input type="text" required="" ref="email" v-model="email" @blur="testEmail">
            <label>
              <span style="transition-delay:0ms">E</span><span style="transition-delay:50ms">m</span><span
                style="transition-delay:100ms">a</span><span style="transition-delay:150ms">i</span><span
                style="transition-delay:200ms">l</span>
            </label>
          </div>
          <div class="form-control">
            <input type="text" required="" ref="vericode" style="width:158px;" v-model="vericode">
            <label>
              <span style="transition-delay:0ms">V</span><span style="transition-delay:20ms">e</span><span
                style="transition-delay:40ms">r</span><span style="transition-delay:60ms">i</span><span
                style="transition-delay:80ms">f</span><span style="transition-delay:100ms">i</span><span
                style="transition-delay:120ms">c</span><span style="transition-delay:140ms">a</span><span
                style="transition-delay:160ms">t</span><span style="transition-delay:180ms">i</span><span
                style="transition-delay:200ms">o</span><span style="transition-delay:220ms">n</span><span
                style="transition-delay:240ms"> </span><span style="transition-delay:260ms">C</span><span
                style="transition-delay:280ms">o</span><span style="transition-delay:300ms">d</span><span
                style="transition-delay:320ms">e</span>
            </label>
            <div ref="veri" :class="flag ? 'vericode-active' : 'vericode-deactive'" @click="sendVericode">{{
              vericodeTip
            }}
            </div>
          </div>
          <div class="form-control">
            <input :type="Logintype1" required="" ref="loginmm1" v-model="password" @blur="testPassword">
            <label>
              <span style="transition-delay:0ms">P</span><span style="transition-delay:50ms">a</span><span
                style="transition-delay:100ms">s</span><span style="transition-delay:150ms">s</span><span
                style="transition-delay:200ms">w</span><span style="transition-delay:250ms">o</span><span
                style="transition-delay:300ms">r</span><span style="transition-delay:350ms">d</span>
            </label>
            <img @click="eyeChange1" class="eye" :src="eyeSrc1" alt="">
          </div>
          <div class="form-control">
            <input :type="Logintype" required="" ref="logincm" v-model="confirmPassword" @blur="testTwice">
            <label>
              <span style="transition-delay:0ms">C</span><span style="transition-delay:30ms">o</span><span
                style="transition-delay:60ms">n</span><span style="transition-delay:90ms">f</span><span
                style="transition-delay:120ms">i</span><span style="transition-delay:150ms">m</span><span
                style="transition-delay:180ms"> </span><span style="transition-delay:210ms">P</span><span
                style="transition-delay:240ms">a</span><span style="transition-delay:270ms">s</span><span
                style="transition-delay:300ms">s</span><span style="transition-delay:330ms">w</span><span
                style="transition-delay:360ms">o</span><span style="transition-delay:390ms">r</span><span
                style="transition-delay:420ms">d</span>
            </label>
            <img @click="eyeChange" class="eye" :src="eyeSrc" alt="">
          </div>
          <button @click="registerError(true)">注册</button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form action="#">
          <h1>Login to Witness My World</h1>
          <div class="form-control login-margin">
            <input type="text" required="" ref="loginzh" v-model="username">
            <label>
              <span style="transition-delay:0ms">U</span><span style="transition-delay:50ms">s</span><span
                style="transition-delay:100ms">e</span><span style="transition-delay:150ms">r</span><span
                style="transition-delay:200ms">n</span><span style="transition-delay:250ms">a</span><span
                style="transition-delay:300ms">m</span><span style="transition-delay:350ms">e</span>
            </label>
          </div>
          <div class="form-control login-margin ">
            <input :type="Logintype" required="" ref="loginmm" v-model="password">
            <label>
              <span style="transition-delay:0ms">P</span><span style="transition-delay:50ms">a</span><span
                style="transition-delay:100ms">s</span><span style="transition-delay:150ms">s</span><span
                style="transition-delay:200ms">w</span><span style="transition-delay:250ms">o</span><span
                style="transition-delay:300ms">r</span><span style="transition-delay:350ms">d</span>
            </label>
            <img @click="eyeChange" class="eye" :src="eyeSrc" alt="">
          </div>
          <div class="form-control login-margin">
            <input type="text" required="" ref="vericode" style="width:158px;" v-model="vericode">
            <label>
              <span style="transition-delay:0ms">V</span><span style="transition-delay:20ms">e</span><span
                style="transition-delay:40ms">r</span><span style="transition-delay:60ms">i</span><span
                style="transition-delay:80ms">f</span><span style="transition-delay:100ms">i</span><span
                style="transition-delay:120ms">c</span><span style="transition-delay:140ms">a</span><span
                style="transition-delay:160ms">t</span><span style="transition-delay:180ms">i</span><span
                style="transition-delay:200ms">o</span><span style="transition-delay:220ms">n</span><span
                style="transition-delay:240ms"> </span><span style="transition-delay:260ms">C</span><span
                style="transition-delay:280ms">o</span><span style="transition-delay:300ms">d</span><span
                style="transition-delay:320ms">e</span>
            </label>
            <div class="veriImg">
              <img :src=veriImg alt="" @click="changeImg">
            </div>
          </div>
          <input checked="" class="check remember" type="checkbox" v-model='tenRemenber' id="remenber"><label
            for="remenber" class="relabel">十天内免登录</label>
          <router-link to="/forget">忘记密码/用户名？</router-link>
          <input type="button" value="登录" @click="loginError(true)" class="button">
        </form>
      </div>

      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>已有账号？</h1>
            <p>点击开始属于你的旅程</p>
            <button class="ghost" id="signIn" @click="removeClass">登录</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>没有账号?</h1>
            <p>立即注册加入我们，和我们一起开始旅程吧</p>
            <button class="ghost" id="signUp" @click="addClass">注册</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5';
export default {
  data() {
    return {
      token: '',
      tenRemenber: false,
      captchaID: '',
      remember: false,
      canIregister: {
        usernameformat: true,
        onlyOne: false,
        noEmpty: false,
        emailRight: true,
        passwordRight: true,
        twiceConsistent: true,
        vericodeRight: true,
        usernameRight: true
      },
      veriImg: '',
      canIlogin: {
        UPright: true,
        vericodeRight: true
      },
      email: '',
      confirmPassword: '',
      password: '',
      vericodeMaxLength: 6,
      vericode: '',
      usernameMaxLength: 12,
      username: '',
      delayTime: 60,
      vericodeTip: '获取邮箱验证码',
      flag: true,
      empty: '',
      eyeSrc: '/statics/close.png',
      eyeSrc1: '/statics/close.png',
      Logintype: 'password',
      Logintype1: 'password',
    };
  },
  mounted() {
    window.addEventListener('hashchange', () => {
      if (location.pathname == '/login') {
        this.$store.state.isLogin.Login = false
      }
      else {
        this.$store.state.isLogin.Login = true
      }
    })
    if (this.$store.state.isLogin.slide) {
      this.addClass()
      this.$store.state.isLogin.slide = false
    }
    if (location.pathname == '/login') {
      this.$store.state.isLogin.Login = false
    } else {
      this.$store.state.isLogin.Login = true
    }
  },
  created() {
    this.$http.get(
      '/captcha', {
    }).then(res => {
      this.captchaID = res.data.data.id
      this.veriImg = 'http://124.222.30.146:4396/api/front' + res.data.data.img_url
    }).catch(Error => {
      this.$store.state.isLogin.Login = false
      this.$Notice.error({
        title: '服务器请求繁忙！',
        desc: '很抱歉给您带来的不便，但是服务器也是会累的哦！检查一下网络状态是否良好再试试吧'
      })
    })
  },
  components: {
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
  computed: {},

  methods: {
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
          this.canIregister.usernameRight = false
          this.$Notice.error({
            title: '该用户名已被注册！',
          })
        } else {
          this.canIregister.usernameRight = true
          const reg = /^[\u4E00-\u9FA5\w]{4,12}$/
          if (reg.exec(this.username) === null && this.username !== '') {
            this.$Notice.error({
              title: '用户名格式错误！',
            })
            this.canIregister.usernameformat = false
          } else if (this.username !== '') {
            this.$Notice.success({
              title: '该用户名可以被使用！',
            })
            this.canIregister.usernameformat = true
          }
        }
      }).catch(Error => {
      })

    },
    testTwice() {
      const reg = /^[\w]{6,16}$/
      if (this.password !== this.confirmPassword) {
        this.$Notice.error({
          title: '两次输入密码不一致哦!',
        })
        this.canIregister.twiceConsistent = false
      } else if (reg.exec(this.confirmPassword) !== null) {
        this.$Notice.success({
          title: '恭喜，密码正确且可用！',
        })
        this.canIregister.twiceConsistent = true
      }
    },
    testPassword() {
      const reg = /^[\w]{6,16}$/
      if (reg.exec(this.password) === null) {
        this.$Notice.error({
          title: '密码格式错误!',
          desc: '密码必须为6~16位,包含大小写字母和数字的组合！',
        })
        this.canIregister.passwordRight = false
      } else if (this.password !== this.confirmPassword) {
        this.$Notice.error({
          title: '两次输入密码不一致哦!',
        })
        if (reg.exec(this.password) === null) {
          this.canIregister.passwordRight = false
        } else {
          this.canIregister.passwordRight = true
        }
        this.canIregister.twiceConsistent = false
      } else {
        this.$Notice.success({
          title: '恭喜，密码正确且可用！',
        })
        this.canIregister.passwordRight = true
        this.canIregister.twiceConsistent = true
      }
    },
    testEmail() {
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
        if (res.data.messages[0] === '邮箱已注册' || res.data.messages[0] === '用户名已存在') {
          this.canIregister.onlyOne = false
          this.$Notice.error({
            title: '该邮箱已被注册！',
          })
        } else {
          this.canIregister.onlyOne = true
          const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
          if (reg.exec(this.email) === null && this.email !== '') {
            this.$Notice.error({
              title: '邮箱格式错误！',
            })
            this.canIregister.emailRight = false
          } else if (this.email !== '') {
            this.$Notice.success({
              title: '邮箱格式正确！',
            })
            this.canIregister.emailRight = true
          }
        }
      }).catch(Error => {
      })
    },
    changeImg() {
      this.$http.get(
        '/captcha', {
      }).then(res => {
        this.captchaID = res.data.data.id
        this.veriImg = 'http://124.222.30.146:4396/api/front' + res.data.data.img_url
      }).catch(Error => {
        this.$store.state.isLogin.Login = false
        this.$Notice.error({
          title: '服务器请求繁忙！',
          desc: '很抱歉给您带来的不便，但是服务器也是会累的哦！检查一下网络状态是否良好再试试吧'
        })
      })
    },
    async loginError(nodesc) {
      var x= this.$md5(this.password);
      console.log(x);
      console.log(md5(this.password));
      await this.$http.post(
        '/login',
        {
          username: this.username,
          password: x,
        }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      ).then(res => {
        this.token = res.data.data.token
        if (res.data.code === 0) {
          this.canIlogin.UPright = true
        } else {
          this.canIlogin.UPright = false
        }
      }).catch(Error => {
        this.$store.state.isLogin.Login = false
        this.$Notice.error({
          title: '服务器请求繁忙！',
          desc: '很抱歉给您带来的不便，但是服务器也是会累的哦！检查一下网络状态是否良好再试试吧'
        })
      })
      await this.$http.post(
        '/verify-captcha',
        {
          captchaID: this.captchaID,
          Code: this.vericode,
        }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      ).then(res => {
        if (res.data.message === '图形验证码错误') {
          this.canIlogin.vericodeRight = false
        } else {
          this.canIlogin.vericodeRight = true
        }
      }).catch(Error => {
        this.$store.state.isLogin.Login = false
        this.$Notice.error({
          title: '服务器请求繁忙！',
          desc: '很抱歉给您带来的不便，但是服务器也是会累的哦！检查一下网络状态是否良好再试试吧'
        })
      })
      await this.$http.get(
        '/captcha', {
      }).then(res => {
        this.captchaID = res.data.data.id
        this.veriImg = 'http://124.222.30.146:4396/api/front' + res.data.data.img_url
      }).catch(Error => {
        this.$store.state.isLogin.Login = false
        this.$Notice.error({
          title: '服务器请求繁忙！',
          desc: '很抱歉给您带来的不便，但是服务器也是会累的哦！检查一下网络状态是否良好再试试吧'
        })
      })
      var arr = Object.values(this.canIlogin)
      if (arr.every(item => item === true)) {
        var date = new Date()
        var hour = date.getHours()
        var str = ''
        var welcome = ''
        if (hour >= 0 && hour < 6) {
          str = '凌晨好'
          welcome = '累了就早休息吧，困了就早睡吧。梦很远，路很长，前进的旅人需要一个停泊的港湾！晚安，我的朋友'
        } else if (hour >= 6 && hour < 12) {
          str = '早上好'
          welcome = '面对着阳光努力向上，日子就会变得单纯而美好.愿一个问候带给你一个新的心情，愿一个祝福带给你一个新的起点。早安！'
        } else if (hour >= 12 && hour < 14) {
          str = '中午好'
          welcome = '人生是自己的，不要活在别人的眼神和想法里。不是所有的言论都需要别人理解，不是所有的选择都需要别人支持.午安!'
        } else if (hour >= 14 && hour < 18) {
          str = '下午好'
          welcome = '伟人之所以伟大,是因为他与别人共处逆境时,别人失去了信心,他却下决心实现自己的目标，为了自己的梦想奋斗吧。午安！'
        } else if (hour >= 18 && hour < 24) {
          str = '晚上好'
          welcome = '也许现在的你很累，但未来的路还很长，不要忘了当初为何而出发，是什么让你坚持到现在，勿忘初心。晚安！'
        }
        if (this.username == '' || this.password == '') {
          this.$Notice.error({
            title: '登录内容没有填写完善哦！',
            desc: `正确的登录是美好旅途的开端！♪(^∇^*)`
          })
        }
        else {
          setTimeout(() => {
            if (!this.tenRemenber) {
              this.$cookies.set("token", 'Bearer ' + this.token, 0);
              this.$cookies.set("isLogin", true, 0);
            } else {
              this.$cookies.set("token", 'Bearer ' + this.token, '10d');
              this.$cookies.set("isLogin", true, '10d');
            }
            this.$router.push('/index')
          }, 400)
          this.$Notice.success({
            title: `欢迎访问${this.$store.state.me.name}的博客！`,
            desc: `${str}!尊敬的${this.username},${welcome}`
          })
        }
      }
      else if (!this.canIlogin.UPright) {
        this.$store.state.isLogin.Login = false
        this.$Notice.error({
          title: '用户名或密码错误',
          desc: '请正确填写登录信息！正确的登录是美好旅程的开端哦！'
        })
      }
      else if (!this.canIlogin.vericodeRight) {
        this.$store.state.isLogin.Login = false
        this.$Notice.error({
          title: '验证码错误',
          desc: '验证码输入错误啦！看不清验证码点击图片可以更换一张哦！'
        })
      }

    },
    registerError(nodesc) {
      var x= this.$md5(this.password);
      this.$http.post(
        '/register',
        {
          code: this.vericode,
          username: this.username,
          password: x,
          email: this.email
        }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
      ).then(res => {
        if (res.data.message === '邮箱已注册') {
          this.canIregister.onlyOne = false
        } else {
          this.canIregister.onlyOne = true
        }
        if (res.data.message === '验证码不正确') {
          this.canIregister.vericodeRight = false
        } else {
          this.canIregister.vericodeRight = true
        }
        if (res.data.message === '用户名已存在') {
          this.canIregister.usernameRight = false
        } else {
          this.canIregister.usernameRight = true
        }
        setTimeout(() => {
          if (this.email == '' || this.vericode == '' || this.username == '' || this.password == '' || this.confirmPassword == '') {
            this.$Notice.error({
              title: '请认真完善注册内容哦！',
              desc: `有必填内容没有填入,认真填好需要的每一项内容才能开始属于你的旅程哦！ (๑•̀ㅂ•́)و✧`
            });
            this.canIregister.noEmpty = false
          } else {
            this.canIregister.noEmpty = true
            var arr = Object.values(this.canIregister)
            if (arr.every(item => item === true)) {
              this.$Notice.success({
                title: '注册成功！',
                desc: `恭喜你注册成功,现在开始属于你的旅程吧！！！`
              });
              this.$router.push('/login')
            }
            else if (!this.canIregister.usernameformat) {
              this.$Notice.error({
                title: '该用户名已被使用过了哦！',
                desc: '可惜，来晚了一步，这个好名字已经被别人用过啦！必须所有信息正确才能完成注册，开始属于你的旅程哦！'
              })
            }
            else if (!this.canIregister.emailRight) {
              this.$Notice.error({
                title: '邮箱格式错误哦！',
                desc: '我们支持所有类型的邮箱，但是请您务必填写正确的邮箱地址哦！必须所有信息正确才能完成注册，开始属于你的旅程哦！'
              })
            }
            else if (!this.canIregister.onlyOne) {
              this.$Notice.error({
                title: '这个邮箱已被注册了哦！',
                desc: '一个邮箱只能注册一个账号哦，请勿使用同一邮箱注册多个账号！必须所有信息正确才能完成注册，开始属于你的旅程哦！'
              })
            }
            else if (!this.canIregister.vericodeRight) {
              this.$Notice.error({
                title: '验证码错误啦！',
                desc: '检查一下邮箱填写是否正确，再发一条验证码试试看吧！必须所有信息正确才能完成注册，开始属于你的旅程哦！'
              })
            }
            else if (!this.canIregister.passwordRight) {
              this.$Notice.error({
                title: '密码格式错误啦！',
                desc: '注意密码格式必须是6~16位,由英文字母或者数字组成的字符串哦！必须所有信息正确才能完成注册，开始属于你的旅程哦！'
              })
            }
            else if (!this.canIregister.usernameRight) {
              this.$Notice.error({
                title: '这个用户名已经被用过啦！',
                desc: '很可惜被抢先一步了呢，换个用户名再试试看吧！必须所有信息正确才能完成注册，开始属于你的旅程哦！'
              })
            }
            else if (!this.canIregister.twiceConsistent) {
              this.$Notice.error({
                title: '两次的密码不一致哦！',
                desc: '再仔细检查一下密码信息吧！必须所有信息正确才能完成注册，开始属于你的旅程哦！'
              })
            }
          }
        }, 300)
      }).catch(Error => {
        this.$router.push('/login')
        this.$Notice.error({
          title: '服务器请求繁忙！',
          desc: '很抱歉给您带来的不便，但是服务器也是会累的哦！检查一下网络状态是否良好再试试吧'
        })
      })
    },
    eyeChange() {
      if (this.eyeSrc == '/statics/close.png') {
        this.eyeSrc = '/statics/open.png'
        this.Logintype = 'text'
      } else {
        this.eyeSrc = '/statics/close.png'
        this.Logintype = 'password'
      }
    },
    eyeChange1() {
      if (this.eyeSrc1 == '/statics/close.png') {
        this.eyeSrc1 = '/statics/open.png'
        this.Logintype1 = 'text'
      } else {
        this.eyeSrc1 = '/statics/close.png'
        this.Logintype1 = 'password'
      }
    },
    addClass() {
      this.$refs.loginBox.classList.add('right-panel-active')
      this.$refs.loginmm1.value = ''
      this.$refs.logincm.value = ''
      this.$refs.username.value = ''
      this.$refs.vericode.value = ''
      this.$refs.email.value = ''
      this.eyeSrc = '/statics/close.png'
      this.Logintype = 'password'
      this.eyeSrc1 = '/statics/close.png'
      this.Logintype1 = 'password'
    },
    removeClass() {
      this.$refs.loginBox.classList.remove('right-panel-active')
      this.$refs.loginmm.value = ''
      this.$refs.loginzh.value = ''
      this.eyeSrc = '/statics/close.png'
      this.Logintype = 'password'
    },
    coverFormData(obj) {
      let data = Object.keys(obj.data).map(item => {
        let value = obj.data[item];
        if (_.isArray(value) || _.isObject(value)) {
          value = JSON.stringify(value)
        }
        return encodeURIComponent(item) + '=' + encodeURIComponent(value);
      }).join('&');

      return { data: data, url: obj.url };
    },
    sendVericode() {
      if (this.flag) {
        const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (this.email !== '' && reg.exec(this.email) !== null && this.canIregister.onlyOne === true) {
          this.flag = false
        }
        this.$http.post(
          '/verification-code', { email: this.email }, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
        ).then(res => {
          if (this.email === '') {
            this.$Notice.error({
              title: '邮箱还未填写！',
              desc: '请先填写邮箱再来发送验证码吧！'
            })
          } else if (reg.exec(this.email) === null) {
            this.$Notice.error({
              title: '邮箱格式错误！',
              desc: '请先填写正确的邮箱格式再来发送验证码吧！'
            })
          } else if (this.canIregister.onlyOne === false) {
            this.$Notice.error({
              title: '填写的邮箱已经被使用过啦！',
              desc: '请先填写还未注册过的邮箱再来发送验证码吧！'
            })
          }
        }).catch(Error => {
          this.$router.push('/login')
          this.$Notice.error({
            title: '服务器请求繁忙！',
            desc: '很抱歉给您带来的不便，但是服务器也是会累的哦！稍等一会再继续发送验证码试试吧！'
          })
        })
        if (this.flag === false) {
          this.vericodeTip = `${this.delayTime}秒后可再次发送`
          this.delayTime--
          var veri = setInterval(() => {
            this.vericodeTip = `${this.delayTime}秒后可再次发送`
            this.delayTime--
            if (this.delayTime < 0) {
              this.flag = true
              this.delayTime = 10
              clearInterval(veri)
              this.vericodeTip = `获取邮箱验证码`
            }
          }, 1000)
        }
      }
    }
  }
}

</script>
<style lang='less' scoped>
@keyframes all {
  from {
    opacity: 0;

  }

  to {
    opacity: 1;
  }
}

@keyframes scale {
  from {
    opacity: 0;
    transform: translate(-50%) scale(.2);

  }

  to {
    opacity: 1;
    transform: translate(-50%) scale(1);
  }
}

.login-container {
  animation: all 1s;
  padding-top: 7%;
  width: 100%;
  height: 100%;

  .container {
    animation: scale .5s;
  }

  .sign-in-container {
    position: relative;

    .check {
      position: absolute;
      margin-top: 20px;
      width: 15px;
      height: 15px;
      border-radius: 2px;
      appearance: none;
      background-color: #bbb;
      transition: all .3s;
    }

    .relabel {
      position: absolute;
      left: 74px;
      bottom: 123px;
    }

    .check::before {
      content: '';
      position: absolute;
      border: solid #fff;
      display: block;
      width: .3em;
      height: .6em;
      border-width: 0 .2em .2em 0;
      z-index: 1;
      opacity: 0;
      right: calc(50% - .15em);
      top: calc(50% - .35em);
      transform: rotate(0deg);
      transition: all .3s;
      transform-origin: center center;
    }

    .check:checked {
      animation: a .3s ease-in forwards;
      background-color: #409EFF;
    }

    .check:checked::before {
      opacity: 1;
      transform: rotate(405deg);
    }

    @keyframes a {
      0% {
        opacity: 1;
        transform: scale(1) rotateY(0deg);
      }

      50% {
        opacity: 0;
        transform: scale(.8) rotateY(180deg);
      }

      100% {
        opacity: 1;
        transform: scale(1) rotateY(360deg);
      }
    }
  }

  .veriImg {
    cursor: pointer;
    position: absolute;
    right: 0px;
    bottom: 0px;
    width: 120px;
    height: 50px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .usernametip {
    position: absolute;
    right: 0;
    top: 0;
    color: #ccc;
    font-weight: 500;
  }

  .remember {
    position: absolute;
    top: 320px;

  }

  .eye {
    position: absolute;
    top: -4px;
    right: 0;
    width: 26px;
  }

  .form-control {
    position: relative;
    margin: 20px 0 20px;
    width: 290px;
  }

  .form-control input {
    background-color: transparent;
    border: 0;
    border-bottom: 2px #ccc solid;
    display: block;
    width: 100%;
    font-size: 14px;
    color: #333;
  }

  .form-control input:focus,
  .form-control input:valid {
    outline: 0;
    border-bottom-color: lightblue;
  }

  .form-control label {
    position: absolute;
    top: 0px;
    left: 0;
    pointer-events: none;
  }

  .form-control label span {
    display: inline-block;
    font-size: 14px;
    min-width: 5px;
    color: #ccc;
    transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .form-control input:focus+label span,
  .form-control input:valid+label span {
    color: lightblue;
    transform: translateY(-20px);
  }

  .lizi {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .login-margin {
    margin-top: 35px;
  }

  h1 {
    font-weight: bold;
    margin: 0;
  }

  p {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: .5px;
    margin: 20px 0 30px;
  }

  span {
    font-size: 12px;
  }

  a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
  }

  .container {
    z-index: 1000;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22);
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;

  }


  .form-container form {
    background: #fff;
    display: flex;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    justify-content: center;
    text-align: center;
  }

  .social-container {
    margin: 20px 0;
  }

  .social-container a {
    border: 1px solid #ddd;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
  }

  .social-container a:hover {
    background-color: #eee;

  }

  .txtb {
    border-bottom: 2px solid #adadad;
    position: relative;
    margin: 10px 0;
  }

  .txtb input {
    font-size: 15px;
    color: #333;
    border: none;
    width: 100%;
    outline: none;
    background: none;
    padding: 0 3px;
    height: 35px;
  }

  .txtb span::before {
    content: attr(data-placeholder);
    position: absolute;
    top: 50%;
    left: 5px;
    color: #adadad;
    transform: translateY(-50%);
    transition: .5s;
  }

  .txtb span::after {
    content: '';
    position: absolute;
    left: 0%;
    top: 100%;
    width: 0%;
    height: 2px;
    background-image: linear-gradient(120deg, #3498db, #8e44ad);
    transition: .5s;
  }

  .focus+span::before {
    top: -5px;
  }

  .focus+span::after {
    width: 100%;
  }

  .button {
    border-radius: 20px;
    border: 1px solid #ff4b2b;
    background: #ff4b2b;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    cursor: pointer;
  }

  .button:active {
    transform: scale(.9);
  }

  .button:focus {
    outline: none;
  }

  button {
    border-radius: 20px;
    border: 1px solid #ff4b2b;
    background: #ff4b2b;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    cursor: pointer;
  }

  button:active {
    transform: scale(.9);
  }

  button:focus {
    outline: none;
  }

  button.ghost {
    background: transparent;
    border-color: #fff;
  }

  .form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all .6s ease-in-out;
  }

  .form-container .button {
    background: linear-gradient(120deg, #3498db, #8e44ad);
    border: none;
    background-size: 200%;
    color: #fff;
    transition: .5s;
  }

  .form-container .button:hover {
    background-position: right;
  }

  .form-container button {
    background: linear-gradient(120deg, #3498db, #8e44ad);
    border: none;
    background-size: 200%;
    color: #fff;
    transition: .5s;
  }

  .form-container button:hover {
    background-position: right;
  }

  .sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
  }

  .sign-in-container form a {
    position: relative;
    left: 100px;
  }

  .sign-up-container {
    left: 0;
    width: 50%;
    z-index: 1;
    opacity: 0;
  }

  .sign-up-container .button {
    margin-top: 20px;
  }

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform .6s ease-in-out;
    z-index: 100;
  }

  .overlay {
    background-image: linear-gradient(120deg, #3498db, #8e44ad);
    color: #fff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateY(0);
    transition: transform .6s ease-in-out;
  }

  .overlay-panel {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 40px;
    height: 100%;
    width: 50%;
    text-align: center;
    transform: translateY(0);
    transition: transform .6s ease-in-out;
  }

  .overlay-right {
    right: 0;
    transform: translateY(0);

  }

  .overlay-left {
    transform: translateY(-20%);
  }

  .container.right-panel-active .sign-in-container {
    transform: translateY(100%);
  }

  .container.container.right-panel-active .overlay-container {
    transform: translateX(-100%);
  }

  .container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  }

  .container.container.right-panel-active .overlay {
    transform: translateX(50%);
  }

  .container.container.right-panel-active .overlay-left {
    transform: translateY(0);
  }

  .container.container.right-panel-active .overlay-right {
    transform: translateY(20%);
  }

  .vericode-deactive {
    position: absolute;
    right: 0;
    top: -3px;
    color: #fff;
    font-weight: 500;
    border-radius: 4px;
    cursor: no-drop;
    background-color: #ccc;
    padding: 4px 12px;
  }

  .vericode-active {
    position: absolute;
    right: 0;
    top: -3px;
    color: #fff;
    font-weight: 500;
    border-radius: 4px;
    cursor: pointer;
    background-color: rgb(56, 168, 253);
    padding: 4px 12px;
  }

  .vericode-active:hover {
    background-color: rgb(91, 184, 255);
  }

}
</style>