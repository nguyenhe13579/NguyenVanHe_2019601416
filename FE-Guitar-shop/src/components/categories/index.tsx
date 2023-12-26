import Router from 'next/router'

import { categoryStatus } from '@/configs/status'
import { ColumnsType } from 'antd/es/table'
import { Tag, Table, Popover, Button } from 'antd'
import { Category } from '@/types/category'

import CategoryActions from './categoryActions'

type Props = {
  categories: Category[] | undefined
  loading: boolean
}

const Categories = (props: Props) => {
  const { categories, loading } = props

  const getCategoryTime = (product: Category) => {
    const createTime = new Date(product.created_at).toLocaleString()
    const updateTime = new Date(product.updated_at).toLocaleString()
    return (
      <>
        <div>
          <span style={{ fontWeight: 'bold' }}>Ngày tạo:</span> {createTime}
        </div>
        <div>
          <span style={{ fontWeight: 'bold' }}>Ngày cập nhật:</span>{' '}
          {updateTime}
        </div>
      </>
    )
  }

  const columns: ColumnsType<Category> = [
    {
      title: 'ID',
      render: (_, data) => data.id
    },
    {
      title: 'Tên danh mục',
      render: (_, data) => (
        <Popover content={getCategoryTime(data)} trigger="hover">
          <Button
            type="text"
            style={{ fontWeight: 'bold' }}
            onClick={() => Router.push(`/users/product?category=${data.id}`)}
          >
            {data.name}
          </Button>
        </Popover>
      )
    },
    {
      title: 'Mô tả',
      render: (_, data) => data.description
    },
    {
      title: 'Trạng thái',
      render: (_, data) => {
        const tag = categoryStatus.find(tag => tag.value === data.status)
        return <Tag color={tag?.color}>{tag?.label}</Tag>
      }
    },
    {
      title: 'Số sản phẩm',
      render: (_, data) => data.product_count
    },
    {
      title: 'Thao tác',
      render: (_, data) => <CategoryActions id={data.id} />
    }
  ]

  return (
    <div>
      <Table
        columns={columns}
        dataSource={categories}
        pagination={false}
        rowKey="id"
        loading={loading}
      />
    </div>
  )
}

export default Categories
