<template>
  <div id="settings">
    <el-tabs v-model="showTab">
      <el-tab-pane label="照片目录" name="disk">
        <DirectoryList />
      </el-tab-pane>
      <el-tab-pane label="家人管理" name="relations">
        <Relationlist />
      </el-tab-pane>
      <el-tab-pane label="标签设置" name="imagetags">
        <ImageTags />
      </el-tab-pane>
      <el-tab-pane label="任务设置" name="tasks">任务设置</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import DirectoryList from '../components/DirectoryList.vue';
  import Relationlist from '../components/Relationlist.vue';
  import ImageTags from '../components/ImageTags.vue';
  export default {
    components: {DirectoryList, Relationlist, ImageTags},
    data() {
      return {
        showTab: 'relations'
      };
    }
  };
</script>

<style>
  #settings {
    padding: 20px;
  }
</style>
