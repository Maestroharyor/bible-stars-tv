import { useState, useEffect } from "react";
import axios from "axios";
import DefaultLayout from "../components/layouts/DefaultLayout";
import HomeSlider from "../components/partials/HomeSlider";
import HomeSocial from "../components/partials/HomeSocial";
import HomeJoinBanner from "../components/partials/HomeJoinBanner";
import HomeNewsList from "../components/partials/HomeNewsList";
import HomeClips from "../components/partials/HomeClips";
import HomeQuestions from "../components/partials/HomeQuestions";
import HomeContestants from "../components/partials/HomeContestants";

import { baseUrl } from "../server/index";

// export const getStaticProps = async () => {
//   const [blogReq, usersReq] = await Promise.allSettled([
//     fetch(`${baseUrl}/blogs?per_page=6`),
//     fetch(`${baseUrl}/users?role=contestant&per_page=13`),
//   ])

//   const [blog, users] = await Promise.allSettled([
//     blogReq.json(), usersReq.json()
//   ])

//   console.log({blogs})
//   console.log({users})
//   return {
//     props: {
//       blogs: blogs.data, users: users.data
//     }, // will be passed to the page component as props
//     // revalidate: 10
    
//   }
// }

function Home() {
  // const 
  // console.log(props)
  


  return (
    <DefaultLayout>
      <HomeSlider />
      <div
        className=""
        // style={{backgroundImage: "url(/images/banner1.png)"}}
      >
        <HomeSocial />
        <HomeJoinBanner />
        <HomeNewsList />
        <HomeClips />
        <HomeQuestions />
        <HomeContestants />
      </div>
    </DefaultLayout>
  );
}

export default Home;
