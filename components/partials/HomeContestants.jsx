import { Image } from "antd";
import { Capitalize } from "../../functions/utilities";

function HomeContestants() {
  // console.log(users);

  const hardCodedUsers = [
    {
      src: "/images/contestants/aa.jpg",
      name: "Adeniji Sunday",
      shirt: "7",
      state: "Kwara State"
    },
    {
      src: "/images/contestants/bb.jpg",
      name: "Gbenga Daniel",
      shirt: "10",
      state: "Kogi State"
    },
    {
      src: "/images/contestants/cc.jpg",
      name: "Joshua Adefila",
      shirt: "3",
      state: "Kwara State"
    },
    {
      src: "/images/contestants/dd.jpg",
      name: "Paschal Okpara",
      shirt: "8",
      state: "Imo State"
    },
    {
      src: "/images/contestants/ee.jpg",
      name: "Patience Ayeni",
      shirt: "6",
      state: "Kwara State"
    },
    {
      src: "/images/contestants/ff.jpg",
      name: "Anne Edwards",
      shirt: "1",
      state: "Kwara State"
    },
    {
      src: "/images/contestants/gg.jpg",
      name: "Ibimotele Emmanuel",
      shirt: "4",
      state: "Edo State"
    },
    {
      src: "/images/contestants/hh.jpg",
      name: "Christol Okechukwu",
      shirt: "5",
      state: "Anambra State"
    },
    {
      src: "/images/contestants/ii.jpg",
      name: "Ogunine Precious",
      shirt: "2",
      state: "Benue State"
    },
    {
      src: "/images/contestants/jj.jpg",
      name: "Obiora Goodluck",
      shirt: "11",
      state: "Abia State"
    },
    {
      src: "/images/contestants/kk.jpg",
      name: "Brenda Uthulor",
      shirt: "12",
      state: "Ebonyi State"
    },
    {
      src: "/images/contestants/ll.jpg",
      name: "Victoria James",
      shirt: "9",
      state: "Benue State"
    }
  ];

  return (
    <div className="lg:py-5 lg:px-3">
      <h3 className="mt-7 mb-5 ml-3 lg:ml-0 lg:mt-0 text-2xl font-bold">
        Meet The Contestants (BATCH A)
      </h3>
      <div className="bg-black px-3 py-5 lg:rounded">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <div className="flex items-center justify-center">
            <Image
              src="/images/logo.png"
              alt="Bible Star TV Logo"
              preview={false}
              height={97}
              width={92}
            />
          </div>

          {/* {
                        users.query.map(user => (
                            <div key={user._id}>
                                <Image
                                src={`https://picsum.photos/id/${Math.floor(Math.random() * (200 - 0 + 1)) + 0}/200/300`}
                                alt = {user.name}
                                />
                                <p className='text-white text-center mt-2'>{`${Capitalize(user.firstname)} ${Capitalize(user.lastname)}`}</p>
                            </div>
                            
                        ))
                    } */}

          {hardCodedUsers.sort((a, b) => a.shirt - b.shirt).map((user) => (
            <div key={user.name}>
              <Image src={user.src} alt={"Contestant"} />
              <div className="text-white">
                <p className="text-yellow-600 font-bold text-lg">{user.name}</p>
                <p>Shirt {user.shirt}</p>
                <p>{user.state}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeContestants;
