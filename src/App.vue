<template>
  <div class="min-h-screen bg-gray-50 flex">
    <Sidebar v-if="userStore.isAuthenticated" />
    <div class="flex-1 flex flex-col">
      <Header />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { useUserStore } from './stores/user';
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';

export default {
  components: {
    Header,
    Sidebar
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  }
}
</script>