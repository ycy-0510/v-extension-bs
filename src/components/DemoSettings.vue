<template>
  <div class="p-2">
    <p class="fs-6 mb-2">Settings</p>
    <ul class="list-group rounded p-1">
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>Dark Mode</span>
        <div class="form-check form-switch m-0">
          <input class="form-check-input" type="checkbox" role="switch" id="toggle-dark" :checked="isDark" @change="toggleDark()">
          <label class="form-check-label visually-hidden" for="toggle-dark">Enable</label>
        </div>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>Airplane Mode</span>
        <div class="form-check form-switch m-0">
          <input class="form-check-input" type="checkbox" role="switch" id="toggle-airplane">
          <label class="form-check-label visually-hidden" for="toggle-airplane">Enable</label>
        </div>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>VPN</span>
        <div class="form-check form-switch m-0">
          <input class="form-check-input" type="checkbox" role="switch" id="toggle-vpn">
          <label class="form-check-label visually-hidden" for="toggle-vpn">Enable</label>
        </div>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>Notifications</span>
        <div class="form-check form-switch m-0">
          <input class="form-check-input" type="checkbox" role="switch" id="toggle-notifications" checked>
          <label class="form-check-label visually-hidden" for="toggle-notifications">Enable</label>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { isDark, toggleDark } from '../logic/dark'
</script>
<style scoped></style>
