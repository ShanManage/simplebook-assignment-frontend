import React from 'react'
import type { PaginationProps } from 'antd'
import { Pagination } from 'antd'
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons'

const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
  if (type === 'prev') {
    return <a>< ArrowLeftOutlined /> Previous</a>
  }
  if (type === 'next') {
    return <a>Next <ArrowRightOutlined /> </a>
  }
  return originalElement
}

const AppPagination: React.FC<{
  page: number
  pageSize: number
  total: number
  handleChangePage: (page: number, pageSize: number) => void
  onShowSizeChange: (current: number, newPageSize: number) => void
}> = ({
  page,
  pageSize,
  total,
  handleChangePage,
  onShowSizeChange
}) =>
  <Pagination
    showSizeChanger
    onShowSizeChange={onShowSizeChange}
    current={page}
    pageSize={pageSize}
    total={total}
    itemRender={itemRender}
    onChange={handleChangePage}
  />

export default AppPagination
