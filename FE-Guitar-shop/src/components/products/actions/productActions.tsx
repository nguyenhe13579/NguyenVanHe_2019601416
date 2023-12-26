import { useRouter } from 'next/router'
import { useState } from 'react'

import {
  AppstoreAddOutlined,
  DeleteOutlined,
  FormOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { Button, InputNumber, Popconfirm, Popover, Space } from 'antd'
import { notificationError, notificationSuccess } from '@/helpers/notification'
import { ProductService } from '@/services/product'

type Props = {
  id: number
}

const ProductActions = (props: Props) => {
  const { id } = props
  const router = useRouter()
  const [amount, setAmount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const onConfirm = async () => {
    try {
      if (await ProductService.delete(id))
        notificationSuccess('Xóa sản phẩm thành công!')
    } catch {
      notificationError('Có lỗi xảy ra')
    }
  }

  const onUpdate = async () => {
    try {
      setLoading(true)
      const product = await ProductService.show(id)
      if (product) {
        if (
          await ProductService.update(id, { amount: amount + product.amount })
        )
          notificationSuccess('Nhập số lượng thành công')
      }
    } catch {
      notificationError('Nhập số lượng thất bại')
    } finally {
      setLoading(false)
    }
  }

  const amountIncrease = (
    <Space>
      <InputNumber min={1} onChange={value => setAmount(value || 1)} />
      <Button
        style={{ background: '#1677FF', color: 'white' }}
        onClick={onUpdate}
        loading={loading}
      >
        Nhập
      </Button>
    </Space>
  )

  const content = (
    <>
      <div>
        <Button
          type="text"
          style={{ color: '#1677FF' }}
          onClick={() => router.push(`/users/product/${id}`)}
        >
          <FormOutlined /> Cập nhật sản phẩm
        </Button>
      </div>
      <div>
        <Popover content={amountIncrease} trigger="click">
          <Button type="text" style={{ color: '#56003A' }}>
            <AppstoreAddOutlined /> Nhập hàng
          </Button>
        </Popover>
      </div>
      <div>
        <Popconfirm
          title="Thông báo"
          description="Bạn có chắc muốn xóa sản phẩm này?"
          onConfirm={onConfirm}
          okText="Đồng ý"
          cancelText="Đóng"
          placement="left"
        >
          <Button type="text" style={{ color: 'red' }}>
            <DeleteOutlined /> Xóa sản phẩm
          </Button>
        </Popconfirm>
      </div>
    </>
  )

  return (
    <>
      <Popover placement="left" content={content} trigger="click">
        <Button>
          <SettingOutlined />
        </Button>
      </Popover>
    </>
  )
}

export default ProductActions
