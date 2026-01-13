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
          <el-input v-model="loginForm.password" show-password />
        </el-form-item>

        <el-form-item prop="remember">
          <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="login_btn" @click="doLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
const FORMDATA_KEY = 'form_key'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'demo',
        password: `492itheima.CN032@.${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`,
        remember: true
      },
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
  mounted() {
    const cacheFormStr = localStorage.getItem(FORMDATA_KEY)
    if (cacheFormStr) {
      this.cacheFormData = JSON.parse(cacheFormStr)
      this.loginForm = {
        ...this.loginForm,
        ...this.cacheFormData
      }
    }
  },
  methods: {
    // async await 对内同步对外异步
    async doLogin() {
      const valid = await this.$refs.form.validate().catch(() => false)
      if (!valid) return
      const { username, password, remember } = this.loginForm
      await this.$store.dispatch('user/doLogin', { username, password })
      // if (this.$route.query.redirect) {
      //   this.$router.replace({ path: this.$route.query.redirect })
      // } else {
      //   this.$router.replace({ path: '/workbench' })
      // }
      // console.log(this.$route.query)

      this.$router.replace({ path: this.$route.query.redirect ?? '/' })
      this.$message.success('登录成功')

      if (remember) {
        localStorage.setItem(FORMDATA_KEY, JSON.stringify({
          username,
          password
        }))
      } else {
        localStorage.removeItem(FORMDATA_KEY)
      }
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
