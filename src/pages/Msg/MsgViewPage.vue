<template>
  <div class="container">
    <div class="row mb-2 mt-5">
      <div class="col-9">
        <div class="fromDiv">
          <label for="">FROM 간호사 ooo</label>
        </div>
      </div>
      <div class="col-3 but">
        <button class="btn btn-success back">뒤로가기</button>
      </div>
      <div class="row mt-4 mb-2">
        <div class="col-11">
          <input
            class="form-control"
            type="text"
            placeholder="제목을 입력해 주세요"
            value="감사합니다."
            readonly
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
          >
저번에 주신 귤은 잘 먹었습니다.</textarea
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.fromDiv {
  border: solid 1px;
  border-color: rgb(154, 154, 154);

  height: 100%;
}

div.col-3.but {
}

.back {
  margin-left: 87px;
}

textarea {
  resize: none;
}
</style>
