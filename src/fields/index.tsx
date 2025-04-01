/*
 * @Author       : fallen_zero
 * @Date         : 2025-04-01 14:30:30
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2025-04-01 14:41:41
 * @FilePath     : /fallen-zero-use/src/fields/index.tsx
 * @FileName     :
 */

type LikePromise<T> = Promise<T> | T;

import type { Component } from 'vue';
import type { JSX } from 'vue/jsx-runtime';

export type FieldOption<
  T extends object = object,
  P extends { [key in keyof T]?: any } = object
> = {
  [K in keyof T]: {
    label: string;
    key: K;
    value?: P[K] extends undefined ? T[K] : P[K];
    render?: (value: T[K], data: T) => () => JSX.Element | Component;
    fommater?: (value: T[K], data: T) => P[K] extends undefined ? T[K] : P[K];
    span?: number;
    tip?: ((value: T[K], data: T) => boolean) | boolean;
    color?: ((value: T[K], data: T) => string) | string;
    visible?: ((value: T[K], data: T) => boolean) | boolean;
    handler?: (value: T[K], data: T) => LikePromise<void>;
  };
}[keyof T];

export type FieldConfig<
  T extends object = object,
  P extends { [key in keyof T]?: any } = object
> = {
  [K in keyof T]: {
    label: string;
    value: P[K] extends undefined ? T[K] : P[K];
    render?: () => JSX.Element | Component;
    span: number;
    tip?: boolean;
    color?: string;
    visible?: boolean;
    handler?: () => LikePromise<void>;
  };
}[keyof T];

export function fommaterIndex(value: number) {
  return value < 10 ? `0${value}` : `${value}`;
}

export function createField<
  T extends object,
  P extends { [key in keyof T]?: any }
>(options: FieldOption<T, P>[], data: T): FieldConfig<T, P>[] {
  return options
    .map<FieldConfig<T, P>>((option) => {
      const { key, fommater, span = 1, color, visible, handler, tip } = option;
      const value = fommater ? fommater(data[key], data) : data[key];
      return {
        label: option.label,
        value,
        span,
        render: option.render ? option.render(data[key], data) : void 0,
        color: typeof color === 'function' ? color(data[key], data) : color,
        visible:
          typeof visible === 'function' ? visible(data[key], data) : visible,
        tip: typeof tip === 'function' ? tip(data[key], data) : tip,
        handler: handler ? () => handler(data[key], data) : void 0,
      } as FieldConfig<T, P>;
    })
    .filter((item) => item.visible !== false);
}
