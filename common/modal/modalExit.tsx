import { FC } from 'react'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from '@mui/material'

type ModalExitProps = {
  open: boolean
  onCloseModalExit: (value: boolean) => void
}

export const ModalExit: FC<ModalExitProps> = ({ open, onCloseModalExit }) => {
  const router = useRouter()
  const { t } = useTranslation('common')

  const handleCloseModalExit = () => {
    onCloseModalExit(false)
  }

  return (
    <div>
      <Dialog open={open} onClose={handleCloseModalExit}>
        <DialogTitle color="primary" align="center">
          <Typography variant="h6" color="primary">
            {t('exit')}?
          </Typography>
          <Typography variant="subtitle1" color="primary">
            {t('changesDeleted')}
          </Typography>
        </DialogTitle>
        <DialogActions
          style={{ padding: '8px 24px 16px 24px', justifyContent: 'center' }}
        >
          <Button
            onClick={handleCloseModalExit}
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
            onClick={() => router.push('/tracks')}
            variant="contained"
            type="submit"
            color="error"
            style={{
              height: 30,
              width: 'fit-content',
              marginLeft: 50,
              textTransform: 'none',
            }}
          >
            {t('exit')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
