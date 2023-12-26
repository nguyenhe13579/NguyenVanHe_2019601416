import { EnvironmentFilled, PhoneFilled, MailFilled } from '@ant-design/icons'
import { Col, Row, Space } from 'antd'
 /*
    style={{ color: 'red' }}
#D72027
FF1935
FF1935
<HomeOutlined /> ngôi nhà
<ShoppingCartOutlined /> giỏ
<EnvironmentOutlined /> định vị
<PhoneOutlined /> ngang PhoneFilled hinh dt
HeartFilled trái tim tràn đầy
SwapOutlined Hoán đổi
<MailFilled /> mail
&copy;
smtp.gmail.com
    |
    */

const Footer = () => {
  const date = new Date().getFullYear()
  const colStyle = {
    marginBottom: '5px',
    lineHeight: '1.5'
  }
  const h3Style = {
    fontSize: '16px',
    fontWeight: '700',
    marginTop: '20px',
    marginBottom: '10px'
  }

  return (
    <Row style={{ background: '#D72027' }}>
      <Col
        xxl={{ span: 14, offset: 5 }}
        xl={{ span: 18, offset: 3 }}
        lg={{ span: 20, offset: 2 }}
        span={24}
        offset={0}
        style={{ padding: '0 1rem' }}
      >
        <Row
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            letterSpacing: '-0.025em',
            color: 'white'
          }}
        >
          <Col>
            <h3 style={h3Style}>Guitar Sao Việt</h3>
            <div style={colStyle}>
              <Space>
                <EnvironmentFilled />
              </Space>
              <strong style={{ fontWeight: 'bolder', paddingLeft: '3px' }}>
                Trụ sở :
              </strong>{' '}
              <span style={{ letterSpacing: '0.1rem', fontSize: '1rem' }}>
              165 Dương Quảng Hàm, Cầu Giấy, Hà Nội
              </span>
            </div>
            <h3 style={h3Style}>HỖ TRỢ</h3>
            <div style={colStyle}>
              <Space>
                <PhoneFilled />
              </Space>
              <strong
                style={{
                  fontWeight: 'bolder',
                  
                  paddingLeft: '3px'
                }}
              >
                Hotline:
              </strong>{' '}
              <span style={{ letterSpacing: '0.1rem', fontSize: '1rem' }}>
              0387350376
              </span>
            </div>
            <div style={colStyle}>
              <Space>
                <MailFilled />
              </Space>
              <strong
                style={{
                  fontWeight: 'bolder',
                  paddingLeft: '3px'
                }}
              >
                Email :
              </strong>{' '}
              <span style={{ letterSpacing: '0.1rem', fontSize: '1rem' }}>
              nguyenhe55559999@gmail.com
              </span>
            </div>
          </Col>
          <Col>
            <h3 style={h3Style}>FANPAGE FACEBOOK</h3>
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61554478353791&tabs=timeline&width=330&height=330&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" 
              width="330"
              height="130"
              style={{ border: 'none', overflow: 'hidden' }}
            ></iframe>
          </Col>
        </Row>
        <p
          style={{
            margin: 0,
            padding: '15px 0',
            lineHeight: 1.7,
            color: 'white'
          }}
        >
          &copy; Copyright {date}. Bản quyền thuộc về Guitar shop Guitar Sao Việt
        </p>
      </Col>
    </Row>
  )
}

export default Footer
