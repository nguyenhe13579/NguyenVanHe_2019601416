import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'

import { Button, Form, Input, InputNumber, Space } from 'antd'
import { notificationError, notificationSuccess } from '@/helpers/notification'
import { NextPageWithLayout } from '@/types/next-page'
import { MenuUnfoldOutlined } from '@ant-design/icons'
import { ProductService } from '@/services/product'
import { CreatePayload } from '@/types/product'

import CategorySelect from '@/components/utilities/categorySelect'
import ActiveStatus from '@/components/utilities/activeStatus'
import User from '@/components/layouts/user'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const [categoryID, setCategoryID] = useState<number>(-1)
  const [status, setStatus] = useState<number>(1)

  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (payload: CreatePayload) => {
    try {
      setLoading(true)
      if (categoryID === -1)
        notificationError('Quý khách vui lòng chọn danh mục')
      else {
        if (
          await ProductService.create({
            ...payload,
            category_id: categoryID,
            status: status
          })
        )
          notificationSuccess('Tạo mới thành công')
        setTimeout(() => {
          router.push('/users/product')
        }, 1000)
      }
    } catch {
      notificationError('Có lỗi xảy ra')
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
        <div>Thêm mới sản phẩm</div>
      </div>
      <Form
        style={{ marginLeft: '1rem' }}
        layout="vertical"
        autoComplete="off"
        onFinish={onSubmit}
      >
        {/* Category reference */}
        <Form.Item label="Danh mục:">
          <CategorySelect onSelect={setCategoryID} categoryID={categoryID} />
        </Form.Item>
        {/* Product name */}
        <Form.Item
          label="Tên sản phẩm:"
          style={{ width: '50%' }}
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
        >
          <Input />
        </Form.Item>
        {/* Description */}
        <Form.Item label="Mô tả:" style={{ width: '50%' }} name="description">
          <Input.TextArea rows={5} />
        </Form.Item>
        {/* Image url */}
        <Form.Item
          name="image"
          rules={[{ required: true, message: 'Vui lòng nhập đường dẫn ảnh' }]}
          label="Đường dẫn ảnh:"
          style={{ width: '50%' }}
        >
          <Input />
        </Form.Item>
        {/* Price */}
        <Form.Item
          name="price"
          rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm' }]}
          label="Giá tiền:"
        >
          <InputNumber min={0} style={{ width: '200px' }} />
        </Form.Item>
        {/* Amount */}
        <Form.Item
          name="amount"
          rules={[
            { required: true, message: 'Vui lòng nhập số lượng sản phẩm' }
          ]}
          label="Số lượng:"
        >
          <InputNumber min={0} style={{ width: '100px' }} />
        </Form.Item>
        {/* Compare attribute */}
        <Form.Item name="bonus" label="Quà tặng kèm:" style={{ width: '50%' }}>
          <Input />
        </Form.Item>
        <Form.Item name="origin" label="Xuất xứ:" style={{ width: '25%' }}>
          <Input />
        </Form.Item>
        <Form.Item name="brand" label="Hãng:" style={{ width: '25%' }}>
          <Input />
        </Form.Item>
        <Form.Item name="style" label="Kiểu dáng:" style={{ width: '25%' }}>
          <Input />
        </Form.Item>
        <Form.Item name="material" label="Vật liệu:" style={{ width: '25%' }}>
          <Input />
        </Form.Item>
        <Form.Item name="paint" label="Loại sơn:" style={{ width: '25%' }}>
          <Input />
        </Form.Item>
        <Form.Item name="string_name" label="Dây đàn:" style={{ width: '25%' }}>
          <Input />
        </Form.Item>
        {/* Status */}
        <ActiveStatus onSelect={setStatus} status={status} />
        {/* Submit button */}
        <Space>
          <Button onClick={() => router.push('/users/category')}>
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
