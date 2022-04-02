import {Image} from 'antd';
import DefaultLayout from "../components/layouts/DefaultLayout";
import PageBanner from '../components/partials/PageBanner';
import LazyLoad from 'react-lazyload';

function Gallery() {
    const galleryImages = []
    for(let i = 1; i<= 37; i++){
        galleryImages.push({
            src: `images/gallery/${i}.jpeg`,
            alt: `${i} Image`
        })
    }

    return (
        <DefaultLayout title="Gallery">
            <PageBanner name="Gallery" description="Our Gallery" />
            <div className='max-w-[1200px] mx-auto px-5 py-32'>
                <h3 className='text-brand-yellow text-xl lg:text-4xl block font-semibold text-center'>PICTURES FROM THE BIBLE STARS UNVELING CEREMONY</h3>
                <div className='pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16'>
                    <Image.PreviewGroup>
                        {galleryImages.map(image => (
                            <LazyLoad height={200} offset={100} once key={image.src}>
                                <Image  src={image.src} alt={image.alt}  />
                            </LazyLoad>
                            
                        ))} 
                    </Image.PreviewGroup>
                   
                </div>
            </div>
        </DefaultLayout>
    )
}

export default Gallery
