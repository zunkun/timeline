<template>
  <div id="app">
    <el-container>
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="2-2"
            :collapse="isCollapse" active-text-color="#FF9900" :router=true>
            <el-menu-item index="1" :route="{'name': 'home'}">
              <i class="el-icon-tl-home"></i>
              <span slot="title">主页</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title" >
                <i class="el-icon-tl-family"></i>
                <span slot="title">家人</span>
              </template>
              <el-menu-item-group>
                <el-menu-item class="el-icon-tl-girl" index="2-1" :route="{'name': 'personal', 'params': {'name': '丹丹'}}">丹丹</el-menu-item>
                <el-menu-item class="el-icon-tl-girl" index="2-2" :route="{'name': 'personal', 'params': {'name': '彤彤'}}">彤彤</el-menu-item>
                <el-menu-item class="el-icon-tl-family" index="2-3" :route="{'name': 'personal', 'params': {'name': '合影'}}">合影</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="3" :route="{'name': 'timeline'}">
              <i class="el-icon-date"></i>
              <span slot="title">時光</span>
            </el-menu-item>
            <el-menu-item index="4" :route="{'name': 'settings'}">
              <i class="el-icon-setting"></i>
              <span slot="title">设置</span>
            </el-menu-item>
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
      isCollapse: false
    }
  }
}
</script>


<style>
  body {
    margin:0px;
  }

  #app {
    width: 100%;
    height: 100vh;
  }

  .el-container {
    height:100%;
  }

  .el-aside {
    border-right: solid 1px #e6e6e6;
    overflow-x: hidden !important;
  }

  .el-menu {
    border-right: none !important;
  }

  .el-menu {
    border-right:none;
  }
</style>
