import Image from 'next/image';
import Link from 'next/link';
import DefaultLayout from "../components/layouts/DefaultLayout";
import PageBanner from '../components/partials/PageBanner';


function Contact() {
    const contactInfos = [
        {
            snippet: "Available 24/7",
            email: "care@biblestarstvshow.com",
            phone: "07048811294"
        },
        {
            snippet: "For Sponsorship",
            email: "sp@biblestarstvshow.com",
            phone: "09060672683"
        },
        {
            snippet: "Golden Fingers Club",
            email: "gfc@biblestarstvshow.com",
            phone: "09083455053"
        },
    ]
    return (
      <DefaultLayout title="Contact Us">
        <PageBanner name="Contact" description="Contact Us" />

        <div className="py-20 max-w-[1200px] mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {contactInfos.map((info) => (
              <div className="px-[50px] py-[40px] border" key={info.snippet}>
                <p className="mb-3 text-lg">{info.snippet}</p>
                <a
                  className="text-brand-yellow text-xl lg:text-2xl block font-semibold mb-1 hover:text-brand-red truncate"
                  href={`mailto:${info.email}`}
                >
                  {info.email}
                </a>
                <a
                  className="text-brand-yellow text-xl lg:text-2xl block font-semibold hover:text-brand-red truncate"
                  href={`tel:${info.phone}`}
                >
                  {info.phone}
                </a>
              </div>
            ))}
          </div>

          <div className="pt-24 grid grid-cols-1 lg:grid-cols-12 justify-between gap-10">
            <div className='lg:col-span-4 text-center lg:text-left'>
              <p className="text-6xl mb-4">⭐</p>
              <p className="text-3xl text-gray-500 mb-4">Contact Us</p>
              <p className="font-bold text-brand-yellow text-5xl">
                We Love to Hear From You
              </p>
            </div>
            <div className='lg:col-span-8'>
              <form className="flex flex-col gap-8">
                <div>
                  <input type="text" placeholder="First Name" className='bg-brand-gray px-10 py-4 text-lg w-full focus:outline-none' />
                </div>

                <div className='flex flex-col lg:flex-row gap-10'>
                  <div className='w-full'>
                    <input type="email" placeholder="Email Address" className='bg-brand-gray px-10 py-4 text-lg w-full focus:outline-none' />
                  </div>
                  <div className='w-full'>
                    <input type="text" placeholder="Phone Number" className='bg-brand-gray px-10 py-4 text-lg w-full focus:outline-none' />
                  </div>
                </div>

                <div>
                  <textarea name="" id="" cols="30" rows="10" className='bg-brand-gray px-10 py-4 text-lg w-full focus:outline-none' placeholder='Write Message'></textarea>
                </div>

                <div className='flex justify-end'>
                    <input type="submit" value="Send Message" className='bg-brand-yellow text-white hover:bg-brand-red transition duration-300 ease-in-out px-14 py-4 text-lg cursor-pointer font-bold'  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </DefaultLayout>
    );
}

export default Contact
