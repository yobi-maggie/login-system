<template>
  <div class="home">
    <a-form
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
  </div>
</template>

<script>
import api from '../api/login';

export default {
  name: 'Home',
  data() {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' }),
    };
  },
  created() {},
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          api.Login(values).then((data) => {
            this.$alert(`您的appkey是${data.appkey}`);
          }).catch((error) => {
            this.$message.error(error);
          });
        }
      });
    },
    findPassword() {

    },
  },
};
</script>
