<template>
  <div class="commit">
    <a :href="url">
      <div class="commit-header">
        <span class="commit-sha">
          {{ sha.substring(0, 7) }}
        </span>
        <span class="commit-date">{{ formatDate(date) }}</span>
      </div>
      <p>
        {{ message }}
      </p>
    </a>
  </div>
</template>

<script setup>
defineProps({
  sha: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  author: {
    type: Object,
    required: true,
  },
});

function formatDate(date) {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };
  return date.toLocaleDateString("en-US", options);
}
</script>

<style scoped lang="scss">
.commit {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 0.25rem;
  background-color: #fafafa;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
  min-width: 20%;

  a {
    text-decoration: none;
    color: inherit;
    width: 100%;
    height: 100%;
    padding: 0;

    .commit-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem;

      .commit-sha {
        font-size: 1.25rem;
        font-weight: bold;
        margin-right: 0.5rem;
      }

      .commit-date {
        font-size: 0.875rem;
        font-weight: bold;
      }
    }

    p {
      font-size: 0.875rem;
      margin: 0.5rem;
    }
  }

  &:hover {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.4);
  }
}
</style>
