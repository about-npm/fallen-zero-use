/*
 * @Author       : fallen_zero
 * @Date         : 2023-12-07 10:16:01
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2023-12-23 11:32:46
 * @FilePath     : /zero-use/src/useDebounceRef/index.ts
 * @FileName     : 防抖 ref
 */

import { customRef, getCurrentInstance, onUnmounted } from 'vue';

/** 防抖 ref
 * @param value 值
 * @param [delay=200] 延迟时间(ms), 默认 200ms
 * @returns ref
 */
export function useDebounceRef<T>(value: T, delay: number = 200) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const clear = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  if (getCurrentInstance()) {
    onUnmounted(() => {
      clear();
    });
  }

  return customRef((tracker, trigger) => {
    return {
      get() {
        tracker();
        return value;
      },
      set(newValue: T) {
        clear();
        timer = setTimeout(() => {
          value = newValue;
          timer = null;
          trigger();
        }, delay);
      },
    };
  });
}
