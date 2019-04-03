<template>
  <div id="Relationlist">
    <el-row>
      <el-col :span="10" :gutter="20">
        <el-form ref="relationform" :model="relation" :rules="rules" label-width="80px" label-position="right"
          id="relationform">
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
          <el-form-item>
            <el-button type="warning" size="small" plain @click="relation ={gender: 'M'}">取消</el-button>
            <el-button type="success" size="small" plain @click="submitRelation">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="14">
        <el-table :data="relations" border>
          <el-table-column prop="sequelence" width="60" label="序号">
          </el-table-column>
          <el-table-column prop="name" label="姓名">
          </el-table-column>
          <el-table-column label="性别" width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.gender==='M'">男</span>
                <span v-if="scope.row.gender==='F'">女</span>
                <span v-if="scope.row.gender==='MF'">未知</span>
              </template>
          </el-table-column>
          <el-table-column prop="relation" label="关系" width="100">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" plain type="primary" @click="editRelation(scope.row)">编辑</el-button>
              <el-button size="mini" plain type="danger" @click="delRelation(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
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
        },
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
          }]
        }
      };
    },
    methods: {
      submitRelation() {
        let that = this;
        this.$refs.relationform.validate(valid => {
          if(!valid) return;
          let method = that.relation.id ? 'PUT': 'POST';
          let baseUrl = '/tl/api/relations/';

          let url = that.relation.id ? `${baseUrl}${that.relation.id}`: baseUrl;
          fetch(url, {
            method,
            body: JSON.stringify(that.relation),
            headers: {
              'content-type': 'application/json'
            },
          }).then(() => {
            this.relation = {gender: 'M'};
            this.getRelations();
          });
        })
      },
      editRelation(relation) {
        this.relation = relation;
      },
      delRelation(relation) {
          fetch(`/tl/api/relations/${relation.id}`, {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json'
            },
          }).then(() => {
            this.getRelations();
          });
      },
      getRelations() {
        fetch('/tl/api/relations/')
        .then(res => res.json())
        .then(relations => {
          this.relations = relations ||[];
          this.$store.commit('setRelations', relations)
        });
      }
    },
    created() {
      this.getRelations();
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

  #RelationBtn {
    float: right;
  }
</style>