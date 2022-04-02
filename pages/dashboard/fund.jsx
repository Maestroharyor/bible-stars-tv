import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import { Avatar, notification } from "antd";
import { FaPencilAlt, FaCircleNotch } from "react-icons/fa";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { Capitalize } from "../../functions/utilities";
import { usePaystackPayment } from "react-paystack";
import { baseUrl } from "../../server/index";
import { loginSuccess } from "../../store/auth/action";
import {
  userNotificationSuccess,
  userNotificationFailure
} from "../../functions/notification";

function DashboardFund({ auth }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const breadCrumbData = [
    {
      name: "Dashboard",
      link: "/dashboard"
    },
    {
      name: "Fund"
    }
  ];
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);

  const config = {
    reference: new Date().getTime().toString(),
    email: auth.email,
    amount: amount * 100,
    publicKey: "pk_live_cdb7650cdeb9fbc1f2a0626713cbbbcb6d67b3f5"
  };

  // you can call this function anything
  const onSuccess = async (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    const data = {
      details: "Added for Audition",
      amount: Number(amount),
      type: "addition",
      category: auth.user_role === "contestant" ? "audition" : "voting"
    };
    setUpdateLoading(true);
    axios
      .post(`${baseUrl}/stats/funds`, data, {
        headers: { Authorization: `Bearer ${auth.token}` }
      })
      .then((res) => {
        // console.log(res.data);
        return axios.get(`${baseUrl}/users/${auth.id}`);
      })
      .then((res2) => {
        // console.log(res2.data)

        userNotificationSuccess(`₦${amount} added to your account`);
        // let my_stats;
        // if(auth.user_role === "contestant"){
        //   my_stats = res2.data.my_stats
        // }
        dispatch(
          loginSuccess({ ...res2.data, token: auth.token, id: auth.id })
        );
        setTimeout(() => {
          router.push("/dashboard");
          setUpdateLoading(false);
        }, 1000);
      })
      .catch((err) => {
        // console.log(err);
        setUpdateLoading(false);
      });
    // console.log(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    // console.log("closed");
  };

  const initializePayment = usePaystackPayment(config);
  return (
    <>
      {updateLoading && (
        <div className="bg-black fixed z-[1000] w-full h-full flex flex-col gap-4 items-center justify-center text-6xl text-brand-red opacity-95 lg:mr-10">
          <FaCircleNotch className="animate-spin" />
          <p className="text-2xl text-white">Adding Funds to your account...</p>
        </div>
      )}
      <DashboardLayout title={"Fund Account"} breadcrumb={breadCrumbData}>
        <div className="flex items-center justify-center h-full w-full mt-4 md:pt-10 md:pb-16">
          <div
            className={`rounded shadow-lg max-w-[1000px] w-full lg:h-[630px] items-stretch flex flex-col md:flex-row`}
          >
            <div className="h-full w-full md:w-1/2 rounded-l bg-brand-gray flex flex-col p-10 gap-4">
              <h2 className="text-6xl font-bold">Fund Your Wallet</h2>
              {/* <p className="text-lg leading-loose">
                Lorem pariatur esse amet proident ea culpa nulla nulla fugiat
                enim eiusmod. Officia laboris officia velit reprehenderit et
                laborum in proident aliquip sit sit. Nostrud voluptate enim
                occaecat occaecat anim reprehenderit est esse. Duis consequat
                nostrud culpa nulla incididunt nisi tempor eiusmod et laboris
                enim laboris tempor aliqua.
              </p> */}
            </div>
            <div className="h-full w-full md:w-1/2 rounded-r bg-brand-red flex flex-col gap-5 item-center justify-center py-8">
              <div className="flex flex-col gap-1 items-center justify-center text-lg text-white">
                <div className="relative">
                  <Avatar size={150} className="me-2">
                    USER
                  </Avatar>
                  <Link href={"/dashboard/account"} passHref>
                    <a className="absolute bottom-0 -left-1 hover:text-gray-300">
                      <FaPencilAlt />
                    </a>
                  </Link>
                </div>
                <p className="text-center font-bold">{`${Capitalize(
                  auth.firstname
                )} ${Capitalize(auth.lastname)}`}</p>
                <p>Email: {auth.email}</p>
                {auth.gender && <p>Gender: {Capitalize(auth.gender)}</p>}
              </div>
              <div className="w-full flex flex-col gap-10 justify-center w-[fit-content] mx-auto">
                <div className="inline-flex flex-col gap-4">
                  {amount > 1 && (
                    <div className="text-lg text-white text-center">
                      <p className="font-bold">Amount to Fund:</p>
                      <p>₦{new Intl.NumberFormat().format(amount)}</p>
                    </div>
                  )}
                  {error && (
                    <div className="bg-white text-red-500 text-lg py-1 px-4 text-center">
                      <span>Error: </span> {error}
                    </div>
                  )}
                  <input
                    type="number"
                    name=""
                    id=""
                    className="px-4 py-5 bg-brand-gray text-lg"
                    placeholder={auth.user_role === "contestant" ? "₦250": "₦100"}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <button
                  className="animate-bounce bg-brand-gray text-center bg-brand-gray text-xl hover:bg-gray-200 px-16 py-3 font-bold transition duration-300 ease-in-out"
                  onClick={() => {
                    setError("");
                    if(auth.user_role === "contestant"){
                      if (amount < 250) {
                        setError("Amount Lower than ₦250");
                        userNotificationFailure("Amount Error", "Amount Lower than ₦250");
                      } else {
                        initializePayment(onSuccess, onClose);
                      }
                    } else{
                      if (amount < 100) {
                        setError("Amount Lower than ₦100");
                        userNotificationFailure("Amount Error", "Amount Lower than ₦100");
                      } else {
                        initializePayment(onSuccess, onClose);
                      }

                    }
                    
                  }}
                >
                  Fund Wallet
                </button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(DashboardFund);
