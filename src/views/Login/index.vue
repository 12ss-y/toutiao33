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
    <van-form @submit="onSubmit" class="form">
      <van-field
        v-model="mobile"
        name="mobile"
        label="用户名"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          {
            pattern:
              /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '手机号格式错误',
          },
        ]"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        label="密码"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请输入验证码' },
          { pattern: /[0-9]{6}/, message: '验证码格式错误' },
        ]"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobile: "",
      code: "",
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
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