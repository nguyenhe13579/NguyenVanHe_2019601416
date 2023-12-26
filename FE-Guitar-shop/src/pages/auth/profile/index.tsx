import React, { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { NextPageWithLayout } from '@/types/next-page'
import { Button, Image } from 'antd'
import { UserInfo } from '@/types/user'
import useSessionStorage from '@/hooks/sessionStorage'
import useLocalStorage from '@/hooks/localStorage'

import Landing from '@/components/layouts/landing'

const Login: NextPageWithLayout = () => {
  const router = useRouter()
  const userLocal = useLocalStorage<UserInfo>('user', null)
  const userSession = useSessionStorage<UserInfo>('user', null)
  const [user, setUser] = useState<UserInfo>()

  useEffect(() => {
    if (!userLocal[0] && !userSession[0]) router.push('/')
    else setUser(userLocal[0] || userSession[0])
  }, [userLocal, userSession])

  return (
    <div
      style={{
        background: 'white',
        display: 'flex',
        justifyContent: 'center',
        height: '70vh'
      }}
    >
      <div>
        <h2 className="homepage-title">Thông tin người dùng</h2>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <div>
            <Image
              preview={false}
              src={
                user?.gender === 1
                  ? '/images/users/avatar_female.png'
                  : '/images/users/avatar_male.png'
              }
              height="20rem"
              width="90%"
            />
          </div>
          <div style={{ lineHeight: '1.5rem', fontSize: '1rem' }}>
            <div>
              <span
                style={{
                  fontSize: '0.9rem',
                  color: 'gray'
                }}
              >
                Tài khoản:{' '}
              </span>
              <span>{user?.username}</span>
            </div>
            <div>
              <span
                style={{
                  fontSize: '0.9rem',
                  color: 'gray'
                }}
              >
                Họ và tên:{' '}
              </span>
              <span>{user?.full_name}</span>
            </div>
            <div>
              <span
                style={{
                  fontSize: '0.9rem',
                  color: 'gray'
                }}
              >
                Ngày sinh:{' '}
              </span>
              <span>{user?.birth?.slice(0, 10)}</span>
            </div>
            <div>
              <span
                style={{
                  fontSize: '0.9rem',
                  color: 'gray'
                }}
              >
                Giới tính:{' '}
              </span>
              <span>{user?.gender === 1 ? 'Nữ' : 'Nam'}</span>
            </div>
            <div>
              <span
                style={{
                  fontSize: '0.9rem',
                  color: 'gray'
                }}
              >
                Số điện thoại:{' '}
              </span>
              <span>{user?.phone && '0' + user?.phone}</span>
            </div>
            <div>
              <span
                style={{
                  fontSize: '0.9rem',
                  color: 'gray'
                }}
              >
                Email:{' '}
              </span>
              <span>{user?.email}</span>
            </div>
            <div>
              <span
                style={{
                  fontSize: '0.9rem',
                  color: 'gray'
                }}
              >
                Địa chỉ:{' '}
              </span>
              <span>{user?.address}</span>
            </div>
            <div>
              <span
                style={{
                  fontSize: '0.9rem',
                  color: 'gray'
                }}
              >
                Ngày gia nhập:{' '}
              </span>
              <span>
                {user?.created_at &&
                  new Date(user?.created_at).toLocaleString()}
              </span>
            </div>
            <div
              style={{
                marginTop: '2rem'
              }}
            >
              <Button
                style={{ color: 'white', background: '#D72027' }}
                onClick={() => router.push('/auth/profile/update')}
              >
                Cập nhật thông tin
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <Landing>{page}</Landing>
}

export default Login
