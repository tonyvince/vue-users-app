<template>
  <div class="max-w-4xl mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-6">User List</h1>
    <ul class="space-y-4">
      <li v-for="user in users" :key="user.id" class="bg-white p-6 rounded-lg shadow">
        <p class="text-lg font-semibold">{{ user.attributes.email }}</p>
        <p class="text-gray-600">Joined: {{ new Date(user.attributes.created_at).toLocaleDateString() }}</p>
      </li>
    </ul>
    <button v-if="hasMore" @click="loadMore" class="mt-6 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ease-in-out duration-150">
      Load More
    </button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      hasMore: true,
      lastUserId: null,
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      const afterParam = this.lastUserId ? `?after=${this.lastUserId}` : '';
      axios.get(`http://localhost:3000/api/v1/users${afterParam}`, {
        headers: { Authorization: localStorage.getItem('accessToken') },
      })
        .then(response => {
          const newData = response.data.users.data;
          this.users = [...this.users, ...newData];
          this.hasMore = response.data.pagination.has_more;
          this.lastUserId = newData.length > 0 ? newData[newData.length - 1].id : null;
        })
        .catch(error => {
          console.error("Error fetching users:", error);
          if (error.response && error.response.status === 401) {
            this.$router.push('/login');
          }
        });
    },
    loadMore() {
      this.fetchUsers();
    },
  },
};
</script>

<style scoped>
button {
  display: block;
  width: 100%;
  text-align: center;
}
</style>
