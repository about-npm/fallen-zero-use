/*
 * @Author       : fallen_zero
 * @Date         : 2023-10-07 15:26:20
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2023-10-07 15:26:30
 * @FilePath     : /zero-use/src/numToCapital/index.ts
 * @FileName     :
 */

import { isEmptyValue } from '../estimate';

/**
 * 阿拉伯数字转大写，整数转大写
 * @param num 数字
 * @param type 是否大写
 * @returns
 */
export const numToCapital = (num: number, type = false) => {
  if (!num) return '零';
  const strNum = Number((num + '').replace(/[,，]*/g, '')) + ''; // 记录字符
  num = parseInt(strNum); // 转为整数，
  let capitalAr = '零一二三四五六七八九十';
  let unitAr = [
    '十',
    '百',
    '千',
    '万',
    '十',
    '百',
    '千',
    '亿',
    '十',
    '百',
    '千',
  ];
  if (type) {
    capitalAr = '零壹贰叁肆伍陆柒捌玖拾';
    unitAr = ['拾', '佰', '仟', '万', '拾', '佰', '仟', '亿', '拾', '佰', '仟']; // 单位
  }
  const resultAr: string[] = []; // 记录结果，后边json.in就可
  const index = strNum.length - 1; //记录位数
  let idx = 0; // 记录单位
  const percent = 10;
  const turnNum = (num: number, percent: number, index: number) => {
    const unit = num / percent;
    const capital = capitalAr[Number(strNum[index])];
    if (unit < 1) {
      resultAr.push(capital);
      // 出现11【一十一】这种情况
      if (
        Number(strNum[index]) === 1 &&
        (strNum.length === 2 || strNum.length === 6 || strNum.length === 10)
      ) {
        resultAr.pop();
      }
      return false; //结束递归
    } else {
      if (capital === '零') {
        // 万和亿单位不删除
        if (!['万', '亿'].includes(resultAr[resultAr.length - 1])) {
          resultAr.pop();
        }
        // 前面有零在删掉一个零
        if (resultAr[resultAr.length - 1] === '零') {
          resultAr.pop();
        }
      }
      resultAr.push(capital);
      // 过滤存在【零万】【零亿】这种情况
      if (
        ['万', '亿'].includes(resultAr[resultAr.length - 2]) &&
        capital === '零'
      ) {
        resultAr.pop();
      }
      // 过滤【1亿万】这种情况
      if (resultAr[0] === '万' && resultAr[1] === '亿') {
        resultAr.shift();
      }
      // 末尾【零】删掉
      if (resultAr[0] === '零') {
        resultAr.pop();
      }
      resultAr.push(unitAr[idx++]);
      turnNum(num, percent * 10, --index);
    }
  };
  turnNum(num, percent, index);
  return resultAr.reverse().join('');
};

export function toChineseAmount(num: number | string): string {
  // 处理零
  if (isEmptyValue(num) || Number(num) === 0 || num === '-') return '零元整';

  const chineseNums = [
    '零',
    '壹',
    '贰',
    '叁',
    '肆',
    '伍',
    '陆',
    '柒',
    '捌',
    '玖',
  ];
  const chineseUnits = ['', '拾', '佰', '仟'];
  const chineseBigUnits = ['', '万', '亿', '兆'];
  const chineseDecimalUnits = ['角', '分'];

  // 处理负数
  let isNegative = false;
  if (String(num)[0] === '-') {
    isNegative = true;
    num = Math.abs(Number(String(num).slice(1)));
  }

  // 分割整数和小数
  const [integerPart, decimalPart = ''] = String(num).split('.');

  // 整数部分转换
  let result = '';
  let zeroFlag = false;

  // 逐位处理整数部分
  for (let i = 0; i < integerPart.length; i++) {
    const digit = parseInt(integerPart[i]);
    const place = integerPart.length - i - 1;
    const unitIndex = place % 4;
    const bigUnitIndex = Math.floor(place / 4);

    if (digit === 0) {
      zeroFlag = true;
    } else {
      // 如果前面有零，添加零
      if (zeroFlag) {
        result += chineseNums[0];
        zeroFlag = false;
      }

      // 添加数字（处理"壹拾"简化为"拾"的情况）
      if (
        !(
          digit === 1 &&
          unitIndex === 1 &&
          (result === '' || result.endsWith('亿') || result.endsWith('万'))
        )
      ) {
        result += chineseNums[digit];
      }

      // 添加小单位（拾、佰、仟）
      result += chineseUnits[unitIndex];
    }

    // 添加大单位（万、亿、兆）
    if (unitIndex === 0 && bigUnitIndex > 0) {
      // 如果这一组全为零，且不是最后一组，可能需要添加零
      let groupAllZero = true;
      const groupStart = Math.max(0, integerPart.length - place - 4);
      const groupEnd = integerPart.length - place;
      for (let j = groupStart; j < groupEnd; j++) {
        if (parseInt(integerPart[j]) !== 0) {
          groupAllZero = false;
          break;
        }
      }

      if (!groupAllZero || result.endsWith('零')) {
        // 移除末尾可能多余的零
        while (result.endsWith('零')) {
          result = result.slice(0, -1);
        }
        result += chineseBigUnits[bigUnitIndex];
      }
    }
  }

  // 处理末尾的零
  result = result.replace(/零+$/, '');

  // 如果整数部分全为0
  if (result === '') {
    result = chineseNums[0];
  }

  result += '元';

  // 处理小数部分
  let decimalResult = '';
  if (decimalPart) {
    const paddedDecimal = decimalPart.padEnd(2, '0').substring(0, 2);

    for (let i = 0; i < paddedDecimal.length; i++) {
      const digit = parseInt(paddedDecimal[i]);
      if (digit !== 0) {
        decimalResult += chineseNums[digit] + chineseDecimalUnits[i];
      } else if (i === 0 && paddedDecimal[1] !== '0') {
        decimalResult += chineseNums[0];
      }
    }
  }

  result += decimalResult;

  // 添加"整"字
  if (decimalResult === '') {
    result += '整';
  }

  // 处理负数
  if (isNegative) {
    result = '负' + result;
  }

  return result;
}
