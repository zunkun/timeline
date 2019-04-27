<template>
  <div id="project">
    <Header>
      <el-row>
        <el-col :span="20" class="head-left">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'projects' }">项目</el-breadcrumb-item>
            <el-breadcrumb-item :to="{name: 'project', params: {id: project.id}}">{{project.name}}</el-breadcrumb-item>
            <el-breadcrumb-item>模块</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="4" class="head-right">
          <el-button size="small" plain type="success" @click="newProgress">新增模块</el-button>
        </el-col>
      </el-row>
    </Header>
    <div class="progress-wrapper">
      <draggable v-model="project.progresses" group="progresses"  @change="change" style="display:flex">
        <el-card v-for="progress of project.progresses" :key="progress.id" class="progress-lists progress-card">
          <div slot="header" class="clearfix">
            <div class="p-name">{{progress.name}}</div>
            <div class="p-menu">
              <i class="el-icon-plus" @click="newTask(progress)"></i>
              <el-dropdown>
                <span class="el-dropdown-link">
                  <i class="el-icon-more" style="color:#67C23A;"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="editProgress(progress)" style="color:#E6A23C;">编辑</el-dropdown-item>
                  <el-dropdown-item @click.native="deleteProgress(progress)" style="color:#F56C6C;">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <draggable v-model="progress.tasks" group="tasks" class="task-lists-zone"
            @change="changeTask(progress.id, progress.tasks)">
            <div class="task-lists" v-for="task in progress.tasks" :key="'task-'+task.id">
              <div class="task-lists-title">
                <div class="title-left">
                  {{task.title}}
                </div>
                <div class="title-right">
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      <i class="el-icon-more"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="editTask(progress, task)">编辑</el-dropdown-item>
                      <el-dropdown-item @click.native="deleteTask(task)">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
              <div class="task-lists-des">
                {{task.description}}
              </div>
            </div>
          </draggable>
        </el-card>
      </draggable>
    </div>
    <el-dialog title="项目过程编辑" :visible.sync="progressShow" width="50%">
      <el-form ref="progressForm" :model="progress" :rules="progressRules" label-width="80px" label-position="right">
        <el-form-item label="过程" prop="name">
          <el-input v-model="progress.name"></el-input>
        </el-form-item>
        <el-form-item label="说明">
          <el-input type="textarea" :rows="3" v-model="progress.description"></el-input>
        </el-form-item>
        <el-form-item label="颜色" prop="color">
          <el-input placeholder="输入颜色" v-model="progress.color" class="color-i">
            <template slot="append">
              <el-color-picker v-model="progress.color" class="color-p"></el-color-picker>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button plain size="small" @click="progressShow = false">取 消</el-button>
        <el-button type="success" plain size="small" @click="saveProgress">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="task.progressName + '|' + (task.title ||'任务编辑')" :visible.sync="taskShow" width="50%">
      <el-form ref="taskForm" :model="task" :rules="taskRules" label-width="80px" label-position="right">
        <el-form-item label="主题" prop="title">
          <el-input v-model="task.title"></el-input>
        </el-form-item>
        <el-form-item label="说明">
          <el-input type="textarea" :rows="3" v-model="task.description"></el-input>
        </el-form-item>
        <el-form-item label="颜色" prop="color">
          <el-input placeholder="输入颜色" v-model="task.color" class="color-i">
            <template slot="append">
              <el-color-picker v-model="task.color" class="color-p"></el-color-picker>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button plain size="small" @click="taskShow = false">取 消</el-button>
        <el-button type="success" plain size="small" @click="saveTask">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Header from '../components/Header'
  import draggable from 'vuedraggable';
  export default {
    name: 'Project',
    components: {
      Header,
      draggable
    },
    data() {
      return {
        baseUrl: '/tasks/api/projects',
        projectId: '',
        project: {color: '#67C23A'},
        task: {
          title: '',
          description: '',
          color: '#67C23A',
          sequence: '',
          projectId: ''
        },
        progress: {color: '#67C23A'},
        progressShow: false,
        progressRules: {
          name: [{
              required: true,
              message: '请输入项目过程名称',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 20,
              message: '长度在 2 到 20 个字符',
              trigger: 'blur'
            }
          ],
          color: [{
            required: true,
            message: '输入颜色',
            trigger: 'blur'
          }, {
            type: 'string',
            pattern: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
            message: '请输入正确的hex颜色值',
            trigger: 'blur'
          }]
        },
        taskShow: false,
        taskRules: {
          title: [{
              required: true,
              message: '请输入任务主题',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 20,
              message: '长度在 2 到 20 个字符',
              trigger: 'blur'
            }
          ],
          color: [{
            required: true,
            message: '输入颜色',
            trigger: 'blur'
          }, {
            type: 'string',
            pattern: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
            message: '请输入正确的hex颜色值',
            trigger: 'blur'
          }]
        },
      }
    },
    methods: {
      async getProject() {
        let url = `${this.baseUrl}/${this.projectId}`
        fetch(url).then(async res => {
          if (!res.ok) {
            return;
          }
          this.project = await res.json();
        });
      },
      changeProgress() {
        let progresses = this.project.progresses;
        if(!progresses || !progresses.length) return;
        for (let index in progresses) {
          let progress = progresses[index]
          fetch(`${this.baseUrl}/${this.projectId}/progress/${progress.id}/moved`, {
            method: 'POST',
            body: JSON.stringify({
              progressId: progress.id,
              sequence: index,
            }),
            headers: {
              'content-type': 'application/json'
            },
          });
        }
      },
      change(event) {
        let url = `${this.baseUrl}/${this.projectId}/progress`

        if (event.moved) {
          let moved = event.moved;
          let oldIndex = moved.oldIndex;
          let newIndex = moved.newIndex;
          let bigIndex = oldIndex > newIndex ? oldIndex : newIndex;
          let smallIndex = oldIndex > newIndex ? newIndex : oldIndex;
          for (let index = smallIndex; index <= bigIndex; index++) {
            let progress = this.project.progresses[index];
            fetch(`${url}/${progress.id}`, {
              method: 'PUT',
              body: JSON.stringify({
                sequence: index,
              }),
              headers: {
                'content-type': 'application/json'
              },
            });
            this.project.progresses[index].sequence = index;
          }
        }
      },

      editProgress(progress) {
        this.progress = progress;
        this.progressShow = true;
      },
      deleteProgress(progress) {
          let url = `${this.baseUrl}/${this.project.id}/progress/${progress.id}`;
          fetch(url, {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json'
            },
          }).then((res) => {
            if (res.ok) {
              this.getProject()
            }
            this.progressShow = false;
          });
      },
      newProgress() {
        this.progress = {color: '#67C23A'};
        this.progressShow = true;
      },
      saveProgress() {
        this.$refs.progressForm.validate(valid => {
          if (!valid) {
            return;
          }
          let method = 'POST';
          let url = `${this.baseUrl}/${this.project.id}/progress/`;
          if (this.progress.id) {
            url = `${url}${this.progress.id}`
            method = 'PUT';
          }
          fetch(url, {
            method,
            body: JSON.stringify(this.progress),
            headers: {
              'content-type': 'application/json'
            },
          }).then((res) => {
            if (res.ok) {
              this.getProject()
            }
            this.progressShow = false;
          });

        });
      },

      newTask(progress) {
        this.task = {
          progressId: progress.id,
          progressName: progress.name,
          color: '#cf9236',
          title: '',
          description: ''
        };
        this.taskShow = true;
      },
      editTask(progress, task) {
        task.progressName = progress.name;
        this.task = task;
        this.taskShow = true;
      },
      deleteTask(task) {
        let url = `${this.baseUrl}/${this.project.id}/progress/${task.progressId}/tasks/${task.id}`;
        fetch(url, {
          method: 'DELETE'
        }).then(res => {
          if (res.ok) {
            this.getProject();
          }
        })
      },
      saveTask() {
        this.$refs.taskForm.validate(valid => {
          if (!valid) {
            return;
          }
          let method = 'POST';
          let url = `${this.baseUrl}/${this.project.id}/progress/${this.task.progressId}/tasks/`;
          if (this.task.id) {
            url = `${url}${this.task.id}`
            method = 'PUT';
          }
          fetch(url, {
            method,
            body: JSON.stringify(this.task),
            headers: {
              'content-type': 'application/json'
            },
          }).then((res) => {
            if (res.ok) {
              this.getProject()
            }
            this.taskShow = false;
          });

        });
      },

      changeTask(progressId, tasks) {
        for (let index in tasks) {
          let task = tasks[index];
          fetch(`${this.baseUrl}/${this.projectId}/progress/${progressId}/tasks/${task.id}/moved`, {
            method: 'POST',
            body: JSON.stringify({
              progressId,
              sequence: index,
            }),
            headers: {
              'content-type': 'application/json'
            },
          });
        }
      },

      moveTask(moved) {
        let oldIndex = moved.oldIndex;
        let newIndex = moved.newIndex;
        let bigIndex = oldIndex > newIndex ? oldIndex : newIndex;
        let smallIndex = oldIndex > newIndex ? newIndex : oldIndex;
        let task = moved.element;
        let tasks = [];
        for (let progress of this.project.progresses) {
          if (progress.id === task.progressId) {
            tasks = progress.tasks;
            break;
          }
        }
        if (!tasks.length) return;

        for (let index = smallIndex; index <= bigIndex; index++) {
          let _task = tasks[index];
          fetch(`${this.baseUrl}/${this.projectId}/progress/${task.progressId}/tasks/${_task.id}/moved`, {
            method: 'POST',
            body: JSON.stringify({
              sequence: index,
            }),
            headers: {
              'content-type': 'application/json'
            },
          });
        }
      }
    },
    async created() {
      this.projectId = this.$route.params.id;
      await this.getProject();
    }
  }
</script>

<style>
  #project {
    margin: 0px;
    min-width: 100%;
    display: inline-block;
  }

  .progress-zpne {
    padding: 10px 20px;
  }

  .p-h {
    border-bottom: solid 1px #CCC;
    height: 40px;
  }

  .p-d {
    padding: 20px;
  }

  .p-name {
    float: left;
  }

  .p-menu {
    float: right;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .progress-card {
    min-height: calc(100vh - 100px);
  }

  .progress-card el-card__header {
    padding: 10px;
  }

  .p-menu {
    cursor: pointer;
  }

  .p-menu i {
    margin-left: 4px;
  }

  .task-lists {
    border: 1px solid #ccc;
    padding-left: 10px;
    margin: 10px;
    font-size: 0.8rem;
    border-radius: 6px;
    min-height: 80px;
    cursor: pointer;
  }

  .task-lists:hover {
    border: 1px solid green;
  }

  .task-lists-title {
    font-size: 1rem;
    width: 100%;
    min-height: 30px;
    margin: 6px 0px;
  }

  .task-lists-des {
    margin-top: 10px;
  }

  .progress-wrapper {
    display: inline-block;
  }

  .progress-lists {
    min-width: 280px;
    max-width: 280px;
    margin: 10px;
    height: calc(100vh - 200px);
    display: inline-block;
  }

  .progress-card .el-card__body {
    padding: 0;
    height: 90%;
    overflow: auto;
  }

  .progress-add {
    min-width: 280px;
    max-width: 280px;
    border:dashed 1px #67C23A;
    height:100px;
  }

  .progress-add .el-card__body {
    vertical-align: middle;
    margin-left:20px;
    text-align: left;
    cursor: pointer;
  }

  .title-left {
    width: 90%;
    float: left;
  }

  .title-right {
    width: 10%;
    float: left;
  }

  .title-right .el-icon-more {
    float: right;
  }

  .title-right .el-dropdown {
    float: right;
    margin-right: 6px;
    color: green;
    font-size: 1.2rem;
  }

  .task-lists-zone {
    height: inherit;
  }

  .el-color-picker__color {
    border: 1px;
  }
  
  .el-color-picker__trigger {
    padding: 0;
    border: none;
  }
  .color-d {
    height: 24px;
    cursor: pointer;
    border-radius: 2px;
  }

  .el-input-group__append,
  .el-input-group__prepend {
    padding: 0;
    background-color: #fff;
    border: none;
  }

  .p-add {
    margin-top:15px;
    margin-left:15px;
    font-size:1.4rem;
    color: #67C23A
  }

  .head-left {
    float: left;
  }

  .head-right {
    float: right;
    text-align: right;
  } 

</style>