import Head from 'next/head'

import { Layout } from 'antd'

import Footer from '../base/footer'
import CallAction from '../utilities/callAction'
import DesktopBanner from '../base/desktopBanner'
import DesktopHeader from '../base/desktopHeader'

type LayoutProps = {
  children: React.ReactNode
}

export default function Landing({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Guitar shop</title>
        <meta name="title" content="Guitar shop" />
        <meta name="description" content="Guitar shop" />
      </Head>
      <main>
        <Layout className="landing-layout">
          <div style={{ color: '#000' }}>
            <DesktopBanner />
          </div>
          <div
            style={{ color: '#000', position: 'sticky', top: 0, zIndex: 50 }}
          >
            <DesktopHeader />
          </div>
          {children}
          <div style={{ color: '#000' }}>
            <Footer />
          </div>
          <CallAction />
        </Layout>
      </main>
    </>
  )
}
