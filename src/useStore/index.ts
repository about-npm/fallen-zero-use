/*
 * @Author       : fallen_zero
 * @Date         : 2023-10-07 15:42:43
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2023-10-07 15:47:27
 * @FilePath     : /zero-use/src/useStore/index.ts
 * @FileName     :
 */

import Cookies from 'js-cookie';

export enum StorageEnum {
  LOCAL = 'localStorage',
  SESSION = 'sessionStorage',
  COOKIE = 'cookie',
}

export interface IDate {
  data: any;
  expire?: number;
}

export interface IStorage {
  expire?: number;
  storage?: StorageEnum;
}

const storages: {
  [StorageEnum.LOCAL]: Storage;
  [StorageEnum.SESSION]: Storage;
  [StorageEnum.COOKIE]: typeof Cookies;
} = {
  [StorageEnum.LOCAL]: localStorage,
  [StorageEnum.SESSION]: sessionStorage,
  [StorageEnum.COOKIE]: Cookies,
};

export const useStore = (prefix = '') => ({
  /** 设置存储中的键值对。
   * @param {string} key - 要设置值的键。
   * @param {T} data - 要存储的数据。
   * @param {IStorage} [options] - 可选的存储配置。
   *        - expire: 过期时间（秒）若是cookie类型的存储，单位是(天)，过期时间默认为7天。
   *        - storage: 存储类型（默认为 StorageEnum.SESSION）。
   * @return {void}
   */
  set<T = any>(
    key: string,
    data: T,
    { expire, storage = StorageEnum.SESSION }: IStorage = {}
  ): void {
    const _key = `${prefix}-${key}`;
    if (storage === StorageEnum.COOKIE) {
      const _storage = storages[storage];
      _storage.set(_key, JSON.stringify(data), { expires: expire || 7 });
      return;
    }
    const _storage = storages[storage];
    const cache: IDate = { data };
    if (expire) {
      cache.expire = new Date().getTime() + expire * 1000;
    }
    _storage.setItem(_key, JSON.stringify(cache));
  },
  /** 从指定的存储中检索与指定键相关联的值。
   * @param {string} key - 用于检索值的键。
   * @param {StorageEnum} [storage=StorageEnum.SESSION] - 要从中检索值的存储类型。默认为 `StorageEnum.SESSION`。
   * @return {T | null} - 检索到的值，如果键不存在或值已过期，则返回 `null`。
   */
  get<T = any>(
    key: string,
    storage: StorageEnum = StorageEnum.SESSION
  ): T | null {
    const _key = `${prefix}-${key}`;
    if (storage === StorageEnum.COOKIE) {
      const _storage = storages[storage];
      const data = _storage.get(_key);
      return data ? JSON.parse(data) : null;
    }
    const _storage = storages[storage];
    const cacheStore = _storage.getItem(_key);
    if (cacheStore) {
      const cache = JSON.parse(cacheStore);
      const expire = cache.expire;
      if (expire && expire < new Date().getTime()) {
        _storage.removeItem(_key);
        return null;
      }
      return cache.data;
    }
    return null;
  },
  /** 从指定的存储中删除一个键。
   * @param {string} key - 要删除的键。
   * @param {StorageEnum} [storage=StorageEnum.SESSION] - 要从中删除键的存储。默认为 StorageEnum.SESSION。
   */
  remove(key: string, storage: StorageEnum = StorageEnum.SESSION) {
    const _key = `${prefix}-${key}`;
    if (storage === StorageEnum.COOKIE) {
      storages[storage].remove(_key);
      return;
    }
    const _storage = storages[storage];
    _storage.removeItem(_key);
  },
});
