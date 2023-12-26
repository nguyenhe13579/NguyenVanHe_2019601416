import {
  FacebookOutlined,
  GooglePlusOutlined,
  TwitterOutlined
} from '@ant-design/icons'
import { Button } from 'antd'

const Share = () => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '0.5rem',
        color: 'black',
        padding: '1rem',
        marginTop: '1rem',
        justifyContent: 'end',
        borderTop: '1px solid #ebebeb'
      }}
    >
      <span>Chia sẻ: </span>
      <Button size="small" type="text" style={{color: '#00264D'}}>
        <FacebookOutlined />
      </Button>
      <Button size="small" type="text" style={{color: '#0080FF'}}>
        <TwitterOutlined />
      </Button>
      <Button size="small" type="text" style={{color: '#CA2E31'}}>
        <GooglePlusOutlined />
      </Button>
    </div>
  )
}

export default Share
