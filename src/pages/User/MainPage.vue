<template>
  <div class="container">
    <div class="cards-layout">
      <!-- Left Panel for Nurses List -->
      <div class="card nurses-list">
        <h3 class="card-header">쪽지</h3>
        <div class="list-group">
          <div class="list-group-item nurse-card" v-for="nurse in nurses" :key="nurse.MBR_NM" @click="selectNurse(nurse)">
            {{ loginUser.JOB_TYP === "D" ? '간호사' : '의사' }} : {{ nurse.MBR_NM }}
            <i v-if="nurse.hasMessage" class="fas fa-bell message-icon"></i>
          </div>
        </div>
      </div>

      <!-- Right Panel for Patients List -->
      <div class="card patients-list">
        <h3 class="card-header">담당 환자</h3>
        <div class="card-content">
          <!-- 환자 정보를 박스 형식으로 표시 -->
          <div class="patient-info" v-for="(patient, index) in patients" :key="index" @click="selectPatient(patient)">
            <div class="patient-box">
              <!-- 이미지 -->
              <img src="@/assets/patient_woman.png" alt="Woman Image" class="rounded-image">
              <!-- 요양원 이름 및 환자 정보 -->
              <div class="info-and-button">
                <div class="hospital-name">느린마음 요양원</div>
                <div class="patient-name-age-gender">
                  <h5>{{ patient.PT_NM }}</h5>
                  <p>{{ patient.PT_BRYMD}}, {{ patient.PT_GNDR }}</p>
                </div>
                <!-- 버튼 -->
                <button class="btn btn-success" @click="viewPatientDetail(patient)">환자 상세 보기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const nurses = ref([]);
    const patients = ref([]);
    const loginUser = JSON.parse(localStorage.getItem("response")).data[0];
    console.log(loginUser);
    // console.log(JSON.parse(localStorage.getItem("response")).data[0]);
    const router = useRouter();

    const fetchNurses = () => {
      axios.get('http://localhost:3000/mbr')
        .then(response => {
          if(loginUser.JOB_TYP === "D"){
            const filteredNurses = response.data.filter(nurse => nurse.JOB_TYP === 'N').map(nurse => {
              return { ...nurse, hasMessage: Math.random() > 0.5 };
            });
            nurses.value = filteredNurses;
          }else{
            const filteredNurses = response.data.filter(nurse => nurse.JOB_TYP === 'D').map(nurse => {
              return { ...nurse, hasMessage: Math.random() > 0.5 };
            });
            nurses.value = filteredNurses;
          }
        })
        .catch(error => {
          console.error('간호사 목록을 불러오는 중 에러 발생:', error);
        });
    };

    // 담당 환자 list 불러오기
    const fetchPatients = () => {
      axios.get('http://localhost:3000/md_pt_rn_rel')
        .then(relResponse => {

         if(loginUser.JOB_TYP === "D"){
          const patientIds = relResponse.data.filter(rel => rel.MD_NO === loginUser.MBR_NO).map(rel => rel.PT_NO);
          axios.get('http://localhost:3000/pt')
            .then(ptResponse => {
              patients.value = ptResponse.data.filter(patient => patientIds.includes(patient.PT_NO));
            });
         }else{
          const patientIds = relResponse.data.filter(rel => rel.RN_NO === loginUser.MBR_NO).map(rel => rel.PT_NO);
          axios.get('http://localhost:3000/pt')
            .then(ptResponse => {
              patients.value = ptResponse.data.filter(patient => patientIds.includes(patient.PT_NO));
            });
         }
        })
        .catch(error => {
          console.error('환자 정보를 불러오는 중 에러 발생:', error);
        });
    };

    const selectNurse = (nurse) => {
      console.log('선택한 간호사:', nurse.MBR_NM);
      router.push({ name: 'MsgList', params: { id: nurse.MBR_NO }});
      localStorage.setItem("TargetRn",JSON.stringify(nurse));
    };

    const selectPatient = (patient) => {
      console.log('선택한 환자:', patient.name);
    };

    const viewPatientDetail = (patient) => {
      console.log('환자 상세 보기:', patient.name);
      router.push({ name: 'PatientMain', state : { 
        data : JSON.stringify(patient)
       } });
       localStorage.setItem("TargetPtNo",JSON.stringify(patient.PT_NO));
    };

    onMounted(() => {
      fetchNurses();
      fetchPatients();
    });

    return {
      nurses,
      patients,
      selectNurse,
      selectPatient,
      viewPatientDetail,
      loginUser
    };
  }
};
</script>




<style scoped>
.container {
  max-width: 1400px;
  margin: auto;
  padding: 20px;
  display: flex; /* Flex를 사용하여 컨테이너 내 아이템들을 행으로 배치 */
  justify-content: space-between; /* 아이템들 사이에 균등한 간격 배치 */
}

.cards-layout {
  display: flex;
  flex: 1; /* 부모 요소의 전체 너비를 차지하도록 설정 */
  gap: 40px; /* 카드 사이의 간격 */
}

.card {
  flex: 1; /* 각 카드가 가능한 같은 비율로 너비를 차지하도록 설정 */
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column; /* 카드 내부의 내용을 세로로 쌓기 */
}

.card-header {
  background-color: #28a745; /* Deep plum */
  color: white;
  padding: 15px 20px;
  font-size: 1.2em;
  border-bottom: 1px solid #fff2;
}

.list-group {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1; /* 리스트 그룹이 카드 내에서 가능한 많은 공간을 차지하도록 설정 */
}

.list-group-item {
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out; /* 변환 및 그림자 효과의 전환 속도 조정 */
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 10px; /* 각 항목 사이의 간격 */
}

.list-group-item.has-message {
  color: red;
  font-weight: bold;
}

.list-group-item:hover {
  transform: translateY(-5px); /* Y축 이동 효과 */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* 강조된 그림자 효과 */
  background-color: #f7f7f7; /* 배경 색 변경 */
}
.message-icon {
  color:red; /* 아이콘 색상 변경, 필요에 따라 조정 가능 */
  font-size: 1.2em; /* 아이콘 크기 조정 */
}


.card-content {
  overflow-y: auto;
  max-height: 800px; /* 컨텐츠가 많을 경우 스크롤바 생성 */
  padding: 15px;
}

.patient-info {
  margin-bottom: 15px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.patient-info:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.patient-box {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  padding: 15px;
}

.info-and-button {
  flex-grow: 1;
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.hospital-name, .patient-details {
  text-align: left;
}

.patient-name {
  margin: 0;
  color: #333;
  font-size: 1.4em;
}

.patient-age-gender {
  color: #666;
  font-size: 0.9em;
}

.rounded-image {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.btn-primary, .btn-success {
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
}

.btn-primary:hover, .btn-success:hover {
  background-color: #4CAF50; /* Bootstrap success color on hover */
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
</style>

