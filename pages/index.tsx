import { Landing, Layout, Player } from '../components'

import { useTypedSelector } from '../hooks/useTypedSelector'

import { ToggleThemeProps } from '../types'

const Home = (props: ToggleThemeProps) => {
  const { showPlayer, active } = useTypedSelector((state) => state.player)
  const { tracks } = useTypedSelector((state) => state.track)
  const title = 'Music app'

  return (
    <Layout
      title={active ? active?.name + ' | ' + title : title}
      toggleTheme={props.toggleTheme}
    >
      <Landing />
      {showPlayer && <Player tracks={tracks} />}
    </Layout>
  )
}

export default Home
