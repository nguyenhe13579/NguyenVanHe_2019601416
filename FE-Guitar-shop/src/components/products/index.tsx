import { defaultPagination, paginationConfig } from '@/configs/pagination'
import { Table } from 'antd'

import { Product } from '@/types/product'

import { productColumns } from '../utilities/columnsConfig'

type Props = {
  products: Product[] | undefined
  pageSize: number
  total: number
  loading: boolean
  onChange: (page: number, pageSize: number) => void
}

const Products = (props: Props) => {
  const { products, pageSize, total, loading, onChange } = props

  return (
    <Table
      columns={productColumns}
      dataSource={products}
      pagination={{
        ...paginationConfig,
        pageSize: pageSize,
        total: total
      }}
      onChange={pagination =>
        onChange(
          pagination.current || defaultPagination.page,
          pagination.pageSize || defaultPagination.size
        )
      }
      rowKey="id"
      loading={loading}
    />
  )
}

export default Products
