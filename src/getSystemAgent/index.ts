/*
 * @Author       : fallen_zero
 * @Date         : 2023-10-07 14:55:36
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-02-27 11:07:41
 * @FilePath     : /zero-use/src/getSystemAgent/index.ts
 * @FileName     :
 */

export enum UserAgent {
  IOS = 'ios',
  ANDROID = 'android',
  I_PHONE = 'iPhone',
  I_PAD = 'iPad',
  微信 = 'wx',
  钉钉 = 'dingding',
  浙政钉 = 'dingding_zy',
}

const u = navigator.userAgent.toLowerCase();
const result: Record<UserAgent, boolean> = {
  [UserAgent.IOS]: !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/),
  [UserAgent.ANDROID]:
    u.includes('android') || u.includes('adr') || u.includes('linux'), // android终端或uc浏览器
  [UserAgent.I_PHONE]: u.includes('iphone'), // 是否为iPhone或者QQHD浏览器
  [UserAgent.I_PAD]: u.includes('ipad'),
  [UserAgent.微信]: u.includes('micromessenger'), // 是否在微信
  [UserAgent.钉钉]: u.includes('dingding') || u.includes('dingtalk'), // 钉钉
  [UserAgent.浙政钉]: u.indexOf('taurusapp') > -1, // 是否在专有钉钉/浙政钉
};

/**
 * 获取当前系统运行环境
 * @param type
 * @returns
 */
export const getSystemAgent = (
  type?: UserAgent
): Record<UserAgent, boolean> | boolean =>
  type ? Boolean(result[type]) : result;
