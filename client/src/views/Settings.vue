<template>
  <div id="settings">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="目录管理" name="disk">
        <DirectoryList />
      </el-tab-pane>
      <el-tab-pane label="用户管理" name="userlist">
        <UserList />
      </el-tab-pane>
      <el-tab-pane label="主题管理" name="theme">主题管理</el-tab-pane>
      <el-tab-pane label="任务设置" name="tasks">任务设置</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import DirectoryList from '../components/DirectoryList.vue';
  import UserList from '../components/UserList.vue';
  export default {
    components: {DirectoryList, UserList},
    data() {
      return {
        activeName: 'userlist'
      };
    },
    methods: {
      handleClick() {
      }
    }
  };
</script>

<style>
  #settings {
    padding: 20px;
  }
</style>
