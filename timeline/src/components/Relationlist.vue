<template>
  <div id="relationlist">
    <el-row :gutter="20">
      <el-col :row="24">
        <el-table :data="$store.state.relations" border>
          <el-table-column prop="sequelence" width="60" label="排序">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="146">
          </el-table-column>
          <el-table-column label="性别" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.gender==='M'">男</span>
              <span v-if="scope.row.gender==='F'">女</span>
              <span v-if="scope.row.gender==='MF'">未知</span>
            </template>
          </el-table-column>
          <el-table-column prop="relation" label="关系" width="80">
          </el-table-column>
          <el-table-column label="颜色" width="80">
            <template slot-scope="scope">
              <div :style="{background: scope.row.color}" class="color-d" @click="editRelation(scope.row, scope.$index)"></div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" plain type="primary" @click="editRelation(scope.row, scope.$index)">详情</el-button>
              <el-button size="mini" plain type="success" @click="faces(scope.row, scope.$index)" v-if="scope.row.avatars">识别
              </el-button>
              <el-button size="mini" plain type="danger" @click="delRelation(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row class="r-edit">
      <el-col :row="24">
        <el-form ref="relationform" :model="relation" :rules="rules" label-width="80px" label-position="right" id="relationform">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="relation.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select v-model="relation.gender" placeholder="选择性别">
              <el-option label="男" value="M"></el-option>
              <el-option label="女" value="F"></el-option>
              <el-option label="未知" value="MF"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关系" prop="relation">
            <el-select v-model="relation.relation" placeholder="选择关系">
              <el-option label="妻子" value="妻子"></el-option>
              <el-option label="女儿" value="女儿"></el-option>
              <el-option label="儿子" value="儿子"></el-option>
              <el-option label="父母" value="父母"></el-option>
              <el-option label="朋友" value="朋友"></el-option>
              <el-option label="我" value="我"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序" prop="sequelence">
            <el-input v-model.number="relation.sequelence"></el-input>
          </el-form-item>
          <el-form-item label="颜色" prop="color">
            <el-input placeholder="输入颜色" v-model="relation.color" class="color-i">
              <template slot="append">
                <el-color-picker v-model="relation.color" class="color-p"></el-color-picker>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="照片" v-if="relation.id">
            <el-upload action="/tl/api/relations/avatars" list-type="picture-card" :disabled="!relation.id"
              accept=".jpg" ref="upload" :limit="limit" :data="avatarData" :file-list="fileList"
              :before-upload="beforeUpload" :on-preview="preview" :on-remove="removeAvatar"
              :on-success="uploadSuccess">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" size="small" plain @click="relation ={gender: 'M'}">取消</el-button>
            <el-button type="success" size="small" plain @click="submitRelation">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'RelationList',
    data() {
      return {
        relations: [],
        relation: {
          name: '',
          gender: 'M',
          relation: '',
          sequelence: 10,
          color: '#cf9236',
        },
        relationIndex: 0,
        rules: {
          name: [{
              required: true,
              message: '请输入姓名',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 10,
              message: '长度在 2 到 10 个字符',
              trigger: 'blur'
            }
          ],
          relation: [{
            required: true,
            message: '请选择关系',
            trigger: 'blur',
          }],
          gender: [{
            required: true,
            message: '请选择性别',
            trigger: 'blur',
          }],
          sequelence: [{
            required: true,
            message: '请输入排序整数',
            trigger: 'blur'
          }, {
            type: 'integer',
            message: '必须输入整数',
            trigger: 'blur'
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
          }]
        },
        imageUrl: '',
        avatarData: {},
        dialogImageUrl: '',
        limit: 20,
        fileList: [],
        dialogVisible: false
      };
    },
    methods: {
      submitRelation() {
        let that = this;
        this.$refs.relationform.validate(valid => {
          if (!valid) return;
          let method = that.relation.id ? 'PUT' : 'POST';
          let baseUrl = '/timeline/api/relations/';

          let url = that.relation.id ? `${baseUrl}${that.relation.id}` : baseUrl;
          fetch(url, {
            method,
            body: JSON.stringify(that.relation),
            headers: {
              'content-type': 'application/json'
            },
          }).then(() => {
            this.getRelations();
          });
        })
      },
      editRelation(relation, index) {
        this.relation = relation;
        this.relationIndex = index || 0;
        this.setFileList();
      },
      delRelation(relation) {
        fetch(`/timeline/api/relations/${relation.id}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json'
          },
        }).then(() => {
          this.getRelations();
        });
      },
      getRelations() {
        return fetch('/timeline/api/relations/')
          .then(res => res.json())
          .then(relations => {
            this.relations = relations || [];
            this.$store.commit('setRelations', relations)
          });
      },
      beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 10;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 10MB!');
        }
        this.avatarData.relation = this.relation.id;
        return isJPG && isLt2M;
      },
      uploadSuccess() {
        this.getRelations().then(() => {
          this.relation = this.$store.state.relations[this.relationIndex || 0]
          this.editRelation(this.$store.state.relations[this.relationIndex || 0], this.relationIndex || 0)
        });
      },
      faces(relation, index) {
        this.relation = relation;
        this.relationIndex = index || 0;
        fetch('/timeline/api/faces/', {
          method: 'POST',
          body: JSON.stringify(relation),
          headers: {
            'content-type': 'application/json'
          },
        });
      },

      removeAvatar(file) {
        if(!file.url) return;
        fetch('/timeline/api/relations/avatars', {
          method: 'DELETE',
          body: JSON.stringify({avatar: file.url.slice(file.url.indexOf('images')-1), id: this.relation.id}),
          headers: {
            'content-type': 'application/json'
          },
        });
      },
      preview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      setFileList() {
        this.fileList = [];
        let avatars = this.relation.avatars || '';
        if (!avatars) {
          this.fileList = [];
          return;
        }
        avatars.split('|').map(url => {
          if(!url) {
            return;
          }
          this.fileList.push({
            url: `${url}`,
          });
        });
      }
    },

    created() {
      if (this.$store.state.relations.length) {
        this.relation = this.$store.state.relations[0];
        this.relationIndex = 0;
        this.setFileList()
      }
    }
  }
</script>

<style>
  .el-select {
    width: 100%;
  }

  #relationform {
    padding-right: 20px;
  }

  #relationBtn {
    float: right;
  }

  .el-color-picker__trigger {
    padding: 0;
    border: none;
  }

  .el-input-group__append,
  .el-input-group__prepend {
    padding: 0;
    background-color: #fff;
    border: none;
  }

  .color-d {
    height: 24px;
    cursor: pointer;
    border-radius: 2px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    border-radius: 6px;
    cursor: pointer;
    display: block;
  }

  .avatar-l {
    float: left;
    width: 50%;
  }

  .avatar-r {
    float: right;
    width: 50%;
  }

  .r-edit {
    margin-top:20px;
  }
</style>