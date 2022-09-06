<template>
  <div>
    <span class="toutiao toutiao-gengduo"></span>

    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>

    <div class="box">登录</div>
  </div>
</template>

<script>
//1. 下载vant
//1.1 - yarn add vant@latest-v2 -S

// 2. 让rem动起来 下载适配窗口
// 2.1 yarn add amfe-flexible

// 3.下载yarn add postem
export default {};
</script>

<style scoped>
.box {
  width: 2rem;
  height: 2rem;
  background-color: pink;
}
</style>