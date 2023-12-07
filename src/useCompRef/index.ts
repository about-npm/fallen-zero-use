/*
 * @Author       : fallen_zero
 * @Date         : 2023-10-07 15:49:43
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2023-11-20 10:02:41
 * @FilePath     : /zero-use/src/useCompRef/index.ts
 * @FileName     :
 */

import { ref } from 'vue';

/** 传入组件返回, 返回携带类型的 ref
 * @param _comp 组件
 * @returns
 */
export const useCompRef = <T extends abstract new (...args: any) => any>(
  _comp: T
) => {
  return ref<InstanceType<T>>();
};

/** 传入组件返回, 返回携带类型的 ref 数组
 * @param _comp 组件
 * @returns
 */
export const useCompRefs = <T extends abstract new (...args: any) => any>(
  _comp: T
) => {
  return ref<InstanceType<T>[]>([]);
};
