// 4.下载 yarn add axios
// 4.1引入axios
import axios from 'axios'
// 4.2配置axios
// const request1 = axios.create() 克隆axios
// 如果后面会有不一样的接口请求，到时候会重，所以要用到克隆axios.create()
// 后面如果要用到新的接口可以再重新克隆const request2 = axios.create()
const request = axios.create({
    timeout: 5000,
    baseURL:'http://toutiao.itheima.net'
})
// 暴露出去request
export default request
