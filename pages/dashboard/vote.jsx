import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import { Progress, Select, Avatar } from "antd";
import {
  FaCheck,
  FaArrowRight,
  FaCircleNotch,
  FaVoteYea
} from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import { baseUrl } from "../../server/index";
import { loginSuccess } from "../../store/auth/action";
import {
  userNotificationSuccess,
  userNotificationFailure
} from "../../functions/notification";
import { Capitalize } from "../../functions/utilities";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import SubscriberAuthLayout from "../../components/layouts/SubscriberAuthLayout";

const { Option } = Select;

function DashboardVote({ auth }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const breadCrumbData = [
    {
      name: "Dashboard",
      link: "/dashboard"
    },
    {
      name: "Vote"
    }
  ];

  const [loading, setLoading] = useState(false);
  const [voteLoading, setVoteLoading] = useState(false);
  const [contestantLoad, setContestantLoad] = useState(false);
  const [start, setStart] = useState(false);
  const [finished, setFinished] = useState(false);
  const [batch, setBatch] = useState("");
  const [contestantList, setContestantList] = useState([]);
  const [contestant, setContestant] = useState({});
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(2);

  // console.log(contestantList)

  const getBatch = async (value) => {
    setLoading(true);
    setCurrentPage(2);
    setHasMore(true);
    setContestant({});
    axios
      .get(`${baseUrl}/users/batch/${value}?per_page=20`)
      .then((res) => {
        // console.log(res);
        if (res.data.query.length > 0) {
          setContestantList(res.data.query);
        }
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
      });
  };

  const getMoreVotes = async () => {
    const newVotes = await axios.get(
      `${baseUrl}/users/batch/${batch}?per_page=20&page=${currentPage}`
    );

    // console.log(newVotes);
    // console.log(blogsData);

    setContestantList((contestantList) => [
      ...contestantList,
      ...newVotes.data.query
    ]);
    setCurrentPage(currentPage + 1);
    if (newVotes.data.has_next_page === false) {
      setHasMore(false);
    }
    // setLoading(false);
  };

  const voteForContestant = (id) => {
    const body = {
        heading:"Vote Casted",
        details:`${Capitalize(auth.firstname)} ${Capitalize(auth.lastname)} voted for ${Capitalize(contestant.firstname)} ${Capitalize(contestant.lastname)} `,
        amount_deducted:100
    }

    setVoteLoading(true)
    axios.post(`${baseUrl}/votes/${id}`, body, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    })
    .then((res) => {
      // console.log(res.data);
      return axios.get(`${baseUrl}/users/${auth.id}`);
    })
    .then(response => {
      // console.log(response)
      dispatch(
        loginSuccess({ ...response.data, token: auth.token, id: auth.id })
      );
      userNotificationSuccess(response.data.message, `You voted for ${Capitalize(contestant.firstname)} ${Capitalize(contestant.lastname)}`)
      setVoteLoading(false)
      setStart(false);
      setFinished(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    })
    .catch(error => {
      // console.log({error})
      userNotificationFailure("Voting Failed", "Please try again")
      setVoteLoading(false)
    })
    // console.log(id)
  }

  return (
    <SubscriberAuthLayout>
      {finished && (
        <div className="bg-black fixed z-[1000] w-full h-full flex flex-col gap-4 items-center justify-center text-6xl text-brand-red opacity-95 lg:mr-10">
          <FaCheck className="animate-ping" />
          <p className="text-2xl text-white">
            {"Congratulations! Your vote has been recorded"}
          </p>
        </div>
      )}

{voteLoading && (
        <div className="bg-black fixed z-[1000] w-full h-full flex flex-col gap-4 items-center justify-center text-6xl text-brand-red opacity-95 lg:mr-10">
          <FaCircleNotch className="animate-spin" />
          <p className="text-2xl text-white">{contestant.firsname ? `Voting for ${Capitalize(contestant.firstname)} ${Capitalize(contestant.lastname)} ...` : "Voting"}</p>
        </div>
      )}

      <DashboardLayout
        title={"Vote for Contestants"}
        breadcrumb={breadCrumbData}
      >
        {auth.my_stats.wallet_balance < 500 && (
          <div className="pt-52 pb-60 flex flex-col gap-5 items-center justify-center mx-auto max-w-[900px]">
            <h2 className="text-3xl lg:text-5xl font-bold text-center leading-10">
              {"You don't have enough Money to Vote"}
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
          </div>
        )}

        {auth.my_stats.wallet_balance >= 500 && !start && (
          <div className="pt-52 pb-60 flex flex-col gap-5 items-center justify-center mx-auto max-w-[900px]">
            <h2 className="text-3xl lg:text-5xl font-bold text-center leading-10">
              Vote for Contestants
            </h2>
            {/* <p className="text-xl text-center">
              Here are the voting instructions: <br />
              Ut incididunt ex adipisicing duis. Deserunt anim ut elit voluptate
              duis minim amet officia laboris. Non cupidatat commodo dolore
              minim officia laborum reprehenderit quis. Ad veniam est veniam
              voluptate. Pariatur ea ad est laboris adipisicing deserunt
              cupidatat proident quis occaecat Lorem veniam cillum laborum.
            </p> */}

            <button
              className="bg-brand-red text-white hover:bg-red-700 px-5 py-3 rounded hover:scale-110 transition ease-in-out duration-300 text-lg w-[300px] flex items-center justify-center gap-5"
              onClick={() => setStart(true)}
            >
              <span>Vote Now</span>
              <FaArrowRight />
            </button>
          </div>
        )}

        {auth.my_stats.wallet_balance >= 500 && start && !batch && !loading && (
          <div className="pt-56 pb-60 flex flex-col gap-5 items-center justify-center mx-auto max-w-[900px]">
            <h2 className="text-3xl lg:text-5xl font-bold text-center leading-10">
              Pick a Batch
            </h2>
            <div
              className="flex flex-col flex-1 gap-2 text-lg"
              id="account_type"
            >
              <Select
                placeholder="Batch"
                size="large"
                style={{ width: 300 }}
                onChange={(value) => {
                  setBatch(value);
                  // console.log(value);
                  getBatch(value);
                  // setContinueButton(true)
                }}
              >
                <Option value={"A"}>Batch A</Option>
                <Option value={"B"}>Batch B</Option>
                <Option value={"C"}>Batch C</Option>
                <Option value={"D"}>Batch D</Option>
              </Select>
            </div>
          </div>
        )}
        {auth.my_stats.wallet_balance >= 500 && start && loading && (
          <div className="pt-56 pb-64 flex flex-col gap-5 items-center justify-center mx-auto max-w-[900px] text-4xl lg:text-7xl">
            <FaCircleNotch className="animate-spin" />
            <p className="text-2xl">Loading...</p>
          </div>
        )}

        {auth.my_stats.wallet_balance >= 500 && start && batch && !loading && (
          <div className="pt-12 pb-10 gap-5 items-stretch justify-center  grid grid-cols-1 md:grid-cols-12 md:divide-x w-full ">
            <div className="md:col-span-7 px-5">
              <div
                className="flex flex-col flex-1 gap-2 text-lg mb-10 "
                id="account_type"
              >
                <Select
                  placeholder="Batch"
                  defaultValue={batch}
                  size="large"
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    setBatch(value);
                    // console.log(value);
                    getBatch(value);
                    // setContinueButton(true)
                  }}
                >
                  <Option value={"A"}>Batch A</Option>
                  <Option value={"B"}>Batch B</Option>
                  <Option value={"C"}>Batch C</Option>
                  <Option value={"D"}>Batch D</Option>
                </Select>
              </div>
              { contestantList.length > 0 ? <div className="flex flex-col divide-y">
                <div className="grid grid-cols-3 cursor-pointer justify-between bg-brand-red py-4 px-3 text-white font-bold text-xl ">
                  <div>Name</div>
                  <div>Total Points</div>
                  <div>Total Votes</div>
                </div>
                <InfiniteScroll
                  dataLength={contestantList.length}
                  next={getMoreVotes}
                  hasMore={hasMore}
                  scrollThreshold={"50%"}
                  loader={
                    <div className="justify-between py-4 px-3 bg-gray-100 flex items-center justify-center text-4xl">
                      <FaCircleNotch className="animate-spin" />
                    </div>
                  }
                  // className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-[1200px] mx-auto pt-2 pb-20 px-5 lg:px-2"
                  endMessage={
                    <div className=" py-4 px-3 bg-gray-100 flex items-center justify-center text-xl">
                      <h4>{`All contentestants in batch ${batch}  have been loaded`}</h4>
                    </div>
                  }
                >
                  {contestantList.map((contestant) => (
                    <div
                      className="grid grid-cols-3 cursor-pointer justify-between py-4 px-3 bg-gray-100 hover:bg-gray-200 transition duration-300 ease-in-out"
                      key={contestant._id}
                      onClick={() => setContestant(contestant)}
                    >
                      <div>{`${Capitalize(contestant.firstname)} ${Capitalize(
                        contestant.lastname
                      )}`}</div>
                      <div>{contestant.my_stats.total_points} Points</div>
                      <div>{contestant.my_stats.total_votes} Votes</div>
                    </div>
                  ))}
                </InfiniteScroll>
              </div> :  <>
                  <p className="text-xl md:text-4xl">No Contestant found in Batch {batch}</p>
                </>}
            </div>
            <div className="md:col-span-5 px-5 order-1 md:order-2">
              {Object.keys(contestant).length === 0 ? (
                <>
                  <p className="text-xl md:text-4xl">No Contestant Selected</p>
                </>
              ) : (
                <>
                  <div
                    id="#profile"
                    className="bg-white rounded shadow-lg flex flex-col items-center gap-6 py-7 px-5 w-full sticky top-5"
                  >
                    <Avatar size={130} className="me-2 bg-gray-800 text-5xl font-bold">
                      {Capitalize(contestant.username)[0]}
                    </Avatar>
                    <div>
                      <p className="font-bold text-3xl">{`${Capitalize(
                        contestant.firstname
                      )} ${Capitalize(contestant.lastname)}`}</p>
                      <p className="text-lg">Email: {contestant.email}</p>
                      <div className="inline-flex flex-col sm:flex-row justify-between w-full mt-2">
                        <p className="bg-stone-500 px-3 py-2 rounded text-white">
                          {contestant.my_stats.total_points} Points
                        </p>
                        <p className="bg-red-500 px-3 py-2 rounded text-white">
                          {contestant.my_stats.total_votes} Votes
                        </p>
                      </div>
                    </div>
                    <div className="">
                      <button className="bg-green-500 px-5 py-3 rounded text-white hover:scale-110 hover:bg-green-700 transition ease-in-out duration-300 w-full inline-flex items-center justify-items gap-3" onClick={()=> voteForContestant(contestant._id)}>
                        {" "}
                        <span className="text-2xl">
                          <FaVoteYea />
                        </span>
                        <span className="text-lg">
                          Vote for{" "}
                          {`${Capitalize(contestant.firstname)} ${Capitalize(
                            contestant.lastname
                          )}`}
                        </span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </DashboardLayout>
    </SubscriberAuthLayout>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(DashboardVote);
