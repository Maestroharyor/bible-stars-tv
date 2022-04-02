import Link from 'next/link'
import {connect, useDispatch} from 'react-redux';

function Mainfooter({auth}) {

    const links = [
        {
            name: 'About',
            link: '/about'
        },
        {
            name: 'Contact',
            link: '/contact'
        },
        {
            name: 'Blog',
            link: '/blog'
        },
        {
            name: 'Login',
            link: '/login'
        },
        {
            name: 'Register',
            link: '/register'
        },
        {
            name: 'Watch',
            link: '/watch'
        },
    ]
    const loggedInLinks = [
        {
            name: 'About',
            link: '/about'
        },
        {
            name: 'Contact',
            link: '/contact'
        },
        {
            name: 'Blog',
            link: '/blog'
        },
        {
            name: 'Dashboard',
            link: '/dashboard'
        },
        {
            name: 'Watch',
            link: '/watch'
        },
    ]
    return (
        <footer className="px-8 py-9 bg-gray-200">
            <div className="flex flex-wrap justify-center mb-4">
                {auth.isLoggedIn && 
                <>
                {
                    loggedInLinks.map(link => (
                        <Link href={link.link} key={link.link}>
                            <a className="inline-block text-lg mx-2 text-gray-700 hover:text-brand-red">{link.name}</a>
                        </Link>
                    ))
                }
                </>}

                {!auth.isLoggedIn && 
                <>
                {
                    links.map(link => (
                        <Link href={link.link} key={link.link}>
                            <a className="inline-block text-lg mx-2 text-gray-700 hover:text-brand-red">{link.name}</a>
                        </Link>
                    ))
                }
                </>}
            </div>
            <p className="text-center text-sm text-gray-500">&copy; {new Date().getFullYear()} - {process.env.title} </p>
        </footer>
    )
}


const mapStateToProps = (state) => {
    return state;
  };
  
  export default connect(mapStateToProps)(Mainfooter);