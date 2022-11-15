<template>
  <div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
    <h3>{{isCollapse ? '后台' : '通用后台管理系统'}}</h3>
      <el-menu-item
        v-for="item in noChildren"
        :key="item.name"
        :index="item.name"
        @click="clickMeau(item)"
      >
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>

      <el-submenu
        v-for="item in hasChildren"
        :key="item.label"
        :index="item.label"
      >
        <template slot="title">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group
          v-for="subItem in item.children"
          :key="subItem.name"
          
        >
          <el-menu-item :index="item.name" @click="clickMeau(subItem)">{{ subItem.label }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
 import {mapState} from 'vuex'
import Cookie from "js-cookie"
export default {
  name: "Aside",
  data() {
    return {
      
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMeau(res){
      //当页面的路由与跳转到的路由不一致时才允许跳转
      if(this.$route.path!==res.path &&!(this.$route.path==='/home'&&(res.path==='/'))){
        this.$router.push(res.path)
      }
      this.$store.commit('selectMenu',res)
    }
  },
  computed: {
    noChildren() {
      return this.menuData.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menuData.filter((item) => item.children);
    },
    isCollapse(){
      return this.$store.state.tab.isCollapse
    },
    ...mapState({
      // menuData:JSON.parse(Cookies.get('Menu'))||(state => state.tab.Menu)
      menuData:(state) =>{
        return  JSON.parse(Cookie.get('meau')) || state.tab.Menu
      }
    })
    // menuData(){
    //   return  JSON.parse(Cookie.get('meau')) || this.$store.state.tab.Menu
    // }
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu{
  height: 100vh;
  border-right: none;
  h3{
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400px;
  }
}
</style>>

