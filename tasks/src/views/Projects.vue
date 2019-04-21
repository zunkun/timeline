<template>
  <div id="projects">
    <Header>
      <el-row>
        <el-col :span="20" class="head-left">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'projects', query: {page: 1} }">项目</el-breadcrumb-item>
            <el-breadcrumb-item>项目列表</el-breadcrumb-item>
            <el-breadcrumb-item>第{{page}}页</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="4" class="head-right">
          <el-button size="small" plain type="success" @click="visible=true">新增项目</el-button>
        </el-col>
      </el-row>
    </Header>
    <el-row :gutter="10" class="project-wrapper">
      <el-col :span="6" v-for="(project, projectIndex) in projects" :key="project.id" class="project-z">
        <el-card shadow="hover" :style="{'border-color': project.color}">
          <div class="project-title">
            <router-link :to="{name: 'project', params: {id: project.id}}">
              <span class="project-n">{{project.name}}</span>
            </router-link>
            <span class="project-status" v-if="project.enable"><el-tag size="mini" type="success">使用</el-tag></span>
            <span class="project-status" v-else><el-tag size="mini" type="danger">归档</el-tag></span>
            <span class="project-button" @click="edit(project, projectIndex)">编辑</span>
          </div>
          <p><span class="project-d">{{project.description}}</span></p>
        </el-card>
      </el-col>
    </el-row>
    <el-row v-if="count>limit" class="page-bottom">
      <el-pagination background layout="prev, pager, next" @current-change="changePage" :page-size="limit"
        :total="count">
      </el-pagination>
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
  export default {
    name: 'projects',
    components: {
      Header
    },
    data() {
      return {
        baseUrl: '/tasks/api/projects',
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
        currentProject: {
          color: '#cf9236',
          type: 'project',
          enable: true,
        },
        currentIndex: 0,
        projects: [],
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
        page: 1,
        limit: 20,
        count: 0,
      }
    },
    methods: {
      newProject() {
        this.currentProject = {
          color: '#cf9236',
          type: 'project',
          enable: true
        };
        this.visible = false;
        this.currentIndex = 0;
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
      getProjects(type) {
        let url = `${this.baseUrl}/?limit=${this.limit}&page=${this.page}`
        if (type) {
          url = `${url}&type=${type}`
        }
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
      edit(project, projectIndex) {
        this.projectIndex = projectIndex || 0;
        this.currentProject = project;
        this.visible = true;
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

      changePage(page) {
        this.page = page;
        this.$router.push({
          query: {
            page
          }
        })
      }
    },
    created() {
      let query = this.$route.query;
      this.page = Number(query.page) || 1;
      this.limit = Number(query.limit) || 20;
      this.type = Number(query.type) || ''
      this.getProjects();
    },
    watch: {
      '$route'(to, from) {
        if (to.query.page !== from.params.page) {
          this.page = Number(to.query.page) || 1;
          this.getProjects();
        }
      }
    }
  }
</script>

<style>
  #projects {
    padding-bottom: 20px;
  }

  .p-head {
    text-align: right;
    padding: 4px;
  }

  #projectform {
    margin-right: 4px;
  }

  .el-select {
    width: 100%;
  }

  .el-color-picker__color {
    border: 0px;
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


  .project-wrapper {
    padding: 10px;
    margin: 0px !important;
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
    font-size:0.8rem;
    margin-left:10px;
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

  .page-bottom {
    text-align: right;
  }

  .head-left {
    float: left;
  }

  .head-right {
    float: right;
    text-align: right;
  } 
</style>