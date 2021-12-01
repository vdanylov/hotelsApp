import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { loadHotels } from './src/api'
import { HotelsListItem } from './src/components'
import { StatusType, Hotel } from './src/types/types'

const DEFAULT_OFFSET = 24

export default function App() {
  const [hotels, setHotels] = useState<Hotel[] | undefined>()
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

  const ItemSeparatorComponent = useCallback(
    () => <View style={{ height: DEFAULT_OFFSET }} />,
    []
  )

  const renderHotelItem = useCallback(
    ({ item }: { item: Hotel }) => <HotelsListItem hotel={item} />,
    []
  )

  const keyExtractor = useCallback((item: Hotel) => item.id.toString(), [])

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
      <FlatList
        data={hotels}
        keyExtractor={keyExtractor}
        refreshing={status === 'loading'}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={renderHotelItem}
        contentContainerStyle={styles.scrollViewContent}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContent: {
    padding: DEFAULT_OFFSET,
  },
})
