import axios from 'axios'
import { GetServerSideProps } from 'next'

import { Layout, Player, Comments } from '../../components'
import { useTypedSelector } from '../../hooks/useTypedSelector'

import { ToggleThemeProps } from '../../types'

const CommentsPage = (props: ToggleThemeProps) => {
  const { showPlayer, active } = useTypedSelector((state) => state.player)
  const { tracks } = useTypedSelector((state) => state.track)
  const title = 'Comments | Music app'

  return (
    <Layout
      title={active ? active?.name + ' | ' + title : title}
      toggleTheme={props.toggleTheme}
    >
      <Comments serverTrack={props.serverTrack} />
      {showPlayer && <Player tracks={tracks}/>}
    </Layout>
  )
}

export default CommentsPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/tracks/` + params?.id)
  return {
    props: {
      serverTrack: response.data,
    },
  }
}
