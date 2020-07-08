<template>
  <a-form-model
    ref="form"
    :model="form"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 12 }"
    :rules="rules"
  >
    <a-form-model-item  label="用户名" prop="username">
      <a-input type="text" v-model="form.username" />
    </a-form-model-item>
    <a-form-model-item label="邮箱" prop="email">
      <a-auto-complete
        type="email"
        v-model="form.email"
        @change="handleChange"
        :data-source="dataSource"
      />
    </a-form-model-item>
    <a-form-model-item label="密码" prop="password">
      <a-input v-model="form.password" type="password" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item label="确认密码" prop="rePassword">
      <a-input v-model="form.rePassword" type="password" autocomplete="off" />
    </a-form-model-item>

    <a-form-model-item label="验证码" prop="code">
      <a-input v-model="form.code" type="text" autocomplete="off" />
      <a-button type="default" @click="getCode">获取验证码</a-button>
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" @click="handleSubmit">提交</a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import api from '../api/login';
import {
  validateUsername,
  validatePass,
  validatePass2,
  validateEmail,
} from '../utils/util';

export default {
  data() {
    return {
      dataSource: [],
      rules: {
        username: [{ validator: validateUsername, trigger: 'change' }],
        password: [{ validator: validatePass, trigger: 'change' }],
        rePassword: [{ validator: validatePass2, trigger: 'change' }],
        email: [{ validator: validateEmail, trigger: 'change' }],
      },
    };
  },
  props: ['form', 'existUsername'],
  methods: {
    handleSubmit() {
      this.$emit('submit', this.form);
    },
    handleChange(value) {
      this.dataSource = !value || value.indexOf('@') >= 0
        ? []
        : [`${value}@gmail.com`, `${value}@163.com`, `${value}@qq.com`];
    },
    getCode() {
      api
        .GetCode({
          username: this.form.username,
          password: this.form.password,
          email: this.form.email,
        })
        .then(() => {
          this.$message.success('验证码已发送至您的邮箱');
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
  },
};
</script>
