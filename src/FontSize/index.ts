/*
 * @Author       : fallen_zero
 * @Date         : 2023-10-07 15:24:47
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2023-10-07 15:25:32
 * @FilePath     : /zero-use/src/FontSize/index.ts
 * @FileName     :
 */

/**
 * 根据屏幕宽度适配字体大小
 * @author fallen_zero
 * @param {number} res 需要的字体大小 / 100 的值
 * @param {Number} [box=1920] 浏览器宽度
 * @return {number} 字体大小
 */
export function FontSize(res: number, box: number = 1920): number {
  const clientWidth: number =
    window.innerWidth ??
    document.documentElement.clientWidth ??
    document.body.clientWidth;
  if (!clientWidth) return res;
  const fontSize: number = 100 * (clientWidth / box);
  return res * fontSize;
}
