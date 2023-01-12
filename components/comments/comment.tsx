import { FC } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useCookies } from 'react-cookie'
import clsx from 'clsx'

import { Card, CardContent, Typography } from '@mui/material'
import { grey, purple } from '@mui/material/colors'

import styles from '../../styles/comments.module.scss'
import { CommentTypes } from '../../types'

type CommentProps = {
  comment: CommentTypes
  index: number
}

export const Comment: FC<CommentProps> = ({ comment, index }) => {
  const cookies = useCookies(['theme_preference'])
  const { t } = useTranslation('common')

  return (
    <Card
      className={clsx(styles.comment__card, {
        [styles.comment__left]: index % 2 === 0,
      })}
    >
      <CardContent className={styles.comment__content}>
        <Typography
          variant="subtitle1"
          style={{ fontWeight: 600 }}
          sx={{
            color:
              cookies[0].theme_preference === 'dark' ? purple.A700 : grey[800],
          }}
        >
          {comment.username}
        </Typography>
        <Typography variant="subtitle2" color="primary">
          {comment.text}
        </Typography>
      </CardContent>
    </Card>
  )
}
