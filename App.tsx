import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { loadHotels } from './src/api'

type StatusType = 'success' | 'error' | 'loading'

export default function App() {
  const [hotels, setHotels] = useState()
  const [status, setStatus] = useState<StatusType>('loading')

  const setStatusCallback = (status: StatusType) => () => setStatus(status)

  useEffect(() => {
    loadHotels({
      onSuccess: setHotels,
      onError: setStatusCallback('error'),
      onLoadingEnd: setStatusCallback('success'),
    })
  }, [])

  const handleRetry = () => {
    loadHotels({
      onSuccess: setHotels,
      onError: setStatusCallback('error'),
      onLoadingStart: setStatusCallback('loading'),
      onLoadingEnd: setStatusCallback('success'),
    })
  }

  if (status === 'error') {
    return (
      <View style={styles.errorContainer}>
        <Text>Something wrong :(</Text>
        <Button title="Retry" onPress={handleRetry} />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {status === 'loading' ? (
        <ActivityIndicator size="large" />
      ) : (
        <Text>{JSON.stringify(hotels, null, 2)}</Text>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
})
