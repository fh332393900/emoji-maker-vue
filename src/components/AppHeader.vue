<template>
  <header class="glow-bg">
    <h1>Emoji Maker</h1>
    <div class="theme">
      <img
        :class="{'white-filter': theme === 'dark'}"
        :src="theme === 'light' ? sun : moon"
        width="24"
        height="24"
        alt="sun icon"
        @click="toggleTheme"
      />
    </div>
  </header>
</template>

<script lang="ts" setup name="AppHeader">
import { useTheme } from '@/hooks/useDark';
import type { Theme } from '@/hooks/useDark';
import sun from '../assets/svg/sun.svg';
import moon from '../assets/svg/moon.svg';
import { ref } from 'vue';

const { setTheme, getTheme } = useTheme();
const nowTheme = getTheme();
const theme = ref<Theme>(nowTheme);

const toggleTheme = () => {
  const val = theme.value === 'light' ? 'dark' : 'light';
  theme.value = val;
  setTheme(val);
};
const initTheme = () => {
  setTheme(theme.value);
};
initTheme();
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h1 {
  font-weight: 800;
  font-size: 18px;
}
.theme {
  cursor: pointer;
}
.white-filter {
  filter: invert(1);
}
</style>
