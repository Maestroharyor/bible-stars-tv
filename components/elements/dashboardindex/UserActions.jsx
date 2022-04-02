import Link from 'next/link';
import { connect, useDispatch } from "react-redux";
import {FaClipboardList, FaClipboard, FaEnvelopeOpenText, FaVoteYea, FaUser} from 'react-icons/fa'

function UserActions({auth}) {
  let actions;

  if(auth.user_role === "contestant"){
    actions = [
      {
        name: "Fund Wallet",
        icon: <FaClipboardList />,
        link: "/dashboard/fund",
        color: "brand-red",
        colorHover: "red-700",
      },
      {
        name: "Attempt Audition",
        icon: <FaClipboardList />,
        link: "/dashboard/audition",
        color: "gray-700",
        colorHover: "gray-900",
      },
      {
        name: "Check Results",
        icon: <FaClipboard />,
        link: "/dashboard/stats",
        color: "blue-700",
        colorHover: "blue-900",
      },
      {
        name: "Announcements",
        icon: <FaEnvelopeOpenText />,
        link: "/dashboard/announcements",
        color: "gray-700",
        colorHover: "black",
      },
    ]
  } else{
    actions = [
      {
        name: "Fund Wallet",
        icon: <FaClipboardList />,
        link: "/dashboard/fund",
        color: "brand-red",
        colorHover: "red-700",
      },
      {
        name: "Vote Now",
        icon: <FaVoteYea />,
        link: "/dashboard/vote",
        color: "gray-700",
        colorHover: "gray-900",
      },
      {
        name: "My Stats",
        icon: <FaClipboard />,
        link: "/dashboard/stats",
        color: "blue-700",
        colorHover: "blue-900",
      },
      {
        name: "My Profile",
        icon: <FaUser />,
        link: "/dashboard/account",
        color: "gray-700",
        colorHover: "black",
      },
    ];
  }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16">
        {actions.map((action) => (
          <Link href={action.link} key={action.name}>
            <a
              className={`block bg-${action.color} rounded p-5 text-white font-bold text-center flex flex-col items-center justify-center gap-3 hover:bg-${action.colorHover} hover:text-white transition ease-in-out duration-300 shadow-xl`}
            >
              <div className="text-5xl">{action.icon}</div>
              <p>{action.name}</p>
            </a>
          </Link>
        ))}
      </div>
    );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(UserActions);
