import {useState} from 'react';
import {Image} from 'antd';
import Link from 'next/link';
import {useRouter} from 'next/router';
import DefaultLayout from "../../components/layouts/DefaultLayout";
import PageBanner from '../../components/partials/PageBanner';
import {FaHome, FaPlay} from 'react-icons/fa';
import { MdStream} from 'react-icons/md';
import LazyLoad from 'react-lazyload';


const WatchLive = (props) => {
    const router = useRouter()
    const sidebarLinks = [
        {
            name: "Home",
            icon: <FaHome />,
            color: 'brand-red',
            link: "/watch"
        },
        {
            name: "Playlist 1",
            icon: <FaPlay />,
            link: "/watch/playlists/playlist-1"
        },
        {
            name: "Playlist 2",
            icon: <FaPlay />,
            link: "/watch/playlists/playlist-2"
        },
        {
            name: "Playlist 3",
            icon: <FaPlay />,
            link: "/watch/playlists/playlist-3"
        },
        {
            name: "Playlist 4",
            icon: <FaPlay />,
            link: "/watch/playlists/playlist-4"
        },
        {
            name: "Playlist 5",
            icon: <FaPlay />,
            link: "/watch/playlists/playlist-5"
        },
        {
            name: "Live",
            icon: <MdStream />,
            link: "/watch/live"
        },
    ]

    const galleryImages = []
    for(let i = 1; i<=5; i++){
        galleryImages.push({
            src: `/images/video_player_placeholder.gif`,
            alt: `${i} Image`
        })
    }
    return(
        <DefaultLayout title={"Watch Live"}>
            <div className='grid grid-cols-1 lg:grid-cols-12 py-16 px-5 lg:px-10 gap-8'>
              <div className='lg:col-span-9'>
                  <div className='text-lg text-gray-500 my-3'>
                      <Link href={"/"}><a className='text-brand-yellow hover:text-brand-red'>Home  </a></Link>  / 
                      <Link href={"/watch"}><a className='text-brand-yellow hover:text-brand-red'>  Watch  </a></Link> / 
                      <span className='text-black'>   Live</span>
                  </div>
                  <div className='sticky top-[100px]'>
                     <Image src="/images/video_player_placeholder.gif" alt='Live' /> 
                     <h1 className='text-3xl mt-7 text-brand-yellow font-bold'>Video Title</h1>
                     <p className='mt-4 text-lg'>Do ex sint culpa sit voluptate et consequat. Quis deserunt consequat sunt labore esse ex officia nostrud do in tempor sint anim quis. Lorem irure sint esse ullamco id ipsum eu voluptate dolor sint ad.</p>
                  </div>
              </div>

              <div className='lg:col-span-3 flex flex-col gap-8'>
                  <h3 className='text-brand-yellow text-3xl py-3 px-2 font-bold'>Related Videos</h3>
                    <Image.PreviewGroup>
                            {galleryImages.map(image => (
                                <LazyLoad height={200} offset={100} once key={image.alt}>
                                    <Image  src={image.src} alt={image.alt}  />
                                </LazyLoad>
                                
                            ))} 
                    </Image.PreviewGroup>
              </div>
            </div>
        </DefaultLayout>
    )
}

export default WatchLive;