/*
 * @Author       : fallen_zero
 * @Date         : 2023-10-07 14:33:25
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-07-23 14:04:26
 * @FilePath     : /fallen-zero-use/src/useEncryptName/index.ts
 * @FileName     :
 */

interface EncryptParams {
  start?: number;
  end?: number;
  info?: string;
  char?: string;
}

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
  { start = 1, end = 1, info = '\u4e00-\u9fa5', char = '*' }: EncryptParams = {}
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

/** 托名类型 */
const EncryptType = {
  name: {},
  phone: {
    start: 3,
    end: 4,
    info: 'd',
    char: '*',
  },
  idCard: {
    start: 3,
    end: 4,
    info: 'd',
    char: '*',
  },
  bankCard: {
    start: 6,
    end: 4,
    info: 'd',
    char: '*',
  },
  email: {},
};

/**
 * 根据类型进行脱敏
 * @param {keyof typeof EncryptType} type 类型
 * @param {string} str 待脱敏字符串
 * @param {EncryptParams} [options] 配置参数
 * @return {string} 脱敏后的字符串
 */
export function encrypt(
  type: keyof typeof EncryptType,
  str: string,
  options: EncryptParams = {}
): string {
  if (type === 'email') {
    // 邮箱脱敏
    return str.replace(/^(.{1,2})@(.*)$/, '$1***@$2');
  }
  const typeOptions = (EncryptType[type] || {}) as EncryptParams;
  return encryptName(str, { ...typeOptions, ...options });
}
