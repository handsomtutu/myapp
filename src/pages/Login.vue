<template>
  <div class="login-container">
    <el-form ref="form" :model="form" label-width="70px" :rules="rules" inline>
      <h3 class="login-title">系统登录</h3>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form>
        <el-button type="primary" @click="submit">登录</el-button>
      </el-form>
    </el-form>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import { getMenu } from "../api";

export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, trigger: "blur", message: "请输入用户名" },
        ],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
      },
    };
  },
  methods: {
    submit() {
          // token信息
    //    const token= Mock.Random.guid()
      // //  token信息存入cookie用于不同页面的通信
      // Cookie.set('token',token)
      this.$refs.form.validate((valid) => {
        if (valid) {
          getMenu(this.form).then(({ data }) => {
            console.log(data)

            if (data.code === 20000) {
              Cookie.set("token", data.data.token);
              //跳转至首页

                this.$store.commit('setMenu',data.data.menu)
                this.$store.commit('addMenu',this.$router)
              this.$router.push("/home");
            }else{
                this.$message.error('用户名或密码错误！');
            }
          });
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.login-container {
  width: 350px;
  margin: 180px auto;
  border: 1px solid #eaeaea;
  padding: 35px 35px 15px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6ca;
  box-sizing: border-box;
  .el-input {
    width: 198px;
  }
  .login-title {
    text-align: center;
    margin-bottom: 40px;
    color: #505458;
  }
  .el-button {
    margin-left: 105px;
  }
}
</style>