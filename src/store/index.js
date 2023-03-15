import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const me = {
  namespaced: true,
  state: {
    weburl: 'https://www.4399.com',
    name: '',
    portrait: ''
  },
  getters: {
  },
  mutations: {
  },
  actions: {

  }
}
const component = {
  namespaced: true,
  state: {
    componentName: 'normal'
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  }
}
const messages = {
  namespaced: true,
  state: {
    height:0,
    number:0
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  }
}
const avatar = {
  namespaced: true,
  state: {
    avatar:'',
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  }
}
const isLogin = {
  namespaced: true,
  state: {
    no: false,
    hasLogin: false,
    slide: false,
    Login: false
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  }
}
const modal = {
  namespaced: true,
  state: {
    Visible: false
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  }
}
const articleNumber={
  namespaced: true,
  state: {
    indexLength:'',
    allNumber:'',
    fixFlag:true
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  }
}
const subGuide={
  namespaced: true,
  state: {
    tagID:'',
    categoryID:''
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  }
}
export default new Vuex.Store({
  modules: {
    me,
    isLogin,
    component,
    articleNumber,
    modal,
    subGuide,
    messages,
    avatar
  },
})
