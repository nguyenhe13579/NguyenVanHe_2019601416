import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Button, Form, Input, Select, Skeleton, Space } from 'antd'
import { notificationError, notificationSuccess } from '@/helpers/notification'
import { Category, CategoryPayload } from '@/types/category'
import { NextPageWithLayout } from '@/types/next-page'
import { MenuUnfoldOutlined } from '@ant-design/icons'
import { CategoryService } from '@/services/category'

import User from '@/components/layouts/user'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const categoryID = router.query.id
  const [category, setCategory] = useState<Category>()
  const [loading, setLoading] = useState<boolean>(false)
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)

  const fetchCategoryByID = async () => {
    try {
      setLoading(true)
      const response = await CategoryService.show(categoryID)
      if (response) setCategory(response)
    } catch {
      notificationError('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }

  const onUpdate = async (payload: CategoryPayload) => {
    try {
      setSubmitLoading(true)
      if (await CategoryService.update(categoryID, payload))
        notificationSuccess('Cập nhật danh mục thành công!')
      setTimeout(() => {
        router.push('/users/category')
      }, 1000)
    } catch {
      notificationError('Có lỗi xảy ra')
    } finally {
      setSubmitLoading(false)
    }
  }

  useEffect(() => {
    if (categoryID) fetchCategoryByID()
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
        <div>Cập nhật danh mục #{category?.id}</div>
      </div>
      {loading ? (
        <Skeleton active />
      ) : (
        <Form
          style={{ marginLeft: '1rem' }}
          layout="vertical"
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onUpdate}
        >
          <Form.Item
            label="Tên danh mục:"
            style={{ width: '50%' }}
            name="name"
            initialValue={category?.name}
            rules={[
              { required: true, message: 'Tên danh mục không được để trống' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mô tả:"
            style={{ width: '50%' }}
            name="description"
            initialValue={category?.description}
          >
            <Input.TextArea rows={5} />
          </Form.Item>

          <Form.Item
            label="Trạng thái:"
            style={{ width: '10rem' }}
            name="status"
          >
            <Select
              defaultValue={category?.status}
              options={[
                { value: 1, label: 'Hoạt động' },
                { value: 0, label: 'Không hoạt động' }
              ]}
            />
          </Form.Item>

          <Space>
            <Button onClick={() => router.push('/users/category')}>
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
