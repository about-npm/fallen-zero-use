/*
 * @Author       : fallen_zero
 * @Date         : 2023-10-07 15:31:06
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-03-19 15:58:53
 * @FilePath     : /zero-use/src/estimate/index.ts
 * @FileName     :
 */

/**
 * 获取一个数的小数位数
 * @author fallen_zero
 * @param {number} num 数值
 * @returns 小数位数
 * @example
 * decimalPlaces(3.1415926)
 * =>
 * 7
 * decimalPlaces(3)
 * =>
 * 0
 */
export function decimalPlaces(num: number): number {
  if (Number.isInteger(num)) return 0;
  if (!num) return NaN;
  const count = num.toString().split('.')[1].length;
  return count;
}

/** 保留小数位数
 * @author fallen_zero
 * @param {number} num 数值
 * @param {number} places 小数位数
 * @returns {number} 保留小数位数
 */
export const toFixed = (num: number, places: number): number => {
  const decimal = decimalPlaces(num);
  return decimal > places ? places : decimal;
};

/** 精度计算
 * @author fallen_zero
 * @param {number} num 数值
 * @param {number} [places=2] 小数位数
 * @returns {number} 结果
 */
export const toPrecision = (num: number, places: number = 2): number => {
  const value = num.toFixed(toFixed(num, places));
  return +value;
};

/**
 * 判断一个值是否为空
 * @author fallen_zero
 * @param {*} value 值
 * @returns 是否为空
 */
export function isEmptyValue(value: any): boolean {
  return [undefined, null, ''].includes(value);
}

/**
 * 判断传入的路径是否为图片
 * @param path 路径
 * @returns 是否为图片
 */
export const isImage = (path: string): boolean => {
  // const regex = /\.(jpe?g|png|gif|bmp|webp|svgz?|tiff?|jfif|pjp|pjpeg|avif|apng|bmp2|bmp3|cgm|djv|djvu|eps|fits|fpx|gplt|heif|heic|indd|jp2|jpm|jpx|j2c|j2k|wdp|jxr|hdp|pdf|pic|pict|psd|raw|rgb|rgba|rle|sid|tga)$/i;
  const regex = /\.(jpe?g|png|gif|bmp|webp|svgz?|tiff?|jfif|pjp|pjpeg|avif)$/i;
  return regex.test(path);
};

/**
 * 车牌号验证（后半部分不能出现 I 和 O，避免与 0 和 1 混淆）
 * @param vehicleNumber
 * @returns {*}
 */
export function isVehicleNumber(vehicleNumber: string): boolean {
  const xxreg =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DABCEFGHJK]$)|([DABCEFGHJK][A-HJ-NP-Z0-9][0-9]{4}$))/; // 2021 年新能源车牌不止有 DF
  const creg =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (vehicleNumber.length === 7) {
    return creg.test(vehicleNumber);
  } else if (vehicleNumber.length === 8) {
    return xxreg.test(vehicleNumber);
  } else {
    return false;
  }
}

/**
 * 手机和电话校验
 * @param phone
 * @returns
 */
export function validatePhoneAndTel(phone: string) {
  const reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; //手机
  const tel = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/; //固话
  if (reg.test(phone) || tel.test(phone)) {
    return true;
  }
  return false;
}

/** 手机号码校验
 * @param {string} phone
 * @returns {boolean}
 */
export function validatePhone(phone: string): boolean {
  const reg =
    /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/;
  return reg.test(phone);
}

/** 电话号码校验
 * @param {string} phone
 * @returns {boolean}
 */
export function validateTel(phone: string): boolean {
  const reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
  return reg.test(phone);
}

/**
 * 手机和电话加密校验
 * @param phone
 * @returns
 */
export function validatePhoneAndTelMD(phone: string) {
  const reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+[\d|*]{4}\d{4})$/; //手机
  const tel = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/; //固话
  if (reg.test(phone) || tel.test(phone)) {
    return true;
  }
  return false;
}

/**
 * 判断两个数据是否相同
 * @param a 数据一
 * @param b 数据二
 * @returns 是否相同
 */
export function isAllEqual<T>(a: T, b: T) {
  return JSON.stringify(a) === JSON.stringify(b);
}

/** 判断是否为空
 * @param {unknown} value
 * @returns {boolean} 是否为空
 */
const isNil = (v: unknown): boolean => {
  return typeof v === 'undefined' || v === null;
};

/** 判断数组是否相同
 * @param {any[]} a 数据一
 * @param {any[]} b 数据二
 * @param {boolean} [ignoreArrayPosition=false] 是否忽略数组位置
 * @returns {boolean} 是否相同
 */
export function arrayIsEqual(
  a: any[],
  b: any[],
  ignoreArrayPosition: boolean = false
): boolean {
  // 判断数组大小是否一致, 不一致的话其内容也就不需要判断了
  if (a.length !== b.length) return false;
  // 如果不忽略数组位置的话, 也就是说每个数组元素位置一样, 并且其值也一样才判断为相等
  if (!ignoreArrayPosition) return a.every((v, i) => anyIsEqual(v, b[i]));
  // 忽略数组位置的话, 那么只要其中一个数组每个元素都可以在另一个数组中找到, 并且每个元素在两个数组的数量是相等的话, 那么就可以判定为相等
  return a.every(
    (v) =>
      b.findIndex((v2) => anyIsEqual(v2, v)) >= 0 &&
      b.filter((v2) => anyIsEqual(v2, v)).length ===
        a.filter((v1) => anyIsEqual(v1, v)).length
  );
}

/** 判断对象是否相同
 * @param {Record<string, any>} a 数据一
 * @param {Record<string, any>} b 数据二
 * @returns {boolean} 是否相同
 */
export function objectIsEqual(
  a: Record<string, any>,
  b: Record<string, any>
): boolean {
  // 首先对象属性个数要一致, 不一致的话其内容也就不需要判断了
  if (Object.keys(a).length !== Object.keys(b).length) return false;
  // 只要其中一个对象的属性名在另一个对象存在, 就判断其值是否相等就可以了
  return Object.keys(a).every((k) => {
    if (Object.keys(b).includes(k)) {
      return anyIsEqual(a[k], b[k]);
    }
    return false;
  });
}

/** 判断两个值是否相等
 * @param {*} a 数据一
 * @param {*} b 数据二
 * @param {boolean} [ignoreArrayPosition=false] 是否忽略数组位置
 * @returns {boolean} 是否相等
 */
export function anyIsEqual(
  a: any,
  b: any,
  ignoreArrayPosition: boolean = false
): boolean {
  // 首先判断要比较的两个参数是否为空
  if (isNil(a) || isNil(b)) {
    // 只要其中一个为空的花, 直接返回它们是否相等
    return a === b;
  }
  // 再判断他们的类型是否相等, 类型不相等的话, 其值也无须判断了
  if (a.constructor === b.constructor) {
    // 如果都是数组, 则判断数组方式是否相等
    if (a.constructor === Array) {
      return arrayIsEqual(a, b, ignoreArrayPosition);
    }
    // 如果都是对象, 则判断对象方式是否相等
    if (a.constructor === Object) {
      return objectIsEqual(a, b);
    }
    // 其余的直接判断是否相等
    return a === b;
  }
  return false;
}

/** 数组求和
 * @param arg 需要求和的数据
 * @returns 求和结果
 * @example
 * @example
 * sum(1, 2, 3, 4)
 * =>
 * 10
 */
export const sum = (...arg: number[]) => {
  return arg.reduce<number>((prev, curr) => (prev += curr), 0);
};
