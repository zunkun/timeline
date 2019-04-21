<template>
  <div>
    <el-row>
      <el-col :span="12" class="todo-p" v-for="todoType in todoTypes"
        :key="todoType.type">
        <div class="todo-title">
          <span class="title-c">{{todoType.name}}</span>
        </div>
        <TodoInputLists :todolists="todos[todoType.type]" :type="todoType.type" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import TodoInputLists from './TodoInputLists.vue';
  
  export default {
    name: 'TodoListsSummary',
    components: {
      TodoInputLists
    },
    data() {
      return {
        baseUrl: '/tasks/api/todos',
        types: [{
          type: 'important',
          name: '重要事项'
        }, {
          type: 'common',
          name: '普通事项'
        }],
        todoTypes: [{ type: 'important', name: '重要事项' }, { type: 'common', name: '普通事项' }],
        todos: {
          important: [],
          common: [],
        },
        drag: false,
      };
    },
    methods: {
      getTodos(type) {
        let url = `${this.baseUrl}/?type=${type}`
        fetch(url)
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            throw '获取ToDo 列表失败';
          })
          .then(data => {
            if (!data) return;
            this.todos[type] = data.rows || [];
          })
      },
      async initTodos() {
        for (let typeObj of this.todoTypes) {
          this.getTodos(typeObj.type);          
        }
      },
    },
    async created() {
      await this.initTodos();
    }
  }
</script>
