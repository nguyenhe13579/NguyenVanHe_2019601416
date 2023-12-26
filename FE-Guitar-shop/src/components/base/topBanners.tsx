import { Carousel, Col, Image, Row } from 'antd'
import { banners } from '@/configs/landingBanners'

const TopBanners = () => {
  return (
    <Row>
      <Col>
        <Carousel autoplay dotPosition="right" effect="fade">
          {banners.map(banner => (
            <div key={banner.id}>
              <Image
                src={banner.src}
                preview={false}
                alt={banner.src}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          ))}
        </Carousel>
      </Col>
    </Row>
  )
}

export default TopBanners
