import { Component, Vue } from 'vue-property-decorator';
import { req1 } from "../../network/request";

import './login.less'

@Component
export default class LoginBox1 extends Vue{
  // data
  private uname: string = "";
  private pwd: string = "";
  private pwd1: string = "";
  private isShow: boolean = true;
  private isEmpty: boolean = true;
  private loading: boolean = false;

  // methods
  private updated() {
    this.uname != "" && this.pwd != ""
      ? (this.isEmpty = false)
      : (this.isEmpty = true);
  }
  // 登录
  private async login() {
    localStorage.setItem("uname", this.uname);
    let res = await req1({
      url: "/admin/login",
      method: "get",
      params: {
        username: this.uname,
        password: this.pwd
      }
    });
    if (res.toString() == "success") {
      this.$message({
        message: "登录成功",
        type: "success"
      });
      setTimeout(() => {
        this.$router.push({
          path: "/show"
        });
      }, 500);
    } else {
      this.$alert("用户名或密码错误", "登陆失败", {
        confirmButtonText: "确定",
        callback: (action: any) => {
          this.$message({
            type: "info",
            message: `登录失败`
          });
        }
      });
    }
  }

  // 注册
  private async register() {
    // console.log(res);
    if (this.pwd1 == this.pwd) {
      let res = await req1({
        url: "/admin/register",
        method: "get",
        params: {
          username: this.uname,
          password: this.pwd
        }
      });

      if (res.toString() == "success") {
        this.$message({
          message: "注册成功",
          type: "success"
        });
        localStorage.setItem("uname", this.uname);
        setTimeout(() => {
          this.$router.push({
            path: "/show"
          });
        }, 500);
      } else {
        this.$message.error("用户名重复");
      }
    } else {
      this.$message.error("请输入相同密码");
    }
  }

  private goRegist(): void {
    this.isShow = false;
  }
  private goLogin() {
    this.isShow = true;
  }

  protected render() {
    return (
      <div id="login_box">
        <div class="login_div">
          <div class="login" v-show={ this.isShow } v-loading={ this.loading }>
            <h2 id="title">管理员登录</h2>
            <el-input placeholder="请输入用户名" v-model={ this.uname } clearable></el-input>
            <br />
            <br />
            <el-input placeholder="请输入密码" v-model={ this.pwd } show-password></el-input>
            <br />
            <br />
            <div class="login_btn_div">
              <el-button id="login_btn" plain disabled={ this.isEmpty } onclick={ this.login }>登录</el-button>
            </div>
            <el-link type="primary" onclick={ this.goRegist }>还没有账户？点击注册</el-link>
          </div>
          <div class="regist" v-show={ !this.isShow }>
            <h2 id="title">管理员注册</h2>
            <el-input placeholder="请输入用户名" v-model={ this.uname } clearable></el-input>
            <br />
            <br />
            <el-input placeholder="请输入密码" v-model={ this.pwd } show-password></el-input>
            <br />
            <br />
            <el-input placeholder="请确认密码" v-model={ this.pwd1 } show-password></el-input>
            <br />
            <br />
            <div class="login_btn_div">
              <el-button id="login_btn" plain disabled={ this.isEmpty } onclick={ this.register }>注册</el-button>
              <el-link type="primary" onclick={ this.goLogin }>已有账户？去登陆</el-link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}