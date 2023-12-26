import { ReactElement } from 'react'
import { useRouter } from 'next/router'

import { NextPageWithLayout } from '@/types/next-page'

import User from '@/components/layouts/user'
import { FolderOpenOutlined, FundOutlined, GiftOutlined, MenuUnfoldOutlined, PhoneOutlined } from '@ant-design/icons'
import { Card } from 'antd'

const Page: NextPageWithLayout = () => {
  const router = useRouter()

  return (
    <div
      style={{
        margin: '10px 20px',
        background: '#fff',
        padding: '10px 10px',
        borderRadius: '6px'
      }}
    >
      <div
        style={{
          color: '#1677FF',
          margin: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          paddingBottom: '1rem',
          borderBottomColor: '#F5F5F5',
          borderBottomStyle: 'solid',
          borderBottomWidth: '1px',
          fontSize: '0.9rem',
          fontFamily: 'sans-serif'
        }}
      >
        <MenuUnfoldOutlined />
        <div>Dashboard</div>
      </div>
      {/* Row 1 */}
      <div style={{ margin: '1rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginLeft: '2rem',
            marginRight: '2rem'
          }}
        >
          <span style={{ width: '48%' }}>
            <Card
              hoverable
              style={{
                textAlign: 'center',
                background: '#DD9BB1',
                color: 'white'
              }}
              onClick={() => router.push('/users/category')}
            >
              <div>
                <FolderOpenOutlined style={{ fontSize: '3rem' }} />
                <div style={{ fontSize: '1.2rem' }}>Danh mục</div>
              </div>
            </Card>
          </span>
          <span style={{ width: '48%' }}>
            <Card
              hoverable
              style={{
                textAlign: 'center',
                background: '#F7ED00',
                color: 'white'
              }}
              onClick={() => router.push('/users/product')}
            >
              <div>
              <GiftOutlined style={{ fontSize: '3rem' }} />
                <div style={{ fontSize: '1.2rem' }}>Sản phẩm</div>
              </div>
            </Card>
          </span>
        </div>
      </div>
      {/* Row 2 */}
      <div style={{ margin: '1rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginLeft: '2rem',
            marginRight: '2rem'
          }}
        >
          <span style={{ width: '48%' }}>
            <Card
              hoverable
              style={{
                textAlign: 'center',
                background: '#F7B300',
                color: 'white'
              }}
              onClick={() => router.push('/users/order')}
            >
              <div>
              <PhoneOutlined style={{ fontSize: '3rem' }} />
                <div style={{ fontSize: '1.2rem' }}>Đơn hàng</div>
              </div>
            </Card>
          </span>
          <span style={{ width: '48%' }}>
            <Card
              hoverable
              style={{
                textAlign: 'center',
                background: '#74B7FF',
                color: 'white'
              }}
              onClick={() => router.push('/users/discount')}
            >
              <div>
              <FundOutlined style={{ fontSize: '3rem' }} />
                <div style={{ fontSize: '1.2rem' }}>Mã giảm giá</div>
              </div>
            </Card>
          </span>
        </div>
      </div>
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <User>{page}</User>
}

export default Page
