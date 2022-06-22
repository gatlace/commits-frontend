<template>
  <div class="commits-list">
    <a :href="`/repos/${props.user}`">
      <h1>
        Repo: <span>{{ props.repo }}</span>
      </h1>
    </a>
    <h1>Commits</h1>
    <CommitItem v-for="commit in commits" :key="commit.sha" v-bind="commit" />
  </div>
</template>

<script setup>
import CommitItem from "./CommitItem.vue";
defineEmits(["RepoChanged"]);

const props = defineProps({
  user: {
    type: String,
    default: "gatlace/commits-frontend",
  },
  repo: {
    type: String,
    default: "commits-frontend",
  },
});

const commits = await fetch(
  `https://api.github.com/repos/${props.user}/${props.repo}/commits`
)
  .then((response) => response.json())
  .then((res) =>
    res.map((commit) => {
      return {
        sha: commit.sha,
        author: commit.commit.author,
        message: commit.commit.message,
        date: new Date(commit.commit.author.date),
        url: commit.html_url,
      };
    })
  );
</script>

<style scoped lang="scss">
a {
  font-size: inherit;
  color: inherit;
  background-color: inherit;
  border-radius: 2%;
  border: none;
  font-weight: inherit;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  padding: 0.5rem;

  &:hover {
    background-color: inherit;
    box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.4);
    mouse-cursor: pointer;
  }
}

.commits-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
