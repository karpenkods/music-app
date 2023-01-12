import Link from 'next/link'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'

import { useTypedSelector } from '../hooks/useTypedSelector'
import { Player } from '../components'

import { Grid, Button, Typography } from '@mui/material'

const Error = () => {
  const { showPlayer } = useTypedSelector((state) => state.player)
  const { tracks } = useTypedSelector((state) => state.track)
  const { t } = useTranslation('common')

  return (
    <>
      <Grid
        container
        height="100vh"
        justifyContent="center"
        alignItems="flex-end"
        position="relative"
      >
        <Image
          src="/404.png"
          alt="picture"
          fill
          style={{
            objectFit: 'cover',
            zIndex: -5,
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            style={{ zIndex: 999, marginBottom: '30px' }}
            variant="h4"
            color="#FFF"
          >
            {t('notFound')}
          </Typography>
          <Link href="/tracks" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              size="medium"
              color="info"
              style={{
                textAlign: 'center',
                fontWeight: 600,
                marginBottom: 50,
                textTransform: 'none',
                borderRadius: 5,
                boxShadow:
                  'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
              }}
            >
              {t('trackList')}
            </Button>
          </Link>
        </div>
      </Grid>
      {showPlayer && <Player tracks={tracks} />}
    </>
  )
}

export default Error
