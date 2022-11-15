<template>
  <div class="header-container">
    <div class="l-content">
      <el-button @click="handMenu" icon="el-icon-menu" size="mini" style="margin-right:20px"></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in tags" :key="item.name" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="exit">
        <img class="user" src="../assets/images/user.png" alt="" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="cancel" >退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Cookie from 'js-cookie'
export default {
  name: "Header",
  data() {
    return {};
  },
  methods: {
    handMenu() {
      this.$store.commit("CollapseMenu");
    },
    exit(command){
      if(command==='cancel'){
        Cookie.remove('token')
        Cookie.remove('meau')
        this.$router.push('/login')
      }
    }
  },
  computed:{
    ...mapState({
      tags:state =>state.tab.tabsList
    })
  }
};
</script>

<style lang="less" scoped>
.header-container {
  padding: 0 20px;
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
  }
  .r-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
    }
  }
  .l-content{
    display: flex;
    align-items: center;
    /deep/.el-breadcrumb__item{
      .el-breadcrumb__inner{
        &.is-link{
        color: #666;
      }
      }
      &:last-child{
        .el-breadcrumb__inner{
          color: #fff;
        }
      }
    
    }
  }
}
</style>