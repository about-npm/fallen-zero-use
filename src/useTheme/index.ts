import { StorageEnum, useStore } from '../useStore';
import { getCurrentInstance, onMounted, ref } from 'vue';

const APP_THEME = 'APP_THEME';

export type ThemeType = 'light' | 'dark';

const store = useStore('use-theme-store');

export function useTheme(defaultTheme: ThemeType = 'light') {
  const theme = ref<ThemeType>(defaultTheme);

  const initTheme = () => {
    const savedTheme = store.get(APP_THEME, StorageEnum.LOCAL);
    theme.value = savedTheme || defaultTheme;
    applyTheme();
  };

  const applyTheme = () => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme.value);
  };

  const toggleTheme = (themeName?: ThemeType) => {
    if (themeName === theme.value) return;
    theme.value = themeName || (theme.value === 'light' ? 'dark' : 'light');
    store.set(APP_THEME, theme.value, {
      storage: StorageEnum.LOCAL,
    });
    applyTheme();
  };

  if (getCurrentInstance()) {
    onMounted(() => {
      initTheme();
    });
  } else {
    initTheme();
  }

  return {
    theme,
    toggleTheme,
  };
}

/**
 * 将颜色转换为RGBA格式
 * @param {string} color - 颜色值，支持hex、rgb、rgba格式
 * @param {number} opacity - 透明度，范围0-1
 * @returns {string} 转换后的RGBA颜色值
 */
export function convertColor(color: string, opacity: number): string {
  // 如果是hex颜色
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  // 如果是rgb颜色
  if (color.startsWith('rgb(')) {
    return color.replace('rgb(', 'rgba(').replace(')', `, ${opacity})`);
  }

  // 如果是rgba颜色，提取原有透明度并与新透明度组合
  if (color.startsWith('rgba(')) {
    const rgbaValues = color.match(/[\d.]+/g);
    if (!rgbaValues) return color;
    const originalOpacity = parseFloat(rgbaValues[3]);
    const combinedOpacity = originalOpacity * opacity;
    return `rgba(${rgbaValues[0]}, ${rgbaValues[1]}, ${rgbaValues[2]}, ${combinedOpacity})`;
  }

  // 其他情况直接返回
  return color;
}
