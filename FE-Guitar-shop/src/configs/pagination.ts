import { Pagination } from '../types/pagination'

export const paginationConfig: Pagination = {
  page: 1,
  page_size: 8,
  position: ['bottomLeft'],
  pageSizeOptions: [4, 8, 20],
  showSizeChanger: true
}

export const defaultPagination = {
  page: 1,
  size: 8,
  total: 0,
  sort: 'desc'
}
