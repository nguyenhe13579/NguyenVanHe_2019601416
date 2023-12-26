type TablePaginationPosition =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight'

export type Pagination = {
  page: number
  page_size: number
  position?: TablePaginationPosition[] | undefined
  pageSizeOptions: number[]
  showSizeChanger: boolean
}
