<template>
  <div class="container">
    <div class="row mb-2 mt-5">
      <div class="col-9" >
        <label class="nameDiv">건강정보 내역</label>
      </div>
      <div class="col-3 flex" >
        <button class="btn btn-success font" v-on:click="toMain">뒤로가기</button>
      </div>
    </div>

    <div class=" listDiv">
      <div class="card" v-for="(health ,index) in healthList" :key="health.ptHthInfoNo">
        <div class="card-body"
            @click="toHealthView(health.PT_HTH_INFO_NO, index)">

          {{ health.INSP_DT === "" ? happy :  health.INSP_DT}}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {ref} from "vue"
import {useRouter} from 'vue-router';
import axios from "@/axios";

export default {
  setup(){

    let healthList = ref([]);

    const getHealthList = () => {

      const patient = localStorage.getItem("TargetPtNo");
      console.log( "TargetPtNo : ",patient);

      let url = `pt_hth_info?PT_NO=${patient}`;

      axios(url)
        .then( res => {
          console.log(res.data);
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
        name : "PatientMain"
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


<style scoped>

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

  .card-body{

    border: 1px solid green;
    border-radius: 1.1em;
    padding : 2%;  

    max-height : 60vh;
    margin-bottom: 0.5rem;

    position: relative;
    cursor: pointer;
  }

  .card{
    border : none
  }

  .card-body:hover{
    transform: translateY(-5px); /* Y축 이동 효과 */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* 강조된 그림자 효과 */
    background-color: #f7f7f7;
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