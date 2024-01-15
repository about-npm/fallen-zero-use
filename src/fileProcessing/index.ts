/*
 * @Author       : fallen_zero
 * @Date         : 2023-10-07 15:24:08
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-01-15 10:26:03
 * @FilePath     : /zero-use/src/fileProcessing/index.ts
 * @FileName     :
 */

interface ImageCompressionOptions {
  /** 图片文件 */
  file: File;
  /** 清晰度 */
  quality?: number;
  /** 成功回调 */
  success?: (url: string) => void;
  /** 失败回调 */
  fail?: () => void;
  /** 执行完毕回调 */
  complete?: () => void;
}

/** 图片压缩
 * @param {ImageCompressionOptions} options 配置
 * @param {File} options.file 图片文件
 * @param {number} [options.quality] 清晰度
 * @param {() => void} options.success 成功回调
 * @param {() => void} options.fail 失败回调
 * @param {() => void} options.complete 执行完毕回调
 */
export class ImageCompression {
  constructor(private options: ImageCompressionOptions) {
    this.compress();
  }

  /** 压缩图片 */
  private compress() {
    try {
      this.readImage((url) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.src = url;

        image.onload = () => {
          canvas.width = image.width;
          canvas.height = image.height;

          ctx?.drawImage(image, 0, 0, image.width, image.height);

          const result = canvas.toDataURL(
            this.options.file.type,
            this.options.quality
          );

          this.options.success?.(result);
        };
      });
    } catch (error) {
      this.options.fail?.();
    } finally {
      this.options.complete?.();
    }
  }

  /** 读取图片 */
  private readImage(callback: (url: string) => void) {
    const reader = new FileReader();

    reader.onload = () => {
      callback(reader.result as string);
    };

    reader.readAsDataURL(this.options.file);
  }
}

/** base64转blob对象
 * @param {string} base64 base64字符串
 * @param {string} type 文件类型
 * @returns blob
 */
export function base64ToBlob(base64: string, type: string) {
  const byteCharacters = atob(
    base64.replace(/^data:image\/(png|jpeg|jpg);base64,/, '')
  );
  const arrayBuffer = new Uint8Array(
    Array.from(byteCharacters, (char) => char.charCodeAt(0))
  ).buffer;
  return new Blob([arrayBuffer], { type });
}

/** base64转文件对象
 * @param {string} base64 base64字符串
 * @param {string} fileName 文件名
 * @param {string} type 文件类型
 * @returns 文件
 */
export function base64ToFile(base64: string, fileName: string, type: string) {
  const blob = base64ToBlob(base64, type);
  return new File([blob], fileName, { type });
}

/** 文件转二进制
 * @param {File} file 文件
 * @returns 二进制
 */
export function fileToBinary(file: File) {
  return new Promise<Uint8Array>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const binary = new Uint8Array(arrayBuffer);
      resolve(binary);
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file as binary'));
    };

    reader.readAsArrayBuffer(file);
  });
}

/**
 * 获取后缀名
 * @param {string} filename 文件名或文件路径
 * @returns 后缀名
 * @example
 * getFileExt('file.pdf')
 * =>
 * pdf
 */
export function getFileExt(filename: string): string {
  const index = filename.lastIndexOf('.');
  if (index === -1) {
    return '';
  }
  return filename.substring(index + 1).toLowerCase();
}
