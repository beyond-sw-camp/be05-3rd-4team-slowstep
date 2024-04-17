<template>
  <div class="container">
    <br />

    <!-- 환자 정보 및 건강 정보 -->

    <div class="card-container">
      <!-- 첫 번째 카드 -->
      <div>
        <span style="font-size: 24px">환자 정보</span>
        <div
          class="card first-card"
          style="
            width: 31.5rem;
            height: 16rem;
            margin-right: 3rem;
            margin-top: 1rem;
          "
        >
          <div class="card-body d-flex align-items-center">
            <img
              src="@/assets/woman_pink.jpg"
              alt="Woman Image"
              class="rounded-image mr-3"
              style="
                width: 10rem;
                height: 10rem;
                margin-left: 2rem;
                margin-right: 3rem;
              "
            />
            <div>
              <h3 class="card-title">OOOO 요양원</h3>
              <p class="card-text" style="font-size: 50px; margin-right: 7rem">
                OOO
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 두 번째 카드 -->
      <div>
        <span style="font-size: 24px">건강 정보</span>
        <button
          class="btn btn-success"
          @click="toHealthAdd"
          style="float: right"
        >
          +
        </button>
        <div
          class="card second-card"
          style="width: 45rem; height: 16rem; margin-top: 1rem"
        >
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-body-secondary">
              {{latestHealthRecord.INSP_DT}} 업데이트
            </h6>
            <br />
            <p class="card-text" style="font-size: 20px">최고 혈압 : {{latestHealthRecord.PT_BP}}</p>
            <p class="card-text" style="font-size: 20px">공복 혈당 : {{latestHealthRecord.PT_BST}}</p>
            <p class="card-text" style="font-size: 20px">심박수 : {{latestHealthRecord.PT_HR}}</p>
            <div class="flex_item">
              <!-- 버튼 클릭 시 건강정보 상세내역으로. -->
              <button class="btn btn-success font mt-1" @click="toHealthList">
                내역보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 진료 기록 -->
    <br />
    <div>
      <span style="font-size: 24px">진료 기록</span>
      <button
        class="btn btn-success mb-3"
        @click="toExamAdd"
        style="float: right"
      >
        +
      </button>
      <div
        class="card"
        style="overflow: scroll; width: 100%; height: 250px; padding: 10px"
      >
        <ul class="list-group list-group-flush">
          <li
            class="list-group-item"
            v-for="item in filteredExamInfo"
            :key="item.EXAM_NO"
            @click="goToExamView(item.EXAM_NO)"
          >
            <b>{{ item.EXAM_YMD }}일 진료 기록</b>
          </li>
        </ul>
      </div>
    </div>

    <button
      class="btn btn-success"
      @click="toMain"
      style="float: right; margin-top: 1rem; margin-bottom: 1rem"
    >
      뒤로 가기
    </button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      patientInfo: {}, // 환자 정보
      latestHealthRecord: {}, // 최근 건강 정보
      examInfo: [] // 전체 진료 정보 데이터 배열
    };
  },
  computed: {
    filteredExamInfo() {
      // PT_NO가 1인 데이터만 필터링
      return this.examInfo.filter(item => item.PT_NO === 1);
    }
  },
  methods: {
    // Axios를 사용하여 slow-step.json 데이터 로드
    loadPatientData() {
      axios.get('http://localhost:3000/exam_info')
        .then(response => {
          // 응답 데이터 확인 (콘솔 출력)
          console.log(response.data);

          // 응답 데이터가 배열 형태인지 확인
          if (Array.isArray(response.data)) {
            const filteredExamInfo = response.data.filter(item => item.PT_NO === 1);

            // 필터링된 데이터가 존재하는지 확인
            if (filteredExamInfo.length > 0) {
              this.examInfo = filteredExamInfo;

              // 화면에 표시할 데이터를 확인 (콘솔 출력)
              console.log('Filtered Exam Info:', this.examInfo);

              // 최근 건강 정보 설정 (예시: 첫 번째 데이터 사용)
              // this.latestHealthRecord = filteredExamInfo[0];
            } else {
              console.warn('No exam records found for PT_NO 1');
            }
          } else {
            console.error('Invalid response data format:', response.data);
          }
        })
        .catch(error => {
          console.error('Error loading patient data:', error);
        });
    },

    loadPatientHealthInfo() {
      axios.get('http://localhost:3000/pt_hth_info')
        .then(response => {
          if (Array.isArray(response.data)) {
            const patientHealthInfo = response.data;

            // PT_NO가 1인 데이터만 필터링
            const filteredHealthInfo = patientHealthInfo.filter(item => item.PT_NO === 1);

            if (filteredHealthInfo.length > 0) {
              // INSP_DT를 기준으로 내림차순 정렬하여 최신 데이터 가져오기
              const latestHealthRecord = filteredHealthInfo.reduce((prev, current) => {
                return (new Date(current.INSP_DT) > new Date(prev.INSP_DT)) ? current : prev;
              });

              // 최신 데이터의 PT_BP, PT_BST, PT_HR 값을 출력
              console.log('Latest PT_BP:', latestHealthRecord.PT_BP);
              console.log('Latest PT_BST:', latestHealthRecord.PT_BST);
              console.log('Latest PT_HR:', latestHealthRecord.PT_HR);
              this.latestHealthRecord = filteredHealthInfo[0];
            } else {
              console.warn('No health records found for PT_NO 1');
            }
          } else {
            console.warn('Invalid response data format:', response.data);
          }
        })
        .catch(error => {
          console.error('Error loading patient health info:', error);
        });
    },




    // 아이템 상세 페이지로 이동하는 메서드
    goToExamView(examNo) {
      this.$router.push(`/patient/exam/view/${examNo}`);
    },

    toHealthList() {
      this.$router.push({ name: "HealthList" });
    },

    toHealthAdd() {
      this.$router.push({ name: "HealthAdd" });
    },

    toExamAdd() {
      this.$router.push({ name: "ExamAdd" });
    },

    toMain() {
      this.$router.push({ name: "UserMain" });
    }
  },
  mounted() {
    this.loadPatientData(); // 환자 정보 데이터 로드
    this.loadPatientHealthInfo();
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
  background-color: #e6ffee; /* 연한 연초록색 */
}

.rounded-image {
  border-radius: 100%; /* 이미지를 동그랗게 출력하기 위한 스타일 */
}

/* 카드 테두리 스타일 및 색상 변경 */
.card {
  border: 1px solid green; /* 테두리 두께와 색상 설정 */
}
</style>
