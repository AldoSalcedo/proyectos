import { Stack } from 'expo-router'
import { ActivityIndicator, ScrollView, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import Screen from '../components/screen'
import { useEffect, useState } from 'react'
import { getGameDetails } from '../lib/metacritic'
import { Image } from 'react-native'
import { Score } from '../components/Score'

export default function Detail() {
  const { gameslug } = useLocalSearchParams()
  const [gameInfo, setGameInfo] = useState(null)

  useEffect(() => {
    if (gameslug) {
      getGameDetails(gameslug).then(setGameInfo)
    }
  }, [gameslug])

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: '#ffee00' },
          headerTintColor: 'black',
          headerLeft: () => {},
          headerTitle: 'The legend of Zelda: breath of the wild',
          headerRight: () => {},
        }}
      />
      <View>
        {gameInfo === null ? (
          <ActivityIndicator color={'#fff'} size={'large'} />
        ) : (
          <ScrollView>
            <View className="justify-center items-center text-center">
              <Image
                className="mb-4 rounded"
                source={{ uri: gameInfo.img }}
                style={{ width: 214, height: 294 }}
              />
              <Score score={gameInfo.score} maxScore={100} />

              <Text className="text-white text-center font-bold text-xl">
                {gameInfo.title}
              </Text>
              <Text className="text-white/70 mt-4 text-left mb-8 text-base">
                {gameInfo.description}
              </Text>
            </View>
          </ScrollView>
        )}
      </View>
    </Screen>
  )
}
