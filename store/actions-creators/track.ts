import { Dispatch } from 'react'
import axios from 'axios'

import { TrackAction, TrackActionTypes } from '../../types'

export const fetchTracks = () => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/tracks`)
      dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data })
    } catch (e) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: 'Произошла ошибка при загрузке треков',
      })
    }
  }
}

export const searchTracks = (query: string) => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/tracks/search?query=`+query)
      dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data })
    } catch (e) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: 'Произошла ошибка при загрузке треков',
      })
    }
  }
}
