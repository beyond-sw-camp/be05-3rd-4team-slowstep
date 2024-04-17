<template>
  <div class="container">
    <div class="row mb-2 mt-5">
      <div class="col-9" >
        <!-- 로그인 구현시 수정 -->
        <label class="nameDiv">간호사 ooo님</label>
      </div>
      <div class="col-3 flex" >
        <button class="btn btn-success" v-on:click="toMain">뒤로가기</button>
        <button class="btn btn-success" v-on:click="toMsgAdd">+</button>
      </div>
    </div>

    <div class=" listDiv">
      <div class="card" v-for="msg in msgList" :key="msg.PM_NO">
        <div class="card-body cardBorder"
            @click="toMsgView(msg.PM_NO)">

            <div class="row" >
              <div class="col-10" >
                {{ msg.PM_CN }}
              </div>
              <div class="col-1">
                <i v-if="msg.RD_YN == 0" class="fas fa-bell message-icon" ></i>
              </div>
            </div>

          <!-- <div class="badge" v-if="msg.RD_YN == 0">✿</div> -->     
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {ref} from "vue"
import {useRouter} from 'vue-router';
import axios from "axios";

export default {
  setup(){

    let msgList = ref([{
        "PM_RM_NO": "1",
        "RD_YN": "1",
        "PM_CN": "김옥례 환자 관련 연락드립니다.",
        "PM_NO": "1",
        "TRSM_DIR": "0",
        "PM_DSPTCH_DT": "2024-03-26 00:00:00",
        "RD_DT": "2024-03-26 17:24:38"
      },
      {
        "PM_RM_NO": "1",
        "RD_YN": "0",
        "PM_CN": "네.",
        "PM_NO": "2",
        "TRSM_DIR": "1",
        "PM_DSPTCH_DT": "2024-03-26 00:00:00",
        "RD_DT": "2024-03-26 17:27:19"
      }]);
    // 로그인 구현시 수정

    const getMsgList = () => {
      let url = "http://localhost:7777/pmrm/view/2";
      // 로그인 구현시 수정
      let data = {
          "pmRmNo": 1,
          "mdNo": 1,
          "rnNo": 1
      }

      axios(url, data)
        .then( res => {
          msgList.value = res.data;
        })
        .catch( err => {
          console.log(err);
        })
      
    }

    // getMsgList();

    const router = useRouter();
    const toMsgView = (PM_NO) => {
      router.push({
        name : "MsgView",
        params : {
          id : PM_NO
        }
      })
    }

    const toMain = () => {
      router.push({
        name : "UserMain"
      })
    }

    const toMsgAdd = () => {
      router.push({
        name : "MsgAdd"
      })
    }

    return {
      msgList,
      getMsgList,
      toMsgView,
      toMain,
      toMsgAdd
    }
  }
}
</script>


<style scoped>

  .listDiv{
    border: 1px solid green;
    border-radius: 1.1em;
    padding : 2%;  

    max-height : 60vh;
    overflow-y: auto; 
  }
  
  .flex{
    display: flex;
    flex-direction: row-reverse;
    flex-wrap : wrap;
    gap : 5px;
  }

  .nameDiv{
    font-size: larger;
    text-decoration-line: underline;
  }

  .card-body{

    border: 1px solid green;
    border-radius: 1.1em;
    padding : 2%;  

    max-height : 60vh;

    position: relative;
    cursor: pointer;
  
  }

  .card{
    border : none
  }

  .card-body:hover{
    transform: translateY(-5px); /* Y축 이동 효과 */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* 강조된 그림자 효과 */
    background-color: #f7f7f7;
  }
  
  .badge{
    position:absolute;
    top:-5px;
    left:-5px;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background-color: coral;
  }

  .message-icon {
    color:red; /* 아이콘 색상 변경, 필요에 따라 조정 가능 */
    font-size: 1.2em; /* 아이콘 크기 조정 */
  }
</style>