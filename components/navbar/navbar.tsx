import { useState } from 'react'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { useCookies } from 'react-cookie'
import Link from 'next/link'
import Image from 'next/image'

import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'

import { styled, Theme, CSSObject } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import GitHubIcon from '@mui/icons-material/GitHub'
import CloseIcon from '@mui/icons-material/Close'
import HomeIcon from '@mui/icons-material/Home'
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic'
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo'
import { grey, purple } from '@mui/material/colors'

import styles from '../../styles/navbar.module.scss'
import { ToggleThemeProps } from '../../types'

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  borderEndEndRadius: 10,
  height: 'fit-content',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  borderEndEndRadius: 10,
  width: `calc(${theme.spacing(7)} + 1px)`,
  height: 'fit-content',
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: 'fit-content',
  justifyContent: 'flex-start',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    height: 'fit-content',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  height: 'fit-content',
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

export const Navbar = (props: ToggleThemeProps) => {
  const [open, setOpen] = useState(false)
  const [show, setShow] = useState(false)

  const router = useRouter()
  const { t } = useTranslation('common')
  const cookies = useCookies(['theme_preference'])

  const { showPlayer } = useTypedSelector((state) => state.player)

  const { showPlayerTrack, hidePlayerTrack } = useActions()

  const handleShowPlayer = () => {
    if (!showPlayer) {
      showPlayerTrack()
    } else {
      hidePlayerTrack()
    }
  }

  const handleDrawerShow = () => {
    setShow(!show)
  }

  const handleDrawerOpen = () => {
    setOpen(!open)
  }

  return (
    <Box className={styles.navbar}>
      <AppBar position="fixed" open={open} color="secondary">
        <Toolbar
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex' }}>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerShow}
              sx={{
                padding: '0 15px',
                margin: '8px 13px 8px 0px',
                ...(open && { display: 'none' }),
              }}
            >
              {show ? (
                <CloseIcon
                  color="info"
                  style={{ width: '30px', height: '30px' }}
                />
              ) : (
                <MenuIcon
                  color="info"
                  style={{ width: '30px', height: '30px' }}
                />
              )}
            </IconButton>
            <Typography className={styles.navbar__heading}>
              {t('musicPlatform')}
            </Typography>
          </div>
          <Button
            variant="contained"
            color="info"
            onClick={handleShowPlayer}
            className={styles.navbar__btn}
          >
            {!showPlayer ? t('showPlayer') : t('hidePlayer')}
          </Button>
        </Toolbar>
      </AppBar>
      {(show || open) && (
        <Drawer variant="permanent" open={open} color="secondary">
          <DrawerHeader>
            <Button
              className={styles.navbar__link}
              style={{ marginTop: 15 }}
              color="info"
              onClick={() => {
                handleDrawerOpen()
                handleDrawerShow()
              }}
            >
              <CloseIcon style={{ marginRight: 10 }} />
              {t('close')}
            </Button>
          </DrawerHeader>
          <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <Link href="/" className={styles.navbar__link}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <HomeIcon color="info" />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      opacity: open ? 1 : 0,
                      color:
                        cookies[0].theme_preference === 'dark'
                          ? purple.A700
                          : grey[800],
                    }}
                  >
                    {t('homePage')}
                  </ListItemText>
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <Link href="/albums" className={styles.navbar__link}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <LibraryMusicIcon color="info" />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      opacity: open ? 1 : 0,
                      color:
                        cookies[0].theme_preference === 'dark'
                          ? purple.A700
                          : grey[800],
                    }}
                  >
                    {t('albums')}
                  </ListItemText>
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <Link href="/tracks" className={styles.navbar__link}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <AudiotrackIcon color="info" />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      opacity: open ? 1 : 0,
                      color:
                        cookies[0].theme_preference === 'dark'
                          ? purple.A700
                          : grey[800],
                    }}
                  >
                    {t('tracks')}
                  </ListItemText>
                </ListItemButton>
              </Link>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={handleShowPlayer}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {!showPlayer ? (
                    <OndemandVideoIcon color="info" />
                  ) : (
                    <PersonalVideoIcon color="info" />
                  )}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    opacity: open ? 1 : 0,
                    color:
                      cookies[0].theme_preference === 'dark'
                        ? purple.A700
                        : grey[800],
                  }}
                >
                  {!showPlayer ? t('showPlayer') : t('hidePlayer')}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
              {router.locale === 'ru' ? (
                <Link
                  href={router.asPath}
                  locale="en"
                  className={styles.navbar__link}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <Image
                        src="/uk.png"
                        alt="Ru"
                        width={40}
                        height={25}
                        className={styles.flagEng}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        opacity: open ? 1 : 0,
                        color:
                          cookies[0].theme_preference === 'dark'
                            ? purple.A700
                            : grey[800],
                      }}
                    >
                      {t('language')}
                    </ListItemText>
                  </ListItemButton>
                </Link>
              ) : (
                <Link
                  href={router.asPath}
                  locale="ru"
                  className={styles.navbar__link}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <Image
                        src="/ru.png"
                        alt="Eng"
                        width={40}
                        height={25}
                        className={styles.flagRu}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        opacity: open ? 1 : 0,
                        color:
                          cookies[0].theme_preference === 'dark'
                            ? purple.A700
                            : grey[800],
                      }}
                    >
                      {t('language')}
                    </ListItemText>
                  </ListItemButton>
                </Link>
              )}
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={props.toggleTheme}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {cookies[0].theme_preference === 'dark' ? (
                    <LightModeIcon color="info" />
                  ) : (
                    <DarkModeIcon color="info" />
                  )}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    opacity: open ? 1 : 0,
                    color:
                      cookies[0].theme_preference === 'dark'
                        ? purple.A700
                        : grey[800],
                  }}
                >
                  {cookies[0].theme_preference === 'dark'
                    ? t('lightTheme')
                    : t('darkTheme')}
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <a
                href="https://github.com/karpenkods?tab=repositories"
                className={styles.navbar__link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <GitHubIcon color="info" />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      opacity: open ? 1 : 0,
                      color:
                        cookies[0].theme_preference === 'dark'
                          ? purple.A700
                          : grey[800],
                    }}
                  >
                    {t('git')}
                  </ListItemText>
                </ListItemButton>
              </a>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={handleDrawerOpen}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {open ? (
                    <ChevronLeftIcon color="info" />
                  ) : (
                    <ChevronRightIcon color="info" />
                  )}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    opacity: open ? 1 : 0,
                    color:
                      cookies[0].theme_preference === 'dark'
                        ? purple.A700
                        : grey[800],
                  }}
                >
                  {t('hideMenu')}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      )}
    </Box>
  )
}
