<template>
  <div class="container">
    <div class="row mb-5 mt-3">
      <div class="col-5">
          <h2>{{ healthInfo.inspDt }}</h2>
      </div>
      <div class="col-7">
        <h2>oo 환자</h2>
        <!-- vuex로 전역변수 구현시 수정 -->
      </div>  
    </div>

    <div class="row row-border pt-3">
      <table class="table table-borderless">
        <tbody>
          <tr>
            <td style="text-align:center;">혈압</td>
            <td>{{healthInfo.ptBp}} mm Hg</td>
          </tr>
          <tr>
            <td style="text-align:center;">공복혈당</td>
            <td>{{healthInfo.ptBst}} mg/dl</td>
          </tr>
          <tr>
            <td style="text-align:center;">체중</td>
            <td>{{healthInfo.ptWt}} kg</td>
          </tr>
          <tr>
            <td style="text-align:center;">심박수</td>
            <td>{{healthInfo.ptHr}} bpm</td>
          </tr>
          <tr>
            <td style="text-align:center;">현재 복용 약물</td>
            <td>{{drugInfo != null ? drugInfo.drugNm : "복용 약물 없음"}}</td>
            <!-- 하루에 여러 약물을 섭취할 경우 v-for을 이용해 처리 -->
          </tr>
        </tbody>
      </table>

      <div class="flex_item">
        <button class="btn btn-success mt-4 mb-3" v-on:click="toHealthList">뒤로가기</button>
      </div>
      
    </div>

  </div>
</template>

<script>
import {useRoute, useRouter} from 'vue-router';
import {ref} from "vue"
import axios from "axios";

export default {
  setup(){
    const route = useRoute();
    // console.log(route.params.id);

    const healthInfo = JSON.parse(history.state.data);
    // console.log(healthInfo);

    let drugInfo = ref({});
    const getDrugInfo = () => {
      let url = "http://localhost:7777/all/ad_drug_info/" + route.params.id;

      axios(url)
        .then(res => {
          drugInfo.value = res.data[0];
          // console.log(drugInfo.value.drugNm);
        })
        .catch(err => {
          console.log(err.message);
        })
    }

    getDrugInfo();

    const router = useRouter();
    const toHealthList = () => {
      router.push({
        name : "HealthList"
      })
    }

    return{
      healthInfo,
      drugInfo,
      getDrugInfo,
      toHealthList
    }
  }
}
</script>

<style scoped>

  .row{
    font-size: larger;
  }

  .flex_item{
    display: flex;
    justify-content: center;
  }

  .row-border{
    border: 0.5px solid green;
    border-radius: 1em;
  }

</style>