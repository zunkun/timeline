<template>
  <div id="header">
    <el-header>
      <el-row class="header-wrapper">
        <el-col :span="22">
         <slot></slot>
        </el-col>
        <el-col :span="2">
          <div class="profile-wrapper">
            <el-dropdown @command="handleUser">
              <span class="el-dropdown-link profile-title">
                管理
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <router-link :to="{name: 'todos'}"><el-dropdown-item command="todos">事项</el-dropdown-item></router-link>
                <el-dropdown-item command="signout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </el-header>
  </div>
</template>
<script>
  export default {
    name: 'Header',
    methods: {
      handleUser(command) {
        if(command === 'signout') {
            this.$store.commit('setSignin', false);
            this.$store.commit('setUser', null);
            localStorage.setItem('expire', 0)
            this.$router.push({name: 'signin'})
        }
      }
    }
  }
</script>

<style>
  .header-wrapper {
    padding: 20px 0px 0px;
  }

  .profile-wrapper {
    float:right;
  }

  .profile-title {
    font-size: 1.2rem;
    cursor: pointer;
  }
</style>