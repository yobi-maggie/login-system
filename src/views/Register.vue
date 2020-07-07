<template>
  <div class="registory">
    <a-form-model
      ref="form"
      :model="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
      :rules="rules"
    >
      <a-form-model-item label="用户名" prop="username">
        <a-input type="text" v-model="form.username"/>
      </a-form-model-item>
      <a-form-model-item label="密码" prop="password">
        <a-input v-model="form.password" type="password" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item label="确认密码" prop="rePassword">
        <a-input v-model="form.rePassword" type="password" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item label="邮箱" prop="email">
        <a-auto-complete
          type="email"
          v-model="form.email"
          @change="handleChange"
          :data-source="dataSource"
        />
      </a-form-model-item>
      <a-form-model-item label="验证码" prop="code">
        <a-input v-model="form.code" type="text" autocomplete="off" />
        <a-button type="default" @click="getCode">获取验证码</a-button>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" @click="handleSubmit">Submit</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import api from '../api/login';

export default {
  name: 'registory',
  data() {
    const emailReg = /^\w+@\w+\.com$/g;
    const usernameReg = /^[\w]{6,18}$/g;
    const passwordReg = /^[\w]{6,18}$/g;
    const validateUsername = (rule, value, callback) => {
      console.log(value);
      if (value === '') {
        callback(new Error('Please input the username'));
      } else if (!usernameReg.test(value)) {
        callback(new Error('用户名长度应为6-18位非汉字'));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'));
      } else if (!passwordReg.test(value)) {
        callback(new Error('密码长度应为6-18位'));
      } else {
        if (this.form.rePassword !== '') {
          this.$refs.form.validateField('rePassword');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'));
      } else if (value !== this.form.password) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the email'));
      } else if (!emailReg.test(value)) {
        callback(new Error('邮箱格式不正确'));
      } else {
        callback();
      }
    };

    return {
      dataSource: [],
      formLayout: 'horizontal',
      form: {
        username: '',
        password: '',
        rePassword: '',
        code: '',
        email: '',
      },
      rules: {
        username: [{ validator: validateUsername, trigger: 'change' }],
        password: [{ validator: validatePass, trigger: 'change' }],
        rePassword: [{ validator: validatePass2, trigger: 'change' }],
        email: [{ validator: validateEmail, trigger: 'change' }],
      },
    };
  },
  methods: {
    handleSubmit() {
      api.Logon(this.form).then(() => {
        this.$message.success('注册成功');
        this.$router.push({
          name: 'Login',
        });
      });
    },
    handleChange(value) {
      this.dataSource = !value || value.indexOf('@') >= 0
        ? []
        : [`${value}@gmail.com`, `${value}@163.com`, `${value}@qq.com`];
    },
    getCode() {
      api.GetCode({
        username: this.form.username,
        password: this.form.password,
        email: this.form.email,
      }).then(() => {
        this.$message.success('验证码已发送至您的邮箱');
      }).catch((err) => {
        this.$message.error(err);
      });
    },
  },
};
</script>
