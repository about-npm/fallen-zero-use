/*
 * @Author       : fallen_zero
 * @Date         : 2024-01-25 13:35:48
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-01-25 13:37:07
 * @FilePath     : /zero-use/src/is.ts
 * @FileName     :
 */

/** 判断是否为函数 */
export const isFunction = (val: any): val is (...args: any[]) => any => {
  return typeof val === 'function';
};

/** 判断是否为对象 */
export const isObject = (
  val: any
): val is Record<string | number | symbol, any> => {
  return val !== null && typeof val === 'object';
};

/** 判断是否为数组 */
export const isArray = (val: any): val is Array<any> => {
  return Array.isArray(val);
};

/** 判断是否为字符串 */
export const isString = (val: any): val is string => {
  return typeof val === 'string';
};

/** 判断是否为数字 */
export const isNumber = (val: any): val is number => {
  return typeof val === 'number';
};

/** 判断是否为布尔值 */
export const isBoolean = (val: any): val is boolean => {
  return typeof val === 'boolean';
};

/** 判断是否为日期 */
export const isDate = (val: any): val is Date => {
  return val instanceof Date;
};

/** 判断是否为正则表达式 */
export const isRegExp = (val: any): val is RegExp => {
  return val instanceof RegExp;
};

/** 判断是否为 undefined */
export const isUndefined = (val: any): val is undefined => {
  return typeof val === 'undefined';
};

/** 判断是否为 null */
export const isNull = (val: any): val is null => {
  return val === null;
};

/** 判断是否为Promise函数 */
export const isPromise = (val: any): val is Promise<any> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};

/** 判断是否为文件 */
export const isFile = (val: any): val is File => {
  return val instanceof File;
};
