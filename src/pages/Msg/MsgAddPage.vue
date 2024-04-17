<template>
  <div class="container">
    <div class="row mb-2 mt-5">
      <div class="col-9">
        <div class="fromDiv">
          <input
            class="form-control"
            type="text"
            placeholder="이름을 입력해 주세요"
            value="OOO 간호사."
          />
        </div>
      </div>
      <div class="col-3 but">
        <button class="btn btn-success" v-on:click="toMsgList">뒤로가기</button>
        <button class="btn btn-success regis">등록</button>
      </div>
      <div class="row mt-4 mb-2">
        <div class="col-11">
          <input class="form-control" type="datetime-local" />
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-11">
          <textarea
            class="form-control"
            rows="20"
            placeholder="내용을 입력해 주세요"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const toMsgList = () => {
      router.push({
        name: "MsgList",
      });
    };

    return {
      toMsgList,
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
