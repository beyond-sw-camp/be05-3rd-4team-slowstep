<template>
  <div class="title">
    <h2>비밀번호 변경</h2>
  </div>
  <div align="center">
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="현재 비밀번호를 입력하세요" autocomplete="off">
  </div>
  <div align="center">
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="새로운 비밀번호를 입력하세요" autocomplete="off">
  </div>
  <div align="center">
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="새로운 비밀번호 확인" autocomplete="off">
  </div>
  <div align="center">
    <button class="btn btn-success button" @click="toMoveBack">뒤로가기</button>
    <button class="btn btn-success button" @click="toSave">저장하기</button>
  </div>
</template>

<script>
//import {useRouter} from 'vue-router';
export default {
  setup() {
    //const router = useRouter();
    const toMoveBack = () => {
      console.log("back!!!!")
    }
    const toSave = () => {
      console.log("saved!!!!")
    }
    return {
      toMoveBack,
      toSave
    }
  }
}
</script>

<style scoped>
.title {
  margin-top: 5%;
  margin-bottom: 6%;
  margin-left: 10%;
}
.form-control {
  margin: 3%;
  width: 30%;
}
.button {
  margin: 3%;
}
</style>