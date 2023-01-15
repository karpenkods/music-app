import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import axios from 'axios'
import clsx from 'clsx'

import {
  Typography,
  Button,
  Tooltip,
  IconButton,
  TextField,
} from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import {
  FileUpload,
  ImageBackground,
  ModalExit,
  ModalOver,
  StepWrapper,
} from '../../common'
import { useInput } from '../../hooks/useInput'

import styles from '../../styles/create.module.scss'

export const Create: FC = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [openModalExit, setOpenModalExit] = useState(false)
  const [openModalOver, setOpenModalOver] = useState(false)
  const [picture, setPicture] = useState<any>()
  const [urlPicture, setUrlPicture] = useState<null | string>()
  const [audio, setAudio] = useState<any>()
  const { t } = useTranslation('common')

  useEffect(() => {
    if (activeStep === 0) {
      setAudio(null)
    }
  }, [activeStep])

  const deleteAudio = () => {
    setAudio(null)
  }

  const deletePicture = () => {
    setUrlPicture(null)
  }

  const back = () => {
    setActiveStep((prev) => prev - 1)
  }

  const next = () => {
    setActiveStep((prev) => prev + 1)
  }

  const handleOpenExit = () => {
    setOpenModalExit(true)
  }

  const handleOpenOver = () => {
    const formData = new FormData()
    formData.append('name', name.value)
    formData.append('album', album.value)
    formData.append('artist', artist.value)
    formData.append('year', year.value)
    formData.append('genre', genre.value)
    formData.append('picture', picture)
    formData.append('audio', audio)
    axios.post(`http://localhost:5000/tracks`, formData)
    setOpenModalOver(true)
  }

  const handleCloseExit = (
    value: boolean | ((prevState: boolean) => boolean),
  ) => {
    setOpenModalExit(value)
  }

  const handleChangeStep = (
    value: number | ((prevState: number) => number),
  ) => {
    setActiveStep(value)
    setOpenModalOver(false)
  }

  const name = useInput('')
  const artist = useInput('')
  const album = useInput('')
  const year = useInput('')
  const genre = useInput('')

  return (
    <div className={styles.create}>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && (
          <div className={styles.create__headerBlock}>
            <Typography
              color="primary"
              className={clsx(styles.create__title, styles.create__titleMobile)}
            >
              {t('downloadTrackTitle')}
            </Typography>
            <div className={styles.create__form}>
              <div className={styles.create__nameBlock}>
                {audio ? (
                  <div className={styles.create__cover}>
                    <Image
                      src={'/audio_2.jpg'}
                      width={250}
                      height={150}
                      alt="Cover"
                      style={{ marginBottom: 30 }}
                    />
                    <div className={styles.create__coverName}>
                      <Typography
                        variant="h6"
                        color="primary"
                        style={{ marginRight: 20 }}
                      >
                        {audio.name}
                      </Typography>
                      <Tooltip title={t('cancel')}>
                        <IconButton
                          aria-label="delete"
                          color="info"
                          onClick={deleteAudio}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                ) : (
                  <div className={styles.create__cover}>
                    <Image
                      src={'/audio.jpg'}
                      width={250}
                      height={150}
                      alt="Cover"
                      style={{ marginBottom: 30 }}
                    />
                    <FileUpload
                      audiofile={true}
                      setFile={setAudio}
                      accept="audio/*"
                      setUrl={setUrlPicture}
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        style={{ textTransform: 'none' }}
                      >
                        {t('selectFile')}
                      </Button>
                    </FileUpload>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {activeStep === 1 && (
          <div className={styles.create__headerBlock}>
            <Typography
              color="primary"
              className={clsx(styles.create__title, styles.create__titleMobile)}
            >
              {t('trackInformation')}
            </Typography>
            <div className={styles.create__form}>
              <TextField
                name="name"
                {...name}
                type="text"
                error={!name.value}
                label={t('nameTrack')}
                size="small"
                fullWidth
                variant="standard"
                sx={{ marginBottom: '20px' }}
                inputProps={{ className: styles.textfield }}
                InputLabelProps={{ className: styles.label }}
                helperText={
                  activeStep === 1 && !name.value ? (
                    <p className={styles.nameHelp}>{t('requiredField')}</p>
                  ) : null
                }
              />
              <TextField
                {...artist}
                type="text"
                error={!artist.value}
                color="primary"
                label={t('executorTrack')}
                size="small"
                variant="standard"
                sx={{ marginBottom: '20px', width: '50%' }}
                inputProps={{ className: styles.textfield }}
                InputLabelProps={{ className: styles.label }}
                helperText={
                  activeStep === 1 && !artist.value ? (
                    <p className={styles.nameHelp}>{t('requiredField')}</p>
                  ) : null
                }
              />
              <TextField
                {...album}
                type="text"
                color="primary"
                label={t('albumTrack')}
                size="small"
                variant="standard"
                sx={{ marginBottom: '15px', marginRight: 20, width: '70%' }}
                inputProps={{ className: styles.textfield }}
                InputLabelProps={{ className: styles.label }}
              />
              <TextField
                {...year}
                type="number"
                color="primary"
                label={t('yearTrack')}
                size="small"
                variant="standard"
                sx={{
                  marginBottom: '50px',
                  marginRight: '100px',
                  width: '10%',
                }}
                inputProps={{ className: styles.textfield }}
                InputLabelProps={{ className: styles.label }}
              />
              <TextField
                {...genre}
                type="text"
                color="primary"
                label={t('genreTrack')}
                size="small"
                variant="standard"
                sx={{ marginBottom: '50px', width: '40%' }}
                inputProps={{ className: styles.textfield }}
                InputLabelProps={{ className: styles.label }}
              />
            </div>
          </div>
        )}
        {activeStep === 2 && (
          <div className={styles.create__headerBlock}>
            <Typography
              color="primary"
              className={clsx(styles.create__title, styles.create__titleMobile)}
            >
              {t('coverDownload')}
            </Typography>
            <div className={styles.create__form}>
              <div className={styles.create__nameBlock}>
                {urlPicture ? (
                  <div className={styles.create__cover}>
                    <Image
                      src={urlPicture}
                      width={250}
                      height={150}
                      alt="Cover"
                      style={{ marginBottom: 30, objectFit: 'contain' }}
                    />
                    <div className={styles.create__coverName}>
                      <Typography
                        variant="h6"
                        color="primary"
                        style={{ marginRight: 20 }}
                      >
                        {picture?.name}
                      </Typography>
                      <Tooltip title={t('cancel')}>
                        <IconButton
                          aria-label="delete"
                          color="info"
                          onClick={deletePicture}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                ) : (
                  <div className={styles.create__cover}>
                    <Image
                      src={'/cover.jpg'}
                      width={250}
                      height={150}
                      alt="Cover"
                      style={{ marginBottom: 30 }}
                    />
                    <FileUpload
                      audiofile={false}
                      setFile={setPicture}
                      accept="image/*"
                      setUrl={setUrlPicture}
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        style={{ textTransform: 'none' }}
                      >
                        {t('selectFile')}
                      </Button>
                    </FileUpload>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <Tooltip title={t('exit')}>
          <IconButton
            onClick={handleOpenExit}
            color="info"
            className={styles.create__btnExit}
          >
            <HighlightOffIcon style={{ width: 35, height: 35 }} />
          </IconButton>
        </Tooltip>

        <div className={styles.create__btnBlock}>
          <Button
            onClick={back}
            disabled={activeStep === 0}
            variant="contained"
            color="error"
            className={styles.create__btn}
          >
            {t('back')}
          </Button>
          {activeStep === 2 ? (
            <Button
              onClick={handleOpenOver}
              variant="contained"
              color="info"
              disabled={!picture}
              className={styles.create__btn}
            >
              {t('complete')}
            </Button>
          ) : (
            <Button
              onClick={next}
              variant="contained"
              color="info"
              disabled={
                !audio || (activeStep === 1 && (!name.value || !artist.value))
              }
              className={styles.create__btn}
            >
              {t('further')}
            </Button>
          )}
        </div>
      </StepWrapper>
      <ModalExit open={openModalExit} onCloseModalExit={handleCloseExit} />
      <ModalOver open={openModalOver} onChangedStep={handleChangeStep} />
      <ImageBackground />
    </div>
  )
}
