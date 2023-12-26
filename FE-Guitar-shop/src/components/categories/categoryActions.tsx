import { useRouter } from 'next/router'

import { notificationError, notificationSuccess } from '@/helpers/notification'
import { DeleteOutlined, FormOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Space } from 'antd'
import { CategoryService } from '@/services/category'

type Props = {
  id: number
}

const CategoryActions = (props: Props) => {
  const { id } = props
  const router = useRouter()

  const onConfirm = async () => {
    try {
      if (await CategoryService.delete(id))
        notificationSuccess('Xóa danh mục thành công!')
    } catch {
      notificationError('Có lỗi xảy ra')
    }
  }

  return (
    <>
      <Space>
        <Button
          type="text"
          size="small"
          style={{ color: '#1677FF' }}
          onClick={() => router.push(`/users/category/${id}`)}
        >
          <FormOutlined />
        </Button>
        <Popconfirm
          title="Thông báo"
          description="Bạn có chắc muốn xóa danh mục này?"
          onConfirm={onConfirm}
          okText="Đồng ý"
          cancelText="Đóng"
          placement="left"
        >
          <Button type="text" size="small" style={{ color: 'red' }}>
            <DeleteOutlined />
          </Button>
        </Popconfirm>
      </Space>
    </>
  )
}

export default CategoryActions
