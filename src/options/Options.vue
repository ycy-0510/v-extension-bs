<template>
  <main class="px-4 py-5 text-center text-secondary">
    <carbon-settings class="icon-btn mx-2 fs-3" />
    <div>Options</div>
    <p class="my-2 opacity-50">This is the options page</p>

    <input
      id="input"
      v-model="storageDemo"
      placeholder="Sync Storage Message"
      type="text"
      class="form-control text-center mx-auto bg-transparent"
      style="width: 250px;"
    />

    <Footer />

    <div class="mt-4 d-flex align-items-center justify-content-center gap-2">
      <span>Powered By Vite</span>
      <pixelarticons-zap class="d-inline-block" />
    </div>
  </main>
</template>

<script setup>
import { storageDemo } from "~/logic/storage";
</script>
