/*
 * @Author       : fallen_zero
 * @Date         : 2023-10-07 15:24:08
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2023-10-07 15:24:09
 * @FilePath     : /zero-use/src/getFileExt/index.ts
 * @FileName     :
 */

/**
 * 获取后缀名
 * @param {string} filename 文件名或文件路径
 * @returns 后缀名
 * @example
 * getFileExt('file.pdf')
 * =>
 * pdf
 */
export function getFileExt(filename: string): string {
  const index = filename.lastIndexOf('.');
  if (index === -1) {
    return '';
  }
  return filename.substring(index + 1).toLowerCase();
}
