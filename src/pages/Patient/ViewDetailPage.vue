<template>
    <div class="container">
      <div class="col-5">
        <h4>환자 정보</h4>
      </div>
  

      <!-- 환자 정보 및 건강 정보 -->
        <div class="card-container">
            <!-- 첫 번째 카드 -->
            <div class="card" style="height: 15rem; margin-right: 3rem;">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
            </div>
            </div>
  
            <!-- 두 번째 카드 -->
            <div class="card" v-if="showSecondCard" style="height: 15rem;">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
            </div>
        </div>

      <!-- 환자 진료 내역 -->
      <!-- <div style="overflow: scroll; width: 100%; height: 150px; padding: 10px;">
        자랑처럼 풀이 무성할 게외다.<br />
        </div> -->
    
        <br>
        <div>
            <h4>아이템 목록</h4>
            <div class="card" style="overflow: scroll; width: 100%; height: 250px; padding: 10px;">
            <ul class="list-group list-group-flush">
                <!-- 각 아이템을 li 요소로 나타내고 클릭 시 해당 아이템의 상세 페이지로 이동 -->
                <li class="list-group-item" v-for="item in items" :key="item.id" @click="goToItemDetail(item.id)">
                {{ item.name }}
                </li>
            </ul>
            </div>
        </div>

      <div class="flex_item">
        <button class="btn btn-success font mt-4" @click="toHealthList">뒤로가기</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showSecondCard: true // 두 번째 카드를 보이게 할지 여부를 데이터로 관리
      };
    },
    methods: {
      toHealthList() {
        // 뒤로가기 버튼 클릭 시 동작
        // 예시로 두 번째 카드를 토글
        this.showSecondCard = !this.showSecondCard;
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
  
  </style>
  