import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

type TimerProps = {
time: number;
currentTimer: number;
}

function getContrastColor(hexColor: string) {
  // Convierte el color hexadecimal a RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // Calcula la luminosidad
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Retorna blanco para colores oscuros y negro para colores claros
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

export const Timer = ({time, currentTimer}: TimerProps) => {
  const backgroundColor = useThemeColor({}, 'background', currentTimer);
  const textColor = getContrastColor(backgroundColor)
  const formattedTime = `${Math.floor(time / 60).toString().padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`;

  return (
      <ThemedText type="title" style={{color: textColor}}>{formattedTime}</ThemedText>
  )
}