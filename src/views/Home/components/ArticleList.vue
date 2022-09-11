<template>
  <div>
    <article-item v-for="item in articles" :key="item.art_id" :article="item"></article-item>
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
        articles: []
    }
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
  },
};
</script>

<style>
</style>