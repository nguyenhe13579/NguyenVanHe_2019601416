import { ReactElement, useEffect } from 'react'

import { NextPageWithLayout } from '@/types/next-page'
import { Col, Image, Row } from 'antd'

import BottomContent from '@/components/base/bottomContent'
import Landing from '@/components/layouts/landing'
import Share from '@/components/news/share'

const Page: NextPageWithLayout = () => {
  useEffect(() => {
    document.body.scrollTop = 0
  }, [])

  return (
    <>
      <Row style={{ background: 'white' }}>
        <Col
          xxl={{ span: 14, offset: 5 }}
          xl={{ span: 16, offset: 4 }}
          lg={{ span: 18, offset: 3 }}
          span={24}
          offset={0}
          style={{
            padding: '1rem',
            marginTop: '2rem',
            fontSize: '16px',
            color: '#636363',
            lineHeight: 1.5,
            fontFamily: 'sans-serif'
          }}
        >
          <h2 style={{ color: '#D72027' }}>
            Thông báo lịch nghỉ tết Nguyên Đán Nhâm Dần 2022
          </h2>

          <div
            style={{
              color: 'black',
              marginTop: '1rem',
              marginBottom: '1rem',
              fontFamily: 'cursive'
            }}
          >
            “Lời đầu tiên, Guitar Sao Việt xin gửi lời chào trân trọng và lời chúc
            sức khỏe đến Quý khách hàng đã đồng hành cùng chúng tôi trong thời
            gian qua.”
          </div>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Image
              alt="news-image"
              preview={false}
              width="70%"
              src="/images/news/lunar-rest.png"
            />
          </div>
          <p>
          Theo thông báo của Bộ Lao động - Thương binh và Xã hội (Bộ LĐ-TB&XB), cán bộ, công chức, viên chức và người lao động
           được nghỉ tết Âm lịch năm 2024 từ thứ Năm ngày 8/2/2024 Dương lịch (tức ngày 29 tháng Chạp năm Quý Mão) 
           đến hết thứ Tư ngày 14/2/2024 Dương lịch (tức ngày mùng 5 tháng Giêng năm Giáp Thìn).
            <br />
            Nhằm tạo điều kiện thuận lợi cho việc giao dịch trong thời gian nghỉ
            lễ, Guitar Sao Việt xin trân trọng thông báo tới Quý khách hàng lịch nghỉ
            Tết Nguyên Đán như sau:
          </p>
          <p>
          Guitar Sao Việt chính thức nghỉ Tết Nguyên Đán năm 2022 kể từ ngày
          ngày 8/2/2024 Dương lịch (tức ngày 29 tháng Chạp năm Quý Mão)
          </p>
          <p>
            Bắt đầu làm việc lại vào ngày 15/02/2022 (Tức ngày 06 tháng Giêng âm
            lịch).
          </p>
          <p>
            Việc hỗ trợ khách qua kênh chăm sóc online (điện thoại, email...)
            vẫn được duy trì, tuy nhiên có thể chậm trễ hơn bình thường.
          </p>
          <b>
            Quý khách hàng cần hỗ trợ khẩn cấp, vui lòng liên hệ hotline
            0387350376 (Online 24/24)
          </b>
          <p>
            Kính chúc Quý khách hàng cùng gia đình năm mới an khang thịnh vượng,
            vạn sự như ý.
          </p>
          <b>Trân trọng.</b>
          <Share />
        </Col>
      </Row>
      <BottomContent />
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Landing>{page}</Landing>
}

export default Page
