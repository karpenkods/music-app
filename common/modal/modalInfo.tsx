import { FC } from 'react'
import { useCookies } from 'react-cookie'
import useTranslation from 'next-translate/useTranslation'

import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@mui/material'
import { grey, purple } from '@mui/material/colors'

import styles from '../../styles/comments.module.scss'
import { TracksProps } from '../../types'

type ModalInfoProps = {
  track: TracksProps
  open: boolean
  onCloseModalInfo: (value: boolean) => void
}

export const ModalInfo: FC<ModalInfoProps> = ({
  track,
  open,
  onCloseModalInfo,
}) => {
  const cookies = useCookies(['theme_preference'])
  const { t } = useTranslation('common')

  const handleCloseModalInfo = () => {
    onCloseModalInfo(false)
  }

  return (
    <div>
      <Dialog open={open} onClose={handleCloseModalInfo}>
        <DialogTitle
          color="primary"
          align="center"
          style={{ paddingBottom: 0 }}
        >
          {t('trackInformation')}
        </DialogTitle>
        <DialogContent style={{ padding: '20px', width: '100%' }}>
          <DialogContentText style={{ display: 'flex', marginBottom: 15 }}>
            <Typography
              variant="body1"
              color="primary"
              style={{ marginRight: 10 }}
            >
              {t('name')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color:
                  cookies[0].theme_preference === 'dark'
                    ? purple.A700
                    : grey[800],
              }}
            >
              {track.name}
            </Typography>
          </DialogContentText>
          <DialogContentText style={{ display: 'flex', marginBottom: 15 }}>
            <Typography
              variant="body1"
              color="primary"
              style={{ marginRight: 10 }}
            >
              {t('executor')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color:
                  cookies[0].theme_preference === 'dark'
                    ? purple.A700
                    : grey[800],
              }}
            >
              {track.artist}
            </Typography>
          </DialogContentText>
          <DialogContentText style={{ display: 'flex', marginBottom: 15 }}>
            <Typography
              variant="body1"
              color="primary"
              style={{ marginRight: 10 }}
            >
              {t('album')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color:
                  cookies[0].theme_preference === 'dark'
                    ? purple.A700
                    : grey[800],
              }}
            >
              {track.album}
            </Typography>
          </DialogContentText>
          <DialogContentText style={{ display: 'flex', marginBottom: 15 }}>
            <Typography
              variant="body1"
              color="primary"
              style={{ marginRight: 10 }}
            >
              {t('year')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color:
                  cookies[0].theme_preference === 'dark'
                    ? purple.A700
                    : grey[800],
              }}
            >
              {track.year}
            </Typography>
          </DialogContentText>
          <DialogContentText style={{ display: 'flex', marginBottom: 15 }}>
            <Typography
              variant="body1"
              color="primary"
              style={{ marginRight: 10 }}
            >
             {t('genre')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color:
                  cookies[0].theme_preference === 'dark'
                    ? purple.A700
                    : grey[800],
              }}
            >
              {track.genre}
            </Typography>
          </DialogContentText>
          <DialogContentText style={{ display: 'flex', marginBottom: 15 }}>
            <Typography
              variant="body1"
              color="primary"
              style={{ marginRight: 10 }}
            >
              {t('plays')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color:
                  cookies[0].theme_preference === 'dark'
                    ? purple.A700
                    : grey[800],
              }}
            >
              {track.listens}
            </Typography>
          </DialogContentText>
          <DialogContentText style={{ display: 'flex', marginBottom: 15 }}>
            <Typography
              variant="body1"
              color="primary"
              style={{ marginRight: 10 }}
            >
             {t('comment')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color:
                  cookies[0].theme_preference === 'dark'
                    ? purple.A700
                    : grey[800],
              }}
            >
              {track.comments.length}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ padding: '0 24px 16px 24px' }}>
          <Button
            onClick={handleCloseModalInfo}
            className={styles.comment__btnSubmit}
            color="info"
            variant="contained"
            type="submit"
          >
            {t('close')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
