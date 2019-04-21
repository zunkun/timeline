<template>
  <div id="todos">
    <Header>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'todos' }">事项</el-breadcrumb-item>
        <el-breadcrumb-item>{{typeMap[showTab]}}</el-breadcrumb-item>
      </el-breadcrumb>
    </Header>
    <div class="tab-lists">
      <el-tabs v-model="showTab">
        <el-tab-pane label="事项列表" name="summary">
          <TodoListsSummary />
        </el-tab-pane>
        <el-tab-pane :label="todoType.name" :name="todoType.type" v-for="todoType in todoTypes"
          :key="todoType.type" :lazy="true">
          <TodoLists :todo-type="todoType" :type="showTab" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import TodoListsSummary from '../components/TodoListsSummary';
  import TodoLists from '../components/TodoLists';
  import Header from '../components/Header'

  export default {
    name: 'Todos',
    components: {
      Header,
      TodoListsSummary,
      TodoLists
    },
    data() {
      return {
        baseUrl: '/tasks/api/todos',
        showTab: 'summary',
        typeMap: {
          summary: '事项列表',
          important: '重要事项',
          common: '普通事项'
        },
        todoTypes: [{ type: 'important', name: '重要事项' }, { type: 'common', name: '普通事项' }]
      }
    },
  }
</script>

<style>
  .tab-lists .el-tabs__nav-wrap{
    padding-left:20px;
  }
</style>