import { MouseEventHandler, ReactNode } from 'react'

export type ToggleThemeProps = {
  toggleTheme?: MouseEventHandler<HTMLDivElement> | undefined
  serverTrack?: any
}

export type LayoutProps = {
  children: ReactNode
  title: string
}

export type CommentTypes = {
  id: string
  username: string
  text: string
}

export type TracksProps = {
  _id: string
  name: string
  artist?: string
  album?: string
  year?: string
  genre?: string
  listens: number
  picture?: string
  audio: string
  comments: CommentTypes[]
}

export type StepWrapperProps = {
  activeStep: number
  children: ReactNode
}

export type FileUploadProps = {
  setFile: Function
  setUrl: Function
  accept: string
  children: ReactNode
  audiofile: boolean
}

export type TrackProgressProps = {
  left: number
  right: number
  onChange: (e: any) => void
  track: boolean
  disabled?: boolean
}

export type ThemeState = {
  dark: boolean
  light: boolean
}

export type PlayerState = {
  active: null | TracksProps
  volume: number
  duration: number
  currentTime: number
  play: boolean
  shuffleOn: boolean
  showPlayer: boolean
}

export type TrackState = {
  tracks: TracksProps[]
  error: string
}

export enum PlayerActionTypes {
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
  SHUFFLE_ON = 'SHUFFLE_ON',
  SHUFFLE_OFF = 'SHUFFLE_OFF',
  SHOW_PLAYER = 'SHOW_PLAYER',
  HIDE_PLAYER = 'HIDE_PLAYER',
  SET_ACTIVE = 'SET_ACTIVE',
  SET_DURATION = 'SET_DURATION',
  SET_CURRENT_TIME = 'SET_CURRENT_TIME',
  SET_VOLUME = 'SET_VOLUME',
}

type PlayAction = {
  type: PlayerActionTypes.PLAY
}
type PauseAction = {
  type: PlayerActionTypes.PAUSE
}
type ShufleOnAction = {
  type: PlayerActionTypes.SHUFFLE_ON
}
type ShufleOffAction = {
  type: PlayerActionTypes.SHUFFLE_OFF
}
type ShowPlayerAction = {
  type: PlayerActionTypes.SHOW_PLAYER
}
type HidePlayerAction = {
  type: PlayerActionTypes.HIDE_PLAYER
}
type SetActiveAction = {
  type: PlayerActionTypes.SET_ACTIVE
  payload: TracksProps
}
type SetDurationAction = {
  type: PlayerActionTypes.SET_DURATION
  payload: number
}
type SetVolumeAction = {
  type: PlayerActionTypes.SET_VOLUME
  payload: number
}
type SetCurrentTimeAction = {
  type: PlayerActionTypes.SET_CURRENT_TIME
  payload: number
}

export enum TrackActionTypes {
  FETCH_TRACKS = 'FETCH_TRACKS',
  FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR',
}

type FetchTracksAction = {
  type: TrackActionTypes.FETCH_TRACKS
  payload: TracksProps[]
}

type FetchTracksErrorAction = {
  type: TrackActionTypes.FETCH_TRACKS_ERROR
  payload: string
}

export type PlayerAction =
  | PlayAction
  | PauseAction
  | ShufleOnAction
  | ShufleOffAction
  | ShowPlayerAction
  | HidePlayerAction
  | SetActiveAction
  | SetDurationAction
  | SetVolumeAction
  | SetCurrentTimeAction

export type TrackAction = FetchTracksAction | FetchTracksErrorAction
