import { Dispatch, FC, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import useTranslation from 'next-translate/useTranslation'

import { useInput } from '../../hooks/useInput'

import {
  TextField,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import styles from '../../styles/comments.module.scss'
import { TracksProps } from '../../types'

type ModalCommentProps = {
  open: boolean
  onCloseComment: (value: boolean) => void
  onChange: Dispatch<SetStateAction<TracksProps>>
  track: TracksProps
}

export const ModalComment: FC<ModalCommentProps> = ({
  open,
  onCloseComment,
  track,
  onChange,
}) => {
  const router = useRouter()
  const username = useInput('')
  const text = useInput('')
  const { t } = useTranslation('common')

  const handleClose = () => {
    onCloseComment(false)
  }

  const addComment = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/tracks/comment`,
        {
          username: username.value,
          text: text.value,
          trackId: track._id,
        },
      )
      onChange({ ...track, comments: [...track.comments, response.data] })
      router.replace(`/tracks/${track._id}`)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <IconButton
          color="info"
          aria-label="close"
          onClick={handleClose}
          style={{ width: 40, position: 'absolute', top: '2%', left: '87%' }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle
          color="primary"
          align="center"
          style={{ paddingTop: '50px', paddingBottom: 0 }}
        >
          {t('yourComment')}
        </DialogTitle>
        <DialogContent style={{ paddingTop: '10px' }}>
          <TextField
            {...username}
            label={t('yourName')}
            error={!username.value}
            size="small"
            variant="standard"
            sx={{ marginBottom: '30px' }}
            inputProps={{ className: styles.textfield }}
            InputLabelProps={{ className: styles.label }}
            helperText={
              !username.value ? (
                <p className={styles.nameHelp}>{t('requiredField')}</p>
              ) : null
            }
          />
          <TextField
            {...text}
            color="primary"
            label={t('yourComments')}
            fullWidth
            size="small"
            error={!text.value}
            variant="standard"
            sx={{ marginBottom: '30px' }}
            inputProps={{ className: styles.textfield }}
            InputLabelProps={{ className: styles.label }}
            multiline
            helperText={
              !text.value ? (
                <p className={styles.nameHelp}>{t('requiredField')}</p>
              ) : null
            }
          />
        </DialogContent>
        <DialogActions style={{ padding: '0 24px 16px 24px' }}>
          <Button
            className={styles.comment__btnSubmit}
            color="info"
            variant="contained"
            disabled={!username.value || !text.value}
            onClick={() => {
              handleClose(), addComment()
            }}
            type="submit"
          >
            {t('send')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
