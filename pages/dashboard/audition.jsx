import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import { Progress, Select } from "antd";
import { FaCircleNotch, FaArrowRight, FaCheck } from "react-icons/fa";
import { Capitalize } from "../../functions/utilities";
import { usePaystackPayment } from "react-paystack";
import { baseUrl } from "../../server/index";
import { loginSuccess } from "../../store/auth/action";
import {
  userNotificationSuccess,
  userNotificationFailure
} from "../../functions/notification";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ContestantAuthLayout from "../../components/layouts/ContestantAuthLayout";
// import { truncate } from "lodash";

const { Option } = Select;

function DashboardAudition({ auth, books }) {
  // console.log(auth);
  // console.log(auth.token);
  const router = useRouter();
  const dispatch = useDispatch();
  const breadCrumbData = [
    {
      name: "Dashboard",
      link: "/dashboard"
    },
    {
      name: "Audition"
    }
  ];

  const [timer, setTimer] = useState(30);
  // const [input, setInput] = useState("");
  const [book, setBook] = useState("");
  const [continueButton, setContinueButton] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [start, setStart] = useState(false);
  const [deductedFunds, setDeductedFunds] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [answer, setAnswer] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  console.log({ questionIndex });

  const getQuestions = async () => {
    setLoading(true);
    setStart(true);

    const config = {
      method: "POST",
      headers: { Authorization: `Bearer ${auth.token}` }
    };
    console.log(config);
    axios({
      method: "post",
      url: `${baseUrl}/auditions/start`,
      headers: { Authorization: `Bearer ${auth.token}` }
    })
      .then(res => {
        setDeductedFunds(true);
        // console.log("Req 1: ",res)
        return axios({
          method: "get",
          url: `${baseUrl}/auditions/questions?book=${book}`,
          headers: { Authorization: `Bearer ${auth.token}` }
        });
      })
      .then(res2 => {
        setQuestions(res2.data);
        console.log("Req 2: ", res2.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };
  const answerQuestion = async () => {
    if (questionIndex != 1) {
      // console.log(`${baseUrl}/auditions/answer/${questions[questionIndex]._id}`)
      // console.log(answer)
      const data = { id: questions[questionIndex]._id, answer };
      setLoading(true);
      axios({
        method: "post",
        url: `${baseUrl}/auditions/answer/${questions[questionIndex]._id}`,
        data,
        headers: { Authorization: `Bearer ${auth.token}` }
      })
        .then(res => {
          if (res.data.status === "right") {
            userNotificationSuccess("Correct", res.data.message);
          } else {
            userNotificationFailure("Wrong", res.data.message);
          }
          console.log(res);
          setLoading(false);
          setTimer(30);
          setQuestionIndex(1);
          // console.log("Req 1: ",res)
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    } else {
      const data = { id: questions[questionIndex]._id, answer };
      setLoading(true);
      axios({
        method: "post",
        url: `${baseUrl}/auditions/answer/${questions[questionIndex]._id}`,
        data,
        headers: { Authorization: `Bearer ${auth.token}` }
      })
        .then(res => {
          setFinished(true);
          if (res.data.status === "right") {
            userNotificationSuccess("Correct", res.data.message);
          } else {
            userNotificationFailure("Wrong", res.data.message);
          }
          return axios({
            method: "get",
            url: `${baseUrl}/users/${auth.id}`,
            headers: { Authorization: `Bearer ${auth.token}` }
          });
        })
        .then(res2 => {
          dispatch(
            loginSuccess({ ...res2.data, token: auth.token, id: auth.id })
          );
          setTimeout(() => {
            router.push("/dashboard");
            setLoading(false);
          }, 1000);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    // setTimer(30)
    if (questions.length > 0 && !loading) {
      const timerInterval = setInterval(() => {
        console.log(timer);
        setTimer(timer--);
        if (timer < 0) {
          console.log("Done");
          answerQuestion();
          // clearInterval(timerInterval);
          setTimer(30);
        }
      }, 1000);
      // setTimeout(() => {
      //   timerInterval
      // }, 1000);
    }

    return () => clearInterval(timerInterval);
  });

  useEffect(
    () => {
      console.log("Changed");
    },
    [questionIndex]
  );

  const handleAnswerInput = (e, answer) => {
    console.log("Option: ", answer);
    setAnswer(answer);
  };
  //   console.log(input)

  const answerIndex = { 0: "A", 1: "B", 2: "C", 3: "D" };
  // const questions = [
  //   {
  //     question: "Who is the mother of Jesus?",
  //     options: ["Rebecca", "Hannah", "Mary", "Ruth"],
  //     answer: "Mary",
  //   },
  //   {
  //     question: "What is the name of Adam's Wife?",
  //     options: ["Rachel", "Eve", "Deborah", "Leah"],
  //     answer: "Eve",
  //   },
  // ];
  return (
    <ContestantAuthLayout>
      {finished &&
        <div className="bg-black fixed z-[1000] w-full h-full flex flex-col gap-4 items-center justify-center text-6xl text-brand-red opacity-95 lg:mr-10">
          <FaCheck className="animate-ping" />
          <p className="text-2xl text-white">
            {"Congratulations! You're done with your audition"}
          </p>
          <div className="mt-5">
            <p className="text-2xl text-yellow-700 font-bold">
              {"Instruction:"}
            </p>
            <p className="text-2xl text-white">
              {"To be eligible for selection, 20 points is required"}
            </p>
          </div>
        </div>}
      <DashboardLayout title={"Audition"} breadcrumb={breadCrumbData}>
        {/* <button className="bg-brand-red text-white hover:bg-red-700 px-5 py-3 rounded hover:scale-110 transition ease-in-out duration-300 text-lg w-[300px] flex items-center justify-center gap-5" onClick={getQuestions}>
            <span>Continue</span>
            <FaArrowRight />
          </button> */}

        {auth.my_stats.wallet_balance < 500 &&
          <div className="pt-52 pb-60 flex flex-col gap-5 items-center justify-center mx-auto max-w-[900px]">
            <h2 className="text-3xl lg:text-5xl font-bold text-center leading-10">
              {"You don't have enough Money to Take an Audition"}
            </h2>
            <p className="text-xl text-center">
              Your Total balance is ₦
              {new Intl.NumberFormat().format(auth.my_stats.wallet_balance)}
            </p>
            <Link href={"/dashboard/fund"}>
              <a className="block hover:scale-110 transition duration-300 ease-in-out bg-brand-red text-white hover:text-white px-5 py-2 rounded hover:bg-red-700">
                Fund Wallet Now
              </a>
            </Link>
          </div>}

        {auth.my_stats.wallet_balance >= 500 &&
          !start &&
          <div className="pt-16 pb-44 flex flex-col gap-5 items-center justify-center mx-auto max-w-[900px]">
            <h2 className="text-3xl lg:text-5xl font-bold text-center leading-10">
              Start your Audition
            </h2>
            <p className="text-xl text-center">
              Search/Select a book for bible to begin.
            </p>
            <ul className="text-xl list-disc list-inside mx-auto max-w-[500px] mb-5">
              <li>It is open to persons of all age group.</li>
              <li>You can answer questions from any book of your choice three
                times, then you can answer from other books.
              </li>
              <li>You can cross from one batch to another.</li>
            </ul>
            <div
              className="flex flex-col flex-1 gap-2 text-lg"
              id="account_type"
            >
              <Select
              showSearch
                placeholder="Select Book of Bible"
                size="large"
                style={{ width: 300 }}
                onChange={value => {
                  setBook(value);
                  setContinueButton(true);
                }}
              >
                {books.map(book =>
                  <Option value={book} key={book}>
                    {Capitalize(book)}
                  </Option>
                )}
              </Select>
            </div>

            {continueButton &&
              <button
                className="bg-brand-red text-white hover:bg-red-700 px-5 py-3 rounded hover:scale-110 transition ease-in-out duration-300 text-lg w-[300px] flex items-center justify-center gap-5"
                onClick={getQuestions}
              >
                <span>Continue</span>
                <FaArrowRight />
              </button>}
          </div>}

        {auth.my_stats.wallet_balance >= 500 &&
          start &&
          loading &&
          <div className="pt-56 pb-64 flex flex-col gap-5 items-center justify-center mx-auto max-w-[900px] text-4xl lg:text-7xl">
            <FaCircleNotch className="animate-spin" />
            <p className="text-2xl">Loading...</p>
          </div>}

        {auth.my_stats.wallet_balance >= 500 &&
          start &&
          questions.length > 0 &&
          !loading &&
          <div className="max-w-[1100px] mx-auto flex flex-col gap-10 pt-10 pb-28">
            <div>
              <div className="flex justify-between">
                <h1 className="text-3xl font-bold">Audition</h1>
                <h2 className="text-2xl font-bold">Question 1</h2>
              </div>
              <Progress
                percent={questionIndex == 0 ? 50 : 100}
                strokeLinecap="square"
                strokeColor={"#DF2E2E"}
                trailColor={"#f8f4f0"}
              />
            </div>

            <div>
              <p className="text-6xl font-bold text-center">
                {Capitalize(questions[questionIndex].question)}
              </p>
            </div>

            {/* Timer */}
            <div className="flex items-center justify-center">
              <Progress
                type="circle"
                size="small"
                percent={100 * (timer / 30)}
                format={percent => Math.round(percent / 100 * 30)}
                strokeColor={"#DF2E2E"}
                strokeWidth={12}
                showInfo={true}
              />
            </div>

            <div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 justify-center audition-options mx-auto max-w-[900px]">
                {questions[questionIndex].answers.map((answer, i) =>
                  <div key={answer}>
                    <input
                      type="radio"
                      value={answer}
                      id={answer}
                      name="options"
                      onChange={e => {
                        handleAnswerInput(e, answer);
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor={answer}
                      className={`block rounded bg-blue-900 p-5 shadow shadow-gray-900 text-white text-center w-full sm:w-[150px] sm:h-[150px] flex flex-col gap-3 items-center justify-center cursor-pointer transition ease-in-out duration-300 hover:bg-black hover:scale-110`}
                    >
                      <p className="bg-white text-blue-900 rounded-full px-4 py-2 text-xl sm:text-2xl font-bold">
                        {answerIndex[i]}
                      </p>
                      <p className="text-xl sm:text-2xl font-bold">
                        {answer}
                      </p>
                    </label>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-green-600 text-white hover:bg-green-800 px-5 py-3 rounded hover:scale-110 transition ease-in-out duration-300 text-lg w-[300px] flex items-center justify-center gap-5"
                onClick={answerQuestion}
              >
                <span>Submit</span>
                <FaCheck />
              </button>
            </div>
          </div>}
      </DashboardLayout>
    </ContestantAuthLayout>
  );
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(DashboardAudition);
