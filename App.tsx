import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native'
import { loadHotels } from './src/api'
import { HotelsListItem } from './src/components'
import { StatusType, Hotel, OrderSortType } from './src/types/types'
import { Offsets } from './src/utils/constants'
import orderBy from 'lodash/orderBy'

export const orderValues: Record<OrderSortType, OrderSortType> = {
  asc: 'desc',
  desc: 'asc',
}

type PartialHotelKeys = Partial<keyof Hotel>

const HOTEL_ORDER_PROPS: {
  title: string
  value: PartialHotelKeys
}[] = [
  { title: 'Name', value: 'name' },
  { title: 'Price', value: 'price' },
  { title: 'Stars', value: 'stars' },
  { title: 'User Rating', value: 'userRating' },
]

export default function App() {
  const [hotels, setHotels] = useState<Hotel[] | undefined>()
  const [status, setStatus] = useState<StatusType>('loading')
  const [orderByProp, setOrderByProp] = useState<PartialHotelKeys>('name')
  const [sortOrder, setSortOrder] = useState([orderValues.desc])
  const { width } = useWindowDimensions()
  const imageSize = width - Offsets.DEFAULT_OFFSET * 2
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

  const handleOrderItemPress = (item: Partial<keyof Hotel>) => {
    if (item === orderByProp) {
      setSortOrder((order) => [orderValues[order[0]]])
    } else {
      setOrderByProp(item)
    }
  }

  const ItemSeparatorComponent = useCallback(
    () => <View style={{ height: Offsets.DEFAULT_OFFSET }} />,
    []
  )

  const ListHeaderComponent = () => (
    <ScrollView style={styles.listHeader} horizontal>
      {HOTEL_ORDER_PROPS.map(({ title, value }) => {
        const isSelected = value === orderByProp
        const titlePostfix = isSelected
          ? sortOrder[0] === 'asc'
            ? ' ↑'
            : ' ↓'
          : ''
        return (
          <Button
            key={title}
            title={`${title}${titlePostfix}`}
            color={isSelected ? '#000000' : '#aaaaaa'}
            onPress={() => handleOrderItemPress(value)}
          />
        )
      })}
    </ScrollView>
  )

  const renderHotelItem = useCallback(
    ({ item }: { item: Hotel }) => (
      <HotelsListItem hotel={item} imageSize={imageSize} />
    ),
    []
  )

  const keyExtractor = useCallback((item: Hotel) => `${item.id}`, [])

  if (status === 'error') {
    return (
      <View style={styles.errorContainer}>
        <Text>Something wrong :(</Text>
        <Button title="Retry" onPress={handleRetry} />
      </View>
    )
  }

  const orderedHotels = useMemo(
    () => orderBy(hotels, orderByProp, sortOrder),
    [hotels, orderByProp, sortOrder]
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        extraData={sortOrder}
        ListHeaderComponent={ListHeaderComponent}
        data={orderedHotels}
        stickyHeaderIndices={[0]}
        keyExtractor={keyExtractor}
        refreshing={status === 'loading'}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={renderHotelItem}
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
  listHeader: {
    backgroundColor: '#ffffff',
    elevation: 2,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 16,
    shadowOpacity: 0.6,
    height: 48,
    paddingHorizontal: Offsets.DEFAULT_OFFSET,
    marginBottom: Offsets.DEFAULT_OFFSET,
  },
})
function setOrderByItem(item: string): void {
  throw new Error('Function not implemented.')
}
