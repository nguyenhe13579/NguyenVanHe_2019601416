import { useRouter } from 'next/router'

import { Button, Form, Input, Radio, Space } from 'antd'
import { Cart, CartFormResult } from '@/types/cart'
import { notificationError } from '@/helpers/notification'
import { UserInfo } from '@/types/user'
import useSessionStorage from '@/hooks/sessionStorage'
import useLocalStorage from '@/hooks/localStorage'


type Props = {
  loading: boolean
  onSubmit: (user: CartFormResult) => void
  
}

const UserInfo = (props: Props) => {
  const { loading, onSubmit } = props
  const router = useRouter()
  const userSession = useSessionStorage<UserInfo>('user', null)
  const userLocal = useLocalStorage<UserInfo>('user', null)
  const cart = useLocalStorage<Cart[]>('cart', [])

  return (
    <div>
      <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
        Thông tin người mua hàng
      </div>
      <Form
        style={{
          background: '#fff',
          paddingTop: '2rem',
          paddingRight: '2rem',
          borderRadius: '6px'
        }}
        onFinish={value =>
          cart[0].length > 0
            ? onSubmit({
                ...value,
                user_id: userLocal[0]?.id || userSession[0]?.id
              })
            : notificationError('Giỏ hàng của bạn chưa có sản phẩm nào')
        }
        layout="vertical"
      >
        <Form.Item
          label="Họ tên:"
          name="full_name"
          rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
          initialValue={userSession[0]?.full_name || userLocal[0]?.full_name}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Địa chỉ:"
          name="address"
          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
          initialValue={userSession[0]?.address || userLocal[0]?.address}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại:"
          name="phone"
          rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          initialValue={userSession[0]?.phone || userLocal[0]?.phone}
        >
          <Input style={{ width: '50%' }} />
        </Form.Item>
        <Form.Item
          label="Email:"
          name="email"
          rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
          initialValue={userSession[0]?.email || userLocal[0]?.email}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Ghi chú:" name="note">
          <Input.TextArea rows={5} />
        </Form.Item>
        <div style={{ marginBottom: '1rem' }}>
          <Radio checked>Thanh toán khi nhận hàng - COD</Radio>
        </div>
        <Space>
          <Button
            htmlType="submit"
            style={{ background: '#FF1935', color: 'white' }}
          
            loading={loading}
            
          >
            Hoàn tất mua hàng
          </Button>
          <Button
            style={{ background: '#0080FF', color: 'white' }}
            onClick={() => router.push('/')}
          >
            Tiếp tục mua hàng
          </Button>
        </Space>
      </Form>
    </div>
  )
}

export default UserInfo
