<template>
  <main class="flex-1 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-semibold text-gray-900 mb-8">Chào mừng đến với ứng dụng của chúng tôi</h2>
      
      <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h3 class="text-xl font-medium text-gray-900 mb-4">Giới thiệu</h3>
        <p class="text-gray-600">
          Đây là trang chủ của ứng dụng. Bạn có thể tìm thấy tất cả các thông tin và tính năng quan trọng tại đây.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="item in 3" :key="item" class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
          <h3 class="text-lg font-medium text-gray-900 mb-2">Tính năng {{ item }}</h3>
          <p class="text-gray-600 mb-4">
            Mô tả ngắn gọn về tính năng này và cách nó có thể giúp người dùng.
          </p>
          <button class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full transition-colors">
            Tìm hiểu thêm
            <svg class="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Home'
}
</script>