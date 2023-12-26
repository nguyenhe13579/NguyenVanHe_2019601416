import { notificationError, notificationSuccess } from '@/helpers/notification'
import { Button, Popconfirm } from 'antd'
import { CloseCircleFilled } from '@ant-design/icons'
import { DiscountService } from '@/services/discount'
import { Discount } from '@/types/discount'

type Props = {
  discount: Discount
}

const DiscountAction = (props: Props) => {
  const { discount } = props

  const onTerminate = async () => {
    try {
      if (await DiscountService.update(discount.id, { status: 0 }))
        notificationSuccess('Vô hiệu hóa thành công')
    } catch {
      notificationError('Vô hiệu hóa thất bại')
    }
  }

  return (
    <Popconfirm
      title="Thông báo"
      description="Bạn có chắc muốn vô hiệu hóa mã giảm giá này?"
      onConfirm={onTerminate}
      okText="Đồng ý"
      cancelText="Đóng"
      placement="left"
      disabled={discount.status === 0}
    >
      <Button
        type="text"
        title="Vô hiệu hóa"
        size="small"
        disabled={discount.status === 0}
        style={{ color: 'red' }}
      >
        <CloseCircleFilled />
      </Button>
    </Popconfirm>
  )
}

export default DiscountAction
