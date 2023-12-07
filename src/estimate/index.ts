/*
 * @Author       : fallen_zero
 * @Date         : 2023-10-07 15:31:06
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2023-11-11 10:33:44
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
