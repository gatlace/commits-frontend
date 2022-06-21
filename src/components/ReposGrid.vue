<template>
  <div class="repos">
    <h1>User: {{ props.user }}</h1>
    <h1>Repos</h1>
    <RepoItem :key="repo.id" v-for="repo in repos" v-bind="repo" />
  </div>
</template>

<script setup lang="ts">
import RepoItem from "./RepoItem.vue";

const props = defineProps({
  user: {
    type: String,
    default: "gatlace",
  },
});

console.log(props);

const repos = await fetch(`https://api.github.com/users/${props.user}/repos`)
  .then((res) => res.json())
  .then((res) =>
    res.map((repo) => ({
      id: repo.id,
      name: repo.name,
      url: repo.html_url,
      description: repo.description,
      createdAt: repo.created_at,
    }))
  );
</script>

<style scoped lang="scss">
.repos {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
