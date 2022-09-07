<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" class="nav-bar" />
    <!-- 表单 -->
    <!--van-field:输入框，text,password,.文本域.：-->
    <!--v-mode1:用户输入的值-->
    <!--name:表示表单项-->
    <!--ru1es是一个数组-->
    <!--rule:{required:是否必选，message:错误的提示信息，pattern:正则，trigger:规则的触发时机onChange、onBlur)-->
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <!-- 字体图标 -->
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <!-- 验证码 -->
        <template #button>
          <van-button
            class="btn"
            block
            type="default"
            size="small"
            round
            native-type="button"
            v-if="isShowCodeBtn"
            @click="sendCode"
            >获取验证码</van-button
          >

          <van-count-down
            v-else
            :time="3 * 1000"
            format="ss秒"
            @finish="isShowCodeBtn = true"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from "./rule";

// 按需引入API
import { login, sendCondeAPI } from "@/api";

export default {
  data() {
    return {
      mobile: "",
      code: "",
      mobileRules,
      codeRules,
      isShowCodeBtn: true,
    };
  },
  methods: {
    async onSubmit() {
      //   console.log("submit", values);
      //   Submit事件只有表单效验通过以后会被触发

      //   因为下载引用了vant,所有直接调用this.$toast.loading方法
      //   loading
      // message:提示文案
      //forbidC1ick禁止点击
      //duration展示的时长.为B,一直展示
      //   this.$toast.loading({
      //     message: "加载中...",
      //     forbidClick: true,
      //     duration: 0,
      //   });

      try {
        //   登录
        const { data } = await login(this.mobile, this.code);
        console.log(data);
        // 成功提示
        this.$toast.success("登录成功");
      } catch (error) {
        // 细分一下失败验证
        // 失败之后提示用户失败的原因
        // error：1. js抛的错 2.axios封装的error对象

        // axios封装的error对象
        // -error.response.data后端返回的数据
        // -error.response.status 后端返回的状态码
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message);
        } else {
          // 1.js导致错误 2.507
          // console.log(error);
          this.$toast.clear();
          throw error;
        }
      }
    },

    loading() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
    },

    async sendCode() {
      await this.$refs.form.validate("mobile");
      //   console.log("发送请求");
      this.loading();

      try {
        await sendCondeAPI(this.mobile);
        // 2.显示
        this.isShowCodeBtn = false;
        this.$toast.success("发送验证码成功");
      } catch (error) {
        if (
          error.response &&
          (eroor.response.status === 429 || error.response.status === 404)
        ) {
            // axios的错误
            this.$toast.fail(error.response.data.message);
        } else {
            this.$toast.clear()
            throw error
        }
        //   this.$toast.fail("发送验证码失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.nav-bar {
  background-color: #3296fa;

  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}

.btn {
  height: 0.64rem;
  background-color: #eee;
  color: #a58594;
}

:deep(.form) {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
}
</style>