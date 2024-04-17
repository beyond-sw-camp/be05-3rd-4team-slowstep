<template>
  <div class="container">
    <div class="row mb-5 mt-3">
      <div class="col-5">
          <h2>{{ healthInfo.inspDt }}</h2>
      </div>
      <div class="col-7">
        <h2>{{ptNm}} 님</h2>
        <!-- PT_NM 꺼내기-->
      </div>  
    </div>

    <div class="row row-border pt-3">
      <table class="table table-borderless">
        <tbody>
          <tr>
            <td style="text-align:center;">혈압</td>
            <td>{{healthInfo.PT_BP}} mm Hg</td>
          </tr>
          <tr>
            <td style="text-align:center;">공복혈당</td>
            <td>{{healthInfo.PT_BST}} mg/dl</td>
          </tr>
          <tr>
            <td style="text-align:center;">체중</td>
            <td>{{healthInfo.PT_WT}} kg</td>
          </tr>
          <tr>
            <td style="text-align:center;">심박수</td>
            <td>{{healthInfo.PT_HR}} bpm</td>
          </tr>
          <tr>
            <td style="text-align:center;">현재 복용 약물</td>
            <td> 
              {{healthInfo.DRUG_NM.length == 0 ? "복용 약물 없음" : healthInfo.DRUG_NM }}
            </td>
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
import {useRouter} from 'vue-router';
import {ref} from 'vue';
import axios from "@/axios"

export default {
  setup(){
    // const route = useRoute();
    // console.log(route.params.id);

    const healthInfo = JSON.parse(history.state.data);
    // console.log(healthInfo);

    const ptNm = ref();
    const ptNo = localStorage.getItem("TargetPtNo");
    const getPtNm = () => {
      let url = `/pt?PT_NO=${ptNo}`;

      axios(url)
      .then( res => {
        console.log(res.data[0]);
        ptNm.value = res.data[0].PT_NM;
      }).catch (err => {
        console.log(err.message);
      })
    }

    getPtNm();

    const router = useRouter();
    const toHealthList = () => {
      router.push({
        name : "HealthList"
      })
    }

    return{
      healthInfo,
      toHealthList,
      ptNm
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