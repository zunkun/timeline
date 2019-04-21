<template>
  <div id="todolists">
    <div>
      {{todoType.name}}
    </div>
    <TodoInputLists :todolists="todos" :type="showType" />
    <el-pagination
      class="pagination-z"
      background
      layout="prev, pager, next"
      :page-size="limit"
      :total="count"
      v-if="count > limit"
      @current-change="changeData">
    </el-pagination>
  </div>
</template>

<script>
import TodoInputLists from './TodoInputLists.vue';

export default {
  name: 'TodoLists',
  props: ['todoType', 'type'],
  components: {TodoInputLists},
  data() {
    return {
      baseUrl: '/tasks/api/todos',
      todos: [],
      page: 1,
      limit: 10,
      count: 0,
      showType: this.type,
    }
  },
  methods: {
    async getTodos(type) {
      let url = `${this.baseUrl}/?limit=${this.limit}&page=${this.page}`
      if (type) {
        url = `${url}&type=${type}`
      }
     return fetch(url)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          throw '获取ToDo 列表失败';
        })
        .then(data => {
          if(!data) return;
          this.count = data.count || 0;
          this.todos = data.rows || [];
          return this.todos;
        })
    },

    changeData(page) {
      this.page = page;
      this.getTodos(this.todoType.type);
    }
  },
  async created() {
    this.getTodos(this.todoType.type);
  },
  watch: {
    type(newV, oldV) {
      if(newV !== oldV) {
        this.getTodos(newV)
      }
    }
  }
}
</script>

<style>
  #todolists {
    padding-left:20px;
  }
  .pagination-z {
    padding:0px;
    margin:20px 0px 10px;
  }
</style>


