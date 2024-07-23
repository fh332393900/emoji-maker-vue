<template>
  <footer>
    <div class="app-info">
      <span>{{ buildInfo.env.MODE }}</span>
      &middot;
      <span :title="date">{{ $t("appInfo.built_at", [shortDate]) }}</span>
      &middot;
      <Link class="version" :href="`https://github.com/fh332393900/emoji-maker-vue/releases/tag/${buildInfo.version}`">
        v{{ buildInfo.version }}
      </Link>
    </div>
    <div class="author-info flex justify-center align-center">
      <Link href="https://stevenfeng.cn" target="_blank">
        Steven Feng
      </Link>
      <div style="margin: 0 12px;">|</div>
      <Link href="https://github.com/fh332393900/emoji-maker-vue" target="_blank">
        Github
      </Link>
      <div style="margin: 0 12px;">|</div>
      <div class="views">{{ $t('appInfo.views') }}{{ store.views }}</div>
    </div>
  </footer>
</template>

<script lang="ts" setup name="AppFooter">
import { ref, watch, watchEffect } from 'vue';
import { useAppStore } from '@/stores/app';
import { useDayJs } from '../hooks/useDayJs';
import { useAppConfig } from '../hooks/useAppConfig';
import Link from './Link.vue';

const store = useAppStore();
const { dayjs } = useDayJs();
const { buildInfo } = useAppConfig();
const shortDate = ref('');
const date = ref('');
const views = ref(0);

watch(
  () => store.language,
  () => {
    shortDate.value = dayjs(buildInfo.buildDate).fromNow();
    date.value = dayjs(buildInfo.buildDate).format('LLL');
  },
  { immediate: true }
);
watchEffect(() => {
  console.log(store.views, 'store.views');
  views.value = store.views;
});
</script>

<style scoped>
footer {
  margin-top: 24px;
}
.app-info {
  text-align: center;
}
.app-info span,.version {
  font-style: italic;
  font-weight: 600;
  font-size: 0.8rem;
}
.author-info >>> a {
  font-style: italic;
  font-weight: 600;
}
.views {
  font-weight: 600;
  font-style: italic;
}
</style>
