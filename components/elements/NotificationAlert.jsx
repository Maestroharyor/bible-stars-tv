import { Alert } from 'antd';
import Marquee from 'react-fast-marquee';

function NotificationAlert() {
  return (
    <Alert
      banner
      closable
      type="info"
      message={
        <Marquee pauseOnHover gradient={false} speed={40}>
            <p className="text-md">Batch A audition has ended...</p>
          
        </Marquee>
      }
    />
  )
}

export default NotificationAlert