<template>
  <div class="personal">
    <ImageListView ref="imagelist" :tags.sync="tags" />
  </div>
</template>

<script>
  import ImageListView from '../components/ImageListView'

  export default {
    name: 'home',
    components: {ImageListView},
    data() {
      return {
        tags: '',
      }
    },
    methods: {
      getTags() {
        this.tags = this.$route.params.name;
      }
    },
    created() {
      this.getTags();
    },
    watch: {
      '$route'(to, from) {
        if(to.params.name !== from.params.name) {
          this.getTags();
        }
      }
    }
  }
</script>
