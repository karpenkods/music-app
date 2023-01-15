import { SetStateAction, useEffect, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useCookies } from 'react-cookie'
import clsx from 'clsx'

import { Comment } from './comment'
import { ImageBackground, ModalComment } from '../../common'

import { Card, Button, CardContent, Typography, CardMedia } from '@mui/material'
import { grey, purple } from '@mui/material/colors'
import GetAppIcon from '@mui/icons-material/GetApp'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import SearchIcon from '@mui/icons-material/Search'

import styles from '../../styles/comments.module.scss'
import { TracksProps } from '../../types'

export const Comments = ({ serverTrack }: any) => {
  const [track, setTrack] = useState<TracksProps>(serverTrack)
  const [showButton, setShowButton] = useState(false)
  const [commentsScroll, setCommentsScroll] = useState<HTMLElement | null>()
  const [down, setDown] = useState(false)
  const [openModalComment, setOpenModalComment] = useState(false)
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const cookies = useCookies(['theme_preference'])
  const router = useRouter()
  const { t } = useTranslation('common')

  useEffect(() => {
    const results: any = track.comments.filter(
      (track) =>
        track.text.toLowerCase().includes(search) ||
        track.text.toUpperCase().includes(search) ||
        track.username.toLowerCase().includes(search) ||
        track.username.toUpperCase().includes(search),
    )
    setSearchResults(results)
  }, [search, track])

  const handleSearch = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    setCommentsScroll(document.getElementById('comments'))
  }, [searchResults])

  useEffect(() => {
    if (searchResults.length > 3) {
      setShowButton(true)
    } else {
      setShowButton(false)
    }
  }, [searchResults])

  const scrollToTop = () => {
    commentsScroll?.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    setDown(false)
  }

  const scrollToDown = () => {
    commentsScroll?.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    })
    setDown(true)
  }

  const handleOpenModalComment = () => {
    setOpenModalComment(true)
  }

  const handleClosModalComment = (
    value: boolean | ((prevState: boolean) => boolean),
  ) => {
    setOpenModalComment(value)
  }

  return (
    <div className={styles.comments}>
      <div className={styles.fixed}>
        <div className={styles.comments__headerBlock}>
          <Typography color="primary" className={styles.comments__title}>
            {t('comments')}
          </Typography>
          <div className={styles.comments__searchBlock}>
            <SearchIcon color="primary" />
            <input
              autoComplete="true"
              type="text"
              onChange={handleSearch}
              placeholder={t('search')}
              value={search}
              disabled={track.comments.length === 0}
              className={clsx(styles.comments__search, {
                [styles.comments__search_light]:
                  cookies[0].theme_preference === 'light',
              })}
            />
          </div>
        </div>
        <div className={styles.comments__btns}>
          <Button
            onClick={() => router.push('/tracks')}
            variant="contained"
            color="info"
            className={styles.comments__btnTracks}
          >
            {t('trackList')}
          </Button>
          <Button
            onClick={handleOpenModalComment}
            variant="contained"
            color="success"
            className={styles.comments__btnTracks}
          >
            {t('сomment')}
          </Button>
          {down
            ? showButton && (
                <Button
                  onClick={scrollToTop}
                  variant="contained"
                  color="info"
                  className={styles.comments__btnTracks}
                  startIcon={<FileUploadIcon />}
                >
                  {t('firstComment')}
                </Button>
              )
            : showButton && (
                <Button
                  onClick={scrollToDown}
                  variant="contained"
                  color="info"
                  className={styles.comments__btnTracks}
                  startIcon={<GetAppIcon />}
                >
                  {t('lastComment')}
                </Button>
              )}
        </div>
        <div className={styles.comments__contentBlock}>
          <Card className={styles.comments__track}>
            <CardContent className={styles.comments__content}>
              <Typography
                variant="h5"
                sx={{
                  color:
                    cookies[0].theme_preference === 'dark'
                      ? purple.A700
                      : grey[800],
                }}
              >
                {track.name}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                {track.artist}
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              className={styles.comments__media}
              image={`http://localhost:5000/${track.picture}`}
              alt="Track cover"
            />
          </Card>
        </div>
      </div>
      {serverTrack.comments.length && searchResults.length ? (
        <div
          id="comments"
          className={clsx(styles.relative, {
            [styles.relative_light]: cookies[0].theme_preference === 'light',
          })}
        >
          <div className={styles.relative__content}>
            {searchResults.map((comment, index) => (
              <Comment key={index} comment={comment} index={index} />
            ))}
          </div>
        </div>
      ) : !serverTrack.comments.length && !searchResults.length ? (
        <>
          <Typography
            className={styles.comments__noComment}
            variant="h4"
            color="primary"
          >
            {t('noComments')}
          </Typography>
          <Image
            src={'/gittar.svg'}
            width={150}
            height={150}
            alt=""
            style={{ marginTop: 20, color: '#fff' }}
          />
        </>
      ) : (
        <Typography
          className={styles.comments__noComment}
          variant="h4"
          color="primary"
        >
          {t('nothingFound')}
        </Typography>
      )}
      <ModalComment
        open={openModalComment}
        onCloseComment={handleClosModalComment}
        track={track}
        onChange={setTrack}
      />
      <ImageBackground />
    </div>
  )
}
