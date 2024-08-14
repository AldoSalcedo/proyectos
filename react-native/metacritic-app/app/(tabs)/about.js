import { Link } from 'expo-router'
import { Pressable, ScrollView, Text } from 'react-native'
import { HomeIcon } from '../../components/Icons'
import Screen from '../../components/screen'

export default function About() {
  return (
    <Screen>
      <ScrollView>
        <Link asChild href="/">
          <Pressable>
            <HomeIcon />
          </Pressable>
        </Link>

        <Text className="text-white font-bold mb-8 text-2xl">About</Text>

        <Text className="text-white text-white/90 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla blandit
          justo ut eros convallis fermentum. Ut luctus euismod feugiat.
          Vestibulum nec nulla at neque lacinia vehicula. Integer eleifend diam
          diam, sed commodo ligula lacinia non. Donec tempus ipsum metus, quis
          consequat lorem pulvinar nec. Nulla semper orci vitae dui mattis, nec
          consectetur quam feugiat. In hac habitasse platea dictumst. Praesent
          elementum sed sem et fermentum. In hac habitasse platea dictumst.
          Nulla facilisi.
        </Text>
      </ScrollView>
    </Screen>
  )
}
