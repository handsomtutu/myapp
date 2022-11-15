<template>
  <div class="tabs">
    <el-tag
    size="small"
      v-for="(item,index) in tags"
      :key="item.name"
      :effect="$route.name===item.name ?'dark' : 'plain'"
      :closable="item.name!=='home'"
      @click="changeMenu(item)"
      @close="handleColse(item,index)"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import {  mapState } from 'vuex';
export default {
  name: 'Tag',
  data() {
    return {};
  },
  methods: {
    //点击item跳转的功能
    changeMenu(item){
        console.log(item)
        this.$router.push(item.path)
    },
    //点击tag删除的功能
    handleColse(item,index){
        this.$store.commit('closeTag',item)
        const length=this.tags.length
        //删除之后的跳转逻辑
        if(item.name!==this.$route.name){
            return
        }
        if(index===length){
            this.$router.push(this.tags[index-1].path)
        }else{
            this.$router.push(this.tags[index].path)
        }
    }
  },
  computed:{
    ...mapState({
        tags:state => state.tab.tabsList
    })
  }
};
</script>

<style lang="less" scoped>
.tabs{
    padding: 20px;
    .el-tag{
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>