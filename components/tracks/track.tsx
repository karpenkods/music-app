import { FC, SetStateAction, useState } from 'react'
import { useCookies } from 'react-cookie'
import moment from 'moment'
import clsx from 'clsx'

import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ModalDelete, ModalInfo, TrackMenu } from '../../common'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ClearAllIcon from '@mui/icons-material/ClearAll'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import { grey, purple } from '@mui/material/colors'

import { TracksProps } from '../../types'
import styles from '../../styles/tracks.module.scss'

type TrackProps = {
  track: TracksProps
  index: number
  lastIndex: number
}

export const Track: FC<TrackProps> = ({ track, index, lastIndex }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [openModalInfo, setOpenModalInfo] = useState<boolean>(false)

  const cookies = useCookies(['theme_preference'])
  const openMenu = Boolean(anchorEl)

  const { active, play, currentTime, duration } = useTypedSelector(
    (state) => state.player,
  )

  const { playTrack, pauseTrack, setActiveTrack } = useActions()

  const handleOpenMore = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMore = (value: SetStateAction<HTMLElement | null>) => {
    setAnchorEl(value)
  }

  const handleOpenDelete = (
    value: boolean | ((prevState: boolean) => boolean),
  ) => {
    setOpenModalDelete(value)
  }

  const handleCloseDelete = (
    value: boolean | ((prevState: boolean) => boolean),
  ) => {
    setOpenModalDelete(value)
  }

  const handleOpenInfo = (
    value: boolean | ((prevState: boolean) => boolean),
  ) => {
    setOpenModalInfo(value)
  }

  const handleCloseInfo = (
    value: boolean | ((prevState: boolean) => boolean),
  ) => {
    setOpenModalInfo(value)
  }

  const playTrackFromList = () => {
    if (play) {
      setActiveTrack(track)
      pauseTrack()
    } else {
      setActiveTrack(track)
      playTrack()
    }
  }

  console.log(track.audio);
  

  return (
    <>
      <Card
        className={clsx(styles.track, {
          [styles.track__index]: index === lastIndex,
          [styles.track__active]: active?._id === track._id,
        })}
      >
        <div className={styles.track__info}>
          <div style={{ display: 'flex' }}>
            <IconButton
              color="info"
              onClick={playTrackFromList}
              aria-label="back"
            >
              {play && active?._id === track._id ? (
                <PauseIcon
                  style={{ width: 40, height: 40, margin: '0px 10px' }}
                />
              ) : active?._id !== track._id ? (
                <PlayArrowIcon
                  style={{ width: 40, height: 40, margin: '0px 10px' }}
                />
              ) : (
                <PlayArrowIcon
                  style={{ width: 40, height: 40, margin: '0px 10px' }}
                />
              )}
            </IconButton>
            <CardContent className={styles.track__content}>
              <Typography
                variant="h6"
                className={styles.track__contentMobile}
                sx={{
                  marginBottom: '15px',
                  color:
                    cookies[0].theme_preference === 'dark'
                      ? purple.A700
                      : grey[800],
                }}
              >
                {track.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="primary"
                className={styles.track__contentMobile}
              >
                {track.artist}
              </Typography>
            </CardContent>
          </div>
          <div className={styles.track__infoBlock}>
            <IconButton
              id="more-button"
              aria-controls={openMenu ? 'more-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? 'true' : undefined}
              onClick={handleOpenMore}
              className={styles.track__moreBtn}
              aria-label="more"
              color="info"
            >
              <ClearAllIcon />
            </IconButton>
            <Typography
              variant="subtitle2"
              sx={{
                color:
                  cookies[0].theme_preference === 'dark'
                    ? purple.A700
                    : grey[800],
              }}
            >
              {active?._id === track._id &&
                `${moment(Math.ceil(currentTime * 1000)).format(
                  'mm:ss',
                )} / ${moment(Math.ceil(duration * 1000)).format('mm:ss')}`}
            </Typography>
          </div>
        </div>
        <CardMedia
          component="img"
          className={styles.track__media}
          image={`${process.env.NEXT_PUBLIC_API_HOST}/${track.picture}`}
          alt="Track cover"
        />
      </Card>
      <TrackMenu
        track={track}
        open={openMenu}
        anchorEl={anchorEl}
        onCloseMenu={handleCloseMore}
        onOpenModalDelete={handleOpenDelete}
        onOpenModalInfo={handleOpenInfo}
      />
      <ModalDelete
        open={openModalDelete}
        onCloseModalDelete={handleCloseDelete}
        track={track}
      />
      <ModalInfo
        open={openModalInfo}
        onCloseModalInfo={handleCloseInfo}
        track={track}
      />
    </>
  )
}
