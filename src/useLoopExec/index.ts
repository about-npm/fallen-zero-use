/*
 * @Author       : fallen_zero
 * @Date         : 2024-07-23 14:24:55
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-07-23 14:29:27
 * @FilePath     : /fallen-zero-use/src/useLoopExec/index.ts
 * @FileName     :
 */

/**
 * 定时执行函数
 * @param {() => Promise<void> | void} fn 需要执行函数
 * @param {number} [interval] 时间间隔（毫秒）, 默认20000ms
 * @returns {loop: () => void, cancel: () => void} loop: 执行函数, cancel: 取消函数
 */
export function useLoopExec(
  fn: () => Promise<void> | void,
  interval: number = 20000
): {
  loop: () => void;
  cancel: () => void;
} {
  let timer: ReturnType<typeof setTimeout> | null = null;

  function cancel() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  async function loop() {
    cancel();
    await fn();
    timer = setTimeout(() => {
      loop();
    }, interval);
  }

  return {
    /** 执行函数 */
    loop,
    /** 取消函数 */
    cancel,
  };
}
