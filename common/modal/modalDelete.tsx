import { FC } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import { useTypedSelector } from '../../hooks/useTypedSelector'

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from '@mui/material'

import { TracksProps } from '../../types'

type ModalDeleteProps = {
  track: TracksProps
  open: boolean
  onCloseModalDelete: (value: boolean) => void
}

export const ModalDelete: FC<ModalDeleteProps> = ({
  track,
  open,
  onCloseModalDelete,
}) => {
  const { active } = useTypedSelector((state) => state.player)
  const router = useRouter()
  const { t } = useTranslation('common')

  const delTrack = async () => {
    try {
      await axios.delete(`http://localhost:5000/tracks/${track._id}`)
    } catch (e) {
      console.log(e)
    }
    router.replace('/tracks')
  }

  const handleCloseModalDelete = () => {
    onCloseModalDelete(false)
  }

  return (
    <div>
      <Dialog open={open} onClose={handleCloseModalDelete}>
        <DialogTitle color="primary" align="center">
          {track._id === active?._id ? (
            <Typography variant="h6" color="error">
              {t('cantDeleteTrack')}
            </Typography>
          ) : (
            <>
              <Typography variant="h6" color="primary">
                {t('deleteTrack')}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                {track.name}
              </Typography>
            </>
          )}
        </DialogTitle>
        <DialogActions
          style={{ padding: '8px 24px 16px 24px', justifyContent: 'center' }}
        >
          <Button
            onClick={handleCloseModalDelete}
            color="info"
            variant="contained"
            style={{
              height: 30,
              width: 'fit-content',
              textTransform: 'none',
            }}
          >
            {t('cancel')}
          </Button>
          <Button
            onClick={() => {
              delTrack(), handleCloseModalDelete()
            }}
            variant="contained"
            type="submit"
            color="error"
            disabled={track._id === active?._id}
            style={{
              height: 30,
              width: 'fit-content',
              marginLeft: 50,
              textTransform: 'none',
            }}
          >
            {t('delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
