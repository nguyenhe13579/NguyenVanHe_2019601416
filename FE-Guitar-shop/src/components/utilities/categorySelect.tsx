import { useEffect, useState } from 'react'

import { notificationError } from '@/helpers/notification'
import { CategoryService } from '@/services/category'
import { Options } from '@/types/select-box'
import { Select } from 'antd'

type Props = {
  categoryID: number
  onSelect: (categoryID: number) => void
}

const CategorySelect = (props: Props) => {
  const { categoryID, onSelect } = props
  const [categoryFilter, setCategoryFilter] = useState<Options[]>([])

  const fetchCategory = async () => {
    try {
      const { categories } = await CategoryService.getList()
      if (categories) {
        const categoryFilter: Options[] = [
          {
            value: -1,
            label: '--- Danh mục ---'
          }
        ]
        categories.forEach(category => {
          categoryFilter.push({
            value: category.id,
            label: category.name
          })
        })
        setCategoryFilter(categoryFilter)
      }
    } catch {
      notificationError('Có lỗi xảy ra')
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  return (
    <Select
      defaultValue={-1}
      value={categoryID}
      style={{ width: '150px' }}
      onChange={value => onSelect(value)}
      options={categoryFilter}
      status="warning"
    />
  )
}

export default CategorySelect
