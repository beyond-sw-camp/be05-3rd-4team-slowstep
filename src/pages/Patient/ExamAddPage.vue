<template>
  <div class="container">
    <div class="row mb-2 mt-5">
      <div class="col-4">
        <div class="fromDiv">
          <div><h2>진료기록 입력</h2></div>
          <div><h2>김점순 환자</h2></div>
        </div>
      </div>
      <div class="col-5">
        <div class="input-group">
          <span class="input-group-text">기록날짜</span>
          <input
            type="date"
            aria-label="Year"
            class="form-control indent"
            v-model="EXAM_YMD"
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
            v-model="DIS_NM"
          >
          </textarea>
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
            v-model="RX_CN"
          ></textarea>
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
        <button
          class="btn btn-success regi"
          v-on:click="[toPatientMain(), examAdd()]"
        >
          등록
        </button>
      </div>

      <div v-if="ifNull" class="alert alert-danger mt-4">
        공백은 입력될 수 없습니다.
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ref } from "vue";
import axios from "@/axios";
export default {
  setup() {
    const ifNull = ref(false);
    const RX_CN = ref("");
    const EXAM_YMD = ref("");
    const DIS_NM = ref("");
    const examInfo = ref("");

    const router = useRouter();
    const toPatientMain = () => {
      router.push({
        name: "PatientMain",
      });
    };

    const examAdd = () => {
      let url = `exam_info`;
      let data = {
        id: examInfo.value + 1,
        EXAM_NO: examInfo.value + 1,
        PT_NO: 1,
        RX_CN: RX_CN.value,
        DIS_NM: DIS_NM.value,
        EXAM_YMD: EXAM_YMD.value,
        PIC_MD_NM: "",
      };

      if (
        RX_CN.value.length == 0 ||
        DIS_NM.value.length == 0 ||
        EXAM_YMD.value.length == 0
      ) {
        ifNull.value = true;
        console.log("asdasd");
      } else {
        console.log(1234);
        axios(url, { method: "POST", data: data })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    };

    const getExamInfo = async () => {
      let url = `exam_info`;

      axios(url)
        .then((res) => {
          examInfo.value = res.data.length;
          console.log(examInfo.value);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    getExamInfo();

    return {
      toPatientMain,
      examAdd,
      getExamInfo,
      examInfo,
      EXAM_YMD,
      DIS_NM,
      RX_CN,
    };
  },
};
</script>

<style scoped>
.back {
  position: absolute;
  margin-left: 160px;
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
