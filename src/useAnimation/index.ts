/*
 * @Author       : fallen_zero
 * @Date         : 2023-10-25 16:06:42
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2023-10-25 16:06:51
 * @FilePath     : /zero-use/src/useAnimation/index.ts
 * @FileName     : 动画函数封装
 */

/** 动画函数封装
 * @param duration 动画时长 (毫秒)
 * @param from 动画起始值
 * @param to 动画结束值
 * @param [callback] 动画回调
 */
export const useAnimation = (
  duration: number,
  from: number,
  to: number,
  callback?: (val: number) => void
) => {
  const start = Date.now();
  let value = from;
  const speed = (to - from) / duration;

  const _run = () => {
    const time = Date.now() - start;

    if (time >= duration) {
      value = to;
      callback && callback(value);
      return;
    }
    value = from + time * speed;
    callback && callback(value);
    requestAnimationFrame(_run);
  };

  _run();
};
