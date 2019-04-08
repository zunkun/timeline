<template>
  <div id="home">
    <div class="header">
      <div id="img-h">
        <span style="margin-right:10px;">分配人员</span>
        <el-button :style="{color: relation.color, 'border-color': relation.color}" size="small" plain v-for="relation in $store.state.relations" :key="relation.id" @click="assign(relation)">{{relation.name}}</el-button>
        <el-button size="small" plain type="warning" v-if="checkedImages.length === 1" @click="openExplore">本地浏览</el-button>
      </div>
    </div>
    <ImageListView @getcheckedimages="checkImages" />
  </div>
</template>

<script>
  import ImageListView from '../components/ImageListView'

  export default {
    name: 'home',
    components: {ImageListView},
    data() {
      return {
        checkedImages: [],
      }
    },
    methods: {
      checkImages(checkedImages) {
        this.checkedImages = checkedImages;
      },
      assign(relation) {
        if(!this.checkedImages.length) {
          return this.notify('danger', '分配照片', `请给${relation.name}选择需要分配的照片`)
        }

        fetch('/timeline/api/tags/', {
          method: 'POST',
          body: JSON.stringify({
            images: this.checkedImages,
            tag: relation.name,
          }),
          headers: {
            'content-type': 'application/json'
          },
        }).then((res) => {
          if(res.ok) {
            this.notify('success', '分配照片', `照片分配到${relation.name}成功`);
          } else {
            this.notify('error', '分配照片', `照片分配到${relation.name}失败`);
          }
          return res;
        }).catch(() => {
          this.notify('error', '分配照片', `照片分配到${relation.name}失败`);            
        });
      },

      openExplore() {
        if(this.checkedImages.length !== 1) {
          return this.notify('danger', '分配照片', `必须选择一张照片`)
        }

        fetch('/timeline/api/images/explore', {
          method: 'POST',
          body: JSON.stringify({
            fullpath: this.checkedImages[0].fullpath,
          }),
          headers: {
            'content-type': 'application/json'
          },
        })
      },
      notify(type, title, text) {
        const h = this.$createElement;

        this.$notify({
          title,
          message: h('i', {
            style: type === 'success' ? 'color: teal' : 'color: red'
          }, text)
        });
      },
    },
    async created() {
    },
  }
</script>

<style>
  #home {
    height: inherit;
  }

  #main {
    padding: 0;
  }
  
  .header {
    top: 0;
    width: 100%;
    height:60px;
    overflow: hidden;
    position: fixed;
    background: #fff;
    border-bottom: solid 1px #e6e6e6;
  }

  #img-h {
    margin: 14px;
    vertical-align: middle;
  }

</style>