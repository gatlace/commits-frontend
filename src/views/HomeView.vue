<template>
  <div class="home">
    <Suspense>
      <HomePage />
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import HomePage from "../components/HomePage.vue";
</script>
