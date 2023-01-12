import { FC } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import useTranslation from 'next-translate/useTranslation'

import { ListItemIcon, Menu, MenuItem } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import InfoIcon from '@mui/icons-material/Info'
import CommentIcon from '@mui/icons-material/Comment'
import { grey, purple, red } from '@mui/material/colors'

import { TracksProps } from '../../types'

type TrackMenuProps = {
  track: TracksProps
  open: boolean
  anchorEl: HTMLElement | null
  onCloseMenu: (value: null) => void
  onOpenModalDelete: (value: boolean) => void
  onOpenModalInfo: (value: boolean) => void
}

export const TrackMenu: FC<TrackMenuProps> = ({
  track,
  open,
  anchorEl,
  onCloseMenu,
  onOpenModalDelete,
  onOpenModalInfo,
}) => {
  const cookies = useCookies(['theme_preference'])
  const { t } = useTranslation('common')
  const router = useRouter()

  const handleCloseMenu = () => {
    onCloseMenu(null)
  }

  const handleOpenModalDelete = () => {
    onOpenModalDelete(true)
  }

  const handleOpenModalInfo = () => {
    onOpenModalInfo(true)
  }

  return (
    <Menu
      id="more-menu"
      aria-labelledby="more-button"
      anchorEl={anchorEl}
      open={open}
      onClose={handleCloseMenu}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <MenuItem
        onClick={() => router.push('/tracks/' + track._id)}
        sx={{
          color:
            cookies[0].theme_preference === 'dark' ? purple.A700 : grey[800],
          padding: '8px 16px',
        }}
      >
        <ListItemIcon>
          <CommentIcon color="info" />
        </ListItemIcon>
        {t('comments')}
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleOpenModalInfo(), handleCloseMenu()
        }}
        sx={{
          color:
            cookies[0].theme_preference === 'dark' ? purple.A700 : grey[800],
          padding: '8px 16px',
        }}
      >
        <ListItemIcon>
          <InfoIcon color="info" />
        </ListItemIcon>
        {t('information')}
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleOpenModalDelete(), handleCloseMenu()
        }}
        sx={{ color: red[700], padding: '8px 16px' }}
      >
        <ListItemIcon>
          <DeleteForeverIcon sx={{ color: red[700] }} />
        </ListItemIcon>
        {t('delete')}
      </MenuItem>
    </Menu>
  )
}
