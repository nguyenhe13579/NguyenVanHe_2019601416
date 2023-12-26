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
            Gợi ý 5 mẹo giúp bạn chơi guitar giỏi hơn
          </h2>

          <div
            style={{ color: 'black', marginTop: '1rem', fontFamily: 'cursive' }}
          >
            “Những điều chỉnh dễ thực hiện này đối với cách bạn học sẽ giúp bạn
            mang lại kết quả nhanh hơn và tốt hơn. Vì vậy, hãy lấy cây đàn của
            bạn và bắt đầu!”
          </div>
          <div
            style={{ color: 'black', marginTop: '2rem', fontWeight: 'bold' }}
          >
            1.Học điều gì đó mới mỗi ngày
          </div>
          <div>
            Tìm một thứ liên quan đến guitar mỗi ngày mà bạn chưa biết và học
            nó, chơi nó. Nó có thể là một đoạn riff, một đoạn liếm, một hợp âm,
            một thang âm, một bài tập, một bài hát, một giai điệu, một phần điều
            chỉnh đã thay đổi, một mẫu gảy, một phần của bài hát mà bạn biết tất
            cả các đoạn riff nhưng không bao giờ bận tâm đến,...
          </div>
          <div style={{ margin: '1rem' }}>
            <Image
              src="/images/news/five-tricks/1.png"
              alt="banner-1"
              height="25rem"
              width="100%"
              preview={false}
            />
          </div>
          <div>
            Kỷ luật tìm kiếm, chơi và tiếp thu một phần kiến thức guitar mới
            hàng ngày sẽ nuôi sống bản năng âm nhạc tiềm thức của bạn, thêm các
            khái niệm mới vào trí nhớ cơ bắp của bạn và cuối cùng là hỗ trợ bạn
            khả năng thể hiện bản thân và biểu diễn dễ dàng trên cây đàn guitar.
            Hãy biến điều này thành một phần trong ngày của bạn và bạn sẽ thấy
            rằng khi bạn tiếp tục cuộc hành trình của mình, một thứ sẽ trở thành
            hai, rồi ba, và tiếp tục cho đến khi bạn đọc hết những gì bạn có thể
            tiếp thu trên cây đàn guitar, mỗi ngày!
          </div>

          <div
            style={{ color: 'black', marginTop: '2rem', fontWeight: 'bold' }}
          >
            2.Tìm hiểu các khoảng âm giai chính
          </div>
          <div>
            Âm giai chính cung cấp các cơ sở xây dựng của nhiều hợp âm và thang
            âm mà bạn sẽ gặp khi bắt đầu sự nghiệp của mình. Bằng cách hiểu cấu
            trúc của âm giai trưởng, chúng ta có thể bắt đầu hòa âm nó theo
            nhiều cách khác nhau để tạo thành hợp âm ba, hợp âm thứ bảy và hợp
            âm mở rộng, cũng như hiểu các chế độ đi kèm với chúng.
          </div>
          <div style={{ margin: '1rem' }}>
            <Image
              src="/images/news/five-tricks/2.png"
              alt="banner-1"
              height="25rem"
              width="100%"
              preview={false}
            />
          </div>
          <div>
            Âm giai trưởng có bảy quãng: gốc, quãng 2, quãng 3, quãng 4, quãng
            5, quãng 6 và quãng 7. Khoảng cách liên kim giữa mỗi khoảng tạo
            thành mẫu WWHWWWH, trong đó W là cả bước và H là nửa bước.
          </div>

          <div
            style={{ color: 'black', marginTop: '2rem', fontWeight: 'bold' }}
          >
            3.Chạy qua mọi hợp âm mà bạn biết
          </div>
          <div>
            Mẹo này là của Joe Satriani: “Nó có vẻ ngớ ngẩn, nhưng nếu ngón tay
            của bạn không đi đến một vị trí nhất định thì đó là vì bạn chưa thử
            thách chúng. Một ngày nọ, khi tôi còn là một thiếu niên, tôi quyết
            định rằng tôi sẽ học từng hợp âm trong cuốn sách hợp âm Joe Pass mà
            tôi có. Tôi đã làm việc trên nó mỗi ngày; không có gì thay thế cho
            sự lặp lại đầu xương.
          </div>
          <div style={{ margin: '1rem' }}>
            <Image
              src="/images/news/five-tricks/3.png"
              alt="banner-1"
              height="25rem"
              width="100%"
              preview={false}
            />
          </div>
          <div>
            “Điều tuyệt vời là, khi bạn đã quen với bài tập này, bạn sẽ buộc các
            ngón tay của mình chuyển từ hợp âm này sang hợp âm khác - những hợp
            âm không có mối liên hệ nào với nhau - và những điều tuyệt vời có
            thể đến từ đó”.
          </div>

          <div
            style={{ color: 'black', marginTop: '2rem', fontWeight: 'bold' }}
          >
            4.Học nguyên văn những bản độc tấu guitar yêu thích của bạn
          </div>
          <div>
            Eddie Van Halen quá cố, vĩ đại đã dành phần đầu của sự nghiệp để
            chơi cùng với nhiều đĩa hát khác nhau cho đến khi âm thanh của những
            gì anh ấy chơi khớp với những gì trong đĩa mà anh ấy đang chơi. Làm
            điều này sẽ nâng cao vốn từ vựng của bạn và cũng cải thiện khả năng
            truyền đạt, cảm nhận, nhận thức về phong cách và cảm giác về đường
            nét đơn.
          </div>
          <div style={{ margin: '1rem' }}>
            <Image
              src="/images/news/five-tricks/4.png"
              alt="banner-1"
              height="25rem"
              width="100%"
              preview={false}
            />
          </div>
          <div
            style={{ color: 'black', marginTop: '2rem', fontWeight: 'bold' }}
          >
            5.Theo dõi tiến trình của bạn
          </div>
          <div>
            Sự phát triển của bất kỳ nghệ sĩ guitar nào cũng có thể được cải
            thiện bởi nhận thức về sự phát triển đó. Khi bạn phát triển kỷ luật
            học hỏi và thực hành hàng ngày, điều quan trọng là phải ghi nhật ký
            hoặc nhật ký về quá trình cải thiện của bạn để tối đa hóa sự phát
            triển hơn nữa. Cách dễ nhất để làm điều này là ghi nhật ký về thói
            quen của bạn. Bạn sẽ thấy rằng việc theo dõi quá trình luyện tập sẽ
            giúp bạn tập trung vào các buổi luyện tập trong tương lai, duy trì
            và tiếp tục nhận thức về sự tiến bộ cũng như xác định các giai đoạn
            luyện tập đặc biệt hiệu quả trong quá khứ của bạn để có thể tái tạo
            và nâng cấp khi bạn cảm thấy sự phát triển của mình bị đình trệ.
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
