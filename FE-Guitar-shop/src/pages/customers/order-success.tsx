import { ReactElement, useEffect } from 'react'

import { NextPageWithLayout } from '@/types/next-page'
import { Col, Image, Row } from 'antd'

import BottomContent from '@/components/base/bottomContent'
import TopBanners from '@/components/base/topBanners'
import Landing from '@/components/layouts/landing'

const Page: NextPageWithLayout = () => {
  useEffect(() => {
    document.body.scrollTop = 600
  }, [])

  return (
    <div>
      {/* Banners */}
      <TopBanners />
      {/* Content */}
      <h2 className="homepage-title">Đặt hàng thành công</h2>
      <Row>
        <Col
          xxl={{ span: 14, offset: 5 }}
          xl={{ span: 16, offset: 4 }}
          lg={{ span: 18, offset: 3 }}
          span={24}
          offset={0}
          style={{ padding: '0 1rem' }}
        >
          <div
            style={{
              color: '#00264D',
              paddingTop: '3rem',
              paddingBottom: '3rem',
              fontSize: '1rem',
              fontFamily: 'cursive'
            }}
          >
            <p>
              Cảm ơn quý khách đã đặt hàng của Guitar Sao Việt! Quý khách vui lòng
              kiểm tra đơn hàng trong hòm thư điện tử hoặc theo dõi tình trạng
              đơn hàng trong mục &quot;Theo dõi đơn hàng&quot; trong tab người
              dùng trên thanh menu.
            </p>
            <p style={{ color: '#FFAD00' }}>
              *Lưu ý: Nếu Email của bạn không đúng, kết quả cũng như tình trạng
              đơn hàng sẽ không gửi được đến hòm thư của bạn, nếu bạn đặt hàng
              không đăng nhập và sau 15 phút đặt hàng không có email tự động
              được gửi đến, vui lòng liên hệ đường dây nóng: 0387350376 để được
              hỗ trợ.
            </p>
            <div>Chúc quý khách một ngày tốt lành!!!</div>
          </div>
          <Image
            style={{ width: '50%', float: 'right' }}
            preview={false}
            src="/images/thanks.jpg"
          />
        </Col>
      </Row>
      <BottomContent />
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Landing>{page}</Landing>
}

export default Page
