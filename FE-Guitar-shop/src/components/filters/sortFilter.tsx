import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Button, Select, Space } from 'antd'
import { DefaultOptionType } from 'antd/es/select'

type Props = {
  sortString: string
  options: DefaultOptionType[]
  onSorting: (sortString: string) => void
  onSortField: (sortField: string) => void
}

const SortFilter = (props: Props) => {
  const { sortString, options, onSorting, onSortField } = props
  const defaultValue =
    options.length === 4 ? 'products.created_at' : 'created_at'

  return (
    <Space>
      <Select
        defaultValue={defaultValue}
        style={{ width: '150px' }}
        options={options}
        status="error"
        onChange={value => onSortField(value)}
      />
      {sortString === 'desc' ? (
        <Button
          style={{ background: '#1677FF', color: 'white' }}
          onClick={() => onSorting('asc')}
        >
          <ArrowDownOutlined />
          Giảm dần
        </Button>
      ) : (
        <Button type="primary" onClick={() => onSorting('desc')}>
          <ArrowUpOutlined />
          Tăng dần
        </Button>
      )}
    </Space>
  )
}

export default SortFilter
