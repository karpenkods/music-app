import { Layout, Player, Tracks } from '../../components'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { NextThunkDispatch, wrapper } from '../../store'
import { fetchTracks } from '../../store/actions-creators/track'

import { ToggleThemeProps } from '../../types'

const TracksPage = (props: ToggleThemeProps) => {
  const { active } = useTypedSelector((state) => state.player)
  const { tracks, error } = useTypedSelector((state) => state.track)

  const title = 'Tracks | Music app'

  return (
    <Layout
      title={active ? active?.name + ' | ' +  title : title}
      toggleTheme={props.toggleTheme}
    >
      <Tracks tracks={tracks} error={error} />
      <Player tracks={tracks} />
    </Layout>
  )
}

export default TracksPage

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    const dispatch = store.dispatch as NextThunkDispatch
    await dispatch(fetchTracks())
  },
)
