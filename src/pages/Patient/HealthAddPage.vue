<template>
  <div class="container">
    <div class="row mb-2 mt-3">
      <div class="col-5">
          <h2>건강 정보 입력</h2>
      </div>
      <div class="col-7">
        <h2>oo 환자</h2>
        <!-- vuex로 전역변수 구현시 수정 -->
      </div>  
    </div>

    <div class="flex_item_right">
        <button class="btn btn-success mb-4" v-on:click="toPatientMain">뒤로가기</button>
      </div>

    <div class="row row-border pt-3">
      <form v-on:submit.prevent="getLength()">
        <table class="table table-borderless ">
          <tbody>
            <tr>
              <td style="text-align:center;">혈압</td>
              <td> <input v-model="ptBp" type="text" class="form-control"></td>
            </tr>
            <tr>
              <td style="text-align:center;">공복혈당</td>
              <td> <input v-model="ptBst" type="text" class="form-control"></td>
            </tr>
            <tr>
              <td style="text-align:center;">체중</td>
              <td> <input v-model="ptWt" type="text" class="form-control"></td>
            </tr>
            <tr>
              <td style="text-align:center;">심박수</td>
              <td><input v-model="ptHr" type="text" class="form-control"></td>
            </tr>
          </tbody>
        </table>
        <div class="flex_item_center">
          <button class="btn btn-success btn-lg mb-3">등록</button>
        </div>
        
      </form>

      <div v-if="isNull" class="alert alert-danger mt-4">
        공백은 입력될 수 없습니다.
      </div>
      
    </div>

    <div v-if="result" class="alert alert-success mt-4">
      건강정보가 등록되었습니다.
    </div>

  </div>
</template>

<script>
import {useRouter} from 'vue-router';
import {ref} from "vue"
import axios from '@/axios';
// import axios from "axios";

export default {
  setup(){
    // const route = useRoute();
    // console.log(route.params.id);

    // const healthInfo = JSON.parse(history.state.data);
    // console.log(healthInfo);

    const ptBp = ref("");
    const ptBst = ref("");
    const ptWt = ref("");
    const ptHr = ref("");

    const isNull = ref(false);
    const result = ref(false);

    const getLength = () => {
      let url = "/pt_hth_info";

      axios(url)
        .then( res => {
          console.log(res.data.length);

          healthAdd(res.data.length);
        } ) 
        .catch( err => {
          console.log(err.message);
        })
    }

    const healthAdd = (index) => {

      let url = "/pt_hth_info";

      var today = new Date();

      var year = today.getFullYear();
      var month = ('0' + (today.getMonth() + 1)).slice(-2);
      var day = ('0' + today.getDate()).slice(-2);
      var dateString = year + '-' + month  + '-' + day;

      var hours = ('0' + today.getHours()).slice(-2); 
      var minutes = ('0' + today.getMinutes()).slice(-2);
      var seconds = ('0' + today.getSeconds()).slice(-2); 

      var timeString = hours + ':' + minutes  + ':' + seconds;

      let data = {
        "id" : index+1,
        "ptHthInfoNo": index+1,
        "ptNo": 1,
        // vuex 사용시 수정
        "ptBp": ptBp.value,
        "ptBst": ptBst.value,
        "ptWt": ptWt.value,
        "ptHr": ptHr.value,
        "inspDt": dateString + " " + timeString
      }
      // null값 검증 필요

      if(ptBp.value === "" || ptBst.value === "" || 
          ptWt.value === "" || ptHr.value === ""){
        isNull.value = true;
      }else{
        axios(url, {
          method : "POST",
          data : data
        })
        .then(res => {
          console.log(res);
          result.value = true;
        })
        .catch(err => {
          console.log(err);
        })
      }

    }

    const router = useRouter();
    const toPatientMain = () => {
      router.push({
        name : "PatientMain"
      })
    }

    return{
      toPatientMain,
      getLength,
      ptBp,
      ptBst,
      ptWt,
      ptHr,
      result,
      isNull
    }
  }
}
</script>

<style scoped>

  .row{
    font-size: larger;
  }

  .flex_item_right{
    display: flex;
    justify-content: right;
  }
  .flex_item_center{
    display: flex;
    justify-content: center;
  }
  .row-border{
    border: 0.5px solid green;
    border-radius: 1em;
  }

</style>