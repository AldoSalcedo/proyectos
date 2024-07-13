import { StyleSheet, TouchableOpacity } from 'react-native'

import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useEffect, useRef, useState } from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Timer } from '@/components/Timer'
import { Audio } from 'expo-av'

export default function HomeScreen() {
  const [isWorking, setIsWorking] = useState(false)
  const [time, setTime] = useState(25 * 60)
  const [currentTimer, setCurrentTimer] = useState(0)
  const [isActive, setIsActive] = useState(false)

  const options = ['Pomodoro', 'Short Break', 'Long Break']
  const backgroundColor = useThemeColor({}, 'background', currentTimer)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
  
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
  
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);
  
  useEffect(() => {
    if (time === 0) {
      setIsActive(false);
      setIsWorking((prevTime) => !prevTime);
      setTime(isWorking ? 300 : 1500);
    }
  }, [time, isWorking]);

  const handlePress = (index: number) => {
    const newTimer = index === 0 ? 25 : index === 1 ? 5 : 15
    setCurrentTimer(index)
    setTime(newTimer * 60)
  }

  const handleStartStop = () => {
    playSound()
    setIsActive(!isActive)
  }

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('@/assets/audio/button-pressed-38129.mp3')
    )
    await sound.playAsync()
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={backgroundColor}
      time={time}
      timerComponent={<Timer time={time} currentTimer={currentTimer} />}
    >
      <ThemedText type="title">Pomodoro</ThemedText>
      <ThemedView style={styles.titleContainer}>
        {options.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(index)}
            style={[
              styles.itemStyle,
              currentTimer !== index && { borderColor: 'transparent' },
            ]}
          >
            <ThemedText type="defaultSemiBold">{item}</ThemedText>
          </TouchableOpacity>
        ))}
      </ThemedView>
      <TouchableOpacity style={styles.button} onPress={handleStartStop}>
        <ThemedText type="defaultSemiBold">
          {isActive ? 'STOP' : 'START'}
        </ThemedText>
      </TouchableOpacity>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  itemStyle: {
    width: '33%',
    alignItems: 'center',
    padding: 5,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#1D3D47',
    marginVertical: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#1D3D47',
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
  },
})
