import { useRouter } from 'next/router'

import {
  LockOutlined,
  LogoutOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Avatar, Button, Popconfirm } from 'antd'
import { UserInfo } from '@/types/user'
import useSessionStorage from '@/hooks/sessionStorage'
import useLocalStorage from '@/hooks/localStorage'

type Props = {
  username: string | null
}

const UserDropdown = (props: Props) => {
  const { username } = props
  const router = useRouter()
  const user = useLocalStorage<UserInfo | null>('user', null)
  const userSession = useSessionStorage<UserInfo | null>('user', null)

  const onLogout = () => {
    user[1](null)
    userSession[1](null)
    router.push('/auth/login')
  }

  return (
    <div style={{ width: '400px', background: 'white' }}>
      {/* Avatar and username */}
      <div
        style={{
          backgroundImage: `url("/images/background-user.jpg")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '8rem',
          position: 'relative'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '35%',
            fontFamily: 'sans-serif',
            color: 'white',
            fontSize: '1rem'
          }}
        >
          <Avatar
            style={{
              marginLeft: '1rem',
              marginRight: '0.5rem',
              background: '#2EA7F5'
            }}
            shape="square"
            icon={<UserOutlined />}
            size="large"
          />
          <span>{'@' + username}</span>
        </div>
      </div>
      {/* Menu */}
      <div
        style={{
          borderBottomStyle: 'solid',
          borderBottomWidth: '2px',
          borderBottomColor: '#F7F8FA'
        }}
      >
        <div>
          <div style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
            <Button
              type="link"
              style={{ width: '100%', textAlign: 'left' }}
              onClick={() => router.push('/auth/change-password')}
            >
              <LockOutlined style={{ color: '#0080FF' }} />
              <span>Thay đổi mật khẩu</span>
            </Button>
          </div>
        </div>
      </div>
      {/* Logout button */}
      <div
        style={{
          paddingLeft: '1rem',
          paddingBottom: '1rem',
          paddingTop: '1rem'
        }}
      >
        <Popconfirm
          title="Thông báo"
          description="Bạn có chắc là muốn đăng xuất không?"
          okText="Có"
          cancelText="Không"
          onConfirm={onLogout}
        >
          <Button style={{ background: '#2EA7F5', color: 'white' }}>
            <LogoutOutlined />
            ĐĂNG XUẤT
          </Button>
        </Popconfirm>
      </div>
    </div>
  )
}

export default UserDropdown
