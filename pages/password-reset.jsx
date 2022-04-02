import {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {FaArrowAltCircleRight} from 'react-icons/fa';
import AccountLayout from '../components/layouts/AccountLayout'

function Login() {

    const [email, setEmail] = useState('');

    const handleForm = e => {
        e.preventDefault();
        console.log("Submitted")
    }
    return (
        <AccountLayout title="Register">
            <div className="flex flex-col md:flex-row w-full h-full">
                <div className='bg-brand-chalk w-full md:w-7/12 px-5 lg:px-20 py-20'>
                    <div className='mb-8'>
                        <Link href={'/'}>
                            <a>
                                <Image
                                        src="/images/logo.png"
                                        alt = "Bible Star TV Logo"
                                        className=''
                                        height={107}
                                        width={102}
                                    />
                            </a>
                        </Link>

                        <h1 className='text-3xl font-bold mt-16 mb-0.5'>Reset Your Password</h1>
                    </div>
                    
                    <div className='relative'>
                        <form className='grid grid-cols-1 gap-8 pt-6 pb-7' onSubmit={handleForm}>

                            <div>
                                <div className='rounded flex flex-col border border-gray-800 rounded flex-1 px-3 text-lg'>
                                        <label htmlFor="">Email Address</label>
                                        <input type="email" name="" id="" className='bg-brand-chalk w-full py-1 text-lg text-black font-bold focus:outline-none' placeholder='Johndoe@mail.com' required onChange={e => setEmail(e.target.value)}/>
                                </div>
                            </div>

                            <div>
                                <button className='w-full bg-brand-red hover:bg-red-700 transition duration-300 ease-in-out py-3 px-3 inline-flex justify-center items-center text-white text-lg font-bold gap-4'><span>Reset Password</span> <FaArrowAltCircleRight /></button>
                            </div>
                        </form>

                        <div className='mt-5'>
                            <p className='text-lg'>{"Don't have an account?"} 
                            <Link href={'/register'}><a className='text-brand-red font-bold hover:text-red-700'> Create one here</a></Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className='hidden md:flex bg-brand-red w-full md:w-5/12 items-center'>
                    <div className='transform -translate-x-28'>
                        <Image
                            src="/images/singer.png"
                            alt = "Online Auditions"
                            className=''
                            height={389}
                            width={469}
                        />
                    </div>
                        
                </div>
            </div>
            
        </AccountLayout>
    )
}

export default Login
