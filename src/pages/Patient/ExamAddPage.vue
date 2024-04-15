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
          <input type="date" aria-label="Year" class="form-control indent" />
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
          ></textarea>
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
        <button class="btn btn-success regi">등록</button>
      </div>

      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const toPatientMain = () => {
      router.push({
        name: "PatientMain",
      });
    };

    return {
      toPatientMain,
    };
  },
};
</script>

<style scoped>
.indent {
}
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
