import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "universal-cookie";
import { connect, useDispatch } from "react-redux";
import { FaArrowAltCircleRight, FaCircleNotch } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Select, notification, Checkbox } from "antd";
import { loginSuccess } from "../store/auth/action";
import AccountLayout from "../components/layouts/AccountLayout";
import { baseUrl } from "../server/index";
import {
  userNotificationSuccess,
  userNotificationFailure
} from "../functions/notification";

const { Option } = Select;

function Register({ auth }) {
  // console.log(auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmPassword: ""
  });
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [accountType, setAccountType] = useState("");
  const [batch, setBatch] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formChecked, setFormChecked] = useState(true);

  const handleForm = e => {
    e.preventDefault();
    console.log("Submitted");

    setErrors({
      email: "",
      username: "",
      firstname: "",
      gender: "",
      lastname: "",
      password: "",
      confirmPassword: ""
    });

    const data = {
      firstname,
      lastname,
      username,
      gender,
      email,
      user_role: accountType,
      batch,
      password
    };

    // console.log(data)

    if (password === confirmPassword && formChecked) {
      setLoading(true);
      axios
        .post(`${baseUrl}/auth/signup`, data)
        .then(res => {
          setLoading(false);
          console.log(res);
          const { data } = res;
          dispatch(loginSuccess(data));
          userNotificationSuccess(
            "Account Created",
            "Redirecting you to dashboard"
          );
          router.push("/dashboard");
        })
        .catch(err => {
          setLoading(false);
          // console.log({err})
          if (err.response) {
            setErrors(err.response.data.errors);
          }
          // console.log(err.response.data.errors)
          // console.log(errors)
          userNotificationFailure(
            "An error occured while creating your account"
          );
        });
    } else {
      if (password !== confirmPassword) {
        setErrors({
          password: "Password and Confirm Password are not the same",
          confirmPassword: "Password and Confirm Password are not the same"
        });
      }

      if (!formChecked) {
        userNotificationFailure(
          "Please accept the terms and conditions before registering"
        );
      }
    }
  };
  return (
    <AccountLayout title="Register">
      <div className="flex flex-col md:flex-row w-full h-full items-start">
        <div className="bg-brand-chalk w-full md:w-7/12 px-5 lg:px-20 py-16">
          <div className="text-center mb-8">
            <Link href={"/"}>
              <a>
                <Image
                  src="/images/logo.png"
                  alt="Bible Star TV Logo"
                  className=""
                  height={107}
                  width={102}
                />
              </a>
            </Link>
            <h1 className="text-3xl font-bold mb-0.5">Create Account</h1>
            <p className="text-lg">Sign Up by filling your details below</p>
          </div>

          <div className="relative">
            <form className="grid grid-cols-1 gap-8" onSubmit={handleForm}>
              <div className="flex flex-col lg:flex-row gap-6 text-lg">
                <div className="rounded flex flex-col border border-gray-800 rounded flex-1 px-3">
                  <label htmlFor="">Firstname</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="bg-brand-chalk w-full py-1 text-lg text-black font-bold focus:outline-none"
                    placeholder="John"
                    required
                    onChange={e => setFirstname(e.target.value)}
                  />
                </div>
                <div className="rounded flex flex-col border border-gray-800 rounded flex-1 px-3">
                  <label htmlFor="">Lastname</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="bg-brand-chalk w-full py-1 text-lg text-black font-bold focus:outline-none"
                    placeholder="Doe"
                    required
                    onChange={e => setLastname(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="rounded flex flex-col border border-gray-800 rounded flex-1 px-3 text-lg">
                  <label htmlFor="">Username</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="bg-brand-chalk w-full py-1 text-lg text-black font-bold focus:outline-none"
                    onChange={e => setUsername(e.target.value)}
                  />
                </div>
                {errors.username &&
                  <p className="pl-3 mt-1 text-lg text-red-700">
                    {errors.username}
                  </p>}
              </div>
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
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                {errors.email &&
                  <p className="pl-3 mt-1 text-lg text-red-700">
                    {errors.email}
                  </p>}
              </div>

              <div>
                <div
                  className="flex flex-col flex-1 gap-2 text-lg"
                  id="account_type"
                >
                  <label htmlFor="">Gender</label>
                  <Select
                    placeholder="Select Gender"
                    size="large"
                    // style={{ width: 120 }}
                    onChange={value => {
                      setGender(value);
                    }}
                  >
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                  </Select>
                </div>
                {errors.gender &&
                  <p className="pl-3 mt-1 text-lg text-red-700">
                    {errors.gender}
                  </p>}
              </div>

              <div>
                <div
                  className="flex flex-col flex-1 gap-2 text-lg"
                  id="account_type"
                >
                  <label htmlFor="">Account Type</label>
                  <Select
                    placeholder="Select Account Type"
                    size="large"
                    // style={{ width: 120 }}
                    onChange={value => {
                      setAccountType(value);
                    }}
                  >
                    <Option value="contestant">Contestant</Option>
                    <Option value="subscriber">Subscriber</Option>
                  </Select>
                </div>
              </div>

              {accountType == "contestant" &&
                <div>
                  <div
                    className="flex flex-col flex-1 gap-2 text-lg"
                    id="account_batch"
                  >
                    <label htmlFor="">Batch</label>
                    <Select
                      placeholder="Select Batch"
                      size="large"
                      // style={{ width: 120 }}
                      onChange={value => {
                        setBatch(value);
                      }}
                    >
                      <Option value="a" disabled>
                        Batch A
                      </Option>
                      <Option value="b">Batch B</Option>
                      <Option value="c">Batch C</Option>
                      <Option value="d">Batch D</Option>
                    </Select>
                  </div>
                </div>}

              <div className="relative">
                <div className=" rounded flex flex-col border border-gray-800 rounded flex-1 px-3 text-lg">
                  <label htmlFor="">Password</label>
                  <input
                    type={showPass ? "text" : "password"}
                    name=""
                    id=""
                    className="bg-brand-chalk w-full py-1 text-lg text-black font-bold focus:outline-none"
                    required
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className={`absolute text-gray-800 text-2xl signup z-10  right-8 top-[30px]`}
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
                {errors.password &&
                  <p className="pl-3 mt-1 text-lg text-red-700">
                    {errors.password}
                  </p>}
              </div>

              <div className="relative">
                <div className="rounded flex flex-col border border-gray-800 rounded flex-1 px-3 text-lg">
                  <label htmlFor="">Confirm Password</label>
                  <input
                    type={showConfirmPass ? "text" : "password"}
                    name=""
                    id=""
                    className="bg-brand-chalk w-full py-1 text-lg text-black font-bold focus:outline-none"
                    required
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className={`absolute text-gray-800 text-2xl signup z-10  right-8 top-[30px]`}
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                >
                  {showConfirmPass ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
                {errors.confirmPassword &&
                  <p className="pl-3 mt-1 text-lg text-red-700">
                    {errors.confirmPassword}
                  </p>}
              </div>
              <div>
                <Checkbox
                  checked={formChecked}
                  onChange={() => {
                    setFormChecked(!formChecked);
                  }}
                >
                  <p className="text-xl">
                    I hereby agree to the{" "}
                    <Link href={"/terms-and-conditions"} passHref>
                      <a className="text-gray-800 underline hover:text-brand-red hover:underline">
                        Terms and Conditions
                      </a>
                    </Link>{" "}
                  </p>
                </Checkbox>
              </div>

              <div>
                {!loading
                  ? <button className="w-full bg-brand-red hover:bg-red-700 transition duration-300 ease-in-out py-3 px-3 inline-flex justify-center items-center text-white text-lg font-bold gap-4">
                      <span>Sign Up</span> <FaArrowAltCircleRight />
                    </button>
                  : <div className="w-full bg-brand-red py-3 px-3 inline-flex justify-center items-center text-white text-lg font-bold gap-4 opacity-60 cursor-progress">
                      <span>Signing up..</span>{" "}
                      <FaCircleNotch className="animate-spin" />
                    </div>}
              </div>
            </form>

            <div className="mt-5">
              <p className="text-lg">
                Already have an account ? <br />
                <Link href={"/login"}>
                  <a className="text-brand-red font-bold hover:text-red-700">
                    Login Here
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="hidden md:flex bg-brand-red w-full md:w-5/12 items-center md:sticky top-0">
          <div className="h-full">
            <Image
              src="/images/bible-stars-chair.jpeg"
              alt="Online Auditions"
              className="h-full"
              height={699}
              width={569}
            />
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Register);
