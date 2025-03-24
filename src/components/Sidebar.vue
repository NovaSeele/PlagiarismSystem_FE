<template>
  <aside 
    :class="`bg-gray-800 text-white w-64 flex-shrink-0 transition-all duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } lg:translate-x-0 fixed lg:static h-full z-10`"
  >
    <div class="p-4 border-b border-gray-700">
      <h2 class="text-xl font-bold">Menu</h2>
    </div>
    <nav class="mt-4">
      <ul>
        <li v-for="(item, index) in menuItems" :key="index">
          <a 
            href="#" 
            class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          >
            <span class="mr-3">
              <component :is="item.icon" :size="20" />
            </span>
            <span>{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
import { Home, Settings, HelpCircle, FileText, Users, ShoppingCart } from 'lucide-vue-next';

export default {
  components: {
    Home,
    Settings,
    HelpCircle,
    FileText,
    Users,
    ShoppingCart
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const menuItems = [
      { icon: 'Home', label: 'Trang chủ' },
      { icon: 'FileText', label: 'Bài viết' },
      { icon: 'Users', label: 'Người dùng' },
      { icon: 'ShoppingCart', label: 'Sản phẩm' },
      { icon: 'Settings', label: 'Cài đặt' },
      { icon: 'HelpCircle', label: 'Trợ giúp' },
    ];

    return {
      menuItems
    };
  }
}
</script>