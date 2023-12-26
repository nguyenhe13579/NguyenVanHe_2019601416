import { notification } from 'antd'

export const notificationError = (errMsg: string) => {
  return notification.warning({
    message: errMsg,
    duration: 2
  })
}

export const notificationSuccess = (successMsg: string) => {
  return notification.success({
    message: successMsg,
    duration: 2
  })
}
