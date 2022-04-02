import { useState, useEffect } from "react";
import Link from "next/link";
import moment from "moment";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import { FaEnvelope, FaEnvelopeOpen } from "react-icons/fa";
import { Skeleton } from "antd";
import { baseUrl } from "../../../server/index";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import ContestantAuthLayout from "../../../components/layouts/ContestantAuthLayout";

function DashboardMessages({ auth }) {
  const breadCrumbData = [
    {
      name: "Dashboard",
      link: "/dashboard"
    },
    {
      name: "Announcements"
    }
  ];
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/announcements`, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })
      .then((res) => {
        setLoading(false);
        setMessages(res.data.query);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <ContestantAuthLayout>
      <DashboardLayout title={"My Messages"} breadcrumb={breadCrumbData}>
        <h1 className="text-4xl font-bold text-center">Announcements</h1>
        <div className="flex flex-col divide-y max-w-[900px] mx-auto bg-white text-lg p-5 rounded shadow-lg my-8">
          {!loading && messages.length > 0 && (
            <>
              {messages.map((message) => (
                <Link
                  key={message._id}
                  href={`/dashboard/announcements/${message.slug}`}
                  passHref
                >
                  <a
                    className={`flex flex-col lg:flex-row items-center justify-between gap-4 py-3 px-2 "text-blue-600 hover:text-blue-800"
                  `}
                  >
                    {/* <div className={`text-2xl rounded-full bg-gray-100 p-4`}>
                    {message.hasOpened ? <FaEnvelope /> : <FaEnvelopeOpen />}
                  </div> */}
                    <div>
                      <p className="font-semibold text-xl mb-1">
                        {message.title}
                      </p>
                      <p className="text-sm text-gray-500 mb-3">
                        {message.body.substring(0, 100)}...
                      </p>
                    </div>
                    <p className="text-xs">
                      {moment(message.createdAt).format("ddd, MMMM Do YYYY")}
                    </p>
                  </a>
                </Link>
              ))}
            </>
          )}
          {!loading && messages.length == 0 && (
            <p className="text-lg">No Announcements Yet...</p>
          )}

          {loading && (
            <div className="my-8 bg-white shadow-lg rounded py-10 px-3 md:px-8">
              <Skeleton paragraph={{ rows: 5, title: false }} />
            </div>
          )}
        </div>
      </DashboardLayout>
    </ContestantAuthLayout>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(DashboardMessages);
