<template>
  <div id="app">
    <el-container>
      <el-container>
        <el-aside width="160px">
          <el-menu default-active="2-2"
            :collapse="isCollapse" active-text-color="#FF9900" :router=true>
            <el-menu-item index="1" :route="{'name': 'home'}">
              <i class="el-icon-tl-home"></i>
              <span slot="title">主页</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title" >
                <i class="el-icon-tl-family"></i>
                <span slot="title">人员</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="relation in $store.state.relations" 
                  :key="relation.id"
                  :class="[
                  [(relation.relation === '女儿' || relation.relation === '妻子'|| relation.gender === 'F') ?'el-icon-tl-girl': ''],
                  [(relation.relation === '儿子' || relation.gender === 'M') ?'el-icon-tl-boy': ''],
                  [(relation.relation === '父母' ||relation.relation === '朋友' || relation.gender === 'MF') ?'el-icon-tl-family': '']
                  ]" 
                  :index="2 + '-' + relation.id" 
                  :route="{'name': 'personal', 'params': {'name': relation.name}}"
                  :style="{color: relation.color}"
                >
                  {{relation.name}}
                </el-menu-item>
                <el-menu-item index="noface" :route="{'name': 'personal', 'params': {'name': '无法识别'}}">
                  无法识别
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="3" :route="{'name': 'timeline'}">
              <i class="el-icon-date"></i>
              <span slot="title">场景</span>
            </el-menu-item>
            <el-menu-item index="4" :route="{'name': 'settings'}">
              <i class="el-icon-setting"></i>
              <span slot="title">设置</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main id="main">
            <router-view />
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      relations: [],
        isActive: true,
  error: null
    }
  },
  methods: {
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
  },
  computed: {
  }
}
</script>


<style>
  body {
    margin:0px;
  }

  #app {
    width: 100%;
    height: 100vh;
  }

  .el-container {
    height:100%;
  }

  .el-aside {
    border-right: solid 1px #e6e6e6;
    overflow-x: hidden !important;
  }

  .el-menu {
    border-right: none !important;
  }

  .el-menu {
    border-right:none;
  }
</style>
