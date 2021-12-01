const GET_HOTELS_URL =
  'https://run.mocky.io/v3/eef3c24d-5bfd-4881-9af7-0b404ce09507'

export const getHotels = () => fetch(GET_HOTELS_URL, { method: 'GET' })

interface LoadHotelsPayload {
  onError?: Function
  onLoadingEnd?: Function
  onLoadingStart?: Function
  onSuccess?: Function
}

export const loadHotels = async ({
  onError,
  onLoadingEnd,
  onLoadingStart,
  onSuccess,
}: LoadHotelsPayload) => {
  try {
    onLoadingStart?.()
    const res = await getHotels()
    const data = await res.json()
    onSuccess?.(data)
    onLoadingEnd?.(data)
  } catch (error) {
    onError?.()
  }
}
