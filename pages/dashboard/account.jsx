
import Link from 'next/link';
import { connect, useDispatch } from "react-redux";
import {Avatar} from 'antd';
import {FaPencilAlt, FaChartBar, FaMoneyBill, FaLongArrowAltRight} from 'react-icons/fa';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import {Capitalize} from '../../functions/utilities'

function DashboardAccount({auth}) {
  console.log(auth)
    const breadCrumbData = [
        {
            name: "Dashboard",
            link: "/dashboard"
        },
        {
            name: "Account"
        },
        
    ]
    return (
      <DashboardLayout title={"My Account"} breadcrumb={breadCrumbData}>
        <div className="pt-5 pb-16">
          {/* Header background Section */}
          <div
            className="py-[150px] rounded bg-cover bg-no-repeat bg-fixed flex flex-col items-center justify-center gap-6"
            style={{
              background:
                "linear-gradient(0deg, rgba(73, 163, 241, 0.6), rgba(26, 115, 232, 0.6)), url(/images/header.jpg)",
              backgroundAttachment: "fixed",
            }}
          ></div>

          <div className="bg-white rounded shadow -mt-24 lg:mx-10 mx-auto py-10 px-5">
            {/* Profile Avatar Section */}
            <div className="flex flex-col md:flex-row gap-8 justify-between md:items-center">
              <div className="flex items-center gap-6">
                <Avatar size={150} className="me-2">
                {auth.firstname.toUpperCase()}
                </Avatar>
                <div>
                  <p className="font-bold text-3xl">{`${Capitalize(auth.firstname)} ${Capitalize(auth.lastname)}`}</p>
                  <p className="text-lg">Email: {auth.email}</p>
                </div>
              </div>

              <div>
                <Link href="/dashboard/settings">
                  <a className="inline-flex gap-4 items-center bg-brand-red px-7 py-3 rounded transition duration-300 ease-in-out text-white hover:text-white hover:bg-red-700">
                    <span>Edit Profile</span> <FaPencilAlt />
                  </a>
                </Link>
              </div>
            </div>

            {/* Account Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x py-10 text-lg">
              <div className="py-8 px-4 md:px-8">
                <h3 className="text-2xl font-bold">Account Information</h3>
                <div className="flex flex-col gap-4 pt-8">
                  <div>
                    <span className="text-xl font-semibold mb-2">User Role: </span>
                    <span> {Capitalize(auth.user_role)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Bio:</h4>
                    <p>{auth.bio}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-bold">Full name: </span>
                      <span>{`${Capitalize(auth.firstname)} ${Capitalize(auth.lastname)}`}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-bold">Phone Number: </span>
                      <span>{auth.phone_number ? auth.phone_number : ""}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-bold">Email Adddress: </span>
                      <span> {auth.email}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-bold">Location: </span>
                      <span> {auth.location}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-8 px-4 md:px-8 sticky top-5">
                <h3 className="text-2xl font-bold">Account Stats</h3>
                <div className="flex flex-col gap-4 py-5">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-blue-900 text-white rounded px-4 py-8">
                      <p className="inline-flex items-center gap-3 text-gray-100 ">
                        <FaChartBar />
                        <span>Total Points</span>
                      </p>
                      <p className="text-4xl font-bold">{auth.my_stats.total_points}</p>
                    </div>

                    <div className="bg-green-600 text-white rounded px-4 py-8">
                      <p className="inline-flex items-center gap-3 text-gray-100 ">
                        <FaMoneyBill />
                        <span>Wallet Balance</span>
                      </p>
                      <p className="text-4xl font-bold">₦{new Intl.NumberFormat().format(auth.my_stats.wallet_balance)}</p>
                    </div>

                    {/* <div className="bg-white text-gray-800 rounded px-4 py-8 shadow">
                      <p className="inline-flex items-center gap-3 text-gray-500 ">
                        <FaChartBar />
                        <span>Stats 3</span>
                      </p>
                      <p className="text-4xl font-bold">100</p>
                    </div>

                    <div className="bg-gray-100 text-gray-800 rounded px-4 py-8 shadow">
                      <p className="inline-flex items-center gap-3 text-gray-500 ">
                        <FaChartBar />
                        <span>Stats 4</span>
                      </p>
                      <p className="text-4xl font-bold">300</p>
                    </div> */}
                  </div>

                  <Link href="/dashboard/stats">
                  <a className="inline-flex gap-4 items-center justify-center bg-gray-700  px-7 py-3 rounded transition duration-300 ease-in-out text-white hover:text-white hover:bg-gray-800 mt-3">
                    <span className='bg-gray-300 text-gray-700 text-sm rounded-full p-3'><FaChartBar /></span><span>See More</span> <FaLongArrowAltRight />
                  </a>
                </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
}


const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(DashboardAccount);
