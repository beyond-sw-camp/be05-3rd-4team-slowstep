<template>
  <nav class="navbar navbar-expand-lg" style="background-color: #28a745;">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'Login' }">Hanwha SW Camp 5th</router-link>

      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" :to="{ name: 'Login' }">To-Work</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" :to="{ name: 'Login' }">Name</router-link>
        </li>
      </ul>
    </div>
  </nav>

  <div class="container">
    <router-view/>
  </div>
</template>

<script>
export default {
  
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
