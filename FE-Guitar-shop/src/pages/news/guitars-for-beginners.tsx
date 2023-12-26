import { ReactElement, useEffect } from 'react'

import { NextPageWithLayout } from '@/types/next-page'
import { Col, Image, Row } from 'antd'

import BottomContent from '@/components/base/bottomContent'
import Landing from '@/components/layouts/landing'
import Share from '@/components/news/share'

const Page: NextPageWithLayout = () => {
  const bannerTitle = {
    color: 'black',
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    fontSize: '0.9rem'
  }

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
            Những cây guitar acoustic phù hợp cho người mới bắt đầu
          </h2>

          <div style={{ fontFamily: 'cursive', color: 'black' }}>
            “Những cây đàn dành cho đối tượng người chơi mới bắt đầu luôn sôi
            động và được nhiều thương hiệu quan tâm do nhu cầu của khách hàng
            rất lớn. Những người mới bắt đầu đều có mong muốn tìm ngay cho mình
            một cây đàn phù hợp và những cây đàn ở phân khúc này cũng có mức giá
            dễ tiếp cận dẫn đến người dùng có thể dễ dàng mua và thay đổi nếu
            thấy không phù hợp hoặc thấy thích một cây đàn khác hơn. <br />
            Do đó nếu phải tìm ra những cây đàn đáng mua nhất cho người mới cũng
            không hề dễ dàng, vậy nên chúng tôi có một số gợi ý để bạn có thể
            tìm ra cho mình cây đàn phù hợp nhất để bắt đầu hành trình âm nhạc
            của mình.”
          </div>
          <div style={{ textAlign: 'center' }}>
            <Image
              src="/images/news/guitars-for-beginners/0.png"
              alt="banner-1"
              preview={false}
              style={{ marginTop: '2rem' }}
            />

            <div
              style={{
                color: 'black',
                marginTop: '0.5rem',
                marginBottom: '0.5rem'
              }}
            >
              Kapok LD-14
            </div>
          </div>
          <div>
            Kapok LD-14 nổi bật về thiết kế so với các guitar cùng phân khúc nhờ
            lớp sơn bóng đẹp được nhiều bạn sinh viên ưa chuộng, cần đàn làm
            bằng gỗ mahogany cao cấp đem đến âm sắc ấn tượng. Ngựa đàn và ngăn
            phím đàn được làm từ gỗ phong, viền đàn bằng nhựa ABS càng làm chiếc
            guitar này trở nên chất lượng hơn.
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Image
              src="/images/news/guitars-for-beginners/LD-14.png"
              alt="banner-1"
              height="25rem"
              preview={false}
            />
            <div style={bannerTitle}>Kapok D-118AC</div>
          </div>
          <div>
            Kapok D-118AC thích hợp với nhiều phong cách chơi acoustic khác
            nhau. Thiết kế nhỏ gọn tiện dụng, thích hợp cho tập luyện hoặc biểu
            diễn ở bất kì môi trường nào mà không gây ra sự bất tiện.
          </div>
          <div
            style={{
              textAlign: 'center',
              marginTop: '2rem'
            }}
          >
            <Image
              src="/images/news/guitars-for-beginners/D-118AC.png"
              alt="banner-1"
              height="25rem"
              preview={false}
            />
            <div style={bannerTitle}>Tanglewood TWCR D</div>
          </div>
          <div>
            Tanglewood TWCR D có dáng Dreadought cho tiếng đàn to, ấm và đầy
            hơn. Cây đàn được thiết kế với chất liệu chính là gỗ Spruce và
            Mahogany tạo nên vẻ đẹp thẩm mỹ, sang trọng của cây đàn. Với nhiều
            tính năng vượt trội, hứa hẹn sẽ đáp ứng đầy đủ nhu cầu của người
            chơi, mang đến sự lựa chọn lý tưởng cho các nghệ sỹ Guitar.
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Image
              src="/images/news/guitars-for-beginners/TWCR-D.png"
              alt="banner-1"
              height="25rem"
              preview={false}
            />
            <div style={bannerTitle}>Takamine D1D NS</div>
          </div>
          <div>
            Takamine D1D NS thuộc dòng D Series không những hấp dẫn người chơi
            bởi chất lượng âm thanh trong trẻo, vang mà nó còn hấp dẫn người
            chơi bởi kiểu dáng thiết kế bên ngoài hiện đại và thanh lịch. Mặt
            đàn Takamine D1D NS được làm bằng gỗ Vân sam (Spruce), mang đến âm
            thanh ngân vang cho cây đàn.
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Image
              src="/images/news/guitars-for-beginners/D1D-NS.png"
              alt="banner-1"
              height="25rem"
              preview={false}
            />
            <div style={bannerTitle}>Tanglewood TWCR DCE</div>
          </div>
          <div>
            Đàn guitar Tanglewood TWCR DCE có dáng dreadought khuyết (cutaway)
            cho tiếng đàn to, ấm và đầy hơn. Mặt trước, lưng, hông và cần đàn
            làm từ chất liệu mahogany, đặc biệt gỗ làm mặt đàn được tuyển chọn
            vô cùng kỹ lưỡng và cẩn thận.
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Image
              src="/images/news/guitars-for-beginners/TWCR-DCE.png"
              alt="banner-1"
              height="25rem"
              preview={false}
            />

            <div style={bannerTitle}>Tanglewood TWCR O E</div>
          </div>
          <div>
            Tanglewood TWCR O E thiết kế dáng đàn Orchestra dáng đàn Orchestra
            tạo ra được những chất âm riêng biệt, hệ tiếng đều đặn, âm lượng hợp
            lý và cân bằng. Hệ thống pickup và Preamp Tanglewood TW-EX4 có EQ 4
            băng tần bao gồm các nút điều chỉnh âm thanh cho âm trầm, âm tầm
            trung và âm treble, cùng với núm điều chỉnh âm lượng riêng biệt và
            sự tiện lợi của bộ chỉnh màu kỹ thuật số trên bo mạch.
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Image
              src="/images/news/guitars-for-beginners/TWCR-O-E.png"
              alt="banner-1"
              height="25rem"
              preview={false}
            />

            <div style={bannerTitle}>Fender CD-60S</div>
          </div>
          <div>
            Fender CD-60S là cây đàn guitar lý tưởng cho những người đang tìm
            kiếm chiếc Dreadnought chất lượng cao, giai điệu chuẩn và khả năng
            chơi tuyệt vời với mức giá phải chăng. Mặt trước Fender CD-60S được
            làm bằng gỗ Spruce chắc chắn.
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Image
              src="/images/news/guitars-for-beginners/CD-60S.png"
              alt="banner-1"
              height="25rem"
              preview={false}
            />

            <div style={bannerTitle}>Takamine ED1DC NS</div>
          </div>
          <div>
            Takamine ED1-DC được thiết kế với hình dáng Dreadnought thông dụng,
            vẻ ngoài bắt mắt, trang nhã. Mặt trước làm từ gỗ vân sam, mặt sau và
            hai bên hông được làm từ gỗ Mahogany tạo nên âm thanh tuyệt hảo, âm
            lượng lớn, xứng đáng là sự lựa chọn hoàn hảo cho những ai đang tìm
            kiếm một cây Guitar Acoustic mức giá tầm trung nhưng đảm bảo chất
            lượng.
          </div>
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
