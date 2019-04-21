<template>
  <div id="signin">
    <el-row>
      <el-col :sm="10" :xs="24">
        <h3 class="sign-title">账户登录</h3>
        <el-form ref="signData" :model="signData" label-width="80px" :rules="rules">
          <el-form-item label="账号" prop="username">
            <el-input v-model="signData.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="signData.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" size="small" plain>取消</el-button>
            <el-button type="success" size="small" plain @click="signin">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'signin',
    data() {
      return {
        signData: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {required: true, message: '请输入账户', trigger: 'blur'},
            {min: 3, message: '最少需要输入3位字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, message: '请至少输入6位密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      signin() {
        let _this = this;
        this.$refs['signData'].validate((valid) => {
          if (valid) {
            fetch('/api/auth/signin', {
              method: 'POST',
              body: JSON.stringify(this.signData),
              headers: {
                'content-type': 'application/json'
              },
            }).then(res => res.json()).then(user => {
              if(user.id) {
                this.notify('success', '账户登录', '账户登录成功');
                localStorage.setItem('expire', Date.now() + (24 * 60 *60 - 10 * 60) *1000)
                localStorage.setItem('user', user)
                _this.$store.commit('setSignin', true);
                _this.$store.commit('setUser', user);
                this.$router.push(this.$route.query.redirect || '/')
              }
            }).catch(() => {
              this.notify('error', '账户登录', '用户名或密码不正确')
            });
          } else {
            this.notify('error', '账户登录', '请确认登录信息是否正确')
          }
        });
      },
      notify(type, title, text) {
        const h = this.$createElement;

        this.$notify({
          title,
          message: h('i', {
            style: type === 'success' ? 'color: teal' : 'color: red'
          }, text)
        });
      },
    },
  }
</script>

<style>
  .sign-title {
    text-align: center;
  }
</style>
