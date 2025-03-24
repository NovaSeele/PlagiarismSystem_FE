<template>
  <header 
    class="fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out border-b bg-white h-16"
    :class="[isScrolled ? 'shadow-sm' : '']"
  >
    <div class="flex items-center justify-between h-full px-6">
      <div class="flex items-center">
        <button 
          v-if="userStore.isAuthenticated"
          class="btn-ghost btn-icon mr-4"
          @click="toggleSidebar"
        >
          <component :is="isSidebarCollapsed ? 'MenuIcon' : 'XIcon'" :size="18" />
        </button>
        <router-link to="/" class="text-xl font-medium text-gray-900">
          {{ currentRouteName }}
        </router-link>
      </div>
      
      <div class="flex items-center gap-4">
        <template v-if="!userStore.isAuthenticated">
          <router-link 
            to="/login"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-lg border border-gray-300 transition-colors"
          >
            <LogIn class="w-4 h-4 mr-2" />
            <span>Sign in</span>
          </router-link>
          <router-link 
            to="/register"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-lg shadow-sm transition-colors"
          >
            <span>Sign up</span>
          </router-link>
        </template>
        
        <div v-else class="flex items-center space-x-4">
          <button class="btn-ghost btn-icon relative">
            <BellIcon :size="20" />
            <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div class="relative">
            <button 
              class="flex items-center"
              @click="isMenuOpen = !isMenuOpen"
            >
              <img 
                v-if="userStore.user && userStore.user.avatar"
                :src="userStore.user.avatar" 
                :alt="userStore.user.full_name"
                class="w-8 h-8 rounded-full object-cover border border-gray-200"
              />
              <div v-else class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <UserIcon :size="16" class="text-gray-600" />
              </div>
            </button>
            
            <!-- Dropdown Menu -->
            <div 
              v-if="isMenuOpen"
              class="absolute right-0 mt-2 w-64 rounded-lg shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
            >
              <div class="px-4 py-3 text-sm text-gray-700 border-b">
                <div class="flex items-center space-x-3">
                  <div class="relative group">
                    <img 
                      v-if="userStore.user && userStore.user.avatar"
                      :src="userStore.user.avatar" 
                      :alt="userStore.user.full_name"
                      class="w-12 h-12 rounded-full object-cover border border-gray-200"
                    />
                    <div v-else class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <UserIcon :size="20" class="text-gray-600" />
                    </div>
                    <label 
                      class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                      :class="{ 'cursor-wait': uploadingAvatar }"
                    >
                      <input 
                        type="file" 
                        accept="image/*" 
                        class="hidden"
                        @change="handleAvatarChange"
                        :disabled="uploadingAvatar"
                      />
                      <Camera class="w-5 h-5 text-white" />
                    </label>
                  </div>
                  <div>
                    <div class="font-medium">{{ userStore.user ? userStore.user.full_name : 'User' }}</div>
                    <div class="text-xs text-gray-500">{{ userStore.user ? userStore.user.email : 'user@example.com' }}</div>
                  </div>
                </div>
              </div>
              
              <router-link 
                to="/settings"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </router-link>
              
              <a 
                href="#" 
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                @click="handleLogout"
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { User as UserIcon, LogIn, Camera, Bell as BellIcon, Menu as MenuIcon, X as XIcon } from 'lucide-vue-next';
import { useUserStore } from '../stores/user';
import { useRouter, useRoute } from 'vue-router';
import { updateMSV, uploadAvatar, changePassword } from '../api/auth';

export default {
  name: 'Header',
  components: {
    UserIcon,
    LogIn,
    Camera,
    BellIcon,
    MenuIcon,
    XIcon
  },
  props: {
    isSidebarCollapsed: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle-sidebar'],
  setup(props, { emit }) {
    const userStore = useUserStore();
    const router = useRouter();
    const route = useRoute();
    const isMenuOpen = ref(false);
    const isScrolled = ref(false);
    const uploadingAvatar = ref(false);
    
    const toggleSidebar = () => {
      emit('toggle-sidebar');
    };
    
    // Computed property to get current route name
    const currentRouteName = computed(() => {
      if (route.name === 'Home') return 'Minimal';
      return route.name || 'Minimal';
    });
    
    // Handle scroll events
    const handleScroll = () => {
      isScrolled.value = window.scrollY > 10;
    };
    
    // Handle logout
    const handleLogout = async () => {
      try {
        await userStore.logout();
        router.push('/login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };
    
    // Handle avatar change
    const handleAvatarChange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      
      uploadingAvatar.value = true;
      try {
        const formData = new FormData();
        formData.append('avatar', file);
        
        const response = await uploadAvatar(formData);
        if (response.success) {
          userStore.updateUser({ avatar: response.avatar_url });
        }
      } catch (error) {
        console.error('Avatar upload failed:', error);
      } finally {
        uploadingAvatar.value = false;
      }
    };
    
    // Setup scroll event listener
    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial scroll position
    });
    
    return {
      userStore,
      isMenuOpen,
      isScrolled,
      uploadingAvatar,
      currentRouteName,
      handleLogout,
      handleAvatarChange,
      toggleSidebar,
      isSidebarCollapsed: props.isSidebarCollapsed
    };
  }
}
</script>