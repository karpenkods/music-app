import { stylesMui } from './common'
import { blue, grey, purple } from '@mui/material/colors'

export const darkThemeStyles = {
  ...stylesMui,
  palette: {
    type: 'dark',
    primary: {
      main: grey[50],
    },
    secondary: {
      main: grey[800],
    },
    info: {
      main: purple.A700,
    },
    background: {
      paper: grey[800],
    },
  },
}
