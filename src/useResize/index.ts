/*
 * @Author       : fallen_zero
 * @Date         : 2025-05-28 16:47:32
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2025-05-28 16:49:17
 * @FilePath     : /fallen-zero-use/src/useResize/index.ts
 * @FileName     :
 */

const domMap = new WeakMap<Element, () => void>();

// 尺寸变化监听器
let resizeObserver: ResizeObserver | null = null;

function useResize() {
  if (!resizeObserver) {
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const callback = domMap.get(entry.target);
        if (callback) {
          callback();
        }
      }
    });
  }

  function observe(dom: Element | null | undefined, callback: () => void) {
    if (!dom) return;
    domMap.set(dom, callback);
    resizeObserver?.observe(dom);
  }

  function unobserve(dom: Element | null | undefined) {
    if (!dom) return;
    domMap.delete(dom);
    resizeObserver?.unobserve(dom);
  }

  return { observe, unobserve };
}

export default useResize;
