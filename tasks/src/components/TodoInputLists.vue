<template>
  <div id="todoinputlists">
    <el-row>
      <el-col :span="24">
        <draggable v-model="todos" group="todos" @start="drag=true" @end="drag=false"
          @change="changeTodo" :move="moveTodo" ghost-class="ghost">
          <div class="todo-f" v-for="(todo, todoIndex) in todos" :key=" type + '-' + todoIndex">
            <div class="todo-item1">
              <el-checkbox v-model="todo.checked" class="t-check" :disabled="!todo.id || !todo.text"
                @change="checkTodo(todo)" style="float:left;">
              </el-checkbox>
            </div>
            <div class="todo-item2">
              <el-input v-model="todo.text" :class="{'todo-input': true, 'text-checked': todo.checked}" placeholder="输入事项"
                @blur="saveTodo(todo,todoIndex)" @keyup.enter.native="saveTodo(todo,todoIndex)">
              </el-input>
            </div>
            <div class="icon-parent todo-item3" v-show="todo.id">
              <el-tooltip effect="light" :content="todo.type=='important'? '调整该项为普通项目': '调整该项为重要项目'" placement="top-end">
                <i class="el-icon-tl-exchange i-son" @click="changeType(todo, todoIndex)"></i>
              </el-tooltip>
              <el-tooltip effect="light" content="删除该事项" placement="top-end">
                <i class="el-icon-delete i-son" @click="deleteTodo(todo, todoIndex)"></i>
              </el-tooltip>
            </div>
            <div class="clear"></div>
          </div>
        </draggable>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  export default {
    name: 'TodoLists',
    props: ['todolists', 'type'],
    components: {draggable},
    data() {
      return {
        baseUrl: '/tasks/api/todos',
        todos: [],
      }
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
          .then(todos => {
            if (!todos) return;
            this.todos = todos || [];
          })
      },
      saveTodo(todo, todoIndex) {
        let method = 'POST';
        if (!todo.text || !todo.text.trim()) {
          if (!todo.id) return;
          return this.deleteTodo(todo, todoIndex);
        }
        let url = `${this.baseUrl}/`;
        if (todo.id) {
          url = `${url}${todo.id}`
          method = 'PUT';
        }

        fetch(url, {
            method,
            body: JSON.stringify(todo),
            headers: {
              'content-type': 'application/json'
            },
          })
          .then(res => res.json())
          .then(todo => {
            if (todo.id) {
              this.todos[todoIndex] = todo;
              this.newTodo(todo.type)
            }
          });
      },
      deleteTodo(todo, index) {
        let url = `${this.baseUrl}/${todo.id}`
        fetch(url, {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json'
            },
          })
          .then(res => {
            if (res.ok) {
              this.todos.splice(index, 1);
            }
          });
      },
      newTodo() {
        let _todos = [{
          checked: false,
          text: '',
          type: this.type,
          sequence: 0,
        }];
        this.todos = _todos.concat(this.todos);
      },
      updateTodoInfo(data, id) {
        let url = `/tasks/api/todos/${id}`;
        fetch(url, {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json'
          },
        });
      },
      moveTodo(event) {
        let draggedContext = event.draggedContext;
        if(!draggedContext.element || !draggedContext.element.id) {
          return false;
        }
      },
      changeTodo(event) {
        let key = Object.keys(event)[0];
        let todo = event[key].element;
        if(!todo.id) return false;
        if (key === 'added') {
          let type = todo.type === 'important' ? 'common' : 'important';
          return this.updateTodoInfo({
            type
          }, todo.id);
        }
      },
      checkTodo(todo) {
        this.updateTodoInfo({
          checked: todo.checked
        }, todo.id)
      },
      changeType(todo, todoIndex) {
        this.updateTodoInfo({
          type: todo.type === 'important' ? 'common' : 'important'
        }, todo.id)
        this.todos.splice(todoIndex, 1);
      },
      init() {
        this.todos = this.todolists;
        this.newTodo()
      }
    },
    created() {
      this.init();
    },
    watch: {
      todolists(newV) {
        this.todos = newV ||[];
        this.newTodo(this.type)
      }
    }
  }
</script>

<style scope>
  .clear {
    clear: both;
  }

  .todo-item1 {
    float: left;
    width: 5%;
  }

  .todo-item2 {
    float: left;
    width: 85%;
  }

  .todo-item3 {
    float: left;
    width: 10%;
  }

  #todoinputlists .el-input__inner {
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
  }

  .el-input__inner:hover {
    cursor: move;
  }

  input[type="text"]:focus {
    cursor: auto;
  }

  .el-checkbox {
    margin-right: 0;
  }

  .el-checkbox__inner {
    width: 20px;
    height: 20px;
    padding: 0;
  }

  .t-check {
    margin-top: 20px;
    float: left;
  }

  .icon-parent {
    height: inherit;
  }

  .i-son {
    float: left;
    margin-top: 20px;
    bottom: 0;
  }

  .t-check .el-checkbox__label {
    width: inherit;
  }

  .todo-p {
    border-right: dashed 1px #ccc;
    padding: 4px 0px 4px 20px;
    min-height: calc(100vh - 140px);
  }

  .text-checked input {
    text-decoration: line-through;
  }

  .el-icon-tl-exchange {
    font-size: 1.4rem;
    cursor: pointer;
    color: #99CC99;
  }

  .el-icon-delete {
    color: red;
    cursor: pointer;
  }

  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
</style>
