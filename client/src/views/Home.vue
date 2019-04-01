<template>
  <div id="home">
    <div id="imagelist">
      <el-row :gutter="10" v-for="(imageList, listIndex) of imageLists" :key="imageList.id">
      <el-col :span="2">
        <div class="date-str">
          <div class="date-day">{{imageList.day}}</div>
          <div class="date-month">{{imageList.year}}年{{imageList.month}}月</div>
        </div>
      </el-col>
      <el-col :span="22">
        <el-row>
          <el-col :span="4" v-for="(image, index) in imageList.Image" :key="image.id" class="image-outer">
            <div class="image-inner" @click="viewImage(image, index, listIndex)">
              <img :src="image.link" :alt="image.name" class="image-item">
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    </div>
    <template v-if="showImage">
    </template>
    <el-dialog :title="currentImage.name" :visible.sync="showImageView" :fullscreen="true" modal close-on-click-modal
      custom-class="dialog">
      <el-carousel :autoplay="false" ref="carousel" arrow="always" indicator-position="none"
        :initial-index="initialIndex" @change="changeView">
        <el-carousel-item v-for="image in images" :key="image.id" :label="image.name">
          <img :src="image.link">
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        showImage: false,
        showImageView: false,
        currentImage: {
          name: ''
        },
        images: [],
        imageLists: [],
        initialIndex: 0,
        timeout: null,
        startTime: null,
        page: 1,
        limit:5,
      }
    },
    methods: {
      loadImages() {
        fetch(`/tl/api/images?page=${this.page++}&limit=${this.limit}`)
          .then(res => res.json())
          .then((imageLists = []) => {
            for (let imageList of imageLists) {
              this.imageLists.push(imageList);
              for(let image of imageList.Image) {                 
                image.link = this.GLOBAL.imageBase + image.link;
                this.images.push(image)
              }
            }
          });
      },
      viewImage(image, index, listIndex) {
        let _initialIndex = 0;
        for(let i = 0; i < listIndex; i++) {
          _initialIndex += this.imageLists[i].Image.length;
        }
        _initialIndex += index;
        this.initialIndex = _initialIndex;
        this.showImage = true;
        if (this.$refs.carousel) {
          this.$refs.carousel.setActiveItem(this.initialIndex);
        }
        this.currentImage = image;
        this.showImageView = true;
      },

      changeView(index) {
        this.currentImage = this.images[index]
      },
      lowEnough() {
        let mainWindow = document.getElementById('main');
        let pageHeight = Math.max(mainWindow.scrollHeight, document.body.offsetHeight);
        let viewportHeight = window.innerHeight ||
          document.documentElement.clientHeight ||
          mainWindow.clientHeight || 0;
        let scrollHeight = window.pageYOffset ||
          document.documentElement.scrollTop ||
          mainWindow.scrollTop || 0;
        // 通过 真实内容高度 - 视窗高度 - 上面隐藏的高度 < 20，作为加载的触发条件
        return pageHeight - viewportHeight - scrollHeight < 40;
      },

      watchScroll(wait, mustTime) {
        let that = this;
        if (!this.startTime) {
          this.startTime = Date.now();
        }
        let currentTime = Date.now();

        return function () {
          if ((currentTime - this.startTime) >= mustTime) {
            this.startTime = currentTime;
            clearTimeout(this.timeout)
            if (that.lowEnough()) {
              that.loadImages();
            }
          } else {
            clearTimeout(this.timeout)
            this.timeout = setTimeout(function () {
              this.startTime = Date.now();
              if (that.lowEnough()) {
                that.loadImages();
              }
            }, wait)
          }
        }
      }
    },
    async created() {
      await this.loadImages();
      window.addEventListener('scroll', this.watchScroll(1000, 3000), true)
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

  .el-header {
    position: fixed;
    width:100%;
    border-bottom: solid 1px #ccc;
    opacity: 1;
    background: #fff;
  }

  #imagelist {
    padding-top:60px;
  }

  .date-day {
    font-size: 2rem;
    text-align: right;
    color: #FF9900;
  }

  .date-month {
    text-align: right;
    font-size: .8rem;
    color: #FF9900;
  }

  .image-outer {
    margin-top: 10px;
    margin-bottom: 4px;
  }

  .image-inner {
    text-align: center;
    cursor: pointer;
    /* padding: 5px 0px; */
  }

  .image-inner:hover {
    background-color: #ccc;
  }

  .image-item {
    width: 120px;
    height: 130px;
    border-radius: 2px;
  }

  .dialog {
    background: rgba(0, 0, 0, 0.5);
  }

  .el-dialog__header {
    padding-bottom: 10px;
    text-align: center;
  }

  .el-dialog__title {
    color: #FF9900;
  }

  .el-dialog__headerbtn {
    font-size: 36px;
  }

  .el-dialog__body {
    padding: 0 !important;
    margin: 0 !important;
    height: 90%;
  }

  .el-carousel {
    height: 100%;
  }

  .el-carousel__container {
    height: 100%;
  }

  .el-carousel__item {
    text-align: center;
  }

  .dialog img {
    height: 100%;
    margin: 0;
  }

  .el-carousel__arrow {
    width: 80px;
    height: 80px;
  }

  .el-icon-arrow-right,
  .el-icon-arrow-left {
    font-size: 60px;
  }
</style>