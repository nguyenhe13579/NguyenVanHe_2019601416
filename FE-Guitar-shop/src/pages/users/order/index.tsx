import { ReactElement, useEffect, useState } from 'react'

import { Button, Input, Select, Space, Table, notification } from 'antd'
import { MenuUnfoldOutlined, MonitorOutlined } from '@ant-design/icons'
import { defaultPagination, paginationConfig } from '@/configs/pagination'
import { FilterPayload, Order } from '@/types/order'
import { NextPageWithLayout } from '@/types/next-page'
import { notificationError } from '@/helpers/notification'
import { OrderService } from '@/services/order'
import { orderFilter } from '@/configs/selectOptions'

import { adminOrderColumns } from '@/components/utilities/columnsConfig'
import SortFilter from '@/components/filters/sortFilter'
import User from '@/components/layouts/user'

const Page: NextPageWithLayout = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const [total, setTotal] = useState<number>(defaultPagination.total)
  const [page, setPage] = useState<number>(defaultPagination.page)
  const [pageSize, setPageSize] = useState<number>(defaultPagination.size)

  const [search, setSearch] = useState<string>()
  const [status, setStatus] = useState<number>(-1)
  const [sortString, setSortString] = useState<string>('desc')
  const [sortField, setSortField] = useState<string>('created_at')

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const payload: FilterPayload = {
        page: page,
        pageSize: pageSize,
        sortField: sortField,
        sortOrder: sortString,
        email: search,
        status: status
      }
      const response = await OrderService.getList(payload)
      if (response) {
        setOrders(response.orders || [])
        setTotal(response.total)
        setPage(response.page)
      }
    } catch {
      notification.destroy()
      notificationError('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [page, pageSize])

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
        <div>Danh sách đơn hàng</div>
      </div>
      {/* Sort filter */}
      <div style={{ marginBottom: '0.5rem', marginLeft: '1rem' }}>
        <SortFilter
          sortString={sortString}
          options={orderFilter}
          onSortField={setSortField}
          onSorting={setSortString}
        />
      </div>
      {/* Select and text filter */}
      <Space style={{ marginBottom: '1rem', marginLeft: '1rem' }}>
        <Select
          defaultValue={-1}
          style={{ width: '150px' }}
          options={[
            { value: -1, label: '--- Trạng thái ---' },
            { value: 0, label: 'Đã hủy' },
            { value: 1, label: 'Chờ xử lý' },
            { value: 2, label: 'Đang giao hàng' },
            { value: 3, label: 'Thành công' }
          ]}
          status="error"
          onChange={value => setStatus(value)}
        />
        <Input
          placeholder="Nhập email"
          onBlur={e => setSearch(e.target.value)}
        />
        <Button type="primary" onClick={fetchOrders}>
          <MonitorOutlined /> Lọc
        </Button>
      </Space>
      <Table
        columns={adminOrderColumns}
        dataSource={orders}
        pagination={{
          ...paginationConfig,
          pageSize: pageSize,
          total: total
        }}
        onChange={pagination => {
          setPage(pagination.current || defaultPagination.page)
          setPageSize(pagination.pageSize || defaultPagination.size)
        }}
        rowKey="id"
        loading={loading}
      />
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <User>{page}</User>
}

export default Page
