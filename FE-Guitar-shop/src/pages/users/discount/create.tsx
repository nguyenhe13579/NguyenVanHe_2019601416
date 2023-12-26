import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'

import { Button, Form, Input, InputNumber, Space } from 'antd'
import { notificationError, notificationSuccess } from '@/helpers/notification'
import { NextPageWithLayout } from '@/types/next-page'
import { MenuUnfoldOutlined } from '@ant-design/icons'
import { DiscountPayload } from '@/types/discount'
import { DiscountService } from '@/services/discount'

import ActiveStatus from '@/components/utilities/activeStatus'
import User from '@/components/layouts/user'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const [status, setStatus] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (payload: DiscountPayload) => {
    try {
      setLoading(true)
      if (await DiscountService.create({ ...payload, status: status }))
        notificationSuccess('Tạo mới thành công')
      setTimeout(() => {
        router.push('/users/discount')
      }, 1000)
    } catch {
      notificationError('Tạo mã giảm giá thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        margin: '10px 20px',
        background: '#fff',
        padding: '10px 10px',
        borderRadius: '6px'
      }}
    >
      <div
        style={{
          color: '#1677FF',
          margin: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          paddingBottom: '1rem',
          borderBottomColor: '#F5F5F5',
          borderBottomStyle: 'solid',
          borderBottomWidth: '1px',
          fontSize: '0.9rem',
          fontFamily: 'sans-serif'
        }}
      >
        <MenuUnfoldOutlined />
        <div>Thêm mới mã giảm giá</div>
      </div>
      <Form
        style={{ marginLeft: '1rem' }}
        layout="vertical"
        autoComplete="off"
        onFinish={onSubmit}
      >
        {/* Code */}
        <Form.Item
          label="Mã giảm giá:"
          style={{ width: '30%' }}
          name="code"
          rules={[{ required: true, message: 'Vui lòng nhập mã giảm giá' }]}
        >
          <Input />
        </Form.Item>
        {/* Value */}
        <Form.Item
          label="Giá trị:"
          style={{ width: '50%' }}
          name="value"
          rules={[{ required: true, message: 'Vui lòng nhập giá trị' }]}
        >
          <InputNumber min={0} max={1} step={0.1} />
        </Form.Item>
        {/* Label */}
        <Form.Item name="label" label="Nhãn:" style={{ width: '25%' }}>
          <Input />
        </Form.Item>
        {/* Status */}
        <ActiveStatus onSelect={setStatus} status={status} />
        {/* Submit button */}
        <Space>
          <Button onClick={() => router.push('/users/discount')}>
            Quay lại
          </Button>
          <Button
            style={{ background: '#0080FF', color: 'white' }}
            type="text"
            htmlType="submit"
            loading={loading}
          >
            Thêm mới
          </Button>
        </Space>
      </Form>
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <User>{page}</User>
}

export default Page
