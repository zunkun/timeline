<template>
  <div id="home">
    <Header>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>主页</el-breadcrumb-item>
        <el-breadcrumb-item>项目</el-breadcrumb-item>
      </el-breadcrumb>
    </Header>
    <el-row :gutter="10"  class="home-dashbord">
      <el-col :span="10" class="left-top">
        <div class="left">
          <TodoInputLists :todolists="todos" type="important" />
        </div>
      </el-col>
      <el-col :span="14">
        <div class="right">
          <el-col :span="8" v-for="(project, projectIndex) in projects" :key="project.id" class="project-z">
            <el-card shadow="hover" :style="{'border-color': project.color}">
              <div class="project-title">
                <router-link :to="{name: 'project', params: {id: project.id}}">
                  <span class="project-n">{{project.name}}</span>
                </router-link>
                <span class="project-status" v-if="project.enable">
                  <el-tag size="mini" type="success">使用</el-tag>
                </span>
                <span class="project-status" v-else>
                  <el-tag size="mini" type="danger">归档</el-tag>
                </span>
                <span class="project-button" @click="edit(project, projectIndex)">编辑</span>
              </div>
              <p><span class="project-d">{{project.description}}</span></p>
            </el-card>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <el-dialog :title="currentProject.title ||'项目编辑'" :visible.sync="visible" width="50%">
      <el-form ref="projectform" :model="currentProject" :rules="rules" label-width="80px" label-position="right"
        id="projectform">
        <el-form-item label="名称" prop="name">
          <el-input v-model="currentProject.name"></el-input>
        </el-form-item>
        <el-form-item label="类别" prop="type">
          <el-select v-model="currentProject.type" placeholder="选择类别">
            <el-option :label="projectType.name" :value="projectType.type" v-for="projectType in this.projectTypes"
              :key="projectType.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="颜色" prop="color">
          <el-input placeholder="输入颜色" v-model="currentProject.color" class="color-i">
            <template slot="append">
              <el-color-picker v-model="currentProject.color" class="color-p"></el-color-picker>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="说明" prop="description">
          <el-input type="textarea" :rows="3" v-model="currentProject.description"></el-input>
        </el-form-item>
        <el-form-item label="启用">
          <el-switch v-model="currentProject.enable" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="danger" plain @click="deleteProject" v-if="currentProject.id">删 除</el-button>
        <el-button size="small" type="warning" plain @click="visible = false">取 消</el-button>
        <el-button size="small" type="success" plain @click="saveProject">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Header from '../components/Header'
  import TodoInputLists from '../components/TodoInputLists.vue';

  export default {
    name: 'home',
    components: {
      Header,
      TodoInputLists
    },
    data() {
      return {
        baseUrl: '/tasks/api/projects',
        todos: [],
        visible: false,
        projectTypes: [{
            type: 'project',
            name: '项目'
          },
          {
            type: 'work',
            name: '工作'
          },
          {
            type: 'family',
            name: '家庭'
          },
          {
            type: 'life',
            name: '生活'
          },
          {
            type: 'skills',
            name: '技能'
          }
        ],
                rules: {
          name: [{
              required: true,
              message: '请输入项目名称',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 20,
              message: '长度在 2 到 20 个字符',
              trigger: 'blur'
            }
          ],
          type: [{
            required: true,
            message: '请选择类型',
            trigger: 'blur',
          }],
          color: [{
            required: true,
            message: '输入颜色',
            trigger: 'blur'
          }, {
            type: 'string',
            pattern: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
            message: '请输入正确的hex颜色值',
            trigger: 'blur'
          }],
          description: [{
              required: true,
              message: '请输入项目说明',
              trigger: 'blur'
            },
            {
              min: 2,
              message: '至少个字符',
              trigger: 'blur'
            }
          ],
        },
        currentProject: {
          color: '#cf9236',
          type: 'project',
          enable: true,
        },
        currentIndex: 0,
        projects: [],
      }
    },
    methods: {
      notify(type, title, text) {
        const h = this.$createElement;

        this.$notify({
          title,
          message: h('i', {
            style: type === 'success' ? 'color: teal' : 'color: red'
          }, text)
        });
      },

      newProject() {
        this.currentProject = {
          color: '#cf9236',
          type: 'project',
          enable: true
        };
        this.visible = false;
        this.currentIndex = 0;
      },

      async getTodos(type) {
        let url = `/tasks/api/todos/?limit=10&page=1`
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
            if (!data) return;
            this.count = data.count || 0;
            this.todos = data.rows || [];
            return this.todos;
          })
      },

      getProjects(type) {
        let url = `/tasks/api/projects/?limit=12&page=1&enable=true`
        fetch(url)
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            throw '获取项目列表失败';
          })
          .then(data => {
            if (!data) return;
            this.count = data.count || 0;
            this.projects = data.rows || [];
          })
      },
            saveProject() {
        this.$refs.projectform.validate(async valid => {
          if (!valid) return Promise.resolve();
          if (this.currentProject.id) {
            await this.updateProject(this.currentProject);
          } else {
            await this.createProject(this.currentProject);
            this.getProjects();
          }
          this.newProject();
        })
      },
     async updateProject(project) {
        let url = `${this.baseUrl}/${project.id}`;
        return fetch(url, {
          method: 'PUT',
          body: JSON.stringify(project),
          headers: {
            'content-type': 'application/json'
          },
        });
      },
      async createProject(project) {
        let url = `${this.baseUrl}/`;
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(project),
            headers: {
              'content-type': 'application/json'
            },
          })
          .then(async res => {
            if (res.ok) {
              let _project = await res.json();
              let _projects = [_project];
              this.projects = _projects.concat(this.projects);
            }
          });
      },
      deleteProject() {
        if (!this.currentProject.id) return;
        let url = `${this.baseUrl}/${this.currentProject.id}`;
        fetch(url, {
            method: 'DELETE'
          })
          .then(async res => {
            if (res.ok) {
              this.projects.splice(this.currentIndex, 1);
              this.newProject()
            }
          });
      },

      edit(project, projectIndex) {
        this.projectIndex = projectIndex || 0;
        this.currentProject = project;
        this.visible = true;
      },
    },
    async created() {
      this.getTodos();
      this.getProjects()
    },
  }
</script>

<style>
  #home {
    height: 100%;
  }

  .home-dashbord {
    height:calc(100vh - 100px);
    margin:0px !important;
  }

  #main {
    padding: 0;
  }

  .left-top {
    height: inherit;
    border-right: dashed 1px #ccc;
  }
  .left {
    padding-left: 20px;
  }

  .right {
    padding: 0px 10px;
  }

  .project-z {
    margin-top: 10px;
    padding: 0px 10px;
    cursor: pointer;
  }

  .project-n {
    color: #67C23A;
    font-size: 1.2rem;
  }

  .project-d {
    font-size: 0.8rem;
    max-width: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .project-button {
    float: right;
    color: #E6A23C;
    font-size: 0.8rem;
  }

  .project-status {
    font-size: 0.8rem;
    margin-left: 10px;
  }

  .e-card {
    cursor: pointer;
  }

  .el-card__body {
    padding: 10px;
  }

  a {
    text-decoration: none;
  }
</style>