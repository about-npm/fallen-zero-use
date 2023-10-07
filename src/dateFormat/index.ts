/*
 * @Author       : fallen_zero
 * @Date         : 2023-10-07 15:08:01
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2023-10-07 15:17:44
 * @FilePath     : /zero-use/src/dateFormat/index.ts
 * @FileName     :
 */

import dayjs, { Dayjs } from 'dayjs';

export enum DATE_FORMAT {
  /** 用`-`分割的年月日格式 */
  'DATE-' = 'YYYY-MM-DD',
  /** 用`-`分割的年月日时分格式 */
  'DATETIME-' = 'YYYY-MM-DD HH:mm',
  /** 用`-`分割的年月日时分秒格式 */
  'DATETIMES-' = 'YYYY-MM-DD HH:mm:ss',
  /** 用`/`分割的年月日格式 */
  'DATE/' = 'YYYY/MM/DD',
  /** 用`/`分割的年月日时分格式 */
  'DATETIME/' = 'YYYY/MM/DD HH:mm',
  /** 用`/`分割的年月日时分秒格式 */
  'DATETIMES/' = 'YYYY/MM/DD HH:mm:ss',
  /** 用`.`分割的年月日格式 */
  'DATE.' = 'YYYY.MM.DD',
  /** 用`.`分割的年月日时分格式 */
  'DATETIME.' = 'YYYY.MM.DD HH:mm',
  /** 用`.`分割的年月日时分秒格式 */
  'DATETIMES.' = 'YYYY.MM.DD HH:mm:ss',
  /** 用`xxxx年xx月xx日`分割的年月日格式 */
  'DATE' = 'YYYY年MM月DD日',
  /** 用`xxxx年xx月xx日 xx:xx`分割的年月日时分格式 */
  'DATETIME' = 'YYYY年MM月DD日 HH:mm',
  /** 用`xxxx年xx月xx日 xx时xx分`分割的年月日时分格式 */
  'DATETIME_ZH' = 'YYYY年MM月DD日 HH时mm分',
  /** 用`xxxx年xx月xx日 xx:xx:xx`分割的年月日时分秒格式 */
  'DATETIMES' = 'YYYY年MM月DD日 HH:mm:ss',
  /** 用`xxxx年xx月xx日 xx时xx分xx秒`分割的年月日时分秒格式 */
  'DATETIMES_ZH' = 'YYYY年MM月DD日 HH时mm分ss秒',
  /** 时分格式 */
  'TIME' = 'HH:mm',
  /** 时分秒格式 */
  'TIMES' = 'HH:mm:ss',
  /** 用`-`分割的月日格式 */
  'MONTH-' = 'MM-DD',
  /** 用`/`分割的月日格式 */
  'MONTH/' = 'MM/DD',
  /** 用`-`分割的月日时分格式 */
  'MONTHTIME-' = 'MM-DD HH:mm',
  /** 用`-`分割的月日时分秒格式 */
  'MONTHTIMES-' = 'MM-DD HH:mm:ss',
  /** 用`/`分割的月日时分格式 */
  'MONTHTIME/' = 'MM/DD HH:mm',
  /** 用`/`分割的月日时分秒格式 */
  'MONTHTIMES/' = 'MM/DD HH:mm:ss',
  /** 用`xx月xx日 xx时xx分`分割的月日时分格式 */
  'MONTHTIME_ZH' = 'MM月DD日 HH时mm分',
  /** 用`xx月xx日 xx时xx分xx秒`分割的月日时分秒格式 */
  'MONTHTIMES_ZH' = 'MM月DD日 HH时mm分ss秒',
  /** 年 */
  'YEAR' = 'YYYY',
  /** 月 */
  'MONTH' = 'MM',
  /** 日 */
  'DAY' = 'DD',
  /** 时 */
  'HOUR' = 'HH',
  /** 分 */
  'MINUTES' = 'mm',
  /** 秒 */
  'SECONDS' = 'ss',
  /** 周 */
  'WEEK' = 'dddd',
}

/**
 * 日期格式化
 * @author fallen_zero
 * @param [date] 时间或者时间格式的字符串
 * @param [format] 格式化模板
 * @returns 格式化之后的字符串
 * @example
 * dateFormat(new Date(), DATE_FORMAT['DATETIMES-'])
 * =>
 * '2023-04-07 13:59:59'
 */
export function dateFormat(
  date?: string | number | Date | Dayjs,
  format: DATE_FORMAT | string = DATE_FORMAT['DATE-']
): string {
  let _date = date;
  if (date === '' || date === 0) return '';
  if (date === void 0) _date = new Date();
  if (typeof _date === 'string') _date = _date.replace(/-/g, '/');
  if (
    (typeof _date === 'string' || typeof _date === 'number') &&
    new Date(_date).toString() === 'Invalid Date'
  ) {
    return `${date}`;
  }
  return dayjs(_date).format(format);
}
