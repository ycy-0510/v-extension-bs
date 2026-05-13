<template>
  <nav class="px-2 py-1 border-bottom d-flex align-items-center w-100 gap-1">
    <RouterLink to="/" class="nav-link-item">
      <HeroiconsHome />
      <span class="ms-1">Home</span>
    </RouterLink>
    <RouterLink to="/todo" class="nav-link-item">
      <HeroiconsListBullet />
      <span class="ms-1">Todo</span>
    </RouterLink>
    <RouterLink to="/settings" class="nav-link-item">
      <HeroiconsCog6Tooth />
      <span class="ms-1">Settings</span>
    </RouterLink>
    <div class="flex-grow-1"></div>
    <RouterLink to="/about" class="nav-link-item">
      <HeroiconsUser />
    </RouterLink>
  </nav>
</template>
<script setup>
import { RouterLink } from "vue-router";
</script>
<style scoped>
.nav-link-item {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  color: #64748b;
  text-decoration: none;
}

.nav-link-item.router-link-exact-active {
  background-color: #eef2ff;
  color: #4f46e5;
}
</style>
