import Image from "next/image";
import Link from "next/link";
import DefaultLayout from "../components/layouts/DefaultLayout";
import PageBanner from "../components/partials/PageBanner";

function About() {
  return (
      <>
    <DefaultLayout title="About Us">
      <PageBanner name="About" description="About The Show" />
      <div className="py-20 max-w-[1070px] mx-auto px-5">
        <div className="text-center">
          <Image
            src={"/images/about-flyer.png"}
            alt="About Us"
            width={1063}
            height={262}
          />
        </div>

        <h3 className="text-3xl text-brand-red text-center my-10">
          {
            "Let's begin by letting you know that this show is both a game show and a reality show - a first of its kind!"
          }
        </h3>

        <div className="text-lg text-center about-main mx-auto max-w-[1000px]">
          {/* <p className='mb-8'>Bible Stars TV Show is an incredibly multidimensional nationwide championship that centers on the Bible. The concept is unique and fascinating. It is distinct and promises to be attractively better and more highly placed in terms of rating, impacts, robust structure, participation and coordination than most celebrated events that is on air today.</p>
                    <p className='mb-8'>The Bible Stars returns for its 2nd season, themed &quot; The Flaming Sword.&quot; This edition features 48 rigorously auditioned housemates who battle it out with each other over various phases for the ultimate prize.These housemates will compete in epic challenges, face various tasks, be tested to the limit, scrutinized properly and expected to live the scriptures out live. The winner of this season will be awarded a saloon car and ₦500,000 cash.</p> */}
          <p>
            The Bible Stars returns for its widely awaited 2nd season-themed
            <span className="font-bold">{`"The Flaming Sword."`}</span>{" "}
          </p>

          <p>The first edition was accepted beyond our expectations.</p>

          <p>
            And so, we came back with a more fun-filled, intriguing, heart
            racing, and suspense-filled edition.
          </p>

          <p>
            This edition features 48 thoroughly auditioned contestants. Who
            battle it out with each other in four exciting batches.
          </p>

          <p>
            These 48 contestants would battle for the keys to the Magnificent
            gates of the Big house.
          </p>

          <p>Out of the 48 contestants, will emerge 12 conquerors</p>

          <p>These 12 conquerors would become housemates in the <span className="font-bold">BIG HOUSE.</span></p> 

          <p>
            As housemates, they will compete in mind-blowing, Fun-filled...
            soul-searching, and Brainstorming challenges.
          </p>

          <p>
            They would face various tasks, be tested to the very limit,
            scrutinized properly, and be expected to live the scriptures out
            live!
          </p>

          <p>
            The winner of this season will be awarded a saloon car and ₦500,000
            cash.
          </p>

          <p className="font-bold">{"And that's not all."}</p>

          <p>
            In the big house, the housemates would be treated like royalty. They
            will live in comfort
          </p>

          <p>
            They would experience the fullness, joy, and oneness that only the
            presence of the Holy Ghost can bring.
          </p>

          <p>
            Also as a result of the speculated grand viewership of about 1.6
            billion views. <br /><span className="font-bold"> Every housemate is at the advantage of getting global
            recognitions.</span>{" "}
          </p>

          <p>Do you know what that means???</p>

          <p>These housemates would literally become Christian celebrities!!</p>
          <p>
            And they become eligible for amazing deals and several
            mouth-watering endorsements.
          </p>

          <p>
            The Show will be streamed live on more than 10 TV stations, on The
            BibleStars App, and our Youtube channel.
          </p>

          <p className="font-bold">Wait, there is more.</p>

          <p>
            {`There is an opportunity for you to win some "not to be revealed yet"
            prizes even if you're not part of the contestants.`}
          </p>

          <p>We have decided to award you just for viewing the show. </p>

          <p>
            Viewers at home get to join in the entire excitement and win prizes.
            By participating in the home play sessions, and also by voting for
            contestants during the talent hunt sessions.
          </p>

          <p>Oops</p>

          <p>We are already revealing too much.</p>

          <p>{"But I tell you, You don't know what we have planned for you."}</p>

          <p className="font-bold">One more thing.</p>

          <p>{"Don't count yourself out of this long-awaited event."}</p>

          <p className="font-bold">
            This show is for you as long as you believe and love the scripture.
          </p>

          <p>The anticipation is building...</p>

          <p>Who would be the Winner????</p>

          <p>Who would be the bearer of the FLAMING SWORD???</p>

          <p>The stage has been Set!</p>

          <p>
            You should not miss the dramas, the suspense, the fun, the tears,
            the shock, the Submission, and the Victory.
          </p>

          <p className="font-bold">{"Don't keep this to yourself."}</p>
          <p className="font-bold">Spread the word to your friends.</p>

          <p>{"It's going to be mind-blowing!"}</p>

          <p>Do you have what it takes to be part of this???</p>

          <p>Are you ready to be thrilled?</p>

          <p>Do you want to win amazing prizes?</p>

          <Link href={"/register"}>
            <a className="inline-block bg-brand-yellow hover:bg-brand-red text-xl px-10 py-4 text-white hover:text-white font-semibold transition ease-in-out duration-300 mt-10">
              Register and Audition Now
            </a>
          </Link>
        </div>
      </div>
    </DefaultLayout>
    <style jsx>
        {`
        .about-main p{
            margin-bottom: 15px;
        }
        `}
    </style>
    </>
  );
}

export default About;
