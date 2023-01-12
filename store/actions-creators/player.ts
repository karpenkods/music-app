import { PlayerAction, PlayerActionTypes, TracksProps } from '../../types'

export const playTrack = (): PlayerAction => {
  return { type: PlayerActionTypes.PLAY }
}
export const pauseTrack = (): PlayerAction => {
  return { type: PlayerActionTypes.PAUSE }
}
export const shuffleOnTrack = (): PlayerAction => {
  return { type: PlayerActionTypes.SHUFFLE_ON }
}
export const shuffleOffTrack = (): PlayerAction => {
  return { type: PlayerActionTypes.SHUFFLE_OFF }
}
export const showPlayerTrack = (): PlayerAction => {
  return { type: PlayerActionTypes.SHOW_PLAYER }
}
export const hidePlayerTrack = (): PlayerAction => {
  return { type: PlayerActionTypes.HIDE_PLAYER }
}
export const setDuration = (payload: number): PlayerAction => {
  return { type: PlayerActionTypes.SET_DURATION, payload }
}
export const setVolume = (payload: number): PlayerAction => {
  return { type: PlayerActionTypes.SET_VOLUME, payload }
}
export const setCurrentTime = (payload: number): PlayerAction => {
  return { type: PlayerActionTypes.SET_CURRENT_TIME, payload }
}
export const setActiveTrack = (payload: TracksProps): PlayerAction => {
  return { type: PlayerActionTypes.SET_ACTIVE, payload }
}
