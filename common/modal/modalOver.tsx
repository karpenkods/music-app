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

import styles from '../../styles/create.module.scss'

type ModalOverProps = {
  open: boolean
  onChangedStep: (value: number) => void
}

export const ModalOver: FC<ModalOverProps> = ({ open, onChangedStep }) => {
  const router = useRouter()
  const { t } = useTranslation('common')

  const upload = () => {
    onChangedStep(0)
  }

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle color="primary" align="center">
          <Typography variant="h6" color="primary">
            {t('successfully')}
          </Typography>
        </DialogTitle>
        <DialogActions
          style={{ padding: '8px 24px 16px 24px', justifyContent: 'center' }}
        >
          <Button
            onClick={() => router.push('/tracks')}
            color="info"
            variant="contained"
            className={styles.create__btnModalL}
          >
            {t('trackList')}
          </Button>
          <Button
            onClick={upload}
            variant="contained"
            type="submit"
            color="success"
            className={styles.create__btnModalR}
          >
            {t('loadMore')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
