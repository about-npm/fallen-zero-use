import { ref } from 'vue';

export default function useVisible() {
  const visible = ref<boolean>(false);

  function toggle() {
    visible.value = !visible.value;
  }

  function close() {
    visible.value = false;
  }

  function open() {
    visible.value = true;
  }

  return {
    visible,
    toggle,
    close,
    open,
  };
}
