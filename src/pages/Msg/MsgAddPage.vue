<template>
  <div class="container">
    <div class="row mb-2 mt-5">
      <div class="col-9">
        <div class="fromDiv">
          <label for="">TO 간호사 ooo</label>
        </div>
      </div>
      <div class="col-3 but">
        <button class="btn btn-success">뒤로가기</button>
        <button class="btn btn-success regis">등록</button>
      </div>
      <div class="row mt-4 mb-2">
        <div class="col-11">
          <input
            class="form-control"
            type="text"
            placeholder="제목을 입력해 주세요"
          />
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
export default {};
</script>

<style scoped>
.fromDiv {
  border: solid 1px;
  border-color: rgb(154, 154, 154);

  height: 100%;
}

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
