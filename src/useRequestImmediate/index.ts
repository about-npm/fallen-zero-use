/*
 * @Author       : fallen_zero
 * @Date         : 2023-12-07 10:25:07
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2023-12-07 10:25:47
 * @FilePath     : /zero-use/src/useRequestImmediate/index.ts
 * @FileName     : 请求方法(立即执行)
 */

import { useRequest } from '../useRequest';

/** 请求方法(立即执行)
 * @param fn 请求函数
 * @param params 请求参数
 * @returns
 */
export const useRequestImmediate = async <
  T extends (...args: any[]) => Promise<any>
>(
  fn: T,
  ...params: Parameters<T>
) => {
  const { data, error, loading, start } = useRequest(fn, ...params);
  await start();
  return {
    /** 请求数据 */
    data,
    /** 请求错误信息 */
    error,
    /** 是否正在请求 */
    loading,
  };
};
