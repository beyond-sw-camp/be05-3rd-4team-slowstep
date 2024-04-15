<template>
  <div class="head" align="center">
    <h1>Log In</h1>
  </div>
  <div align="center" class="email">
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="이메일을 입력하세요">
  </div>
  <div align="center" class="password">
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="비밀번호를 입력하세요" autocomplete="off">
  </div>
    <label class="find">아이디/비밀번호찾기</label>
  <div align="center" class="login">
    <button type="button" class="btn btn-success">로그인</button>
  </div>
</template>

<script>
export default {

}
</script>

<style>
 .head {
      margin-top: 10%;
    }
    .email {
      margin-top: 5%;
    }
    .password {
      margin-top: 2%;
    }
    .login {
      margin-top:5%;
    }
    .find {
      float: right;
      margin-right: 35%;
      font-size: small;
    }
    .form-control {
      width: 30%;
    }
</style>