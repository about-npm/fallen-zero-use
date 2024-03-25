/*
 * @Author       : fallen_zero
 * @Date         : 2024-03-25 15:39:11
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-03-25 15:39:19
 * @FilePath     : /zero-use/src/useRem/index.ts
 * @FileName     : rem 比例转换
 */

/** rem 比例转换请求类型 */
export interface UseRemParams {
  /** 设计稿宽度 */
  designWidth?: number;
  /** 基准值 */
  size?: number;
  /** 是否开启监听 */
  listener?: boolean;
  /** 是否立即执行 */
  immediate?: boolean;
  /** 根元素的宽度 */
  rootWidth?: number;
}

/**
 * rem 比例转换
 * @param {object} params 参数
 * @param {number} [params.designWidth=1920] 设计稿宽度, 默认 1920
 * @param {number} [params.size=192] 基准值, 默认 192
 * @param {boolean} [params.listener=true] 是否开启监听, 默认 true
 * @param {boolean} [params.immediate=true] 是否立即执行, 默认 true
 * @param {number} [params.rootWidth] 根元素的宽度, 用于固定 rem 使用
 */
export function useRem({
  designWidth: defaultDesignWidth = 1920,
  size: defaultSize = 192,
  listener: defaultListener = true,
  immediate = true,
  rootWidth: defaultRootWidth,
}: UseRemParams = {}) {
  // 获取 HTML 根元素
  const root = document.documentElement;
  // dpr 物理像素比
  const dpr = window.devicePixelRatio || 1;
  // 延迟
  let tid: ReturnType<typeof setTimeout> | null = null;
  // 设计稿宽度
  let screenWidth = defaultDesignWidth;
  // 基准值
  let baseSize = defaultSize;
  // 根元素宽度
  let rootWidth = defaultRootWidth;

  /** 设置 body 字体大小 */
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = `${12 * dpr}px`;
      return;
    }
    document.addEventListener('DOMContentLoaded', setBodyFontSize);
  }

  setBodyFontSize();

  /** 刷新 rem */
  function refreshRem() {
    const scale = screenWidth / baseSize;
    const width = rootWidth || root.clientWidth;
    root.style.fontSize = `${width / scale}px`;
  }

  /** 监听窗口变化 */
  function onResize() {
    !!tid && clearTimeout(tid);
    tid = setTimeout(refreshRem, 300);
  }

  /** 开启监听 */
  function startListener() {
    window.addEventListener('resize', onResize, false);

    window.addEventListener(
      'pageshow',
      (e) => {
        if (e.persisted) {
          onResize();
        }
      },
      false
    );
  }

  /** 取消监听 */
  function stopListener() {
    window.removeEventListener('resize', onResize, false);
    window.removeEventListener(
      'pageshow',
      (e) => {
        if (e.persisted) {
          onResize();
        }
      },
      false
    );
  }

  /** 修改 rem */
  function changeRem({
    designWidth = defaultDesignWidth,
    size = defaultSize,
    listener = defaultListener,
    rootWidth: newRootWidth,
  }: Omit<UseRemParams, 'immediate'> = {}) {
    screenWidth = designWidth;
    baseSize = size;
    rootWidth = newRootWidth;
    listener && startListener();
    !listener && stopListener();
    refreshRem();
  }

  if (immediate) {
    defaultListener && startListener();
    refreshRem();
  }

  return {
    changeRem,
  };
}
