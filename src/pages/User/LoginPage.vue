<template>
  <div class="head" align="center">
    <h1>Log In</h1>
    <label class="warning" v-show="isLoggedIn" align="center">
    이메일 또는 비밀번호를 확인하세요!
    </label>
  </div>
  <form v-on:submit.prevent="toLogIn">
  <div align="center" class="email">
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="이메일을 입력하세요" v-model="email">
  </div>
  <div align="center" class="password">
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="비밀번호를 입력하세요" autocomplete="off" v-model="pwd">
  </div>
    <label class="find" @click="toFind">아이디/비밀번호찾기</label>
  <div align="center" class="login">
    <button class="btn btn-success">로그인</button>
  </div>
</form>
</template>

<script>
import {useRouter} from 'vue-router';
import {ref} from 'vue';
import axios from '@/axios';
export default {

  setup() {
    const router = useRouter();
    let isLoggedIn = ref(false);
    const email = ref('');
    const pwd = ref('');
    let response = '';
    const toLogIn = async () => {
      try {
        response = await axios.get(`mbr?MBR_EML=${email.value}`);
        if(response.data[0].MBR_PWD === `${pwd.value}`) {
          isLoggedIn.value = false;
        } else {
          isLoggedIn.value = true;
        }
      } catch(e) {
        isLoggedIn.value = true;
      }

      if(isLoggedIn.value) {
        console.log("happy")
      } else {
        router.push({
          name: "UserMain"
        })
      }
    }
    const toFind = () => {
      router.push({
        name: "Find"
      })
    }
    return {
      toLogIn,
      toFind,
      email,
      pwd,
      response,
      isLoggedIn
    }
  }
}
</script>

<style scoped>
 .head {
      margin-top: 10%;
      margin-bottom: 5%;
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
    .warning {
      margin-top: 2%;
      color: red;
    }
</style>