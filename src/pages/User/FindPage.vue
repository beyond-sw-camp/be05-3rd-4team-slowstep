<template>
  <div class="ask">
    <h2>관리자에게 문의하세요</h2>
  </div>
  <div class="contact">
    <h4>02-1234-1234</h4>
    <h4>slowstep@slowstep.com</h4>
  </div>
  <div class="butt">
  <button class="btn btn-success" @click="toGoBack">
    뒤로가기
  </button>
 </div>
</template>

<script>
import {useRouter} from 'vue-router';
export default {
    setup() {
      const router = useRouter();
      const toGoBack = () => {
        router.push("/")
      }

      return {
        toGoBack
      }
    }
}
</script>

<style scoped>
.ask {
  margin-top: 20%;
  text-align: center;
  text-decoration-line: underline;
  font-size: large;
}
.contact {
  text-align: center;
  font-size: medium;
}
.butt {
  text-align: center;
  margin-top: 3%;
}
</style>