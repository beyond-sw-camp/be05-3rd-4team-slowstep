<template>
  <div class="container">
    <div class="row mb-2 mt-5">
      <div class="col-9" >
        <label class="nameDiv font">건강정보 내역</label>
      </div>
      <div class="col-3 flex" >
        <button class="btn btn-success font">뒤로가기</button>
      </div>
    </div>

    <div class=" listDiv">
      <div class="card" v-for="msg in msgList" :key="msg.PM_NO">
        <div class="card-body font">
          {{ msg.PM_CN }}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {ref} from "vue"
import axios from "axios";


export default {
  setup(){

    let healthList = ref([{
        "PM_RM_NO": "1",
        "RD_YN": "1",
        "PM_CN": "김옥례 환자 관련 연락드립니다.",
        "PM_NO": "1",
        "TRSM_DIR": "0",
        "PM_DSPTCH_DT": "2024-03-26 00:00:00",
        "RD_DT": "2024-03-26 17:24:38"
      },
      {
        "PM_RM_NO": "1",
        "RD_YN": "1",
        "PM_CN": "네.",
        "PM_NO": "2",
        "TRSM_DIR": "1",
        "PM_DSPTCH_DT": "2024-03-26 00:00:00",
        "RD_DT": "2024-03-26 17:27:19"
      }]);
    // 로그인 구현시 수정

    const getHealthList = () => {
      let url = "http://localhost:7777/pmrm/view/2";
      // 로그인 구현시 수정
      let data = {
          "pmRmNo": 1,
          "mdNo": 1,
          "rnNo": 1
      }

      axios(url, data)
        .then( res => {
          healthList.value = res.data;
        })
        .catch( err => {
          console.log(err);
        })
      
    }

    // getHealthList();

    return {
      healthList,
      getHealthList
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
  }

  .font{
    font-family: "Nanum Gothic";
    text-shadow : 0px 1px;
  }

  .card-body{
    position: relative;
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