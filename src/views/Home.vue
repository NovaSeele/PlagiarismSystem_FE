<template>
  <MainLayout>
    <div class="max-w-6xl mx-auto space-y-10">
      <!-- Hero Section -->
      <section class="animate-fade-in mb-12">
        <div class="max-w-3xl">
          <div class="inline-flex items-center px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-sm mb-6 animate-slide-in-bottom delay-1">
            <span class="text-primary/70 font-medium">Minimalist Design System</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-display font-medium leading-tight mb-4 text-balance animate-slide-in-bottom delay-2">
            Create beautiful interfaces with precision & elegance
          </h1>
          <p class="text-xl text-muted-foreground mb-8 text-balance max-w-2xl animate-slide-in-bottom delay-3">
            This design system embraces simplicity and functionality, inspired by the principles of minimal design that puts user experience first.
          </p>
          <div class="flex flex-wrap gap-4 animate-slide-in-bottom delay-4">
            <button 
              class="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg bg-primary text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              @click="handleAction"
              :disabled="isLoading"
            >
              Get started
              <ArrowRightIcon :size="16" class="ml-2" />
            </button>
            <button 
              class="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              @click="handleAction"
              :disabled="isLoading"
            >
              View components
            </button>
          </div>
        </div>
      </section>
      
      <!-- Features Section -->
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard 
          :icon="LightbulbIcon"
          title="Intuitive Design"
          description="Every element is designed with both aesthetics and usability in mind."
          :index="0"
        />
        <FeatureCard 
          :icon="BarChartIcon"
          title="Powerful Components"
          description="A comprehensive set of flexible components to build modern interfaces."
          :index="1"
        />
        <FeatureCard 
          :icon="TrendingUpIcon"
          title="Optimized Performance"
          description="Lightweight and fast, with smooth animations and transitions."
          :index="2"
        />
      </section>
      
      <!-- Content Section -->
      <section class="bg-secondary/30 -mx-8 px-8 py-16 mt-20 border-y">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl font-display font-medium mb-4 animate-fade-in">Design Principles</h2>
          <p class="text-muted-foreground mb-12 animate-fade-in">
            These core principles guide our approach to creating minimal, functional, and beautiful interfaces.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PrincipleCard 
              number="01"
              title="Simplicity"
              description="Eliminate unnecessary elements. If it doesn't serve a purpose, it doesn't belong."
            />
            <PrincipleCard 
              number="02"
              title="Clarity"
              description="Every design choice should enhance understanding and reduce cognitive load."
            />
            <PrincipleCard 
              number="03"
              title="Consistency"
              description="Maintain visual and functional consistency across the entire interface."
            />
            <PrincipleCard 
              number="04"
              title="Feedback"
              description="Provide clear feedback for every user interaction with subtle animations."
            />
          </div>
        </div>
      </section>
    </div>
  </MainLayout>
</template>

<script>
import { ref } from 'vue';
import MainLayout from '@/components/MainContent.vue';
import { ArrowRightIcon, BarChartIcon, LightbulbIcon, LineChartIcon, TrendingUpIcon } from 'lucide-vue-next';

// Feature Card Component
const FeatureCard = {
  name: 'FeatureCard',
  props: {
    icon: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  components: {
    ArrowRightIcon
  },
  template: `
    <div :class="['glass-card overflow-hidden animate-slide-in-bottom', 'delay-' + index]">
      <div class="pb-2 p-6">
        <div class="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-2">
          <component :is="icon" :size="24" class="text-primary" />
        </div>
        <h3 class="text-xl font-medium">{{ title }}</h3>
      </div>
      <div class="px-6 pb-4">
        <p class="text-muted-foreground">{{ description }}</p>
      </div>
      <div class="px-6 pb-6 pt-0">
        <button class="inline-flex items-center text-sm text-primary px-0 py-0 bg-transparent hover:underline focus:outline-none">
          Learn more
          <ArrowRightIcon :size="14" class="ml-1" />
        </button>
      </div>
    </div>
  `
};

// Principle Card Component
const PrincipleCard = {
  name: 'PrincipleCard',
  props: {
    number: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  template: `
    <div class="text-left p-6 border rounded-xl bg-background animate-fade-in">
      <div class="text-xl font-display text-primary/60 mb-2">{{ number }}</div>
      <h3 class="text-xl font-medium mb-2">{{ title }}</h3>
      <p class="text-muted-foreground">{{ description }}</p>
    </div>
  `
};

export default {
  name: 'Home',
  components: {
    MainLayout,
    ArrowRightIcon,
    BarChartIcon,
    LightbulbIcon,
    LineChartIcon,
    TrendingUpIcon,
    FeatureCard,
    PrincipleCard
  },
  setup() {
    const isLoading = ref(false);
    
    const handleAction = () => {
      isLoading.value = true;
      setTimeout(() => isLoading.value = false, 1500);
    };
    
    return {
      isLoading,
      handleAction,
      LightbulbIcon,
      BarChartIcon,
      TrendingUpIcon
    };
  }
}
</script>

<style>
/* Add any additional styles needed for animations */
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
</style>