<template>
  <div class="repos">
    <div class="repos-found" v-if="repos.length > 0">
      <h1>
        <div class="header">
          <button @click="toggleSearch">User:</button>
          <span v-if="!showSearch">{{ props.user }}</span>
          <span v-else>
            <form @submit="searchUser">
              <input
                type="text"
                v-model="searchTerm"
                placeholder="Press Enter to submit"
              />
            </form>
          </span>
        </div>
      </h1>
      <h1>Repos</h1>
      <RepoItem :key="repo.id" v-for="repo in repos" v-bind="repo" />
    </div>
    <div v-else>
      <button @click="() => this.$router.go(-2)">
        <h1>No Repos Found :(</h1>
      </button>
    </div>
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

let repos = await fetch(`https://api.github.com/users/${props.user}/repos`)
  .then((res) => res.json())
  .then((res) =>
    res.map((repo) => ({
      id: repo.id,
      name: repo.name,
      url: repo.html_url,
      description: repo.description,
      createdAt: repo.created_at,
      pushedAt: repo.pushed_at,
      fullName: repo.full_name,
    }))
  )
  .then((res) =>
    res.sort((a, b) => {
      if (b.pushedAt < a.pushedAt) {
        return -1;
      } else if (b.pushedAt > a.pushedAt) {
        return 1;
      } else {
        return 0;
      }
    })
  )
  .catch(() => {
    return [];
  });

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
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  font-size: inherit;
  color: inherit;
  background-color: inherit;
  border-radius: 2%;
  border: none;
  font-weight: inherit;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  padding: 0.5rem;
  margin: 0.5rem;

  &:hover {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
    background-color: inherit;
    cursor: pointer;
  }
}

.repos-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
