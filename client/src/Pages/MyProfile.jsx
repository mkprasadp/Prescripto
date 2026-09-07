import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets.js";
import { toast } from "react-toastify";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
const MyProfile = () => {
  const { userData, setUserData, token, getUserData, backendUrl } =
    useContext(AppContext);
  const [image, setImage] = useState(false);

  const updateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);
      formData.append('address',JSON.stringify(userData.address))
      image && formData.append("image", image);
      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token: token } }
      );
      if (data.success) {
        toast.success(data.message);
        await getUserData();
        setEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const [edit, setEdit] = useState(false);

  return (
    userData && (
      <div className=" max-w-lg flex flex-col gap-2 text-sm">
        {edit ? (
          <label htmlFor="image">
            <div className=" inline-block relative cursor-pointer">
              <img
                className=" w-36 rounde opacity-75"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt=""
              />
              <img
                className=" w-12 absolute right-12 bottom-12"
                src={image ? " " : assets.upload_icon}
                alt=""
              />
            </div>

            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              hidden
              id="image"
            />
          </label>
        ) : (
          <img className="w-36 rounded" src={userData.image} alt="" />
        )}
        {edit ? (
          <input
            className="font-medium text-3xl mt-4 max-w-60 bg-gray-50"
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="font-medium text-3xl text-neutral-800 mt-4">
            {userData.name}
          </p>
        )}
        <hr className=" bg-gray-400 h-[1px] border-none" />
        <div>
          <p className=" text-neutral-500  underline mt-3">
            CONTACT INFORMATION
          </p>
          <div className="gap-y-2.5 mt-3 text-neutral-700 grid grid-cols-[1fr_3fr]">
            <p className="font-medium">Email id:</p>
            <p className=" text-blue-500">{userData.email}</p>
            <p className="font-medium">Phone:</p>
            {edit ? (
              <input
                className="max-w-52 bg-gray-100"
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-blue-400">{userData.phone}</p>
            )}
          </div>
        </div>
        <div>
          <p className=" text-neutral-500  underline mt-3">BASIC INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Address:</p>
            {edit ? (
              <div className=" flex flex-col gap-1">
                <input
                 value={userData.address.line1}
                  className="max-w-52 bg-gray-100"
                  onChange={(e) => {
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }));
                  }}
                  type="text"
                />
                <input
                value={userData.address.line2}
                  onChange={(e) => {
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }));
                  }}
                  className="max-w-52 bg-gray-100"
                  type="text"
                />
              </div>
            ) : (
              <div className=" flex gap-1 flex-col">
                <p>{userData.address.line1}</p>
                <p>{userData.address.line2}</p>
              </div>
            )}
            <p className="font-medium">Gender:</p>
            {edit ? (
              <select
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-600">{userData.gender}</p>
            )}
            <p className="font-medium">Birth date:</p>
            {edit ? (
              <input
                type="date"
                className="bg-gray-100 max-w-28"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
              />
            ) : (
              <p className="text-gray-500">{userData.dob}</p>
            )}
          </div>
        </div>
        <div className="mt-10">
          {edit ? (
            <button
              className="px-8 py-2 hover:bg-primary hover:text-white transition-all duration-500 border-primary border rounded-full "
              onClick={updateProfile}
            >
              Save Information
            </button>
          ) : (
            <button
              className="px-8 py-2  hover:bg-primary hover:text-white transition-all duration-500 border-primary border rounded-full "
              onClick={() => setEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
