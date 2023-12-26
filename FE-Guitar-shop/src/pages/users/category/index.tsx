import { ReactElement, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import { MenuUnfoldOutlined, PlusOutlined } from '@ant-design/icons'
import { NextPageWithLayout } from '@/types/next-page'
import { notificationError } from '@/helpers/notification'
import { CategoryService } from '@/services/category'
import { Category } from '@/types/category'
import { Button } from 'antd'

import Categories from '@/components/categories'
import User from '@/components/layouts/user'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const shouldEffect = useRef(true)
  const [categories, setCategories] = useState<Category[] | undefined>()
  const [loading, setLoading] = useState<boolean>(false)

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response = await CategoryService.getList()
      if (response) setCategories(response.categories)
    } catch {
      notificationError('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (shouldEffect.current) fetchCategories()
    shouldEffect.current = false
  }, [])

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
        <div>Danh sách danh mục</div>
      </div>
      <Button
        style={{
          marginBottom: '1rem',
          marginLeft: '1rem',
          background: '#1677FF',
          color: 'white'
        }}
        onClick={() => router.push('/users/category/create')}
      >
        <PlusOutlined />
        Thêm mới
      </Button>
      <div>
        <Categories categories={categories} loading={loading} />
      </div>
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <User>{page}</User>
}

export default Page
