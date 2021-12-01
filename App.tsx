import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { loadHotels } from './src/api'

type StatusType = 'success' | 'error' | 'loading'

export default function App() {
  const [hotels, setHotels] = useState()
  const [status, setStatus] = useState<StatusType>('loading')

  const setStatusCallback = (status: StatusType) => () => setStatus(status)

  useEffect(() => {
    loadHotels(setHotels, setStatusCallback('error'))
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>{JSON.stringify(hotels, null, 2)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
