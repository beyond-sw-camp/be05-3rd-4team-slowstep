<template>
  <div class="container">
    <br />

    <!-- 환자 정보 및 건강 정보 -->
    <div class="card-container">
      <!-- 첫 번째 카드: 환자 정보 -->
      <div>
        <span style="font-size: 24px"><b>환자 정보</b></span>
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
              <h3 class="card-title">{{ ogdpInstNm }}</h3>
              <!-- ptInfo 객체가 존재할 때만 PT_NM을 렌더링 -->
              <p class="card-text" style="font-size: 40px;">
                <b>{{ ptInfo.PT_NM }}</b>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 두 번째 카드: 건강 정보 -->
      <div>
        <span style="font-size: 24px"><b>건강 정보</b></span>
        <button
          class="btn btn-success"
          @click="toHealthAdd"
          style="float: right"
        ><b>+</b></button>
        <div
          class="card second-card"
          style="width: 45rem; height: 16rem; margin-top: 1rem"
        >
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-body-secondary">
              {{ latestHealthRecord ? latestHealthRecord.INSP_DT : 'Loading...' }} 업데이트
            </h6>
            <br />
            <p class="card-text" style="font-size: 20px">
              최고 혈압 : {{ latestHealthRecord ? latestHealthRecord.PT_BP : 'N/A' }}
            </p>
            <p class="card-text" style="font-size: 20px">
              공복 혈당 : {{ latestHealthRecord ? latestHealthRecord.PT_BST : 'N/A' }}
            </p>
            <p class="card-text" style="font-size: 20px">
              심박수 : {{ latestHealthRecord ? latestHealthRecord.PT_HR : 'N/A' }}
            </p>
            <div class="flex_item">
              <!-- 버튼 클릭 시 건강정보 상세내역으로 이동 -->
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
      <span style="font-size: 24px"><b>진료 기록</b></span>
      <button
        class="btn btn-success mb-3"
        @click="toExamAdd"
        style="float: right"
      ><b>+</b></button>
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

    <!-- 뒤로 가기 버튼 -->
    <button
      class="btn btn-success"
      @click="toMain"
      style="float: right; margin-top: 1rem; margin-bottom: 1rem"
    >
      뒤로 가기
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'; // vue-router에서 useRouter를 import

const latestHealthRecord = ref(null);
const examInfo = ref([]);
const ptInfo = ref({});
const router = useRouter(); // useRouter를 사용하여 router 객체를 가져옴
const rnNo = ref(0);
const ogdpInstNm = ref("");

const loadRnNo = async () => {
  try{
    const rnNoResponse = await axios.get('http://localhost:3000/md_pt_rn_rel');
    if (Array.isArray(rnNoResponse.data)) {
      const filteredRnNo = rnNoResponse.data.filter(item => item.PT_NO === 1);
      if (filteredRnNo.length > 0) {
        rnNo.value = filteredRnNo[0].RN_NO;
        return rnNo;
      } else {
        console.warn('No exam records found for PT_NO 1');
      }
    }
  } catch(error){
    console.error('Error loading RN_NO data:', error);
  }
};

const loadOgdpInstNm = async () => {
  try{
    const ogdpInstNmResponse = await axios.get('http://localhost:3000/mbr');
    if (Array.isArray(ogdpInstNmResponse.data)) {
      const filteredOgdpInstNm = ogdpInstNmResponse.data.filter(item => item.MBR_NO === rnNo.value);
      if (filteredOgdpInstNm.length > 0) {
        ogdpInstNm.value = filteredOgdpInstNm[0].OGDP_INST_NM;
        return ogdpInstNm;
      } else {
        console.warn('No exam records found for PT_NO 1');
      }
    }
  } catch(error){
    console.error('Error loading OGDP data:', error);
  }
}

// 환자 정보 및 건강 정보 데이터 로드
const loadPatientData = async () => {
  try {
    const examInfoResponse = await axios.get('http://localhost:3000/exam_info');
    if (Array.isArray(examInfoResponse.data)) {
      const filteredExamInfo = examInfoResponse.data.filter(item => item.PT_NO === 1);
      if (filteredExamInfo.length > 0) {
        examInfo.value = filteredExamInfo;
        // 최근 건강 정보 설정
        latestHealthRecord.value = filteredExamInfo[0];
      } else {
        console.warn('No exam records found for PT_NO 1');
      }
    } else {
      console.error('Invalid response data format:', examInfoResponse.data);
    }
  } catch (error) {
    console.error('Error loading patient data:', error);
  }
};

// 환자 정보
const loadPatientInfo = async () =>{
  try {
    const ptInfoResponse = await axios.get('http://localhost:3000/pt');
    if (Array.isArray(ptInfoResponse.data)) {
      const filteredPtInfo = ptInfoResponse.data.filter(item => item.PT_NO === 1);
      if (filteredPtInfo.length > 0) {
        ptInfo.value = filteredPtInfo[0];
        localStorage.setItem("patient", JSON.stringify(ptInfo.value));
      } else {
        console.warn('No exam records found for PT_NO 1');
      }
    } else {
      console.error('Invalid response data format:', ptInfoResponse.data);
    }
  } catch (error) {
    console.error('Error loading patient Info:', error);
  }
};

// 건강 정보 데이터 로드
const loadPatientHealthInfo = async () => {
  try {
    const healthInfoResponse = await axios.get('http://localhost:3000/pt_hth_info');
    if (Array.isArray(healthInfoResponse.data)) {
      const filteredHealthInfo = healthInfoResponse.data.filter(item => item.PT_NO === 1);
      if (filteredHealthInfo.length > 0) {
        latestHealthRecord.value = filteredHealthInfo.reduce((prev, current) => {
          return (new Date(current.INSP_DT) > new Date(prev.INSP_DT)) ? current : prev;
        });
      } else {
        console.warn('No health records found for PT_NO 1');
      }
    } else {
      console.warn('Invalid response data format:', healthInfoResponse.data);
    }
  } catch (error) {
    console.error('Error loading patient health info:', error);
  }
};

// 건강 정보 상세내역 페이지로 이동
const toHealthList = () => {
  router.push({ name: "HealthList" });
};

// 건강 정보 추가 페이지로 이동
const toHealthAdd = () => {
  router.push({ name: "HealthAdd" });
};

// 진료 정보 추가 페이지로 이동
const toExamAdd = () => {
  router.push({ name: "ExamAdd" });
};

// 메인 페이지로 이동
const toMain = () => {
  router.push({ name: "UserMain" });
};

// 진료 기록 상세 페이지로 이동
const goToExamView = (examNo) => {
  router.push(`/patient/exam/view/${examNo}`);
};

onMounted(() => {
  // 컴포넌트가 마운트될 때 환자 정보 데이터 및 건강 정보 데이터 로드
  loadPatientData();
  loadPatientHealthInfo();
  loadPatientInfo();
  loadRnNo();
  loadOgdpInstNm();
});

// computed 속성으로 필터된 examInfo 반환
const filteredExamInfo = computed(() => {
  return examInfo.value.filter(item => item.PT_NO === 1);
});
</script>

<style scoped>
.card-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.flex_item {
  display: flex;
  justify-content: flex-end;
}

.list-group-item {
  cursor: pointer;
}

.list-group-item:hover {
  background-color: #e6ffee;
}

.rounded-image {
  border-radius: 100%;
}

.card {
  border: 1px solid green;
}
</style>