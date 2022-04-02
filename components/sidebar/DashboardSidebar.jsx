import {useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import Image from 'next/image';
import { connect, useDispatch } from "react-redux";
import {AiFillAppstore, AiFillSetting, AiFillBell} from 'react-icons/ai';
import {FaCalendar, FaUser, FaMoneyBill, FaListAlt, FaEnvelopeOpenText, FaPowerOff, FaVoteYea} from 'react-icons/fa';
import {MdFormatAlignLeft, MdOutlineBarChart} from 'react-icons/md';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai';
import { Tooltip } from 'antd';
import { logOutSuccess } from "../../store/auth/action";
import { userNotificationSuccess } from "../../functions/notification";

function DashboardSidebar({auth}) {
    const router = useRouter()
    const dispatch = useDispatch()
    // console.log(Router.pathname)
    const [mobileMenu, setMobileMenu] = useState(false)

    let dashboardRoutes;

    if(auth.user_role === "contestant"){
      dashboardRoutes = [
        {
            name: "Dashboard",
            link: '',
            icon: <AiFillAppstore /> 
        },
        {
            name: "Fund Wallet",
            link: '/fund',
            icon: <FaMoneyBill />
        },
        {
            name: "Audition",
            link: '/audition',
            icon: <FaListAlt />
        },
        {
            name: "Stats",
            link: '/stats',
            icon: <MdOutlineBarChart />
        },
        // {
        //     name: "Timeline",
        //     link: '/timeline',
        //     icon: <FaCalendar /> 
        // },
        {
            name: "Announcements",
            link: '/announcements',
            icon: <AiFillBell /> 
        },
        {
            name: "Account",
            link: '/account',
            icon: <FaUser />
        },
        {
            name: "Account Settings",
            link: '/settings',
            icon: <AiFillSetting /> 
        },
    ]

    } else{
      dashboardRoutes = [
        {
            name: "Dashboard",
            link: '',
            icon: <AiFillAppstore /> 
        },
        {
            name: "Fund Wallet",
            link: '/fund',
            icon: <FaMoneyBill />
        },
        {
            name: "Vote",
            link: '/vote',
            icon: <FaVoteYea />
        },
        {
            name: "My Stats",
            link: '/stats',
            icon: <MdOutlineBarChart />
        },
        {
            name: "Account",
            link: '/account',
            icon: <FaUser />
        },
        {
            name: "Account Settings",
            link: '/settings',
            icon: <AiFillSetting /> 
        },
    ]
    }
    
    return (
      <>
        <aside id="sidebar_desktop" className="bg-[#e5e5e5] relative">
          {/* <MdFormatAlignLeft /> */}
          <div className="hidden md:flex flex-col text-4xl gap-8 px-3 py-5 sticky top-0">
            {dashboardRoutes.map((route) => (
              <Tooltip placement="right" title={route.name} key={route.name}>
                <div>
                  <Link href={`/dashboard${route.link}`}>
                    <a
                      className={`hover:text-red-500 ${
                        router.pathname === `/dashboard${route.link}`
                          ? "text-red-500"
                          : "text-gray-600"
                      }`}
                    >
                      {route.icon}
                    </a>
                  </Link>
                </div>
              </Tooltip>
            ))}
            <Tooltip placement="right" title="Log Out">
              <button onClick={()=> {
                userNotificationSuccess("Logging You Out...")
                setTimeout(() => {
                  dispatch(logOutSuccess())
                }, 1000);
                
                // router.push('/')
              }}>
                  <div
                    className={`text-gray-600 hover:text-red-500`}
                  >
                    <FaPowerOff />
                  </div>
              </button>
            </Tooltip>
          </div>

          <div className="flex justify-between md:hidden px-2 py-1">
            <Link href={'/'} passHref>
            <a className="inline-flex items-center">
              <Image
                src="/images/logo.png"
                alt="Bible Star TV Logo"
                height={47}
                width={42}
              />
            </a>
            </Link>
            
            <button
              className="text-2xl"
              onClick={() => {
                setMobileMenu(true);
                console.log("Clicked");
              }}
            >
              <AiOutlineMenu />
            </button>
          </div>
        </aside>

        {mobileMenu && (
          <>
            <div className="md:hidden h-full w-full fixed top-0 left-0 z-[3]">
              <div
                className="md:hidden h-full w-full bg-black opacity-50 z-[4]"
                onClick={() => setMobileMenu(false)}
              ></div>
              <div
                className="md:hidden fixed top-0 left-0 z-[5] bg-white h-full opacity-100 shadow flex flex-col text-lg py-5 px-3"
                style={{ width: "calc(100% - 70px)" }}
              >
                <div className="flex justify-end">
                  <button
                    className="text-lg top-2 rounded-full bg-brand-red text-white p-2"
                    onClick={() => setMobileMenu(false)}
                  >
                    <AiOutlineClose />
                  </button>
                </div>
                <div className="flex flex-col divide-y">
                  {dashboardRoutes.map((route) => (
                    <Link href={`/dashboard${route.link}`} key={route.name}>
                      <a className="inline-flex items-center gap-7 text-lg sm:text-xl py-4 hover:text-brand-red">
                        {route.icon}
                        <span>{route.name}</span>
                      </a>
                    </Link>
                  ))}
                  <button className="inline-flex items-center gap-7 text-lg sm:text-xl py-4 hover:text-brand-red">
                        <FaPowerOff />
                        <span>Log Out</span>
                    </button>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
}
const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(DashboardSidebar);


