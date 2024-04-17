<template>
  <div class="container">
    <div class="row mb-2 mt-5">
      <div class="col-9">
        <div class="fromDiv">
          <input
            class="form-control"
            type="text"
            value="OOO 간호사."
            readonly
          />
        </div>
      </div>
      <div class="col-3 but">
        <button class="btn btn-success back" v-on:click="toMsgList">
          뒤로가기
        </button>
      </div>
      <div class="row mt-4 mb-2">
        <div class="col-11">
          <input
            class="form-control"
            type="datetime-local"
            readonly
            v-model="pmInfo.PM_DSPTCH_DT"
          />
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-11">
          <textarea
            class="form-control"
            rows="20"
            placeholder="내용을 입력해 주세요"
            readonly
            v-model="pmInfo.PM_CN"
          >
저번에 주신 귤은 잘 먹었습니다.</textarea
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import axios from "@/axios";
import { ref } from "vue";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const pmInfo = ref({});

    const toMsgList = () => {
      router.push({
        name: "MsgList",
      });
    };

    if (pmInfo.value.RD_YN === 0) {
      updatePmInfo();
    }

    const updatePmInfo = () => {
      let url = `pm/${route.params.id}`;
      let data = {
        RD_YN: 1,
      };

      axios(url, { method: "PATCH", data: data })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    const getPmInfo = () => {
      let url = `pm`;

      axios(url)
        .then((res) => {
          pmInfo.value = res.data[route.params.id - 1];
          console.log(pmInfo.value);
          console.log(pmInfo.value.PM_DSPTCH_DT);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    getPmInfo();

    return {
      toMsgList,
      pmInfo,
      getPmInfo,
      updatePmInfo,
    };
  },
};
</script>

<style scoped>
div.col-3.but {
}

.back {
  margin-left: 87px;
}

textarea {
  resize: none;
}
</style>
