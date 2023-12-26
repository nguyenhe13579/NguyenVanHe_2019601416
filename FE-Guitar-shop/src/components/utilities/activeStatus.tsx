import { Form, Select } from 'antd'

type Props = {
  status: number
  onSelect: (status: number) => void
}

const ActiveStatus = (props: Props) => {
  const { status, onSelect } = props

  return (
    <Form.Item label="Trạng thái:" style={{ width: '10rem' }}>
      <Select
        defaultValue={1}
        value={status}
        options={[
          { value: 1, label: 'Hoạt động' },
          { value: 0, label: 'Không hoạt động' }
        ]}
        onChange={value => onSelect(value)}
      />
    </Form.Item>
  )
}

export default ActiveStatus
