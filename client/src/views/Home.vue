<template>
  <div id="home">
    <div class="header">
      <div id="img-h" v-if="checkedImages.length">
        <span style="margin-right:10px;">分配人员</span>
        <el-button type="success" size="small" plain v-for="relation in $store.state.relations" 
                  :key="relation.id" @click="assign(relation)">{{relation.name}}</el-button>
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
          return;
        }

        fetch('/tl/api/tags/', {
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

</style>