<template>
  <div class="container">
    <div class="row mb-2 mt-5">
      <div class="col-9">
        <div class="fromDiv">
          <input
            class="form-control"
            type="text"
            readonly
            v-model="name"
          />
        </div>
      </div>
      <div class="col-3 but">
        <button class="btn btn-success" v-on:click="toMsgList">뒤로가기</button>
        <button class="btn btn-success regis" @click="pmAdd" >등록</button>
      </div>
      <div class="row mt-4 mb-2">
        <div class="col-11">
          <input class="form-control" type="datetime-local" v-model="date"/>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-11">
          <textarea
            class="form-control"
            rows="14"
            v-model="text"
            placeholder="내용을 입력해 주세요"
          ></textarea>
        </div>
      </div>
    </div>

    <div v-if="ifNull" class="alert alert-danger mt-4">
        공백은 입력될 수 없습니다.
    </div>

    <div v-if="result" class="alert alert-success mt-4">
      쪽지가 등록되었습니다.
    </div>

  </div>

</template>
<script>
import { useRoute ,useRouter } from "vue-router";
import { ref } from "vue";
import axios from "@/axios";
export default {
  setup() {
    const ifNull = ref(false);
    const result = ref(false);
    const pmInfo = ref({});

    const date = ref();
    console.log(date);
    const text = ref("");
    console.log(text);

    // 쪽지 수신자의 이름 띄우기
    const name = JSON.parse(localStorage.getItem("TargetRn")).MBR_NM;
    console.log(name);

    // 로그인 유저 정보 띄우기
    const loginUser = JSON.parse(localStorage.getItem("response")).data[0];
    console.log("MsgAdd - 로그인된 정보 : ",loginUser);

    const getPmInfo = async () => {
      let url = `pm`;
      axios(url)
        .then((res) => {
          pmInfo.value = res.data.length;
          console.log(pmInfo.value);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    getPmInfo();

    const route = useRoute();
    const pmAdd = () => {
      let url = `pm`;
      console.log(url);

      // TRSM_DIR 결정
      let TRSM_DIR = "";
      if(loginUser.JOB_TYP === "D"){
        TRSM_DIR = "1";
      }else{
        TRSM_DIR = "0";
      }
      
      let data = {
        id: pmInfo.value + 1,
        PM_NO: pmInfo.value +1,
        PM_RM_NO: Number(route.params.id),
        PM_CN: text.value,
        TRSM_DIR: TRSM_DIR,
        PM_DSPTCH_DT: date.value,
        RD_YN: "0",
        RD_DT: null,
        DELETE_YN: "0",
        DELETE_DT: null,
      };

      console.log(data);

      if ( date.value == undefined || text.value.length == 0 ) {
        ifNull.value = true;
        console.log("등록실패");
      } else {
        axios(url, { method: "POST", data: data })
          .then((res) => {
            console.log(res.data);
            console.log("등록완료");
            result.value = true;
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    };

    const router = useRouter();
    const toMsgList = () => {
      router.push({
        name: "MsgList",
      });
    };

    return {
      name,
      date,
      text,
      toMsgList,
      pmAdd,
      getPmInfo,
      ifNull,
      result
    };
  },
};
</script>
<style scoped>
div.col-3.but {
  padding-left: 38px;
}
.regis {
  margin-left: 10px;
}
textarea {
  resize: none;
}
</style>