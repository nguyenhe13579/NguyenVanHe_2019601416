import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { DefaultOptionType } from 'antd/es/select'
import { Radio, Select } from 'antd'

type Props = {
  sortString: string
  options: DefaultOptionType[]
  onSorting: (sortString: string) => void
  onSortField: (sortField: string) => void
}

const SideSort = (props: Props) => {
  const { sortString, options, onSorting, onSortField } = props

  return (
    <div>
      <Select
        defaultValue="products.created_at"
        style={{ width: '100%' }}
        options={options}
        status="error"
        onChange={value => onSortField(value)}
      />
      <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <Radio.Group
          onChange={e => onSorting(e.target.value)}
          value={sortString}
        >
          <Radio value="asc">
            <ArrowUpOutlined />
            Tăng dần
          </Radio><br/>
          <Radio value="desc">
            <ArrowDownOutlined />
            Giảm dần
          </Radio>
        </Radio.Group>
      </div>
    </div>
  )
}

export default SideSort
