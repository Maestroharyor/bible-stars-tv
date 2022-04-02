import React from 'react';
import {Image} from 'antd';
import { Swiper, SwiperSlide } from "swiper/react";
import {FaTv, FaCheckSquare} from 'react-icons/fa'
import "swiper/css";
import "swiper/css/navigation";

// import Swiper core and required modules
import SwiperCore, {
  Navigation,
  Autoplay
} from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);
function HomeSlider() {

    const sliderImages = []
    for (let i = 1; i <=7; i++){
        sliderImages.push(
                <Image src={`/images/banners/${i}.jpg`} preview={false} />
        )
    }


    return (
        <div className="-mb-[5px]">
        <Swiper
            slidesPerView={1}
            loop={true}
            navigation={true} 
            spaceBetween={0}
            autoplay={{"delay": 3000,"disableOnInteraction": false}}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            >
            {/* <SwiperSlide className='relative'>
                <Image src='/images/banner1.png' preview={false} />
                <div className='flex justify-center gap-8 -mt-2 fixed bottom-20 w-full'>
                    <button className='flex justify-between px-4 py-2 rounded bg-brand-red text-white text-lg items-center gap-4'>
                        <span>Livestream</span>
                        <FaTv />
                    </button>
                    <button className='flex justify-between px-4 py-2 rounded bg-black text-white text-lg items-center gap-4'>
                        <span>Vote</span>
                        <FaCheckSquare />
                    </button>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <Image src='/images/banner1.png' preview={false} />
            </SwiperSlide> */}
            {sliderImages.map((sliderImage, index) => (
                <SwiperSlide key={index}>
                    {sliderImage}
                </SwiperSlide>
            ))}
        </Swiper>
            
        </div>
    )
}

export default HomeSlider
