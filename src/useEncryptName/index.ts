/*
 * @Author       : fallen_zero
 * @Date         : 2023-10-07 14:33:25
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2023-10-07 15:19:28
 * @FilePath     : /zero-use/src/useEncryptName/index.ts
 * @FileName     :
 */

/**
 * 人名脱敏
 * @author 俞棵
 * @param {string} name 人名
 * @param {object} [options] 参数配置
 * @param {number} [options.start] 开头保留字符数(默认为: 1)
 * @param {number} [options.end] 结尾保留字符数(默认为: 1)
 * @param {string} [options.info] 匹配字符(默认中文字符集)
 * @param {string} [options.char] 替换的字符(默认为: *)
 * @returns {string}
 * @example
 * encryptName('张三', { info: '\u4e00-\u9fa5'})
 * =>
 * '张*'
 */
export function encryptName(
  name: string,
  {
    start = 1,
    end = 1,
    info = '\u4e00-\u9fa5',
    char = '*',
  }: { start?: number; end?: number; info?: string; char?: string } = {}
): string {
  // 去除空白
  const trueName = name.replace(/\s/g, '');
  // 替换中文
  const regExp = new RegExp(
    `^([${info}]{${start}})[${info}]+([${info}]{${
      trueName.length > 2 ? end : 0
    }})`,
    'g'
  );
  return trueName.replace(
    regExp,
    '$1' + char.repeat(Math.max(trueName.length - start - end, 1)) + '$2'
  );
}
