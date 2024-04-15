<template>
  <div class="container">
    <br>

    <!-- 환자 정보 및 건강 정보 -->
  
    <div class="card-container">
    <!-- 첫 번째 카드 -->
      <div class="card first-card" style="width: 40rem; height: 16rem; margin-right: 3rem;">
          <div class="card-body d-flex align-items-center">
              <img
                  src="@/assets/woman_pink.jpg"
                  alt="Woman Image"
                  class="rounded-image mr-3"
                  style="width: 10rem; height: 10rem; margin-left: 2rem; margin-right: 3rem;"
              >
              <div>
                  <h3 class="card-title">OOOO 요양원</h3>
                  <p class="card-text" style="font-size: 50px; margin-right: 7rem;">OOO</p>
              </div>
          </div>
      </div>

      <!-- 두 번째 카드 -->
      <div class="card second-card" style=" width: 50rem; height: 16rem;">
        <div class="card-body">
          <h6 class="card-subtitle mb-2 text-body-secondary">OOOO년 OO월 OO일 OO시 OO분 업데이트</h6>
          <br>
          <p class="card-text" style="font-size: 20px;">최고 혈압 : OOO</p>
          <p class="card-text" style="font-size: 20px;">최저 혈압 : OOO</p>
          <p class="card-text" style="font-size: 20px;">공복 혈당 : OOO</p>
          <div class="flex_item">
              <!-- 버튼 클릭 시 건강정보 상세내역으로. -->
              <button class="btn btn-success font mt-1" @click="toHealthList">내역보기</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 환자 진료 내역 -->
    <br>
    <div>
      <h4>진료 기록</h4>
      <div class="card" style="overflow: scroll; width: 100%; height: 250px; padding: 10px;">
        <ul class="list-group list-group-flush">
          <!-- 각 아이템을 li 요소로 나타내고 클릭 시 해당 아이템의 상세 페이지로 이동 -->
          <li class="list-group-item" v-for="item in items" :key="item.id" @click="goToItemDetail(item.id)">
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
        { id: 4, name: 'Item 4' },
        { id: 5, name: 'Item 5' },
        { id: 6, name: 'Item 6' },
        { id: 7, name: 'Item 7' },
        { id: 8, name: 'Item 8' },
        { id: 9, name: 'Item 9' },
        { id: 10, name: 'Item 10' }
      ]
    };
  },
  methods: {
    // 아이템 상세 페이지로 이동하는 메서드
    goToItemDetail(itemId) {
      // 아이템 상세 페이지로 이동
      this.$router.push(`/item/${itemId}`);
    },

    toHealthList() {
      // 메인 페이지로 이동
      this.$router.push({ name: 'HealthList' });
    }
  }
};
</script>

<style scoped>
.card-container {
  display: flex;
  justify-content: flex-start; /* 첫 번째 카드를 시작 부분에 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
}

.flex_item {
  display: flex;
  justify-content: flex-end; /* 버튼을 오른쪽으로 정렬 */
}

.list-group-item {
  cursor: pointer; /* 커서 모양을 클릭 모양으로 변경 */
}

/* 선택한 아이템에 hover 시 배경색 변경 */
.list-group-item:hover {
  background-color: #f0f0f0; /* 마우스를 가져갔을 때 배경색 변경 */
}

.rounded-image {
  border-radius: 100%; /* 이미지를 동그랗게 출력하기 위한 스타일 */
}


</style>
