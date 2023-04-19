<template>
  <header class="glow-bg">
    <h1>Emoji Maker</h1>
    <div class="btn">
      <div class="language">
        <svg @click.stop="menuShow = true" viewBox="0 0 24 24" width='1em' height='1em' xmlns='http://www.w3.org/2000/svg'>
          <path fill="currentColor"
            d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z">
          </path>
        </svg>
        <ul v-if="menuShow" ref="dropdownMenuRef" class="dropdown-menu">
          <li
            :class="{active: $i18n.locale === locale}"
            v-for="locale in $i18n.availableLocales"
            :key="`locale-${locale}`"
            :value="locale"
            @click="changeLanguage(locale)"
          >
          {{ handleLocaleName(locale) }}
          </li>
        </ul>
      </div>
      <div class="theme">
        <img :class="{ 'white-filter': theme === 'dark' }" :src="theme === 'light' ? sun : moon" width="24" height="24"
          alt="sun icon" @click="toggleTheme" />
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup name="AppHeader">
import { useTheme } from '@/hooks/useDark';
import type { Theme } from '@/hooks/useDark';
import { locales } from '../locales/i18n';
import { useI18n } from 'vue-i18n';
import sun from '../assets/svg/sun.svg';
import moon from '../assets/svg/moon.svg';
import { ref, watch } from 'vue';
import useClickOutside from '../hooks/useClickOutside';

const { setTheme, getTheme } = useTheme();
const nowTheme = getTheme();
const theme = ref<Theme>(nowTheme);
const menuShow = ref(false);
const { locale } = useI18n();
const dropdownMenuRef = ref<null | HTMLElement>(null);

const isDropdownMenuOutside = useClickOutside(dropdownMenuRef);

watch(menuShow, (newValue) => {
  if (newValue) {
    document.body.addEventListener('click', closeMenu);
  } else {
    document.body.removeEventListener('click', closeMenu);
  }
});

const toggleTheme = () => {
  const val = theme.value === 'light' ? 'dark' : 'light';
  theme.value = val;
  setTheme(val);
};
const initTheme = () => {
  setTheme(theme.value);
};
const handleLocaleName = (locale: string) => {
  const target = locales.find(item => item.code === locale);
  return target?.name;
};
const changeLanguage = (lang: string) => {
  locale.value = lang;
  localStorage.setItem('lang', lang);
  menuShow.value = false;
};
function closeMenu() {
  if (isDropdownMenuOutside.value) {
    menuShow.value = false;
  }
}

initTheme();
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
}

h1 {
  font-weight: 800;
  font-size: 18px;
}

.btn {
  display: flex;
  align-items: center;
}

.language {
  position: relative;
  cursor: pointer;
  font-size: 24px;
}

.theme {
  margin-left: 12px;
  cursor: pointer;
}
.white-color {
  color: #fff;
}
.white-filter {
  filter: invert(1);
}
.dropdown-menu {
  position: absolute;
  top: 40px;
  right: 0;
  min-width: 10rem;
  background-color: var(--color-menu);
  list-style: none;
  font-size: 14px;
  padding: 12px;
  border-radius: 0.4rem;
  box-shadow: 0 5px 40px rgba(0, 0, 0 .2);
  color: var(--color-text);
}
.dropdown-menu li {
  cursor: pointer;
  list-style: none;
  padding: 4px 8px;
  border-radius: 4px;
}
.dropdown-menu li:hover {
  background-color: var(--color-menu-item);
}
.active {
  color: var(--primary);
}
</style>
