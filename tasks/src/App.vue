<template>
  <div id="app">
    <el-container>
      <el-container>
        <el-aside width="160px">
          <el-menu default-active="2-2" :collapse="false" active-text-color="#FF9900" :router="true">
            <el-menu-item index="1" :route="{'name': 'home'}">
              <i class="el-icon-tl-home"></i>
              <span slot="title">主页</span>
            </el-menu-item>
            <el-menu-item index="2" :route="{'name': 'projects'}">
              <i class="el-icon-date"></i>
              <span slot="title">项目</span>
            </el-menu-item>
            <el-menu-item index="3" :route="{'name': 'todos'}">
              <i class="el-icon-tickets"></i>
              <span slot="title">事项</span>
            </el-menu-item>
            <!-- <el-menu-item index="4" :route="{'name': 'calendar'}">
              <i class="el-icon-date"></i>
              <span slot="title">日历</span>
            </el-menu-item> -->
          </el-menu>
        </el-aside>
        <el-container>
          <el-main id="main">
            <router-view />
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
  }
</script>


<style>
  body {
    margin: 0px;
  }

  #app {
    width: 100%;
    height: 100vh;
  }

  .el-container {
    height: 100%;
  }

  .el-aside {
    border-right: solid 1px #e6e6e6;
    overflow-x: hidden !important;
  }

  .el-menu {
    border-right: none !important;
  }

  .el-menu {
    border-right: none;
  }

  .el-header {
    background: #fff;
    border-bottom: solid 1px #e6e6e6;
  }
</style>