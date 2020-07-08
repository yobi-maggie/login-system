<template>
  <div class="home">
    <a-form
      v-if="!isFindBack && !loginStatus"
      :form="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
      @submit="handleSubmit"
    >
      <a-form-item label="用户名">
        <a-input
          v-decorator="['username', { rules: [
          { required: true, message: 'Please input your note!' }
        ]}]"
        />
      </a-form-item>
      <a-form-item label="密码">
        <a-input-password
          v-decorator="['password', {rules: [
          {  required: true, message: 'Please input your note!' }] }]"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit">提交</a-button>
        <a-button type="default" @click="findPassword">找回密码</a-button>
      </a-form-item>
    </a-form>
    <res-form v-else-if="isFindBack && !loginStatus"
              :form="resetForm" @submit="resetFormSubmit"></res-form>

    <a-card class="user-info" v-else title="用户信息" :bordered="false">
      <div class="user-info-label">
        <p>
          <span class="label">邮箱：</span>
          {{user.email}}
        </p>
        <p>
          <span class="label">用户名：</span>
          {{user.username}}
        </p>
        <p>
          <span class="label">appkey：</span>
          {{user.appkey}}
        </p>
      </div>
      <a-button @click="resetLogin">重新登录</a-button>
    </a-card>
  </div>
</template>

<script>
import resForm from '@/components/registerForm.vue';
import api from '../api/login';
import { validatePass, validatePass2, validateEmail } from '../utils/util';

export default {
  name: 'Home',
  data() {
    return {
      user: {
        username: '',
        email: '',
        appkey: '',
      },
      isFindBack: false,
      loginStatus: 0,
      form: this.$form.createForm(this, { name: 'coordinated' }),
      resetForm: {
        password: '',
        rePassword: '',
        code: '',
        email: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'change' }],
        rePassword: [{ validator: validatePass2, trigger: 'change' }],
        email: [{ validator: validateEmail, trigger: 'change' }],
      },
      dataSource: [],
    };
  },
  components: {
    resForm,
  },
  created() {
    const { username, appkey, email } = api.getAllStorage();
    if (appkey) {
      this.loginStatus = true;
      this.user = {
        username,
        appkey,
        email,
      };
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          api
            .Login(values)
            .then((data) => {
              this.user = data;
              this.loginStatus = 1;
              api.saveStorage(data);
            })
            .catch((error) => {
              this.$message.error(error);
            });
        }
      });
    },
    findPassword() {
      this.isFindBack = true;
    },
    resetFormSubmit(form) {
      api
        .FindBack(form)
        .then((res) => {
          this.user = res;
          this.$message.success('重置密码成功');
          this.$router.replace({
            name: 'Login',
          });
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    handleChange(value) {
      this.dataSource = !value || value.indexOf('@') >= 0
        ? []
        : [`${value}@gmail.com`, `${value}@163.com`, `${value}@qq.com`];
    },
    getCode() {
      api
        .GetCode({
          username: this.resetForm.username,
          password: this.resetForm.password,
          email: this.resetForm.email,
        })
        .then(() => {
          this.$message.success('验证码已发送至您的邮箱');
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    resetLogin() {
      this.user = {
        username: '',
        appkey: '',
        email: '',
      };
      api.saveStorage(this.user);
      this.loginStatus = false;
      this.isFindBack = false;
    },
  },
};
</script>

<style lang="scss" scope>
.home {
  .user-info {
    width: 300px;
    margin: 50px auto;
    .ant-card-head-title {
      font-weight: bold;
    }
    .user-info-label {
      text-align: left;
      .label {
        display: inline-block;
        width: 100px;
        text-align: right;
      }
    }
  }
}
</style>
