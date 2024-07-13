/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

type ColorNames = keyof typeof Colors.light & keyof typeof Colors.dark;

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ColorNames | string,
  currentTimer?: number
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else if (currentTimer !== undefined) {
    // Si se proporciona un temporizador, devuelve el color correspondiente
    switch(currentTimer) {
      case 0: // Pomodoro
        return colorName === 'text' ? '#000000' : Colors[theme].pomodoro;
      case 1: // Short Break
        return colorName === 'text' ? '#000000' : Colors[theme].shortBreak;
      case 2: // Long Break
        return colorName === 'text' ? '#000000' : Colors[theme].longBreak;
      default:
        return Colors[theme][colorName as ColorNames] || Colors[theme].background;
    }
  } else {
    return Colors[theme][colorName as ColorNames] || Colors[theme].background;
  }
}
