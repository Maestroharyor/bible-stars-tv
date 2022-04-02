import Image from "next/image";
import Link from "next/link";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import PageBanner from "../../components/partials/PageBanner";

function Sponsorship() {
  return (
    <DefaultLayout title="Sponsorship">
      <PageBanner
        name="Sponsorship"
        description="Partnership through Sponsorship"
        childPage={true}
        parentPage={{ name: "Partners", link: "" }}
      />

      <div className="bg-brand-gray py-20  gap-10 ">
        {/* <div>
          <Image
            className=""
            src={"/images/sponsorship.jpg"}
            alt="Sponsorship"
            width={585}
            height={623}
          />
        </div> */}
        <div className="px-5 lg:px-20 ">
          <p className="text-4xl mb-4">⭐</p>
          <h3 className="font-bold text-brand-red text-5xl leading-[5rem]">
            Be a partner
          </h3>
          {/* <p className="text-3xl font-semibold text-gray-500 mt-8 mb-4">
              EVENT SPONSORSHIP PACKAGE AND BENEFITS
            </p> */}

          <div className="text-lg leading-loose text-gray-500">
            <p>
              The world has been on the wait for a faith-based reality TV show
              that will not only entertain but something completely beyond the
              natural.
              <br /> Something better! <br />
              Something bigger! <br />A game changer from the norms.
            </p>
            <p>
              Starting from the 4- well packaged batches, to the elimination
              show, and the grand finale at the Big House, it is entertainment
              all the way and the impact of the Show on homes and nations of the
              world will be tremendous. We are creating the New Normal!{" "}
              {/* <strong>You really can’t afford to miss out all because:</strong> */}
            </p>
            {/* <ul className="list-disc flex flex-col gap-3 py-5">
              <li>It is negotiable and flexible</li>
              <li>You are sure to get much more than expected in return</li>
              <li>
                The highest bidder stands to be then lead sponsor and enjoy
                mouthwatering opportunities!
              </li>
            </ul> */}
            <p>Join us today as a partner! Give!</p>
            <p className="font-bold text-xl">- 4532022094</p>
            <p className="font-bold text-xl">- Bible world international ministry</p>
            <p className="font-bold text-xl">- Ecobank</p>
          </div>
        </div>
      </div>

      <div className="text-lg leading-loose px-5 lg:px-20 py-20 text-gray-500">
        <h3 className="text-brand-red font-bold text-3xl mb-1">SPONSORSHIP</h3>
        <p className="">
          Your brand will enjoy unlimited publicity when you take advantage of
          our sponsorship packages. <br />
          Television stations and several social media platforms will be the new
          voice for your Brand!
        </p>
        <p className="">Our sponsorship windows:</p>
        <ul className="list-disc flex flex-col gap-3 py-5">
          <li>The Big House sponsorship</li>
          <li>Star prize sponsorship (a brand new car)</li>
          <li>Game sponsorship</li>
          <li>Sponsorship of a segment of the Show</li>
          <li>{"Sponsorship of the show's transmission."}</li>
        </ul>
        <div className="font-semibold mt-10">
          {/* <p>
            Email:{" "}
            <a
              href="mailto:sp@biblestarstvshow.com"
              className="text-blue-500 hover:text-brand-red"
            >
              sp@biblestarstvshow.com
            </a>{" "}
          </p> */}
          <p>
            Kindly contact us on{" "}
            <a
              href="tel:09060672683"
              className="text-blue-500 hover:text-brand-red"
            >
              09060672683
            </a>{" "}
            for further clarifications.
          </p>
          <p>May the good Lord bless you richly!</p>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Sponsorship;
