import { useState } from "react";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import { FaTimesCircle } from "react-icons/fa";
import { Modal } from "antd";
import { baseUrl } from "../../../server/index";
import { logOutSuccess } from "../../../store/auth/action";
import { userNotificationSuccess } from "../../../functions/notification";

function DeleteAccount({ auth }) {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const deleteAccount = async() => {
    console.log("Deleting...")
    setLoading(true)
    axios.delete(`${baseUrl}/users/${auth.id}`, {
      headers: {
        "Authorization": `Bearer ${auth.token}`
      }
    })
    .then(res => {
      userNotificationSuccess("Your Account has been deleted")
      dispatch(logOutSuccess())
      setLoading(false)

    })
    .catch(err => {
      console.log(err)
      setLoading(false)
    })
    
  }
  return (
    <>
      <Modal
        title="Are You Sure You Want To Delete Your Account?"
        visible={visible}
        footer={false}
      
        onCancel={() => setVisible(false)}
      >
        <div className="flex flex-col md:flex-row items-center justify-around">
          <button className="bg-green-700 hover:bg-green-900  text-white flex items-center gap-5 py-3 px-6 transition ease-in-out duration-300 rounded font-bold motion-safe:animate-bounce" onClick={() => setVisible(false)}>
            NO. GO BACK!!!
          </button>
          
          {!loading && <button className="bg-brand-red hover:bg-red-700  text-white flex items-center gap-5 py-3 px-6 transition ease-in-out duration-300 rounded" onClick={deleteAccount}>
            Yes. Delete It.
          </button>}

          {loading && <button className="bg-brand-red hover:bg-red-700  text-white flex items-center gap-5 py-3 px-6 transition ease-in-out duration-300 rounded" onClick={deleteAccount}>
            Deleting your account...
          </button>}
        </div>
      </Modal>
      <div
        id="#delete_account"
        className="bg-white rounded shadow-lg flex flex-col  gap-6 py-7 px-5 text-lg"
      >
        <h3 className="text-gray-700 font-bold text-3xl leading-loose">
          Delete Account
        </h3>
        <div className="flex justify-between items-center">
          <p className="w-1/2 text-gray-600">
            Once you delete your account, you are removing yourself from the
            program and there is no going back. Please be certain.
          </p>
          <button
            className="bg-brand-red hover:bg-red-700  text-white flex items-center gap-5 py-3 px-6 transition ease-in-out duration-300 rounded"
            onClick={() => {
              setVisible(true);
            }}
          >
            <span>Delete Account</span>{" "}
            <div className="text-2xl">
              <FaTimesCircle />
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(DeleteAccount);
