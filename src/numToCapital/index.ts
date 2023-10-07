/*
 * @Author       : fallen_zero
 * @Date         : 2023-10-07 15:26:20
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2023-10-07 15:26:30
 * @FilePath     : /zero-use/src/numToCapital/index.ts
 * @FileName     :
 */

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
