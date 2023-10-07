/*
 * @Author       : fallen_zero
 * @Date         : 2023-10-07 15:29:59
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2023-10-07 15:29:59
 * @FilePath     : /zero-use/src/getIdCardInfo/index.ts
 * @FileName     :
 */

/** 根据身份证号获取性别 */
export function getSexByIdCard(idCard: string) {
  let sexDigit: string;
  if (idCard.length === 15) {
    sexDigit = idCard.charAt(idCard.length - 1);
  } else if (idCard.length === 18) {
    sexDigit = idCard.charAt(idCard.length - 2);
  } else {
    return '';
  }

  return parseInt(sexDigit) % 2 === 0 ? '女' : '男';
}

/** 根据身份证号计算年龄 */
export function getAgeByIdCard(idCard: string) {
  //获取用户身份证号码
  const userCard = idCard;

  //如果用户身份证号码为undefined则返回空
  if (!userCard) {
    return '';
  }

  // 获取出生日期
  const yearBirth = parseInt(userCard.substring(6, 10));
  const monthBirth = parseInt(userCard.substring(10, 12));
  const dayBirth = parseInt(userCard.substring(12, 14));
  // 获取当前年月日并计算年龄
  const myDate = new Date();
  const monthNow = myDate.getMonth() + 1;
  const dayNow = myDate.getDate();
  let age = myDate.getFullYear() - yearBirth;

  if (monthNow < monthBirth || (monthNow == monthBirth && dayNow < dayBirth)) {
    age--;
  }

  return age;
}
/** 根据身份证号获取年龄和性别
 * @param idCardNumber 身份证号
 * @returns 年龄和性别
 */
export const getIdCardInfo = (idCardNumber: string) => {
  return {
    age: getAgeByIdCard(idCardNumber),
    gender: getSexByIdCard(idCardNumber),
  };
};
