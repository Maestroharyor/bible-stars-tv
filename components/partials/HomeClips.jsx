import { Image } from "antd";
import { MdVideocam } from "react-icons/md";
import { FaArrowCircleDown } from "react-icons/fa";
import ReactPlayer from "react-player";
import YouTube from "react-youtube";

function HomeClips() {
  const opts = {
    height: "150",
    width: "250"
    // playerVars: {
    //   // https://developers.google.com/youtube/player_parameters
    //   autoplay: 1,
    // },
  };
  const homeClips = [
    // {
    //   title: "How to Audition",
    //   link: "https://www.youtube.com/watch?v=6NYg0JxT2p0",
    //   id: "6NYg0JxT2p0"
    // },
    {
      title: "Bible Stars Intro",
      link: "https://www.youtube.com/watch?v=jrPbgIhTdDc",
      id: "jrPbgIhTdDc"
    },
    {
      title: "Bible Stars Cash Prize",
      link: "https://www.youtube.com/watch?v=42d-ZjZJIgw",
      id: "42d-ZjZJIgw"
    },
    {
      title: "Bible Stars Q1 & 12",
      link: "https://www.youtube.com/watch?v=VelIQYwfcs0",
      id: "VelIQYwfcs0"
    },
    {
      title: "The Pilot 1",
      link: "https://www.youtube.com/watch?v=aatnp22yndI",
      id: "aatnp22yndI"
    },
    {
      title: "The Pilot 2",
      link: "https://www.youtube.com/watch?v=PUfcFFYvZUY",
      id: "PUfcFFYvZUY"
    }
  ];
  return (
    <div className="lg:py-5 lg:px-3">
      <h3 className="mb-5 text-2xl font-bold">Catch a glimpse of the show</h3>
      <div className="bg-black px-3 py-5 lg:rounded">
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 place-items-center">
          {homeClips.map((clip) => (
            <div className="" key={clip.name}>
              {clip.id !== "" ? (
                <YouTube
                  videoId={clip.id}
                  opts={opts}
                  onPlay={(e) => {
                    // console.log(e.target)
                    e.target.playsinline = 0;
                  }}
                />
              ) : (
                <Image src={clip.image} />
              )}

              <div className="flex items-center text-white py-2">
                <div className="text-2xl">
                  <MdVideocam className="mr-2" />
                </div>

                <p className="text-white text-xs uppercase flex-1">
                  {clip.title}{" "}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="flex justify-center items-center w-full pt-5 py-7">
          <button className="rounded text-white py-3 flex items-center font-bold text-md">
            <div className="bg-brand-red px-3 py-3 rounded-l inline-flex gap-2 items-center hover:bg-red-700 transition duration-300 ease-in-out">
              <p>Show more</p>
              <FaArrowCircleDown className="inline-block" />
            </div>
            <div className="px-3 rounded-r bg-red-700 py-3">5 of 25</div>
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default HomeClips;
