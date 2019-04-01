<template>
  <div id="settings">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="目录管理" name="first">
        <DirectoryList />
      </el-tab-pane>
      <el-tab-pane label="用户管理" name="second">用户管理</el-tab-pane>
      <el-tab-pane label="主题管理" name="third">主题管理</el-tab-pane>
      <el-tab-pane label="任务设置" name="fourth">任务设置</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import DirectoryList from '../components/DirectoryList.vue';
  export default {
    components: {DirectoryList},
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>