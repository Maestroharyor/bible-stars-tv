// import { } from 'react-icons/ai';
import { connect, useDispatch } from "react-redux";
import {
  FaWallet,
  FaUserCircle,
  FaChartBar,
  FaUsers,
  FaMoneyBill,
  FaVoteYea
} from "react-icons/fa";

function UserDetails({ auth }) {
  console.log(auth);
//   const userDets = [
//     {
//       title: "Wallet Balance",
//       result: "₦500",
//       icon: <FaWallet />
//     },
//     {
//       title: "Total Attempts",
//       result: "20",
//       icon: <FaUserCircle />
//     },
//     {
//       title: "Total Points",
//       result: "10",
//       icon: <FaChartBar />
//     },
//     {
//       title: "Total Participants",
//       result: "180",
//       icon: <FaUsers />
//     },
//     {
//       title: "Amount Spent",
//       result: "#1000",
//       icon: <FaMoneyBill />
//     }
//   ];
  return (
    <div className={`mt-5 py-4 px-5 bg-gray-200 rounded grid grid-cols-1 gap-5 justify-between items-center ${auth.user_role === "contestant" ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5":"md:grid-cols-3"}`}>
      {/* {userDets.map(userDet => (
            <div className='flex items-center gap-3' key={userDet.title}>
               <div className='text-6xl text-gray-800'>
                   {userDet.icon}
               </div>
                
                <div>
                    <p className='text-[16px] leading-[1.1] text-blue-600'>{userDet.title}</p>
                    <p className='font-bold text-2xl'>{userDet.result}</p>
                </div>
           </div>
        ))} */}
      <div className="flex items-center gap-3">
        <div className="text-4xl text-gray-800">
        <FaWallet />
        </div>

        <div>
          <p className="text-[16px] leading-[1.1] text-blue-600">
          Wallet Balance
          </p>
          <p className="font-bold text-xl">₦{new Intl.NumberFormat().format(auth.my_stats.wallet_balance)}</p>
        </div>
      </div>

      
      <div className="flex items-center gap-3">
        <div className="text-4xl text-gray-800">
        <FaMoneyBill />
        </div>

        <div>
          <p className="text-[16px] leading-[1.1] text-blue-600">
          Amount Spent
          </p>
          <p className="font-bold text-xl">₦{new Intl.NumberFormat().format(auth.my_stats.amount_spent)}</p>
        </div>
      </div>

      
      { auth.user_role === "contestant" && <>
      <div className="flex items-center gap-3">
        <div className="text-4xl text-gray-800">
        <FaUserCircle />
        </div>

        <div>
          <p className="text-[16px] leading-[1.1] text-blue-600">
          Total Attempts
          </p>
          <p className="font-bold text-xl">{auth.my_stats.total_attempts}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-4xl text-gray-800">
        <FaChartBar />
        </div>

        <div>
          <p className="text-[16px] leading-[1.1] text-blue-600">
          Total Points
          </p>
          <p className="font-bold text-xl">{auth.my_stats.total_points}</p>
        </div>
      </div></>}

      <div className="flex items-center gap-3">
        <div className="text-4xl text-gray-800">
        <FaVoteYea />
        </div>

        <div>
          <p className="text-[16px] leading-[1.1] text-blue-600">
          {auth.user_role === "contestant" ? "Total Votes":"Total Votes Casted"}
          </p>
          <p className="font-bold text-xl">{auth.my_stats.total_votes}</p>
        </div>
      </div>



    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(UserDetails);
