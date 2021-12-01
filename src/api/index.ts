const GET_HOTELS_URL =
  'https://run.mocky.io/v3/eef3c24d-5bfd-4881-9af7-0b404ce09507'

export const getHotels = () => fetch(GET_HOTELS_URL)

export const loadHotels = async (onSuccess?: Function, onError?: Function) => {
  try {
    const data = await getHotels()
    onSuccess?.(data)
  } catch (error) {
    onError?.()
  }
}
