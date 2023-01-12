import { Create, Layout, Player } from '../../components'
import { useTypedSelector } from '../../hooks/useTypedSelector'

import { ToggleThemeProps } from '../../types'

const CreateTrack = (props: ToggleThemeProps) => {
  const { showPlayer, active } = useTypedSelector((state) => state.player)
  const { tracks } = useTypedSelector((state) => state.track)
  const title = 'Download track | Music app'

  return (
    <Layout
      title={active ? active?.name + ' | ' + title : title}
      toggleTheme={props.toggleTheme}
    >
      <Create />
      {showPlayer && <Player tracks={tracks} />}
    </Layout>
  )
}

export default CreateTrack
