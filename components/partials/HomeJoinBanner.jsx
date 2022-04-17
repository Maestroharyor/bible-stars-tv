// import Image from 'next/image';
import Router from "next/router";
import { connect, useDispatch } from "react-redux";
import { Image } from "antd";
import YouTube from "react-youtube";

function HomeJoinBanner({ auth }) {
  const opts = {
    height: "150",
    width: "250"
    // playerVars: {
    //   // https://developers.google.com/youtube/player_parameters
    //   autoplay: 1,
    // },
  };
  return (
    <div className="py-7 px-4">
      <div className="flex flex-col lg:flex-row justify-between gap-4 bg-yellow-100 px-10">
        <div className="flex flex-col gap-4 lg:gap-2 pt-5 lg:pt-0 items-center justify-center">
          <p className="text-4xl font-bold text-center">
            Be The Next Global Star!
          </p>
          {!auth.isLoggedIn && (
            <button
              onClick={() => Router.push("/register")}
              className="rounded bg-brand-red text-white text-xl font-bold px-5 py-2"
            >
              Apply Now
            </button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/images/logo.png"
              alt="Bible Star TV Logo"
              height={107}
              width={102}
              preview={false}
            />
            <h2 className="text-4xl lg:text-6xl font-black text-center text-black transform -rotate-3 drop-shadow-xl leading-[1.3]">
              Audition <br /> Now
            </h2>
          </div>
          <div className="flex justify-center items-end">
            {/* <Image
                            src="/images/banners/banner.jpg"
                            alt = "Online Auditions"
                            height={389}
                            width={469}
                        /> */}
            <YouTube
              videoId={"6NYg0JxT2p0"}
              opts={opts}
              onPlay={(e) => {
                // console.log(e.target)
                e.target.playsinline = 0;
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(HomeJoinBanner);
