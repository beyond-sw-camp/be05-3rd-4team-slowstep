<template>
  <div class="title">
    <h2>비밀번호 변경</h2>
  </div>
  <div align="center">
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="현재 비밀번호를 입력하세요" autocomplete="off" v-model="now">
  </div>
  <div align="center">
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="새로운 비밀번호를 입력하세요" autocomplete="off" v-model="change">
  </div>
  <div align="center">
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="새로운 비밀번호 확인" autocomplete="off" v-model="changecon">
  </div>
  <div align="center">
    <button class="btn btn-success button" @click="toMoveBack">뒤로가기</button>
    <button class="btn btn-success button" @click="toSave">저장하기</button>
  </div>
</template>

<script>
import {useRouter} from 'vue-router';
import {ref} from 'vue';
import axios from '@/axios';
export default {
  setup() {
    let now = ref('');
    let change = ref('');
    let changecon = ref('');
    let response = '';
    const router = useRouter();
    const toMoveBack = () => {
      console.log("현재 진행상황이 저장되지 않습니다. 뒤로 가시겠습니까?");
      router.push({
        name: "UserMain"
      })
    }
    const toSave = async () => {
      response = await axios.get(`mbr?MBR_PWD=${''}`);
      if(now.value === response.data.MBR_PWD) {
        if(change.value !== now.value) {
          if(change.value === changecon.value) {
            console.log("okay")
          } else {
            console.log("새로운 비밀번호와 비밀번호 확인이 다릅니다");
          }
        } else {
          console.log("새로운 비밀번호는 현재 비밀번호와 같을 수 없습니다");
        }
      } else {
        console.log("비밀번호가 다릅니다");
      }
    }
    return {
      toMoveBack,
      toSave,
      now,
      change,
      changecon,
      response,
      router
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