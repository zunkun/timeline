<template>
  <div id="imagetags">
    <el-row :gutter="20">
       <el-col :span="12" >
         <el-form ref="tagBox" :model="tagBox" label-width="80px" label-position="right"
          id="relationform">
          <el-form-item label="分类" prop="tagclass">
            <el-select v-model="tagBox.tagclass" placeholder="选择分类">
              <el-option label="人物" value="human"></el-option>
              <el-option label="场景" value="sceneries"></el-option>
              <el-option label="情绪" value="emotions"></el-option>
              <el-option label="动物" value="animals"></el-option>
              <el-option label="植物" value="plants"></el-option>
              <el-option label="城市" value="cities"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="颜色" prop="color">
            <el-input placeholder="输入颜色" v-model="tagBox.color" class="color-i">
              <template slot="append">
                <el-color-picker v-model="tagBox.color" class="color-p"></el-color-picker>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="小类" prop="tags">
             <el-input type="textarea" v-model="tagBox.tags" :rows="3" placeholder="请输入分类,以逗号分隔"></el-input>
          </el-form-item>            
          <el-form-item>
            <el-button type="warning" size="small" plain @click="relation ={gender: 'M'}">取消</el-button>
            <el-button type="success" size="small" plain>保存</el-button>
          </el-form-item>
        </el-form>
       </el-col>
       <el-col></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'imagetags',
  data() {
    return {
      tagBox: {
        color: '#aeddcd',
      }
    }
  }
}
</script>

