/*
 * @Author       : fallen_zero
 * @Date         : 2023-10-07 14:58:41
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-01-25 13:43:11
 * @FilePath     : /zero-use/src/useFormData/index.ts
 * @FileName     :
 */

import { isArray, isFile, isObject } from 'src/is';

/**
 * 将表单对象转为 FormData 格式
 * @author fallen_zero
 * @param form 表单对象
 * @return {FormData}
 */
export function useFormData(form: Record<string, unknown>): FormData {
  if (!form || typeof form !== 'object') {
    throw new Error('form is not object');
  }
  const formData = new FormData();
  for (const key in form) {
    if (
      Object.prototype.hasOwnProperty.call(form, key) &&
      form[key] !== undefined &&
      form[key] !== null
    ) {
      const value = form[key];
      if (isFile(value)) {
        formData.append(key, value);
      } else if (isArray(value) || isObject(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    }
  }
  return formData;
}
