<template>
  <div class="min-h-screen bg-background flex flex-col">
    <!-- Header - Full width -->
    <Header :is-sidebar-collapsed="isSidebarCollapsed" @toggle-sidebar="toggleSidebar" />
    
    <!-- Main content area with sidebar -->
    <div class="flex flex-1 pt-16">
      <!-- Sidebar -->
      <Transition name="slide">
        <Sidebar 
          v-if="userStore.isAuthenticated" 
          v-model="isSidebarCollapsed"
          v-show="!isSidebarCollapsed"
        />
      </Transition>
      
      <!-- Main content -->
      <main 
        class="flex-1 overflow-y-auto pb-12 px-8 transition-all duration-300 ease-in-out"
        :class="[
          userStore.isAuthenticated ? (isSidebarCollapsed ? 'ml-0' : 'ml-64') : 'ml-0'
        ]"
      >
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
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
    const isSidebarCollapsed = ref(false);
    
    const toggleSidebar = () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value;
    };
    
    return { 
      userStore, 
      isSidebarCollapsed, 
      toggleSidebar 
    };
  }
}
</script>

<style>
:root {
  --background: #f8f9fa;
  --foreground: #1a1a1a;
  --primary: #3b82f6;
  --primary-foreground: #ffffff;
  --secondary: #f1f5f9;
  --secondary-foreground: #1e293b;
  --muted: #f1f5f9;
  --muted-foreground: #64748b;
  --accent: #f1f5f9;
  --accent-foreground: #1e293b;
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  --border: #e2e8f0;
  --input: #e2e8f0;
  --card: #ffffff;
  --card-foreground: #1a1a1a;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: var(--foreground);
  background-color: var(--background);
  line-height: 1.5;
  margin: 0;
  padding: 0;
}

.bg-background {
  background-color: var(--background);
}

.bg-primary {
  background-color: var(--primary);
}

.text-primary {
  color: var(--primary);
}

.bg-card {
  background-color: var(--card);
}

.text-muted-foreground {
  color: var(--muted-foreground);
}

.font-display {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-weight: 500;
}

.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.glass-light {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
}

.btn-ghost {
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.btn-ghost:hover {
  background-color: rgba(243, 244, 246, 1);
}

.btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Transition classes */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

/* Animation classes */
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

.animate-slide-in-bottom {
  animation: slideInBottom 0.5s ease-in-out;
}

.animate-slide-in-left {
  animation: slideInLeft 0.5s ease-in-out;
}

.delay-1 {
  animation-delay: 0.1s;
}

.delay-2 {
  animation-delay: 0.2s;
}

.delay-3 {
  animation-delay: 0.3s;
}

.delay-4 {
  animation-delay: 0.4s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInBottom {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideInLeft {
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>