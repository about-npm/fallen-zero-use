/*
 * @Author       : fallen_zero
 * @Date         : 2023-10-07 15:23:16
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2023-10-07 15:23:27
 * @FilePath     : /zero-use/src/strToArray/index.ts
 * @FileName     :
 */

/**
 * 字符串转数组
 * @param str 字符串
 * @param separator 分割符
 * @returns 数组
 * @example
 * strToArray('1,2,3,4')
 * =>
 * [1, 2, 3, 4]
 */
export function strToArray(
  str: string | null | undefined,
  separator = ','
): string[] {
  if (!str) return [];
  return str.split(separator).filter(Boolean);
}
