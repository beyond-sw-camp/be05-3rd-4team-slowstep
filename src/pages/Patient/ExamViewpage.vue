<template>
  <div class="container">
    <div class="row mb-2 mt-5">
      <div class="col-4">
        <div class="fromDiv">
          <div><h2>진료기록 입력</h2></div>
          <div>
            <h2>{{ ptInfo.PT_NM }}</h2>
          </div>
        </div>
      </div>
      <div class="col-5">
        <div class="input-group">
          <span class="input-group-text">기록날짜</span>
          <input
            type="date"
            aria-label="Year"
            class="form-control"
            readonly
            v-model="examInfo.EXAM_YMD"
          />
        </div>
      </div>

      <div class="col-3"></div>
    </div>
    <!-- 년, 월, 일 입력란 종료 -->

    <div class="row mb-2">
      <div class="col-4">
        <div class="fromDiv"></div>
      </div>
      <div class="col-5">
        <div class="input-group">
          <span class="input-group-text">특이사항</span>
          <textarea
            class="form-control"
            aria-label="With textarea"
            rows="10"
            readonly
            v-model="examInfo.DIS_NM"
          >
          
  당 수치가 많이 낮아졌음
  귤을 많이 줄이셔야 할 것 같다.</textarea
          >
        </div>
      </div>

      <div class="col-3"></div>
    </div>
    <!-- 특이사항 입력란 종료 -->

    <div class="row mb-2 mt-5">
      <div class="col-4">
        <div class="fromDiv"></div>
      </div>

      <div class="col-5">
        <div class="input-group">
          <span class="input-group-text">약물처방</span>
          <textarea
            class="form-control"
            aria-label="With textarea"
            rows="5"
            readonly
            v-model="examInfo.RX_CN"
          >
진료 내역</textarea
          >
        </div>
      </div>

      <div class="col-3"></div>
    </div>
    <div class="row mb-2 mt-5">
      <div class="col-4"></div>
      <div class="col-5 but">
        <button class="btn btn-success back" v-on:click="toPatientMain">
          뒤로가기
        </button>
      </div>

      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import axios from "@/axios";
import { ref } from "vue";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    let examInfo = ref({});
    // const ptNo = ptObj.PT_NO;
    // console.log(ptNo);

    let ptInfo = JSON.parse(localStorage.getItem("patient"));
    console.log(ptInfo);

    const toPatientMain = () => {
      router.push({
        name: "PatientMain",
      });
    };

    const getExamInfo = () => {
      let url = `exam_info`;

      axios(url)
        .then((res) => {
          examInfo.value = res.data[route.params.id - 1];
          console.log(examInfo.value);
          console.log(ptInfo.value);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    // const getPtInfo = () => {
    //   let url = `pt`;

    //   axios(url)
    //     .then((res) => {
    //       ptInfo.value = res.data[route.params.id - 1];
    //       console.log(ptInfo.value);
    //     })
    //     .catch((err) => {
    //       console.log(err.message);
    //     });
    // };

    getExamInfo();

    // getPtInfo();
    // getPtInfo();

    return {
      toPatientMain,
      examInfo,
      getExamInfo,
      ptInfo,
      // getPtInfo,
    };
  },
};
</script>

<style scoped>
.indent {
}
.back {
  position: absolute;
  margin-left: 220px;
}
.regi {
  margin-left: 290px;
  position: absolute;
}

.fromDiv {
  border: none;
}

textarea {
  resize: none;
}
</style>
