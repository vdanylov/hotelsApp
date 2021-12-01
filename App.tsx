import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native'
import { loadHotels } from './src/api'

type StatusType = 'success' | 'error' | 'loading'
const DEFAULT_OFFSET = 24

export default function App() {
  const [hotels, setHotels] = useState()
  const [status, setStatus] = useState<StatusType>('loading')
  const { width } = useWindowDimensions()

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

  const renderHotelItem = ({ item: hotel }: { item: any }) => {
    const uri = hotel?.gallery?.[0]
    return (
      <View
        key={hotel.id}
        style={[styles.itemContainer, styles.itemContainerShadow]}
      >
        {uri ? (
          <Image
            source={{ uri }}
            style={styles.image}
            defaultSource={require('./assets/no-preview.png')}
          />
        ) : (
          <View style={styles.image} />
        )}
        <View style={{ padding: DEFAULT_OFFSET / 2 }}>
          <Text>{hotel.name}</Text>
          <Text>{hotel.name}</Text>
        </View>
      </View>
    )
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
      <FlatList
        data={hotels}
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
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
  },
  itemContainerShadow: {
    shadowColor: '#000000',
    shadowRadius: 12,
    shadowOpacity: 0.2,
    elevation: 6,
  },
  scrollViewContent: {
    padding: DEFAULT_OFFSET,
  },
})
