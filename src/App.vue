<template>
  <nav class="navbar navbar-expand-lg" style="background-color: #28a745;">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'Login' }">Slow-Step</router-link>

      <ul class="navbar-nav">
        <li class="nav-item" v-show="isLoggedIn">
          <router-link class="nav-link active" aria-current="page" :to="{ name: 'Modify' }">{{ name }}</router-link>
        </li>
      </ul>
    </div>
  </nav>

  <div class="container">
    <router-view/>
  </div>
</template>

<script>
import {ref} from 'vue';
export default {
  setup() {
    let isLoggedIn = ref(false);
    const name = localStorage.getItem("name");
    const LogIn = () => {
      if(name !== null) {
        isLoggedIn.value = true;
      } else {
        isLoggedIn.value = false;
      }  
    }
    LogIn();
    return {
      isLoggedIn,
      name,
      LogIn
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: #28a745;
}

/* 네비게이션 바의 링크 스타일 설정 */
.navbar-brand,
.navbar-nav .nav-link {
  color: white; /* 링크 텍스트를 흰색으로 설정 */
}
</style>
