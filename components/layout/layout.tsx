import { FC } from 'react'
import Head from 'next/head'

import { Navbar } from '../../components'
import { LayoutProps, ToggleThemeProps } from '../../types'

export const Layout: FC<LayoutProps & ToggleThemeProps> = (props) => {
  return (
    <div
      style={{
        height: '99.8vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Head>
        <link rel="icon" href="/d.png" />
        <title>{props.title}</title>
      </Head>
      <Navbar toggleTheme={props.toggleTheme} />
      <main>{props.children}</main>
    </div>
  )
}
