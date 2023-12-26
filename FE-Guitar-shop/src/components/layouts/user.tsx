import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { Button, Image, Layout, Menu, MenuProps } from 'antd'
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons'
import { UserInfo } from '@/types/user'
import useSessionStorage from '@/hooks/sessionStorage'
import useLocalStorage from '@/hooks/localStorage'

import UserDesktop from '../base/userHeader'
import { userMenu } from './menuRender'

type LayoutProps = {
  children: React.ReactNode
}

export default function User({ children }: LayoutProps) {
  const { Header, Sider } = Layout
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  const user = useLocalStorage<UserInfo>('user', null)
  const userSession = useSessionStorage<UserInfo | null>('user', null)

  useEffect(() => {
    if (user[0]?.role === 0 || userSession[0]?.role === 0) router.push('/')
  }, [])

  const menuOnClick: MenuProps['onClick'] = ({ key }) => {
    router.push(key || '/')
  }

  return (
    <>
      <Head>
        <title>Guitar shop</title>
        <meta name="title" content="Guitar shop" />
        <meta name="description" content="Guitar shop" />
      </Head>
      <main>
        <Layout className="layout">
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div style={{ position: 'sticky', top: 0 }}>
              <Image
                alt="logo"
                onClick={() => router.push('')}
                style={{ padding: '1rem', width: '100%', cursor: 'pointer' }}
                preview={false}
                src="/images/logo1.png"
              />
              <Menu
                theme="dark"
                mode="inline"
                items={userMenu}
                defaultSelectedKeys={[router.pathname]}
                onClick={menuOnClick}
              />
            </div>
          </Sider>
          <Layout className="site-layout">
            <Header
              className="site-layout-background"
              style={{
                position: 'sticky',
                top: 0,
                display: 'flex',
                justifyContent: 'space-between',
                padding: 0,
                zIndex: 50,
                borderBottomStyle: 'solid',
                borderBottomWidth: '1px'
              }}
            >
              <div>
                {React.createElement(
                  collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: 'trigger',
                    onClick: () => setCollapsed(!collapsed)
                  }
                )}
                <Button
                  size="middle"
                  type="primary"
                  icon={<HomeOutlined />}
                  onClick={() => router.push('/')}
                >
                  Quay về trang chủ
                </Button>
              </div>
              <UserDesktop />
            </Header>
            {children}
          </Layout>
        </Layout>
      </main>
    </>
  )
}
