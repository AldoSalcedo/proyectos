import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { MainContent } from './components/MainContent'
import { StyleSheet, View } from 'react-native'

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="light" />
        <MainContent />
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
})
