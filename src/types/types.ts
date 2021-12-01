type Contact = {
  phoneNumber: string
  email: string
}

type HotelLocation = {
  address: string
  city: string
  latitude: number
  longitude: number
}

type CheckInOut = {
  from: string
  to: string
}

export interface Hotel {
  id: number
  name: string
  location: HotelLocation
  stars: number
  checkIn: CheckInOut
  checkOut: CheckInOut
  contact: Contact
  gallery: string[]
  userRating: number
  price: number
  currency: string
}

export type StatusType = 'success' | 'error' | 'loading'
