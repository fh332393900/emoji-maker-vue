<template>
  <footer>
    <div class="app-info">
      <span>{{ buildInfo.env.MODE }}</span>
      &middot;
      <span :title="date">{{ $t("appInfo.built_at", [shortDate]) }}</span>
      &middot;
      <Link :href="`https://github.com/fh332393900/emoji-maker-vue/releases/tag/${buildInfo.version}`">
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
    </div>
  </footer>
</template>

<script lang="ts" setup name="AppFooter">
import { ref, watch } from 'vue';
import { useAppStore } from '@/stores/app';
import { useDayJs } from '../hooks/useDayJs';
import { useAppConfig } from '../hooks/useAppConfig';
import Link from './Link.vue';

const store = useAppStore();
const { dayjs } = useDayJs();
const { buildInfo } = useAppConfig();
const shortDate = ref('');
const date = ref('');

watch(
  () => store.language,
  () => {
    shortDate.value = dayjs(buildInfo.buildDate).fromNow();
    date.value = dayjs(buildInfo.buildDate).format('LLL');
  },
  { immediate: true }
);
</script>

<style scoped>
footer {
  margin-top: 24px;
}
.app-info {
  text-align: center;
}
.app-info span {
  font-style: italic;
  font-weight: 600;
  font-size: 0.8rem;
}
</style>
