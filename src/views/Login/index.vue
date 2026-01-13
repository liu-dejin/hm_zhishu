<template>
  <div class="login_body">
    <div class="bg" />
    <div class="box">
      <div class="title">智慧园区-登录</div>
      <el-form ref="form" :model="loginForm" :rules="loginRules">
        <el-form-item
          label="账号"
          prop="username"
        >
          <el-input v-model="loginForm.username" />
        </el-form-item>

        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input v-model="loginForm.password" />
        </el-form-item>

        <el-form-item prop="remember">
          <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="login_btn" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'demo',
        password: '492itheima.CN032@.20260113'
      },
      remember: false,
      loginRules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async handleLogin() {
      const valid = await this.$refs.form.validate().catch(() => false)
      if (!valid) return
      await this.$store.dispatch('user/doLogin', this.loginForm)
      this.$message.success('登录成功')
      this.$router.push({ path: '/workbench' })
    }
  }

}

</script>

<style scoped lang="scss">
  .login_body {
    display: flex;
  }
  .bg {
    width: 60vw;
    height: 100vh;
    background: url('~@/assets/login-bg.svg') no-repeat;
    background-position: right top;
    background-size: cover;
  }
  .box {
    margin: 200px 10% 0;
    flex: 1;
    .title {
      padding-bottom: 76px;
      font-size: 26px;
      font-weight: 500;
      color: #1e2023;
    }
  }
  .login_btn{
    width: 100%;
  }
</style>
