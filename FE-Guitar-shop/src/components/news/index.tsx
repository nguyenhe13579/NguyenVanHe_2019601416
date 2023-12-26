import { useRouter } from 'next/router'

import { Card, Image, Space } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'

const News = () => {
  const router = useRouter()
  const news = [
    {
      id: 1,
      image: '/images/news/lunar-rest.png',
      date: '12/12/2023',
      title: 'Thông báo lịch nghỉ tết Nguyên Đán GIÁP THÌN 2024',
      description:
        'Lời đầu tiên, Guitar Sao Việt xin gửi lời chào trân trọng và lời chúc sức khỏe đến Quý khách hàng đã đồng hành cùng chúng tôi trong thời gian qua.',
      url: '/news/lunar-rest'
    },
    {
      id: 2,
      image: '/images/news/aucostic-guitar.jpg',
      date: '03/12/2023',
      title: 'Những cây guitar acoustic phù hợp cho người mới bắt đầu',
      description:
        'Học đàn Guitar là cách tuyệt vời giúp bạn giải trí, tự tin giao lưu và kết nối với bạn bè khắp nơi. Bạn hãy hình dung xem hình ảnh một chàng trai hoặc một cô gái ôm đàn guitar và hát ca trước mọi người thật vui vẻ phải không?',
      url: '/news/guitars-for-beginners'
    },
    {
      id: 3,
      image: '/images/news/guitar-string.jpg',
      date: '08/11/2023',
      title: 'Gợi ý 5 mẹo giúp bạn chơi guitar giỏi hơn',
      description:
        'Những điều chỉnh dễ thực hiện này đối với cách bạn học sẽ giúp bạn mang lại kết quả nhanh hơn và tốt hơn. Vì vậy, hãy lấy cây đàn của bạn và bắt đầu!',
      url: '/news/five-tricks'
    }
  ]

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {news.map(item => (
        <Card
          key={item.id}
          hoverable
          style={{
            marginBottom: '1rem',
            width: '32%',
            display: 'grid',
            alignContent: 'space-between'
          }}
          onClick={() => router.push(item.url)}
        >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Image
              height="10rem"
              width="100%"
              alt="news-image"
              preview={false}
              src={item.image}
            />
          </div>
          <div style={{ overflow: 'hidden', marginTop: '1rem' }}>
            <div
              style={{
                fontSize: '1rem',
                color: '#BF081D',
                fontWeight: 'bold'
              }}
            >
              {item.title}
            </div>
            <Space style={{ color: 'gray' }}>
              <ClockCircleOutlined />
              <span>{item.date}</span>
            </Space>
            <div
              style={{
                lineHeight: '1rem',
                maxHeight: '3.1rem',
                marginTop: '1rem'
              }}
            >
              {item.description}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default News
