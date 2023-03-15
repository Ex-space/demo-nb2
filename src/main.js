import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview';
import axios from 'axios';
import '@/assets/iconfont/iconfont.css'
import 'iview/dist/styles/iview.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueParticles from 'vue-particles'
import md5 from 'js-md5';
import VueCookies from 'vue-cookies';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'animate.css'
import marked from 'marked';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// VuePress主题以及样式（这里也可以选择github主题）
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// Prism
import Prism from 'prismjs';
// 代码高亮
import 'prismjs/components/prism-json';
// 选择使用主题
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css' //样式
import VueClipBoard from 'vue-clipboard2'
//引入vue懒加载

Vue.use(VueClipBoard)
//创建v-highlight全局指令
hljs.highlightAll();
Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {

    blocks.forEach((block) => {
      hljs.highlightBlock(block);
      // 1.创建ul节点
      let ul = document.createElement("ul");
      // 2.根据换行符获取行数，根据获取的行数生成行号
      let rowCount = block.outerHTML.split('\n').length;
      let button = document.createElement("button")
      let span = document.createElement("article")
      let el = document.createElement("div")
      let de = document.createElement("div")
      el.classList.add('tip')
      de.classList.add('de')
      button.appendChild(de)
      span.classList.add('iconfont')
      span.classList.add('icon-declare')
      button.appendChild(span)
      el.innerHTML = '复制代码'
      // console.log(button);
      button.appendChild(el)
      for (let i = 1; i <= rowCount - 1; i++) {
        //创建li节点，创建文本节点
        let li = document.createElement("li")
        let text = document.createTextNode(i)
        //为li追加文本节点，将li加入ul
        li.appendChild(text)
        ul.appendChild(li)
      }
      // 3.给行号添加类名
      ul.className = 'pre-numbering'
      // 4.将ul节点加到 代码块。这个注意根据实际情况决定放在什么位置。是父节点，本节点还是子节点上
      block.appendChild(ul)
      if (rowCount > 2) {
        block.appendChild(button)
      }
    })

    hljs.highlightBlock(block)
  })
})
Vue.prototype.$hljs = hljs;
VMdPreview.use(vuepressTheme, {
  Prism,
});
Vue.use(VMdPreview);
Vue.use(VueCookies)
Vue.prototype.$md5 = md5;
Vue.use(VueParticles)
Vue.use(ElementUI);
Vue.use(iView);
axios.defaults.baseURL = 'http://124.222.30.146:4396/api/front'
const markedMixin = {
  methods: {
    md: function (input) {
      return marked(input);
    },
  },
};
// axios.interceptors.request.use(config =>{
//   config.headers.Authorization = window.sessionStorage.getItem('token');
//   return config;//最后必须返回config
// })
axios.interceptors.response.use(config => {
  NProgress.done();
  return config;//最后必须返回config
})
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
