<template>
  <div>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        class="search"
        v-model.trim="keywords"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @focus="isShowSearchResult = false"
        @cancel="$router.push('/')"
      />
    </form>

    <!-- 搜索历史/建议/搜索结果 -->
    <!-- <search-history></search-history>
    <search-suggestion></search-suggestion>
    <search-result></search-result> -->

    <component
      :keywords="keywords"
      :is="componentName"
      @change-keywords="onSearch"
    ></component>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import SearchHistory from "./components/SearchHistory.vue";
import SearchResult from "./components/SearchResult.vue";
import SearchSuggestion from "./components/SearchSuggestion.vue";
// class和style属性的特殊
// - vue自动帮你把class和style合并到组件的根节点上
export default {
  components: { SearchHistory, SearchSuggestion, SearchResult },
  data() {
    return {
      keywords: "",
      isShowSearchResult: false,

    };
  },

  // 搜索历史：搜索框的值空
  // 搜索建议：搜索框有值，并且不渲染搜索结果
  // 搜索结果：触发搜索时 显示搜索结果
  computed: {
    ...mapState(['histories']),
    componentName() {
      if (this.keywords === "") {
        return "SearchHistory";
      }

      //   this.keywords一定有值
      if (this.isShowSearchResult) {
        return "SearchResult";
      }

      //   及不渲染搜索结果也不渲染搜索历史
      return "SearchSuggestion";
    },
  },

  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch(keywords) {
      // 把keywords关键词存起来
      // 1.用户动手敲回车 2.点击了搜索建议
      // 存储搜索历史

      // 去重：1获取没有去重的数组 2.放在new Set(arr) 3.[...set]展开
      const distinctHistories = [...new Set([keywords, ...this.histories])]
      // this.SET_HISTORIES([keywords, ...this.histories])
      this.SET_HISTORIES(distinctHistories)

      this.keywords = keywords;
      this.isShowSearchResult = true;
    },
  },
};
</script>

<style scoped lang="less">
.search {
  [role="button"] {
    color: #fff;
  }
}
</style>