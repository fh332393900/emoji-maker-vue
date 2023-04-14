<template>
  <div
    class="h-64 w-64 flex justify-center items-center button"
    :class="{border: props.active, bg: props.active}"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup name="SelectButton">
type PropsTypes = {
  active: boolean;
};

const props = withDefaults(defineProps<PropsTypes>(), {
  active: false,
});
</script>

<style scoped>
.button {
  min-width: 64px;
  border-radius: 0.375rem;
  background-color: var(--color-box-small);
  cursor: pointer;
  transition: all 0.2s;
  transition-property: color,background-color;
}
.button:hover {
  background-color: rgba(221,214,254);
  border: 2px solid rgba(167,139,250);
}
.border {
  border: 2px solid rgba(167,139,250);
}
.bg {
  background-color: rgba(221,214,254);
}
</style>
