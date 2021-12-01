import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Hotel } from '../types/types'
import { Offsets } from '../utils/constants'

interface Props {
  hotel: Hotel
}

export const HotelsListItem = ({ hotel }: Props) => {
  const uri = hotel.gallery?.[0]
  return (
    <View style={[styles.itemContainer, styles.itemContainerShadow]}>
      {uri ? (
        <Image
          source={{ uri }}
          resizeMode="stretch"
          style={styles.image}
          defaultSource={require('../../assets/no-preview.png')}
        />
      ) : (
        <View style={styles.image} />
      )}
      <View style={{ padding: Offsets.DEFAULT_OFFSET / 2 }}>
        <Text>{hotel.name}</Text>
        <Text>stars: {hotel.stars}</Text>
        <Text>userRating: {hotel.userRating}</Text>
        <Text>
          Check In: {hotel.checkIn.from} - {hotel.checkIn.to}
        </Text>
        <Text>
          Check Out: {hotel.checkOut.from} - {hotel.checkOut.to}
        </Text>
        <Text>email: {hotel.contact.email}</Text>
        <Text>phone: {hotel.contact.phoneNumber}</Text>
        <Text>
          p.p: {hotel.price} {hotel.currency}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
})
