import { FC } from 'react'
import moment from 'moment'
import useTranslation from 'next-translate/useTranslation'

import Typography from '@mui/material/Typography'
import { Tooltip } from '@mui/material'

import { TrackProgressProps } from '../../types'

export const TrackProgress: FC<TrackProgressProps> = ({
  left,
  right,
  onChange,
  track,
  disabled,
}) => {
  const { t } = useTranslation('common')
  
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip title={disabled ? null : track ? null : `${t('volume')}: ${left}`}>
        <input
          type="range"
          min={0}
          max={right}
          value={left}
          onChange={onChange}
          disabled={disabled && !track}
        />
      </Tooltip>
      {track ? (
        <div>
          <Typography
            variant="caption"
            color="primary"
            style={{ marginLeft: '8px' }}
          >
            {track
              ? (moment(Math.ceil(left * 1000)).format('mm:ss') as any)
              : left}{' '}
            /{' '}
            {track
              ? (moment(Math.ceil(right * 1000)).format('mm:ss') as any)
              : right}
          </Typography>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}
