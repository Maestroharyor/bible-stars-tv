import Image from "next/image";
import Link from "next/link";
import { AiFillBell, AiFillCaretDown } from "react-icons/ai";
import { Badge } from "antd";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import UserDetails from "../../components/elements/dashboardindex/UserDetails";
import UserActions from "../../components/elements/dashboardindex/UserActions";
import UserProfileCard from "../../components/elements/dashboardindex/UserProfileCard";
import UserGraphDetails from "../../components/elements/dashboardindex/UserGraphDetails";
import UserStatsSummary from "../../components/elements/dashboardindex/UserStatsSummary";
import UserTableDetails from "../../components/elements/dashboardindex/UserTableDetails";
import CalendarDashboard from "../../components/elements/dashboardindex/Calendar";

function DashboardIndex() {
  const breadCrumbData = [
    {
      name: "Dashboard"
    }
  ];
  return (
    <DashboardLayout title={"Dashboard"} breadcrumb={breadCrumbData}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-3 gap-y-8 items-start">
        <div className="lg:col-span-9 px-5">
          <div className="flex flex-col sm:flex-row gap-5 flex-wrap justify-between">
            <div className="">
              <Link href={"/"}>
                <a className="hidden lg:block">
                  <Image
                    src="/images/logo.png"
                    alt="Bible Star TV Logo"
                    height={107}
                    width={102}
                  />
                </a>
              </Link>

              <h2 className="text-4xl">Dashboard</h2>
            </div>
            <div className="flex flex-wrap items-start gap-5">
              <Link href={"/dashboard/announcements"}>
                <a className="cursor-pointer bg-gray-200 rounded px-4 pt-4 pb-3">
                  <Badge dot={true} className="text-2xl text-blue-800">
                    <AiFillBell />
                  </Badge>
                </a>
              </Link>

              {/* <button className='bg-blue-800 px-4 py-3.5 rounded text-lg text-white font-semibold inline-flex items-center'>
                                <p>Today</p>
                                <AiFillCaretDown className="inline-block ml-3" />
                            </button> */}
            </div>
          </div>
          <UserDetails />
          <UserActions />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-10 items-start">
            <UserProfileCard />
            {/* <UserGraphDetails /> */}
            {/* <UserTableDetails /> */}
          </div>
        </div>
        <div className="lg:col-span-3 bg-gray-800 rounded py-4 px-3 sticky top-5">
          <UserStatsSummary />
          <CalendarDashboard />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DashboardIndex;
