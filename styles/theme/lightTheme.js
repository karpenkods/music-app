import { stylesMui } from './common'
import { grey, blue } from '@mui/material/colors'

export const lightThemeStyles = {
  ...stylesMui,
  palette: {
    type: 'light',
    primary: {
      main: grey[900],
    },
    secondary: {
      main: grey[100],
    },
    info: {
      main: grey[800],
    },
    background: {
      paper: grey[50],
    },
  },
}
