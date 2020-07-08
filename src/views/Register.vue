<template>
  <div class="registory">
      <res-form :form="form" @submit="handleSubmit" :existUsername="true"></res-form>
  </div>
</template>

<script>
import resForm from '@/components/registerForm.vue';
import api from '../api/login';

export default {
  name: 'registory',
  data() {
    return {
      formLayout: 'horizontal',
      form: {
        username: '',
        password: '',
        rePassword: '',
        code: '',
        email: '',
      },
    };
  },
  components: {
    resForm,
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
  },
};
</script>
