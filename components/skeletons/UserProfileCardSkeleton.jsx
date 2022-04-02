import React from 'react'
import {Skeleton} from 'antd'

function UserProfileCardSkeleton() {
  return (
    <div className="bg-blue-700 shadow rounded px-2 pt-4 py-8 text-white text-lg flex flex-col items-center justify-center sticky top-5">
        <Skeleton.Avatar active size="large" shape={'circle'}  />
        <Skeleton />
    </div>
  )
}

export default UserProfileCardSkeleton