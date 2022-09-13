<template>
  <div class="articles">
    <!--属性-->
    <!--@Load:触底的时候触发Load事件-->
    <!--offset:浓动条和底部距离多少的时候触发Load事件，默认值是369px-->
    <!-- immediate-check:初渲染的时候是否执Load事件默认值是true -->
    <!--v-mode L="Loading”-->
    <!--Loading为true,Load事件不会被触发-->
    <!--Loading为false的时候Load事件会被触发-->
    <!--Loading会Load事件执行后，微van-List组件自动设置为ture,周要手动的改为时aLse-->
    <!-- -finished:BooLean.false:load事件会放触发true:Loadshijia-->
    <van-pull-refresh v-model="refreshLoading" @refresh="getNextPageArticle">
      <van-list
        v-model="loading"
        @load="getNextPageArticle"
        offset="100"
        :immediate-check="false"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多文章~~"
      >
        <article-item
          v-for="item in articles"
          :key="item.art_id"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api";
import ArticleItem from "./ArticleItem.vue";
// 发送请求 拿到当前文章的详情数据
export default {
  name: "ArticleList",
  data() {
    return {
      articles: [],
      preTimestamp: "",
      loading: false,
      finished: false,
      error: false,
      refreshLoading: false,
    };
  },
  components: { ArticleItem },
  props: {
    id: [String, Number],
  },
  created() {
    this.getFirstPageArticle();
  },
  methods: {
    async getFirstPageArticle() {
      // 时间戳,三种
      // new Date().vallueof()
      // Data.now()
      // +new Date()

      try {
        const { data } = await getArticles(this.id, +new Date());

        // console.log(data);
        this.articles = data.data.results;

        // 保存下一页的时间戳，用于分页
        this.preTimestamp = data.data.pre_timestamp;
      } catch (error) {
        // js的错误，507原封不动上抛，404上抛中文
        const status = error.response?.status;
        if (!error.response || status === 507) {
          throw error;
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message);
          }
        }
      }
    },

    async getNextPageArticle() {
      // console.log("getNextPageArticle");
      try {
        // if (Math.random() < 0.5) {
        //   throw new Error();
        // }

        // 1.发送请求
        const { data } = await getArticles(this.id, this.preTimestamp);

        if (!data.data.pre_timestamp) {
          this.finished = true;
        }

        // // 2.添加到articles
        // this.articles.push(...data.data.results);
        // // 3.更新时间戳
        // this.preTimestamp = data.data.pre_timestamp;

        // 如果是下滑加载，将数据放在最后
        // 如果是下拉刷新，将数据放在最后
        // 2.添加到articles
        if (this.loading) {
          this.articles.unshift(...data.data.results);
        } else {
          this.articles.push(...data.data.results);
        }

        // 3.更新时间戳
        this.preTimestamp = data.data.pre_timestamp;
      } catch (error) {
        // 错误进行处理
        this.error = true;
      } finally {
        // finally语句一定会执行
        // 4.更新loading
        this.loading = false;
        this.refreshLoading = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
// 如何给盒子拥有自己的滚动条
// - 1.给固定的高度 2.用overflow：auto  或 scroll / overlay
.articles {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;

  // & 代表当前元素的父亲
  // :: -webkit-scrollbar 滚动槽
  // :: -webkit-scrollbar-thumb  滚动的滑块
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: #3296fa;
  }
}
</style>