<template>
  <div class="repos">
    <h1>
      <button @click="toggleSearch">User:</button>
      <span v-if="!showSearch">{{ props.user }}</span>
      <span v-else>
        <form @submit="searchUser">
          <input type="text" v-model="searchTerm" placeholder="Search..." />
        </form>
      </span>
    </h1>
    <h1>Repos</h1>
    <RepoItem :key="repo.id" v-for="repo in repos" v-bind="repo" />
  </div>
</template>

<script setup lang="ts">
import RepoItem from "./RepoItem.vue";
import { ref } from "vue";
import router from "../router";

const props = defineProps({
  user: {
    type: String,
    default: "gatlace",
  },
});

const searchTerm = ref("");
const showSearch = ref(false);

const repos = await fetch(`https://api.github.com/users/${props.user}/repos`)
  .then((res) => res.json())
  .then((res) =>
    res.map((repo) => ({
      id: repo.id,
      name: repo.name,
      url: repo.html_url,
      description: repo.description,
      createdAt: repo.created_at,
      fullName: repo.full_name,
    }))
  );

function searchUser() {
  router.push({
    name: "user",
    params: {
      user: searchTerm.value,
    },
  });
}

function toggleSearch() {
  showSearch.value = !showSearch.value;
}
</script>

<style scoped lang="scss">
button {
  font-size: inherit;
  font-family: inherit;
  color: inherit;
  background: transparent;
  border: none;
  cursor: pointer;
}

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
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
    background-color: inherit;
    mouse-cursor: pointer;
  }
}
.repos {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
