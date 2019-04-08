<template>
  <div id="directory">
    <el-row>
      <el-col :span="12">
        <el-row>
          <span>目录列表</span>
          <div class="m-r">
            <el-button size="mini" type="primary" plain @click="addNodes">人员</el-button>
            <el-button size="mini" type="warning" plain @click="addNodes">场景</el-button>
            <el-button size="mini" type="success" plain @click="addNodes">新增目录</el-button>
          </div>
        </el-row>
        <el-tree
          ref="folderlist"
          :props="folderlist"
          :load="loadNode"
          lazy
          show-checkbox>
        </el-tree>
      </el-col>
      <el-col :span="12">
          <el-table :data="directories" border>
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column prop="dir" label="图片目录">
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <el-button size="mini" plain type="danger" @click="delDir(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        directories: [],
        disks: ['C'],
        folderlist: {
          label: 'name',
          isLeaf: 'isLeaf',
          children: 'children',
        },
      }
    },
    methods: {
      listDirs() {
        fetch('/tl/api/disks/dirs')
        .then(res=> res.json())
        .then(directories => {
          this.directories = directories ||[]
        });
      },
      listDisks() {
        return fetch('/tl/api/disks/')
        .then(res => res.json())
        .then(disks => {
          this.disks = disks ||[]
          return this.disks;
        }).catch(() => {
          this.disks.length = 0;
        });
      },
      async loadNode(node, resolve) {
        let nodes = [];
        let disks = await this.listDisks()

        if(node.level === 0) {
          disks.forEach(disk => {
            nodes.push({
              id: disk,
              name: disk,
              idLeaf: false,
              children: [],
            });
          });
         return resolve(nodes)
        }
        
        fetch(`/tl/api/disks/path?folderPath=${node.data.id}`)
        .then(res => res.json())
        .then(folders => {
          resolve(folders)
        })
        .catch(() => {
          resolve([]);
        })
      },
      addNodes() {
        let checkedNodes = this.$refs.folderlist.getCheckedNodes();
        let nodes = [];
        checkedNodes.forEach(check => {
          nodes.push({id: check.id, isLeaf: !!check.isLeaf, name: check.name})
        });
        fetch('/tl/api/disks', {
          method: 'POST',
          body: JSON.stringify(nodes),
          headers: {
            'content-type': 'application/json'
          },
        });

        this.listDirs();
      }
    },
    async created() {
      this.listDirs();
    }
  }
</script>

<style>
  .disk-item {
    border: solid 1px #dcdfe6;
    width: 180px;
    margin-bottom: 5px;
    color: #409EFF;
    font-size: 14px;
    padding:2px 4px;
  }

  .disk-start {
    margin: 0 0 4px;
  }

  .m-r {
    float:right;
    margin-right: 10px;
  }
</style>
