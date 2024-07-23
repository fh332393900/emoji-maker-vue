<script setup lang="ts" name="AppUpdateNotice">
// @ts-ignore
import { useRegisterSW } from 'virtual:pwa-register/vue';

const {
  offlineReady,
  needRefresh,
  updateServiceWorker,
} = useRegisterSW({
  immediate: true,
  onRegisteredSW(swUrl: any, r: any) {
    r && setInterval(async () => {
      // 检查更新，如果vite.config.ts配置为autoUpdate，此操作将直接触发更新，并刷新页面激活更新
      await r.update();
    }, 30000);
  },
});

async function close() {
  offlineReady.value = false;
  needRefresh.value = false;
}
</script>

<template>
  <div
    v-if="needRefresh"
    class="pwa-toast"
    role="alert"
  >
    <div class="message">
      <span v-if="offlineReady">
        {{ $t('appInfo.app_ready') }}
      </span>
      <span v-else>
        {{ $t('appInfo.app_update_notice') }}
      </span>
    </div>
    <button
      class="reload"
      @click="updateServiceWorker()"
    >
      {{ $t('action.reload')}}
    </button>
    <button @click="close">
      {{ $t('action.close')}}
    </button>
  </div>
</template>

<style scoped>
.pwa-toast {
  max-width: 260px;
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 16px;
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 4px;
  z-index: 1;
  text-align: left;
  box-shadow: 3px 4px 5px 0px #8885;
  background-color: var(--color-box);
}
.message {
  margin-bottom: 10px;
}
button {
  border: none;
  padding: 6px 12px;
  margin-right: 12px;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 5px;
  color: var(--color-text);
  background-color: var(--color-box-small);;
  font-weight: 600;
}
.reload {
  background-color: rgb(99, 234, 110);
}
button:hover {
  background-color: rgba(221,214,254,0.7);
}
.reload:hover {
  background-color: rgb(75, 215, 87);
}
</style>
