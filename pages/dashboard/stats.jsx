import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import moment from 'moment'
import { connect, useDispatch } from "react-redux";
import { Skeleton } from "antd";
import DashboardLayout from '../../components/layouts/DashboardLayout';
import UserDetails from '../../components/elements/dashboardindex/UserDetails';
import { baseUrl } from "../../server/index";
import {Capitalize} from '../../functions/utilities'


function DashboardStats({auth}) {
    const breadCrumbData = [
        {
            name: "Dashboard",
            link: "/dashboard"
        },
        {
            name: "Stats"
        },
        
    ]

    const [loading, setLoading] = useState(false)
    const [statsData, setStatsData] = useState([])

    useEffect(() => {
        setLoading(true)
      axios.get(`${baseUrl}/stats/funds?id=${auth.id}`, {
          headers: {
              "Authorization": `Bearer ${auth.token}`
          }
      })
      .then(res => {
        setLoading(false)
          console.log(res.data)
          setStatsData(res.data.query)
      })
      .catch(err => {
        setLoading(true)
          console.log(err)
      })
    
      return () => {
        
      }
    }, [])
    

    const statsDemoDatas = [
        {
            dateTime: "Jan 15, 13:30",
            summary: "Star Trek Fan Quiz",
            type: "Audition",
            result: "10 points"
        },
        {
            dateTime: "Jan 16, 10:30",
            summary: "Sit velit nulla sit excepteur nisi esse aute dolore culpa amet sit.",
            type: "Funding",
            result: "#1000"
        },
        {
            dateTime: "Jan 17, 02:30",
            summary: "Eu duis cillum ea adipisicing.",
            type: "Audition",
            result: "10 points"
        },
        {
            dateTime: "Jan 18, 02:30",
            summary: "Aliqua quis adipisicing culpa duis sunt.",
            type: "Funding",
            result: "#2000"
        },
        {
            dateTime: "Jan 19, 02:30",
            summary: "Ad consectetur deserunt tempor non aliquip mollit veniam eu.",
            type: "Audition",
            result: "10 points"
        },
        {
            dateTime: "Jan 20, 02:30",
            summary: "Non esse cupidatat magna commodo veniam eiusmod do pariatur sit commodo.",
            type: "Audition",
            result: "10 points"
        },
    ]

    return (
        <DashboardLayout title = {"Stats"} breadcrumb = {breadCrumbData}>
            <h1 className="pt-2 text-3xl font-bold">My Stats</h1>
            <UserDetails />
            {loading && <div className='my-8 bg-white shadow-lg rounded py-10 px-3 md:px-8'>
              <Skeleton paragraph={{ rows: 5, title: false }} />  
            </div>}
            
            {(!loading && statsData.length > 0) && <div className='my-8 flex flex-col divide-y bg-white shadow-lg rounded py-5 px-3 md:px-8'>
                {
                    statsData.map(data => (
                        <div key={data._id} className='grid grid-cols-1 lg:grid-cols-12 items-center py-4 gap-y-3'>
                            <div className='inline-flex gap-4  text-sm lg:col-span-10'>
                                <p className='text-gray-600'>{moment(data.createdAt).format("ddd, MMMM Do YYYY")}</p>
                                <p className='font-bold text-lg'>{data.details}</p>   
                            </div>
                            <div className='inline-flex gap-4 justify-start text-left  text-sm lg:col-span-2'>
                                <p className={`${data.type === "addition" ? "bg-green-700":"bg-brand-red"}  rounded px-3 py-1 text-white font-bold`}>{data.type === "addition" ? "Funds Added":"Funds Removed"}</p>
                                <p className='font-bold text-lg'>₦{new Intl.NumberFormat().format(data.amount)}</p>   
                            </div>

                        </div>
                    ))
                }
            </div>}
        </DashboardLayout>
    )
}


const mapStateToProps = (state) => {
    return state;
  };
  
  export default connect(mapStateToProps)(DashboardStats);
  
