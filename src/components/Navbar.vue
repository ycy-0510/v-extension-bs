<template>
  <nav class="px-2 py-1 border-bottom d-flex align-items-center w-100 gap-1">
    <RouterLink to="/" class="d-inline-flex align-items-center px-2 py-1 rounded text-decoration-none text-secondary" exact-active-class="bg-info-subtle text-info-emphasis">
      <HeroiconsHome />
      <span class="ms-1">Home</span>
    </RouterLink>
    <RouterLink to="/todo" class="d-inline-flex align-items-center px-2 py-1 rounded text-decoration-none text-secondary" exact-active-class="bg-info-subtle text-info-emphasis">
      <HeroiconsListBullet />
      <span class="ms-1">Todo</span>
    </RouterLink>
    <RouterLink to="/settings" class="d-inline-flex align-items-center px-2 py-1 rounded text-decoration-none text-secondary" exact-active-class="bg-info-subtle text-info-emphasis">
      <HeroiconsCog6Tooth />
      <span class="ms-1">Settings</span>
    </RouterLink>
    <div class="flex-grow-1"></div>
    <RouterLink to="/about" class="d-inline-flex align-items-center px-2 py-1 rounded text-decoration-none text-secondary" exact-active-class="bg-info-subtle text-info-emphasis">
      <HeroiconsUser />
    </RouterLink>
  </nav>
</template>
<script setup>
import { RouterLink } from "vue-router";
</script>
