import {useState} from 'react';
import {Image} from 'antd';
import Link from 'next/link';
import {useRouter} from 'next/router';
import DefaultLayout from "../../../components/layouts/DefaultLayout";
import PageBanner from '../../../components/partials/PageBanner';
import {FaHome, FaPlay} from 'react-icons/fa';
import { MdStream} from 'react-icons/md';
import LazyLoad from 'react-lazyload';

export const getServerSideProps = async ({req, res, query}) => {
    return {
        props: {
            query
        }
    }
}

const WatchIndex = (props) => {
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
    for(let i = 1; i<= 9; i++){
        galleryImages.push({
            src: `/images/video_player_placeholder.gif`,
            alt: `${i} Image`
        })
    }
    console.log(router.query.pid)
    return(
        <DefaultLayout title={props.query.pid ? props.query.pid : "Watch"}>
            <div className='grid grid-cols-1 lg:grid-cols-12 py-16 px-5 lg:px-10 divide-y lg:divide-y-0 lg:divide-x'>
                <div className='col-span-2 overflow-x-scroll lg:overflow-x-hidden py-3 lg:py-0'>
                    <div className='flex flex-row lg:flex-col gap-8 lg:sticky top-[100px] '>
                                {
                                sidebarLinks.map(link => (
                                    <Link key={link.name} href={link.link}>
                                    <a className={`inline-flex items-center gap-4 text-lg hover:text-brand-red ${router.pathname === link.link || router.query.pid === link.link.substring(17) ? "text-brand-red": `text-gray-70`}`}>
                                        <span>{link.icon}</span>
                                        <span>{link.name}</span>
                                    </a>
                                    </Link>
                                ))
                            }
                    </div>
                   
                </div>
                <div className='col-span-10'>
                    <h1 className='text-xl text-center font-bold lg:text-3xl text-brand-yellow mt-14 lg:mt-0 mb-14'>{props.query.pid.toUpperCase()} VIDEOS</h1>
                    <div className='lg:pl-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16'>
                        <Image.PreviewGroup>
                            {galleryImages.map(image => (
                                <LazyLoad height={200} offset={100} once key={image.alt}>
                                    <Image  src={image.src} alt={image.alt}  />
                                </LazyLoad>
                                
                            ))} 
                        </Image.PreviewGroup>
                    
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default WatchIndex;