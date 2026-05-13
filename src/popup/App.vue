<template>
  <main class="popup-root">
    <Navbar />
    <div class="popup-content overflow-y-auto">
      <RouterView />
    </div>
    <Footer />
  </main>
</template>
<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>
<style scoped>
.popup-root {
  width: 400px;
}
.popup-content {
  height: 20rem;
}
</style>
