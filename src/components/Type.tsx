export interface UserLocation {
  latitude: number
  longitude: number
}

export interface TrashCanData {
  Address: string
  Latitude: number
  Longitude: number
  canType: string
  distance: number
}

export interface GyroscopeData {
  rotation: {
    alpha: number
    beta: number
    gamma: number
  }
}
