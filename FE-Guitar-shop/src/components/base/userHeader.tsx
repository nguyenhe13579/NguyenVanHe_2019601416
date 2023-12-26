import React, { useEffect, useState } from 'react'

import { Avatar, Popover } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { UserInfo } from '@/types/user'
import useSessionStorage from '@/hooks/sessionStorage'
import useLocalStorage from '@/hooks/localStorage'

import UserDropdown from './userDropdown'

const UserDesktop = () => {
  const router = useRouter()
  const userLocal = useLocalStorage<UserInfo>('user', null)
  const userSession = useSessionStorage<UserInfo | null>('user', null)
  const [user, setUser] = useState<UserInfo | null>(null)

  useEffect(() => {
    if (!userLocal[0] && !userSession[0]) router.push('/auth/login')
    else setUser(userSession[0] || userLocal[0])
  }, [])

  return (
    <div
      style={{ display: 'flex', justifyContent: 'end', marginRight: '15px' }}
    >
      <Popover
        content={<UserDropdown username={user?.full_name || 'User'} />}
        trigger="click"
      >
        <div style={{ cursor: 'pointer' }}>
          <span>Xin chào, {user?.full_name || 'User'}!</span>
          <Avatar
            style={{ marginLeft: '5px' }}
            shape="circle"
            icon={<UserOutlined />}
          />
        </div>
      </Popover>
    </div>
  )
}

export default UserDesktop
