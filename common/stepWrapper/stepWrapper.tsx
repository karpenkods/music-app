import { FC } from 'react'
import { useCookies } from 'react-cookie'

import {
  Card,
  Stack,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepIconProps,
  StepLabel,
  Stepper,
  styled,
} from '@mui/material'
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { grey, purple } from '@mui/material/colors'

import styles from '../../styles/create.module.scss'
import { StepWrapperProps } from '../../types'

export const StepWrapper: FC<StepWrapperProps> = ({ activeStep, children }) => {
  const cookies = useCookies(['theme_preference'])

  const ColorlibConnector = styled(StepConnector)(() => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        cookies[0].theme_preference === 'dark' ? purple.A700 : grey[800],
      borderRadius: 1,
    },
  }))

  const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean }
  }>(({ ownerState }) => ({
    backgroundColor:
      cookies[0].theme_preference === 'dark' ? purple.A700 : grey[800],
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    }),
  }))

  function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props

    const icons: { [index: string]: React.ReactElement } = {
      1: <BrowserUpdatedIcon style={{ width: 28, height: 28 }} />,
      2: <PriorityHighIcon style={{ width: 33, height: 33 }} />,
      3: <AddPhotoAlternateIcon style={{ width: 28, height: 28 }} />,
    }

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    )
  }

  const steps = ['', '', '']

  return (
    <div className={styles.step}>
      <Stack sx={{ width: '100%' }} spacing={4}>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
        >
          {steps.map((step, index) => (
            <Step key={index} completed={activeStep > index}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
      <div>
        <Card className={styles.step__card}>{children}</Card>
      </div>
    </div>
  )
}
