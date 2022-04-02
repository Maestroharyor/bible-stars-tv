import Link from 'next/link';
function PageBanner({name, description, childPage, parentPage}) {
    return (
        <div className="py-[100px] bg-cover bg-no-repeat bg-fixed flex flex-col items-center justify-center gap-6" style={{background: "linear-gradient(0deg, rgba(185, 28, 28, 0.8), rgba(252, 195, 66, 0.8)), url(/images/header.jpg)", 	backgroundAttachment: "fixed", backgroundSize: "cover"}}>
            <h1 className="text-xl lg:text-5xl text-center text-white font-bold">{description ? description : name}</h1>
            <div className='bg-black px-8 py-2 text-white text-lg font-semibold'>
                {!childPage ? <p><Link href={"/"}><a className='text-brand-yellow hover:text-brand-red'>Home</a></Link> / <span className="">{name}</span></p>
                :
                <p><Link href={"/"}><a className='text-brand-yellow hover:text-brand-red'>Home</a></Link> / {parentPage.link ? <Link href={"/"}><a className='text-brand-yellow hover:text-brand-red'>{parentPage.name}</a></Link> : <span className="">{parentPage.name}</span> }  / <span className="">{name}</span></p>}
            </div>
        </div>
    )
}

export default PageBanner
