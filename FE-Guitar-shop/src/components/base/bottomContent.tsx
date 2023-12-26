import { Col, Image, Row } from 'antd'

import News from '../news'

const BottomContent = () => {
  return (
    <div>
      {/* Static banner */}
      <Row>
        <div style={{ position: 'relative' }}>
          <Image alt="middle-banner" preview={false} src="/images/slide3.jpg" />
          <div
            style={{
              position: 'absolute',
              top: '28%',
              right: '12%',
              width: '30%',
              color: 'white',
              fontSize: '1.5rem',
              fontFamily: 'cursive'
            }}
          >
            Đàn guitar không chỉ là một nhạc cụ, mà là một phần của tâm hồn của người chơi.
            <br />
            <br />
            Âm nhạc từ đàn guitar không chỉ là những nốt nhạc, mà là những cảm xúc, 
            là ngôn ngữ mà trái tim của người chơi dùng để diễn đạt.
          </div>
        </div>
      </Row>
      {/* News */}
      <Row style={{ background: 'white', marginBottom: '2rem' }}>
        <Col
          xxl={{ span: 14, offset: 5 }}
          xl={{ span: 18, offset: 3 }}
          lg={{ span: 20, offset: 2 }}
          span={24}
          offset={0}
          style={{ padding: '0 1rem' }}
        >
          <div
            style={{
              color: '#00264D'
            }}
          >
            <h2 className="homepage-title">Tin tức</h2>
            <News />
            {/* Brand */}
            <h2 className="homepage-title">Thương hiệu</h2>
            <Image
              alt="brands"
              width="100%"
              src="/images/footer-banner.png"
              preview={false}
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default BottomContent
