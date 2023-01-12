import { PlayerAction, PlayerActionTypes, PlayerState } from '../../types'

const initialState: PlayerState = {
  currentTime: 0,
  duration: 0,
  active: null,
  volume: 50,
  play: false,
  shuffleOn: false,
  showPlayer: false,
}

export const playerReducer = (
  state = initialState,
  action: PlayerAction,
): PlayerState => {
  switch (action.type) {
    case PlayerActionTypes.PLAY:
      return { ...state, play: true }
    case PlayerActionTypes.PAUSE:
      return { ...state, play: false }
    case PlayerActionTypes.SHUFFLE_ON:
      return { ...state, shuffleOn: false }
    case PlayerActionTypes.SHUFFLE_OFF:
      return { ...state, shuffleOn: true }
    case PlayerActionTypes.SHOW_PLAYER:
      return { ...state, showPlayer: true }
    case PlayerActionTypes.HIDE_PLAYER:
      return { ...state, showPlayer: false }
    case PlayerActionTypes.SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload }
    case PlayerActionTypes.SET_VOLUME:
      return { ...state, volume: action.payload }
    case PlayerActionTypes.SET_DURATION:
      return { ...state, duration: action.payload }
    case PlayerActionTypes.SET_ACTIVE:
      return { ...state, active: action.payload }
    default:
      return state
  }
}
