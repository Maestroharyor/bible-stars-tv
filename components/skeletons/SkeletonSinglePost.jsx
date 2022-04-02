import React from 'react';
import { Skeleton } from 'antd';

const SkeletonSinglePost = () => {
    return (
        <div className="mx-auto py-5 px-3 flex flex-col justify-center max-w-[1300px] ">
            <Skeleton.Input active={true} size={1000} style={{height: 600}} className="mx-auto" />
            <div className="max-w-[1300px]">
                <Skeleton paragraph={{ rows: 10, title: true }} />
                <Skeleton paragraph={{ rows: 10, title: true }} />
            </div>
        </div>
    );
};

export default SkeletonSinglePost;
