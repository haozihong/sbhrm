<template>
  <div>
    <el-form
        :rules="rules"
        ref="loginForm"
        v-loading="loading"
        element-loading-text="Logging in..."
        :model="loginForm"
        class="loginContainer"
        @keyup.enter.native="submitLogin">
      <h3 class="loginTitle">Sign in to Quick HR</h3>
      <el-form-item prop="username">
        <el-input size="normal" type="text" v-model="loginForm.username" auto-complete="off"
                  placeholder="Username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input size="normal" type="password" v-model="loginForm.password" auto-complete="off"
                  placeholder="Password"></el-input>
      </el-form-item>
      <el-checkbox size="normal" class="loginRemember" v-model="loginForm.rememberMe">Remember me</el-checkbox>
      <el-form-item>
        <el-button size="normal" type="primary" style="width: 100%;" @click="submitLogin">Sign in</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import qs from 'querystring'

export default {
  name: "Login",
  data() {
    return {
      loading: false,
      loginForm: {
        username: '',
        password: '',
        rememberMe: true
      },
      rules: {
        username: [{required: true, message: 'Username', trigger: 'blur'}],
        password: [{required: true, message: 'Password', trigger: 'blur'}]
      }
    }
  },
  methods: {
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          // to stringify the data is one way to pass data to back-end in POST request
          this.axios.post('/login_process', qs.stringify(this.loginForm)).then(resp => {
            this.loading = false;
            if (resp && resp.status === 200) {
              // console.log(resp);
              this.$store.commit('login', resp.data.obj);
              let path = this.$route.query.redirect;
              this.$router.replace({path: path === '/login' || path === undefined ? '/' : path});
            }
          })
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.loginTitle {
  margin: 15px auto 20px auto;
  text-align: center;
  color: #505458;
}

.loginRemember {
  text-align: left;
  margin: 0px 0px 15px 0px;
}
.el-form-item__content{
  display: flex;
  align-items: center;
}
</style>