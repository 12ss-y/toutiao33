import Vue from 'vue'
import Vuex from 'vuex'
import ceratPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
// 封装本地存储，vuex-persistedstate
// vuex-persistedstate-->持久化state
// 1.下载
// yarn add vuex-persistedstate@3.2.1
// 2.引入
// import createPersistedstate from 'vuex-persistedstate
//3.调用
// plugins:[createPersistedstate()]

// 配置项
// key:默认值是vuex
// storage:存储的方式，默认值是本地存储
// reducer:指定持久化哪些数据.函数，return一个对象，对象就作为存储的value
// - 参数state
export default new Vuex.Store({
  plugins: [
    ceratPersistedState({
      key: 'HEIMA_TOUTIAO',
      reducer({ tokenObj, myChannels, histories }) {
        return { tokenObj, myChannels, histories }
      }
    })
  ],
  state: {
    tokenObj: {},
    myChannels: [],
    histories: []
    // a: 1
  },
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      // 将token存在vuex
      state.tokenObj = token
    },

    /**
     *
     * @param {Array} channels 删除或者添加后的最新的channel
     */
    SET_MY_CHANNELS(state, channels) {
      state.myChannels = channels
    },

    /**
     *
     * @param {*} histories 删除或者添加以后的新的搜索历史
     */
    SET_HISTORIES(state, histories) {
      state.histories = histories
    }
  }
})
