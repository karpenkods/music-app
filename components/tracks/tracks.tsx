import { FC, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'

import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import { NextThunkDispatch } from '../../store'
import { searchTracks } from '../../store/actions-creators/track'
import { ImageBackground } from '../../common'
import { Track } from './track'

import styles from '../../styles/tracks.module.scss'
import { TracksProps } from '../../types'

type TracksListProps = {
  tracks: TracksProps[]
  error: string
}

export const Tracks: FC<TracksListProps> = ({ tracks, error }) => {
  const [query, setQuery] = useState('')
  const [timer, setTimer] = useState<null | void | any>(null)

  const dispatch = useDispatch() as NextThunkDispatch
  const cookies = useCookies(['theme_preference'])
  const router = useRouter()
  const { t } = useTranslation('common')

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    if (timer) {
      clearTimeout(timer)
    }
    setTimer(
      setTimeout(async () => {
        await dispatch(searchTracks(e.target.value))
      }, 500),
    )
  }

  return (
    <div className={styles.tracks}>
      <div className={styles.fixed}>
        <div className={styles.tracks__searchBlock}>
          <SearchIcon color="primary" />
          <input
            autoComplete="true"
            onChange={search}
            value={query}
            type="text"
            placeholder={t('search')}
            className={clsx(styles.tracks__search, {
              [styles.tracks__search_light]:
                cookies[0].theme_preference === 'light',
            })}
          />
        </div>
        <div className={styles.tracks__headerBlock}>
          <div
            className={styles.tracks__mobile}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Typography color="primary" className={styles.tracks__title}>
              {t('trackList')}
            </Typography>
            <Typography
              variant="body1"
              color="primary"
              sx={{ marginTop: '6px' }}
            >
              {tracks.length} {t('compositions')}
            </Typography>
          </div>
          <Button
            onClick={() => router.push('/tracks/create')}
            variant="contained"
            color="info"
            className={styles.tracks__btn}
          >
            {t('downloadTrack')}
          </Button>
        </div>
      </div>
      {error ? (
        <div className={styles.tracks__contentBlock}>
          <Typography variant="h5" color="primary">
            {error}
          </Typography>
        </div>
      ) : (
        <div
          className={clsx(styles.relative, {
            [styles.relative_light]: cookies[0].theme_preference === 'light',
          })}
        >
          {tracks.length ? (
            <div className={styles.tracks__contentBlock}>
              {tracks.map((track, index) => (
                <Track
                  key={track._id}
                  track={track}
                  lastIndex={tracks.length - 1}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <Typography
              className={styles.tracks__noComment}
              variant="h4"
              color="primary"
            >
              {t('nothingFound')}
            </Typography>
          )}
        </div>
      )}
      <ImageBackground />
    </div>
  )
}
