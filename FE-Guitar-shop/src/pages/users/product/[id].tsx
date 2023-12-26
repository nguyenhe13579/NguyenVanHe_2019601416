import { ReactElement, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import { Button, Form, Input, InputNumber, Skeleton, Space } from 'antd'
import { notificationError, notificationSuccess } from '@/helpers/notification'
import { Product, UpdatePayload } from '@/types/product'
import { NextPageWithLayout } from '@/types/next-page'
import { MenuUnfoldOutlined } from '@ant-design/icons'
import { ProductService } from '@/services/product'

import User from '@/components/layouts/user'
import ActiveStatus from '@/components/utilities/activeStatus'
import CategorySelect from '@/components/utilities/categorySelect'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const shouldEffect = useRef(true)
  const productID = router.query.id?.toString()
  const [product, setProduct] = useState<Product>()
  const [loading, setLoading] = useState<boolean>(false)
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)

  const [categoryID, setCategoryID] = useState<number>()
  const [status, setStatus] = useState<number>()

  const fetchProductByID = async () => {
    try {
      setLoading(true)
      const response = await ProductService.show(parseInt(productID || '0'))
      if (response) setProduct(response)
    } catch {
      notificationError('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }

  const onUpdate = async (payload: UpdatePayload) => {
    try {
      setSubmitLoading(true)
      if (
        await ProductService.update(parseInt(productID || '0'), {
          ...payload,
          category_id: categoryID,
          status: status
        })
      )
        notificationSuccess('Cập sản phẩm thành công!')
      setTimeout(() => {
        router.push('/users/product')
      }, 1000)
    } catch {
      notificationError('Có lỗi xảy ra')
    } finally {
      setSubmitLoading(false)
    }
  }

  useEffect(() => {
    if (productID && shouldEffect.current) fetchProductByID()
    shouldEffect.current = false
  }, [router])

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
        <div>Cập nhật sản phẩm #{product?.id}</div>
      </div>
      {loading ? (
        <Skeleton active />
      ) : (
        <Form
          style={{ marginLeft: '1rem' }}
          layout="vertical"
          autoComplete="off"
          onFinish={onUpdate}
        >
          {/* Category reference */}
          <Form.Item label="Danh mục:">
            <CategorySelect
              onSelect={categoryID => setCategoryID(categoryID)}
              categoryID={categoryID || product?.category_id || -1}
            />
          </Form.Item>
          {/* Product name */}
          <Form.Item
            label="Tên sản phẩm:"
            style={{ width: '50%' }}
            name="name"
            rules={[
              { required: true, message: 'Tên sản phẩm không được để trống' }
            ]}
            initialValue={product?.name}
          >
            <Input />
          </Form.Item>
          {/* Description */}
          <Form.Item
            label="Mô tả:"
            style={{ width: '50%' }}
            name="description"
            initialValue={product?.description}
          >
            <Input.TextArea rows={5} />
          </Form.Item>
          {/* Image url */}
          <Form.Item
            label="Đường dẫn ảnh:"
            style={{ width: '50%' }}
            name="image"
            rules={[
              { required: true, message: 'Đường dẫn ảnh không được để trống' }
            ]}
            initialValue={product?.image}
          >
            <Input />
          </Form.Item>
          {/* Price */}
          <Form.Item
            label="Giá tiền:"
            name="price"
            rules={[
              { required: true, message: 'Giá tiền không được để trống' }
            ]}
            initialValue={product?.price}
          >
            <InputNumber min={0} style={{ width: '200px' }} />
          </Form.Item>
          {/* Amount */}
          <Form.Item
            label="Số lượng:"
            name="amount"
            initialValue={product?.amount}
            rules={[
              { required: true, message: 'Số lượng không được để trống' }
            ]}
          >
            <InputNumber min={0} style={{ width: '100px' }} />
          </Form.Item>
          {/* Compare attribute */}
          <Form.Item
            name="bonus"
            label="Quà tặng kèm:"
            style={{ width: '50%' }}
            initialValue={product?.bonus}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="origin"
            label="Xuất xứ:"
            style={{ width: '25%' }}
            initialValue={product?.origin}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="style"
            label="Kiểu dáng:"
            style={{ width: '25%' }}
            initialValue={product?.style}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="material"
            label="Vật liệu:"
            style={{ width: '25%' }}
            initialValue={product?.material}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="paint"
            label="Loại sơn:"
            style={{ width: '25%' }}
            initialValue={product?.paint}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="string_name"
            label="Dây đàn:"
            style={{ width: '25%' }}
            initialValue={product?.string_name}
          >
            <Input />
          </Form.Item>
          {/* Status */}
          <ActiveStatus
            onSelect={status => setStatus(status)}
            status={status || product?.status || 0}
          />

          <Space>
            <Button onClick={() => router.push('/users/product')}>
              Quay lại
            </Button>
            <Button
              style={{ background: '#0080FF', color: 'white' }}
              type="text"
              htmlType="submit"
              loading={submitLoading}
            >
              Cập nhật
            </Button>
          </Space>
        </Form>
      )}
    </div>
  )
}
Page.getLayout = function getLayout(page: ReactElement) {
  return <User>{page}</User>
}

export default Page
