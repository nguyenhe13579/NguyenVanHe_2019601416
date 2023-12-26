import { ReactElement } from 'react'
import { useRouter } from 'next/router'

import { Button, Col, Result, Row } from 'antd'
import { NextPageWithLayout } from '@/types/next-page'

import Landing from '@/components/layouts/landing'

const NotFoundPage: NextPageWithLayout = () => {
  const router = useRouter()

  return (
    <Row style={{ background: 'white' }}>
      <Col
        xxl={{ span: 14, offset: 5 }}
        xl={{ span: 18, offset: 3 }}
        lg={{ span: 20, offset: 2 }}
        span={24}
        offset={0}
        style={{ padding: '0 1rem' }}
      >
        <Result
          status="404"
          title="404"
          subTitle="Oops!!! có vẻ như trang bạn tìm không tồn tại."
          extra={
            <Button
              style={{ color: 'white', background: '#D72027' }}
              onClick={() => router.push('/')}
            >
              Quay lại
            </Button>
          }
        />
      </Col>
    </Row>
  )
}

NotFoundPage.getLayout = function getLayout(page: ReactElement) {
  return <Landing>{page}</Landing>
}

export default NotFoundPage
