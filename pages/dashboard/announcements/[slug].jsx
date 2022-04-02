import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import moment from "moment";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import { FaEnvelope, FaEnvelopeOpen } from "react-icons/fa";
import { message, Skeleton } from "antd";
import { baseUrl } from "../../../server/index";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import ContestantAuthLayout from "../../../components/layouts/ContestantAuthLayout";

function DashboardMessageSingle({ auth }) {
  const router = useRouter();
  // console.log(router.query.slug)

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    title: "",
    body: "",
    slug: ""
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/announcements/${router.query.slug}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        setMessage(res.data[0]);
        if (res.data.length > 0) {
          setMessage(res.data[0]);
          console.log(res.data[0]);
        } else {
          setMessage({
            title: "",
            body: "",
            slug: ""
          });
          router.push("/dashboard/announcements");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        //
      });
    return () => {
      setLoading(false);
      setMessage({
        title: "",
        body: "",
        slug: ""
      });
    };
  }, []);

  const breadCrumbData = [
    {
      name: "Dashboard",
      link: "/dashboard"
    },
    {
      name: "Announcements",
      link: "/dashboard/announcements"
    },
    {
      name: message.title !== undefined ? message.title : "Announcement"
    }
  ];

  // useEffect(()=> {
  //   if(!loading && message.length === 0){
  //     if(!message._id){
  //       router.push('/dashboard/announcements')
  //     }

  // }
  // })

  return (
    <ContestantAuthLayout>
      <DashboardLayout
        title={`${message.title ? message.title : "Announcement"}`}
        breadcrumb={breadCrumbData}
      >
        <div className="flex flex-col divide-y max-w-[900px] mx-auto bg-white text-lg p-5 rounded shadow-lg my-8">
          {!loading && Object.keys(message).length > 0 && (
            <div>
              <div>
                <p className="font-semibold text-4xl mb-3">{message.title}</p>
                <div className="text-lg text-gray-500 mb-3">{message.body}</div>
              </div>
            </div>
          )}
          {loading && <Skeleton paragraph={{ rows: 10, title: false }} />}
        </div>
      </DashboardLayout>
    </ContestantAuthLayout>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(DashboardMessageSingle);
