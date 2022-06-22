<template>
  <div class="repo">
    <a :href="`/repos/${props.fullName}`">
      <div class="repo-header">
        <span class="name">
          {{ name }}
        </span>
        <span class="created-at">
          {{ formattedDate() }}
        </span>
      </div>
      <p>
        {{ props.description }}
      </p>
    </a>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  url: {
    type: String,
    default: "",
  },
  createdAt: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  fullName: {
    type: String,
    default: "",
  },
});

const formattedDate = () => {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  return new Date(props.createdAt).toLocaleDateString("en-US", options);
};
</script>

<style scoped lang="scss">
.repo {
  background-color: #fafafa;
  border-radius: 0.25rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  min-width: 20%;
  min-height: 100%;
  margin-bottom: 1rem;

  a {
    text-decoration: none;
    color: inherit;
    width: 100%;
    height: 100%;
    padding: 0;

    .repo-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly;
      padding: 0.5rem;

      .name {
        font-size: 1.5rem;
        font-weight: bold;
      }

      .created-at {
        font-size: 0.8rem;
        color: #999;
      }
    }
  }

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  }
}
</style>
