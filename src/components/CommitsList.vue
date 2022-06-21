<template>
  <div class="commits-list">
    <h1>Commits</h1>
    <CommitItem v-for="commit in commits" :key="commit.sha" :commit="commit" />
  </div>
</template>

<script setup>
import CommitItem from "./CommitItem.vue";
const apiResponse = await fetch(
  "https://api.github.com/repos/gatlace/commits-frontend/commits"
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    return data;
  });

const commits = apiResponse.map((commit) => {
  return {
    sha: commit.sha,
    author: commit.commit.author.name,
    message: commit.commit.message,
    date: new Date(commit.commit.author.date),
    url: commit.html_url,
  };
});
</script>

<style scoped lang="scss">
.commits-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
