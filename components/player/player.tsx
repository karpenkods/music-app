import React, { FC, useEffect, useState } from 'react'
import Draggable from 'react-draggable'
import useTranslation from 'next-translate/useTranslation'
import clsx from 'clsx'

import { TrackProgress } from '../../common'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'

import { Typography, IconButton, Card, Tooltip } from '@mui/material'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import PauseIcon from '@mui/icons-material/Pause'
import VolumeDownIcon from '@mui/icons-material/VolumeDown'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeMuteIcon from '@mui/icons-material/VolumeMute'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn'
import FlipToBackIcon from '@mui/icons-material/FlipToBack'
import FlipToFrontIcon from '@mui/icons-material/FlipToFront'

import styles from '../../styles/player.module.scss'
import { TracksProps } from '../../types'
import axios from 'axios'
import { useRouter } from 'next/router'

let audio: HTMLAudioElement
let nuberTrack: number
let nextTrack: number
let previousTrack: number

type TracksListProps = {
  tracks?: TracksProps[]
}

export const Player: any | FC<TracksListProps>  = ({ tracks }: any) => {
  const [drop, setDrop] = useState(true)
  const [mute, setMute] = useState(true)
  const { t } = useTranslation('common')

  const { asPath } = useRouter()

  const handleDrop = () => {
    setDrop(!drop)
  }

  const { active, play, currentTime, duration, volume, showPlayer, shuffleOn } =
    useTypedSelector((state) => state.player)

  const {
    pauseTrack,
    playTrack,
    shuffleOnTrack,
    shuffleOffTrack,
    setVolume,
    setDuration,
    setCurrentTime,
    setActiveTrack,
  } = useActions()

  function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }

  tracks?.map((track: { _id: string | undefined }, index: number) =>
    track._id === active?._id
      ? (shuffleOn
          ? ((nextTrack = getRandomIntInclusive(0, tracks.length)),
            (previousTrack = getRandomIntInclusive(0, tracks.length)))
          : ((nextTrack = index + 1), (previousTrack = index - 1)),
        (nuberTrack = index + 1))
      : null,
  )

  useEffect(() => {
    if (!audio) {
      audio = new Audio()
    } else {
      setAudio()
      playTrack()
      audio.play()
    }
  }, [active])

  const nextPlay = () => {
    if (tracks && nextTrack + 1 > tracks.length) {
      return
    } else {
      tracks && setActiveTrack(tracks[nextTrack])
    }
  }

  useEffect(() => {
    if (tracks && nextTrack && currentTime === duration) {
      setActiveTrack(tracks[nextTrack])
    }
  }, [currentTime])

  const previousPlay = () => {
    if (nextTrack - 1 <= 0) {
      return
    } else {
      tracks && setActiveTrack(tracks[previousTrack])
    }
  }

  const setAudio = () => {
    if (active && asPath) {
      audio.src = `${process.env.NEXT_PUBLIC_API_HOST}/${active.audio}`
      audio.onloadedmetadata = () => {
        setDuration(audio.duration)
      }
      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime)
      }
    }
  }

  useEffect(() => {
    if (play) {
      audio.play()
      active
        ? axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/tracks/listen/${active?._id}`)
        : null
    } else {
      audio.pause()
    }
  }, [play])

  const changePlay = () => {
    if (!play) {
      playTrack()
      audio.play()
    } else {
      pauseTrack()
      audio.pause()
    }
  }

  const changCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value)
    setCurrentTime(Number(e.target.value))
  }

  const changVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100
    setVolume(Number(e.target.value))
  }

  const volumeOff = () => {
    audio.muted = !audio.muted
    setMute(!mute)
  }

  const changeShuffle = () => {
    if (shuffleOn) {
      shuffleOnTrack()
    } else {
      shuffleOffTrack()
    }
  }

  return (
    showPlayer && (
      <Draggable bounds="parent" disabled={drop}>
        <Card className={clsx(styles.player, { [styles.player__drop]: drop })}>
          <div className={styles.player__controls}>
            <div className={styles.player__control}>
              <IconButton
                disabled={!active}
                onClick={previousPlay}
                color="info"
                aria-label="back"
              >
                <SkipPreviousIcon />
              </IconButton>
              <IconButton
                disabled={!active}
                color="info"
                onClick={changePlay}
                aria-label="back"
              >
                {!play ? <PlayArrowIcon /> : <PauseIcon />}
              </IconButton>
              <IconButton
                disabled={!active}
                onClick={nextPlay}
                color="info"
                aria-label="next"
              >
                <SkipNextIcon />
              </IconButton>
            </div>
            <div className={styles.player__count}>
              <Tooltip
                title={!shuffleOn ? t('random') : t('turn')}
              >
                <IconButton
                  color="info"
                  aria-label="shufle"
                  onClick={changeShuffle}
                  style={{ padding: '0 20px 0 0' }}
                >
                  {shuffleOn ? (
                    <ShuffleOnIcon style={{ width: 15, height: 15 }} />
                  ) : (
                    <ShuffleIcon style={{ width: 15, height: 15 }} />
                  )}
                </IconButton>
              </Tooltip>
              <Typography variant="caption" color="primary">
                {active ? nuberTrack : 0} / {tracks ? tracks.length : 0}
              </Typography>
            </div>
          </div>
          {active ? (
            <div className={styles.player__track}>
              <Typography
                className={styles.player__trackName}
                variant="subtitle1"
                color="primary"
              >
                {active?.name}
              </Typography>
              <Typography
                className={styles.player__trackName}
                variant="subtitle2"
                color="primary"
              >
                {active?.artist}
              </Typography>
            </div>
          ) : (
            <div className={styles.player__track}>
              <Typography variant="h6" color="primary" sx={{ width: '200px' }}>
                {t('selectTrack')}
              </Typography>
            </div>
          )}
          <div className={styles.player__progress}>
            <TrackProgress
              left={currentTime}
              right={duration}
              onChange={changCurrentTime}
              track={true}
            />
          </div>
          <div className={styles.player__volume}>
            <TrackProgress
              left={volume}
              right={100}
              onChange={changVolume}
              track={false}
              disabled={!mute}
            />
            <Tooltip title={mute ? t('offSound') : t('onSound')}>
              <IconButton color="info" aria-label="volume" onClick={volumeOff}>
                {mute ? (
                  (volume !== 0 && volume !== 100 && <VolumeDownIcon />) ||
                  (volume === 0 && <VolumeMuteIcon />) ||
                  (volume === 100 && <VolumeUpIcon />)
                ) : (
                  <VolumeOffIcon />
                )}
              </IconButton>
            </Tooltip>
          </div>
          <Tooltip title={drop ? t('movePlayer') : t('pinPlayer')}>
            <IconButton aria-label="drop" onClick={handleDrop}>
              {drop ? (
                <FlipToFrontIcon
                  style={{ width: 25, height: 25, color: '#01579b' }}
                />
              ) : (
                <FlipToBackIcon
                  style={{ width: 25, height: 25, color: '#d50000' }}
                />
              )}
            </IconButton>
          </Tooltip>
        </Card>
      </Draggable>
    )
  )
}
