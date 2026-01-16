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
