import { useState } from "react";
import {Image} from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "universal-cookie";
import { connect, useDispatch } from "react-redux";
import { FaArrowAltCircleRight, FaCircleNotch } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import AccountLayout from "../components/layouts/AccountLayout";
import { loginSuccess } from "../store/auth/action";
import { baseUrl } from "../server/index";
import {
  userNotificationSuccess,
  userNotificationFailure
} from "../functions/notification";

function Login(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    const data = {
      email,
      password
    };
    setLoading(true);
    axios
      .post(`${baseUrl}/auth/login`, data)
      .then((res) => {
        setLoading(false);
        console.log(res)
        const { data } = res;
        dispatch(loginSuccess(data));
        userNotificationSuccess(
          "Login Successful",
          "Redirecting you to dashboard"
        );
        router.push("/dashboard");
      })
      .catch((err) => {
        setLoading(false);
        console.log({err})
        if(err.response){
          setErrors(err.response.data.errors);
        }
        
        // console.log(err.response.data.errors)
        // console.log(errors)
        userNotificationFailure("An error occured while logging you in");
      });
  };
  return (
    <AccountLayout title="Login">
      <div className="flex flex-col md:flex-row w-full h-full">
        <div className="bg-brand-chalk w-full md:w-7/12 px-5 lg:px-20 py-16">
          <div className="mb-8">
            <Link href={"/"}>
              <a>
                <Image
                  src="/images/logo.png"
                  alt="Bible Star TV Logo"
                  className=""
                  height={107}
                  width={102}
                  preview={false}
                />
              </a>
            </Link>

            <h1 className="text-3xl font-bold mt-16 mb-0.5">Welcome Back!</h1>
          </div>

          <div className="relative">
            <form className="grid grid-cols-1 gap-8" onSubmit={handleForm}>
              <div>
                <div className="rounded flex flex-col border border-gray-800 rounded flex-1 px-3 text-lg">
                  <label htmlFor="">Email Address</label>
                  <input
                    type="email"
                    name=""
                    id=""
                    className="bg-brand-chalk w-full py-1 text-lg text-black font-bold focus:outline-none"
                    placeholder="Johndoe@mail.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {errors.email && (
                  <p className="pl-3 mt-1 text-lg text-red-700">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="relative">
                <div className=" rounded flex flex-col border border-gray-800 rounded flex-1 px-3 text-lg">
                  <label htmlFor="">Password</label>
                  <input
                    type={showPass ? "text" : "password"}
                    name=""
                    id=""
                    className="bg-brand-chalk w-full py-1 text-lg text-black font-bold focus:outline-none"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className={`absolute text-gray-800 text-2xl signup z-10  right-8 top-[30px]`}
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
                {errors.password && (
                  <p className="pl-3 mt-1 text-lg text-red-700">
                    {errors.password}
                  </p>
                )}
              </div>

              {!loading ? (
                <button className="w-full bg-brand-red hover:bg-red-700 transition duration-300 ease-in-out py-3 px-3 inline-flex justify-center items-center text-white text-lg font-bold gap-4">
                  <span>Login</span> <FaArrowAltCircleRight />
                </button>
              ) : (
                <div className="w-full bg-brand-red py-3 px-3 inline-flex justify-center items-center text-white text-lg font-bold gap-4 opacity-60 cursor-progress">
                  <span>Logging in..</span>{" "}
                  <FaCircleNotch className="animate-spin" />
                </div>
              )}
            </form>
            {/* <div>
              <Link href={"/password-reset"}>
                <a className="w-full inline-block text-right italic font-semibold hover:text-brand-red mt-2">
                  Forgot Password?
                </a>
              </Link>
            </div> */}

            <div className="mt-5">
              <p className="text-lg">
                {"Don't have an account?"}
                <Link href={"/register"}>
                  <a className="text-brand-red font-bold hover:text-red-700">
                    {" "}
                    Create one here
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="hidden md:flex bg-brand-red w-full md:w-5/12 items-center md:sticky top-0">
          <div className="w-full h-full">
            <Image
              src="/images/bible-stars-chair.jpeg"
              alt="Online Auditions"
              className="w-full h-full"
              preview={false}
              width={"100%"}
              height={"100%"}
            />
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Login);
