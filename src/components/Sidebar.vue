<template>
  <aside
    :class="[
      'fixed left-0 top-16 h-[calc(100vh-64px)] border-r bg-white shadow-sm transition-all duration-300 ease-in-out z-30',
      isCollapsed ? 'w-16' : 'w-64'
    ]"
  >    
    <div class="flex-1 overflow-y-auto py-4">
      <nav class="flex flex-col">
        <router-link
          v-for="(item, index) in navigationItems" 
          :key="item.path"
          :to="item.path"
          :class="`
            flex items-center px-4 py-3 my-1 mx-2 rounded-lg transition-all duration-200
            ${$route.path === item.path ? 'bg-gray-100 text-primary font-medium' : 'text-gray-700 hover:bg-gray-50'}
            ${isCollapsed ? 'justify-center mx-1' : ''}
          `"
        >
          <component :is="item.icon" :size="20" />
          <span v-if="!isCollapsed" class="ml-3">{{ item.label }}</span>
        </router-link>
      </nav>
      
      <div class="mt-6 pt-6 border-t mx-4" v-if="!isCollapsed">
        <div class="text-xs uppercase text-gray-500 mb-2 px-2">Utilities</div>
        <nav class="flex flex-col">
          <router-link
            v-for="(item, index) in utilityItems" 
            :key="item.path"
            :to="item.path"
            :class="`
              flex items-center px-4 py-3 my-1 rounded-lg transition-all duration-200
              ${$route.path === item.path ? 'bg-gray-100 text-primary font-medium' : 'text-gray-700 hover:bg-gray-50'}
            `"
          >
            <component :is="item.icon" :size="20" />
            <span class="ml-3">{{ item.label }}</span>
          </router-link>
        </nav>
      </div>
      
      <div v-else class="mt-6 pt-6 border-t">
        <nav class="flex flex-col">
          <router-link
            v-for="(item, index) in utilityItems" 
            :key="item.path"
            :to="item.path"
            :class="`
              flex items-center justify-center p-3 my-1 mx-1 rounded-lg transition-all duration-200
              ${$route.path === item.path ? 'bg-gray-100 text-primary font-medium' : 'text-gray-700 hover:bg-gray-50'}
            `"
          >
            <component :is="item.icon" :size="20" />
          </router-link>
        </nav>
      </div>
    </div>
    
    <div class="border-t p-4" v-if="!isCollapsed">
      <div class="text-xs text-center text-gray-500">
        <p>Design Version 1.0</p>
      </div>
    </div>
  </aside>
</template>

<script>
import { ref } from 'vue';
import { 
  Home,
  LayoutDashboard, 
  MessageSquare, 
  FileText, 
  Settings,
  HelpCircle
} from 'lucide-vue-next';

export default {
  name: 'Sidebar',
  components: {
    Home,
    LayoutDashboard,
    MessageSquare,
    FileText,
    Settings,
    HelpCircle
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const isCollapsed = ref(props.modelValue);
    
    const navigationItems = [
      { icon: 'Home', label: 'Home', path: '/' },
      { icon: 'LayoutDashboard', label: 'Dashboard', path: '/overview' },
      { icon: 'MessageSquare', label: 'Messages', path: '/chat' },
      { icon: 'FileText', label: 'Gallery', path: '/documents' },
    ];

    const utilityItems = [
      { icon: 'Settings', label: 'Settings', path: '/settings' },
      { icon: 'HelpCircle', label: 'Help', path: '/help' },
    ];

    return {
      isCollapsed,
      navigationItems,
      utilityItems
    };
  }
}
</script>

<style scoped>
aside {
  z-index: 40;
}
</style>