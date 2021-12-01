import React, { useMemo } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Hotel } from '../types/types'
import { Offsets } from '../utils/constants'
import { Rating } from 'react-native-ratings'
import { getRatingBackground } from '../utils/helpers'
interface Props {
  hotel: Hotel
  imageSize: number
}

export const HotelsListItem = ({ imageSize, hotel }: Props) => {
  const uri = hotel.gallery?.[0]

  const ratingBgColor = useMemo(
    () => getRatingBackground(hotel.userRating * 10),
    [hotel.userRating]
  )

  return (
    <View style={[styles.itemContainer, styles.itemContainerShadow]}>
      {uri ? (
        <Image
          source={{ uri }}
          resizeMode="stretch"
          style={{ width: imageSize, height: imageSize }}
          defaultSource={require('../../assets/no-preview.png')}
        />
      ) : (
        <View style={styles.image} />
      )}
      <View style={styles.contentContainer}>
        <View style={styles.row}>
          <Rating imageSize={14} startingValue={hotel.stars} readonly />
          <View
            style={[
              styles.userRatingContainer,
              { backgroundColor: ratingBgColor },
            ]}
          >
            <Text style={styles.rating}>{hotel.userRating * 10}%</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text
            numberOfLines={1}
            style={[styles.title, styles.blackBold, { flex: 3 }]}
          >
            {hotel.name}
          </Text>
          <Text
            style={[
              styles.description,
              styles.blackBold,
              styles.alignTextRight,
              {
                flex: 2,
              },
            ]}
          >
            <Text style={styles.price}>{hotel.price}</Text> {hotel.currency} p.p
          </Text>
        </View>
        <View style={styles.row}>
          <Text>
            In: {hotel.checkIn.from}-{hotel.checkIn.to}
          </Text>
          <Text>
            Out: {hotel.checkOut.from}-{hotel.checkOut.to}
          </Text>
        </View>
        <Text style={[styles.description, styles.alignTextRight]}>
          {hotel.contact.email}
        </Text>
        <Text style={[styles.description, styles.alignTextRight]}>
          {hotel.contact.phoneNumber}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  alignTextRight: {
    textAlign: 'right',
  },
  blackBold: {
    fontWeight: 'bold',
    color: '#000000',
  },
  title: {
    fontSize: 14,
  },
  description: {
    fontSize: 12,
    color: '#696969CC',
  },
  contentContainer: {
    padding: Offsets.DEFAULT_OFFSET / 2,
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
  price: {
    color: 'red',
    fontSize: 16,
  },
  rating: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userRatingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    borderRadius: 4,
  },
})
