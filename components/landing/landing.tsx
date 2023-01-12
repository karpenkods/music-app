import { FC } from 'react'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'

import { ImageBackground } from '../../common'

import styles from '../../styles/landing.module.scss'

export const Landing: FC = () => {
  const router = useRouter()
  const { t } = useTranslation('common')

  return (
    <div className={styles.landing}>
      <Typography color="primary" className={styles.landing__title}>
        {t('welcome')}
      </Typography>
      <Typography color="primary" className={styles.landing__description_one}>
        {t('musicApp')}
      </Typography>
      <Typography color="primary" className={styles.landing__description_two}>
        {t('description')}
      </Typography>
      <Button
        variant="contained"
        color="info"
        onClick={() => router.push('/tracks')}
        className={styles.landing__btn}
      >
        {t('trackList')}
      </Button>
      <ImageBackground />
    </div>
  )
}
