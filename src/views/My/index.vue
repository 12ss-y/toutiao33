<template>
  <div class="profile">
    <!-- 头部 -->
    <header>
      <!-- 已登录的结构 -->
      <div class="login banner" v-if="isLogin">
        <van-row>
          <van-col span="12">
            <van-row
              type="flex"
              justify="space-around"
              align="center"
              style="height: 100%"
            >
              <van-image
                round
                width="1.5rem"
                height="1.5rem"
                :src="userInfo.photo"
              />
              <span class="mobile">{{ userInfo.name }}</span>
            </van-row>
          </van-col>
          <van-col span="7"></van-col>
          <van-col span="5">
            <van-row
              type="flex"
              justify="center"
              align="center"
              style="height: 100%"
            >
              <van-button round size="mini" class="edit_btn"
                >编辑按钮</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <template #icon>{{ userInfo.art_count }}</template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>{{ userInfo.fans_count }}</template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>{{ userInfo.follow_count }}</template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>{{ userInfo.like_count }}</template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>

      <!-- 未登录的结构 -->
      <div class="logout banner" v-else @click="$router.push('/login')">
        <van-image width="1.76rem" height="1.76rem" :src="mobileSrc" />
        <span class="text">登录 / 注册</span>
      </div>

      <!-- 主体 -->
      <main>
        <van-grid column-num="2" clickable>
          <van-grid-item text="收藏">
            <template #icon>
              <span class="toutiao toutiao-shoucang"></span>
            </template>
          </van-grid-item>

          <van-grid-item text="历史">
            <template #icon>
              <span class="toutiao toutiao-lishi"></span>
            </template>
          </van-grid-item>
        </van-grid>

        <div class="link">
          <van-cell title="消息通知" is-link />
          <van-cell title="小智同学" is-link />
        </div>
      </main>

      <!-- 底部 -->
      <footer>
        <van-button block v-if="isLogin" @click="logout">退出</van-button>
      </footer>
    </header>
  </div>
</template>

<script>
import mobileSrc from "@/assets/images/mobile.png";

import { mapGetters } from "vuex";

import { getUserInfoAPI } from "@/api";
export default {
  name: "My",
  data() {
    return {
      mobileSrc,
      userInfo: {},
    };
  },
  created() {
    this.getUserInfo()
  },
  computed: {
    ...mapGetters(["isLogin"]),
  },
  methods: {
    async logout() {
      await this.$dialog.confirm({
        title: "黑马头条",
        message: "是否确认退出该账号",
      });
      this.$store.commit("SET_TOKEN", {});
    },

    // 获取用户信息
    async getUserInfo() {
      try {
        // 用户登录了继续
        if (!this.isLogin) return;
        const { data } = await getUserInfoAPI();
        // console.log(data);
        this.userInfo = data.data;
      } catch (error) {
        // error
        // 1.js导致的 2.axios导致的
        // js和400，507给程序员提示，401是用户提示，重新登录
        if (error.response && error.response.status === 401) {
          this.$toast.fail("用户认证失败，请重新登录");
        } else {
          throw error;
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.profile {
  height: 100vh;
  background-color: #f5f7f9;

  .link {
    margin: 20px 0;
  }

  toutiao {
    font-size: 40px;
  }

  .toutiao-shoucang {
    color: red;
  }

  .toutiao-lishi {
    color: orange;
  }
}

.banner {
  width: 100%;
  height: 5.33333rem;
  background: url("../../assets/images/banner.png") 0 0 / cover;
  // background-size: cover;
}

.logout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .text {
    font-size: 30px;
    color: #fff;
    margin-top: 20px;
  }
}

.login {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }

  .mobile {
    font-size: 40px;
    color: #fff;
  }
  .van-col {
    height: 100%;
  }
  .edit_btn {
    width: 1.6rem;
    height: 0.4267rem;
    color: #666;
  }
  :deep(.grid) {
    color: #fff;
    .van-grid-item__content {
      font-size: 30px;
      background-color: inherit;
    }
    .van-grid-item__text {
      color: #fff;
    }
  }
}
</style>