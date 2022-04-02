import Link from 'next/link';
import { Alert } from 'antd';
import Marquee from 'react-fast-marquee';

function PictureUploadNotification() {
  return (
    <Alert
      banner
      closable
      type="info"
      message={
        <Marquee pauseOnHover gradient={false} speed={60}>
            <p className="text-md">Please <Link href="/dashboard/settings"><a>Upload your Profile Picture</a></Link></p>
          
        </Marquee>
      }
    />
  )
}

export default PictureUploadNotification