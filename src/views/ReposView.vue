<template>
  <div class="repos">
    <h1>Repositories</h1>
    <Suspense>
      <router-view> </router-view>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import ReposGrid from "../components/ReposGrid.vue";
</script>
