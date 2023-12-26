import { Col, Image, Row } from 'antd'

const DesktopBanner = () => {
  return (
    <Row>
      <Col
        xxl={{ span: 14, offset: 5 }}
        xl={{ span: 18, offset: 3 }}
        lg={{ span: 20, offset: 2 }}
        span={24}
        offset={0}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Image
          alt="logo"
          preview={false}
          src="/images/logo1.png"
          height="10rem"
        />
        <Image
          alt="header-banner"
          preview={false}
          src="https://tongkhonhaccu.com/Data/ResizeImage/data/upload/images/product/guitar/manticsaga/gt1-gcbk/dan_guitar_acoustic_gt1bkx500x500x4.jpg"
          height="10rem"
        />
      </Col>
    </Row>
  )
}

export default DesktopBanner
