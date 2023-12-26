import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import {
  Button,
  Col,
  Menu,
  MenuProps,
  Popconfirm,
  Popover,
  Row,
  Space
} from 'antd'
import {
  AreaChartOutlined,
  DownOutlined,
  HeartFilled,
  HomeFilled,
  LockOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  SwapOutlined,
  UserOutlined
} from '@ant-design/icons'
import { UserInfo } from '@/types/user'
import useSessionStorage from '@/hooks/sessionStorage'
import useLocalStorage from '@/hooks/localStorage'

const DesktopHeader = () => {
  const router = useRouter()
  const [userLocal, setUserLocal] = useLocalStorage<UserInfo | null>(
    'user',
    null
  )
  const [userSession, setUserSession] = useSessionStorage<UserInfo | null>(
    'user',
    null
  )
  const [user, setUser] = useState<UserInfo | null>(null)
  const items: MenuProps['items'] = [
    {
      itemIcon: (
        <HomeFilled
          style={{
            fontSize: '1.25rem',
            lineHeight: '1.75rem'
          }}
        />
      ),
      key: '/'
    },
    {
      label: 'Guitar Classic',
      key: '/category/1'
    },
    {
      label: 'Guitar Aucostic',
      key: '/category/2'
    },
    {
      label: 'Ukulele',
      key: '/category/3'
    },
    {
      label: 'Phụ kiện',
      key: '/category/4',
      icon: <DownOutlined />,
      children: [
        {
          label: 'EQ',
          key: '/category/6'
        },
        {
          label: 'BAO ĐÀN',
          key: '/category/7'
        },
        {
          label: 'DÂY ĐÀN',
          key: '/category/8'
        },
        {
          label: 'CAPO',
          key: '/category/9'
        },
        {
          label: 'LOA',
          key: '/category/10'
        }
      ]
    },
    {
      label: 'Liên hệ',
      key: '/contact'
    }
  ]

  const onLogout = () => {
    setUserLocal(null)
    setUserSession(null)
    setUser(null)
    router.push('/auth/login')
  }

  const popContent = (
    <div>
      <div>
        <Button
          type="text"
          style={{ marginBottom: '0.5rem', color: '#0080FF' }}
          onClick={() =>
            user?.role === 1
              ? router.push('/users')
              : router.push('/customers/orders')
          }
        >
          <AreaChartOutlined />
          {user?.role === 1 ? 'Trang quản lý' : 'Theo dõi đơn hàng'}
        </Button>
      </div>
      {user?.role === 0 && (
        <>
          <div
            style={{
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem'
            }}
          >
            <Button
              type="text"
              style={{ width: '100%', textAlign: 'left', color: '#0080FF' }}
              onClick={() => router.push('/auth/profile')}
            >
              <UserOutlined />
              <span>Thông tin người dùng</span>
            </Button>
          </div>
          <div
            style={{
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem'
            }}
          >
            <Button
              type="text"
              style={{ width: '100%', textAlign: 'left', color: '#0080FF' }}
              onClick={() => router.push('/auth/change-password')}
            >
              <LockOutlined />
              <span>Thay đổi mật khẩu</span>
            </Button>
          </div>
        </>
      )}
      <Popconfirm
        title="Bạn có chắc muốn đăng xuất?"
        onConfirm={onLogout}
        okText="Xác nhận"
        cancelText="Đóng"
      >
        <Button type="text" style={{ width: '100%', color: '#0080FF' }}>
          <LogoutOutlined />
          Đăng xuất
        </Button>
      </Popconfirm>
    </div>
  )

  const onClick: MenuProps['onClick'] = ({ key }) => {
    router.push(key || '/')
  }

  useEffect(() => {
    setUser(userSession || userLocal)
  }, [])

  return (
    <div style={{ background: '#D72027' }}>
      <Row>
        <Col
          xxl={{ span: 14, offset: 5 }}
          xl={{ span: 18, offset: 3 }}
          lg={{ span: 20, offset: 2 }}
          span={24}
          offset={0}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Menu
            onClick={onClick}
            mode="horizontal"
            items={items}
            style={{
              background: '#D72027',
              color: 'white',
              display: 'flex',
              textTransform: 'uppercase',
              alignItems: 'center'
            }}
          />
          <Space>
            <Button
              size="small"
              title="So sánh sản phẩm"
              onClick={() => router.push('/customers/compare-products')}
            >
              <SwapOutlined />
            </Button>
            <Button
              size="small"
              title="Sản phẩm yêu thích"
              onClick={() => router.push('/product/favourite')}
            >
              <HeartFilled style={{ color: '#FF1935' }} />
            </Button>
            <div style={{ marginRight: '0.5rem' }}>
              <Button
                size="small"
                title="Giỏ hàng"
                onClick={() => router.push('/customers/cart')}
              >
                <ShoppingCartOutlined style={{ color: '#0080FF' }} />
              </Button>
            </div>
            {user ? (
              <Popover content={popContent} placement="bottom" trigger="click">
                <Button type="text" style={{ color: 'white' }}>
                  Xin chào, {user.full_name}!
                </Button>
              </Popover>
            ) : (
              <Button onClick={() => router.push('/auth/login')}>
                Đăng nhập
              </Button>
            )}
          </Space>
        </Col>
      </Row>
    </div>
  )
}

export default DesktopHeader
