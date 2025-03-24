<template>
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <div class="flex items-center">
          <router-link to="/" class="text-xl font-medium text-gray-900">My Application</router-link>
        </div>
        
        <div class="flex items-center space-x-3">
          <template v-if="!userStore.isAuthenticated">
            <router-link 
              to="/login"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full border border-gray-300 transition-colors"
            >
              <LogIn class="w-4 h-4 mr-2" />
              <span>Đăng nhập</span>
            </router-link>
            <router-link 
              to="/register"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full shadow-sm transition-colors"
            >
              <User class="w-4 h-4 mr-2" />
              <span>Đăng ký</span>
            </router-link>
          </template>
          
          <div v-else class="flex items-center space-x-4">
            <span class="text-sm text-gray-700">{{ userStore.user.full_name }}</span>
            <div class="relative group">
              <button 
                class="flex items-center focus:outline-none"
                @click="isMenuOpen = !isMenuOpen"
              >
                <img 
                  :src="userStore.user.avatar" 
                  :alt="userStore.user.full_name"
                  class="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                />
              </button>
              
              <!-- Dropdown Menu -->
              <div 
                v-if="isMenuOpen"
                class="absolute right-0 mt-2 w-64 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="px-4 py-2 text-sm text-gray-700 border-b">
                  <div class="flex items-center space-x-2">
                    <div class="relative group">
                      <img 
                        :src="userStore.user.avatar" 
                        :alt="userStore.user.full_name"
                        class="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                      />
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
                        <Camera class="w-6 h-6 text-white" />
                      </label>
                    </div>
                    <div>
                      <div class="font-medium">{{ userStore.user.full_name }}</div>
                      <div class="text-sm text-gray-500">{{ userStore.user.email }}</div>
                    </div>
                  </div>
                  
                  <template v-if="userStore.user.msv">
                    <div class="mt-2 text-sm text-gray-500">MSV: {{ userStore.user.msv }}</div>
                  </template>
                  <template v-else>
                    <div class="mt-2">
                      <input
                        type="text"
                        v-model="newMSV"
                        placeholder="Nhập MSV của bạn"
                        class="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        @click="handleUpdateMSV"
                        :disabled="updating"
                        class="mt-2 w-full px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                      >
                        {{ updating ? 'Đang cập nhật...' : 'Cập nhật MSV' }}
                      </button>
                      <div v-if="updateError" class="mt-1 text-xs text-red-500">
                        {{ updateError }}
                      </div>
                    </div>
                  </template>

                  <!-- Password Change Section -->
                  <div class="mt-3 pt-3 border-t">
                    <div v-if="showPasswordChange">
                      <input
                        type="password"
                        v-model="oldPassword"
                        placeholder="Mật khẩu cũ"
                        class="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 mb-2"
                      />
                      <input
                        type="password"
                        v-model="newPassword"
                        placeholder="Mật khẩu mới"
                        class="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 mb-2"
                      />
                      <input
                        type="password"
                        v-model="confirmNewPassword"
                        placeholder="Xác nhận mật khẩu mới"
                        class="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <div class="flex space-x-2 mt-2">
                        <button
                          @click="handlePasswordChange"
                          :disabled="changingPassword"
                          class="flex-1 px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                          {{ changingPassword ? 'Đang cập nhật...' : 'Cập nhật' }}
                        </button>
                        <button
                          @click="showPasswordChange = false"
                          class="flex-1 px-3 py-1 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded focus:outline-none"
                        >
                          Hủy
                        </button>
                      </div>
                      <div v-if="passwordError" class="mt-1 text-xs text-red-500">
                        {{ passwordError }}
                      </div>
                    </div>
                    <button
                      v-else
                      @click="showPasswordChange = true"
                      class="w-full py-1 text-sm text-gray-700 hover:bg-gray-100 rounded focus:outline-none text-left"
                    >
                      Đổi mật khẩu
                    </button>
                  </div>
                </div>
                <a 
                  href="#" 
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="handleLogout"
                >
                  Đăng xuất
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, onMounted } from 'vue';
import { User, LogIn, Camera } from 'lucide-vue-next';
import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router';
import { updateMSV, uploadAvatar, changePassword } from '../api/auth';

export default {
  components: {
    User,
    LogIn,
    Camera
  },
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const isMenuOpen = ref(false);
    const newMSV = ref('');
    const updating = ref(false);
    const updateError = ref('');
    
    // Avatar upload state
    const uploadingAvatar = ref(false);
    
    // Password change state
    const showPasswordChange = ref(false);
    const oldPassword = ref('');
    const newPassword = ref('');
    const confirmNewPassword = ref('');
    const changingPassword = ref(false);
    const passwordError = ref('');

    onMounted(async () => {
      await userStore.fetchUser();
    });

    const handleUpdateMSV = async () => {
      try {
        updating.value = true;
        updateError.value = '';
        
        await updateMSV(newMSV.value);
        await userStore.fetchUser();
        window.location.reload();
      } catch (err) {
        updateError.value = 'Cập nhật MSV thất bại. Vui lòng thử lại.';
      } finally {
        updating.value = false;
      }
    };

    const handleAvatarChange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      try {
        uploadingAvatar.value = true;
        await uploadAvatar(file);
        await userStore.fetchUser();
      } catch (err) {
        console.error('Error uploading avatar:', err);
      } finally {
        uploadingAvatar.value = false;
      }
    };

    const handlePasswordChange = async () => {
      try {
        if (newPassword.value !== confirmNewPassword.value) {
          passwordError.value = 'Mật khẩu xác nhận không khớp';
          return;
        }

        changingPassword.value = true;
        passwordError.value = '';

        await changePassword(oldPassword.value, newPassword.value);
        
        // Reset form
        showPasswordChange.value = false;
        oldPassword.value = '';
        newPassword.value = '';
        confirmNewPassword.value = '';
        
        // Show success message (you might want to use a toast notification here)
        alert('Đổi mật khẩu thành công');
      } catch (err) {
        passwordError.value = err.message || 'Đổi mật khẩu thất bại. Vui lòng thử lại.';
      } finally {
        changingPassword.value = false;
      }
    };

    const handleLogout = async () => {
      userStore.clearUser();
      router.push('/login');
    };

    return {
      userStore,
      isMenuOpen,
      newMSV,
      updating,
      updateError,
      uploadingAvatar,
      showPasswordChange,
      oldPassword,
      newPassword,
      confirmNewPassword,
      changingPassword,
      passwordError,
      handleUpdateMSV,
      handleAvatarChange,
      handlePasswordChange,
      handleLogout
    };
  }
}
</script>