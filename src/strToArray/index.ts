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

/**
 * 数组转字符串
 * @param array 数组
 * @param separator 拼接符
 * @returns 字符串
 */
export function arrayToStr(
  array: (string | number | undefined)[],
  separator = ','
) {
  return array.filter(Boolean).join(separator);
}

export function parseJSON<T = any>(
  str: string | undefined | null,
  defaultValue: T,
  reviver?: ((this: any, key: string, value: any) => T) | undefined
): T {
  try {
    if (!str) return defaultValue;
    const result = JSON.parse(str, reviver);
    if (!defaultValue || typeof result === typeof defaultValue) return result;
    return defaultValue;
  } catch {
    return defaultValue;
  }
}
