<template>
  <div class="container">
    <div class="row mb-2 mt-5">
      <div class="col-9" >
        <label class="nameDiv font">건강정보 내역</label>
      </div>
      <div class="col-3 flex" >
        <button class="btn btn-success font" v-on:click="toHealthView">뒤로가기</button>
      </div>
    </div>

    <div class=" listDiv">
      <div class="card" v-for="(health ,index) in healthList" :key="health.ptHthInfoNo">
        <div class="card-body font"
            @click="toHealthView(health.ptHthInfoNo, index)">

          {{ health.inspDt }}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {ref} from "vue"
import {useRouter} from 'vue-router';
import axios from "axios";

export default {
  setup(){

    let healthList = ref([]);

    const getHealthList = () => {
      let url = "http://localhost:7777/all/pt_hth_info/1";
      // 메인 페이지 구현시 수정

      axios(url)
        .then( res => {
          healthList.value = res.data;
        })
        .catch( err => {
          console.log(err);
        })
      
    }

    getHealthList();

    const router = useRouter();
    const toHealthView = (ptHthInfoNo, index) => {
      router.push({
        name : "HealthView",
        params :{
          id : ptHthInfoNo
        },
        state : {
          data : JSON.stringify(healthList.value[index])
        }
      })
    }

    const toMain = () => {
      router.push({
        name : "UserMain"
      })
    }

    return {
      healthList,
      getHealthList,
      toHealthView,
      toMain,
    }
  }
}
</script>


<style>

@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap');

  .listDiv{
    border: 1px solid green;
    border-radius: 1.1em;
    padding : 2%;  

    max-height : 60vh;
    overflow-y: auto; 
  }
  
  .flex{
    display: flex;
    flex-direction: row-reverse;
    flex-wrap : wrap;
    gap : 5px;
  }

  .nameDiv{
    font-size: larger;
    text-decoration-line: underline;
  }

  .font{
    font-family: "Nanum Gothic";
    text-shadow : 0px 1px;
  }

  .card-body{
    position: relative;
    cursor: pointer;
  }
  .badge{
    position:absolute;
    top:-5px;
    left:-5px;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background-color: coral;
  }

</style>