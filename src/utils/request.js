// 4.下载 yarn add axios
// 4.1引入axios
import store from '@/store'
import axios from 'axios'
// 4.2配置axios
// const request1 = axios.create() 克隆axios
// 如果后面会有不一样的接口请求，到时候会重，所以要用到克隆axios.create()
// 后面如果要用到新的接口可以再重新克隆const request2 = axios.create()
const request = axios.create({
    timeout: 5000,
    baseURL:'http://toutiao.itheima.net'
})

// 请求拦截器：请求做些事情
// config是每一次请求的配置对象
request.interceptors.request.use(
    function (config) {
        // 每一次发送请求都会执行
        // 在发送请求之前做些什么
        // 登录了，所以的请求都加上Authorization
        // console.log(config);
        const {
            getters: { isLogin },
            state: {tokenObj}
        } = store

        if (isLogin) {
            config.headers.Authorization = `Bearer ${tokenObj.token}`
        }config
        // 必须返回
        return config
    }
)

// 暴露出去request
export default request
