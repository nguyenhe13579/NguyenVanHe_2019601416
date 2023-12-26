import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { notificationError, notificationSuccess } from '@/helpers/notification'
import { ChangePasswordPayload } from '@/types/auth'
import { Button, Form, Input } from 'antd'
import { NextPageWithLayout } from '@/types/next-page'
import { LockOutlined } from '@ant-design/icons'
import { AuthService } from '@/services/auth'
import { UserInfo } from '@/types/user'
import useLocalStorage from '@/hooks/localStorage'
import useSessionStorage from '@/hooks/sessionStorage'

import Landing from '@/components/layouts/landing'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('')
  const userLocal = useLocalStorage<UserInfo>('user', null)
  const userSession = useSessionStorage<UserInfo>('user', null)

  const onChangePassword = async (payload: ChangePasswordPayload) => {
    try {
      setLoading(true)
      if (
        await AuthService.changePassword({ ...payload, username: username })
      ) {
        notificationSuccess('Đổi mật khẩu thành công!')
        router.push('/')
      }
    } catch {
      notificationError('Mật khẩu cũ không chính xác')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    document.body.scrollTop = 0
    setUsername(userLocal[0]?.username || userSession[0]?.username)
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
      <div
        style={{
          width: '25%'
        }}
      >
        <h2 className="homepage-title">Đổi mật khẩu</h2>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onChangePassword}
        >
          <Form.Item
            name="old_password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu!' },
              { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Mật khẩu"
            />
          </Form.Item>

          <Form.Item
            name="new_password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
              { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Mật khẩu mới"
            />
          </Form.Item>

          <Form.Item
            name="password_confirm"
            dependencies={['new_password']}
            hasFeedback
            rules={[
              { required: true, message: `Vui lòng nhập xác nhận mật khẩu` },
              { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('new_password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error('Xác nhận mật khẩu không trùng khớp!')
                  )
                }
              })
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Xác nhận mật khẩu"
            />
          </Form.Item>

          <Form.Item>
            <Button
              style={{
                background: '#D72027',
                color: 'white',
                width: '100%',
                marginBottom: '0.5rem'
              }}
              htmlType="submit"
              loading={loading}
            >
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Landing>{page}</Landing>
}

export default Page
