import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImage, setDocImage] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [Speciality, setSpeciality] = useState("General Physician");
  const [education, setEducation] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [about, setAbout] = useState("");

  const { aToken, backendUrl } = useContext(AdminContext);

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      if (!docImage) {
        return toast.error("Image not selected");
      }
      const formData = new FormData();
      formData.append("image", docImage);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("speciality", Speciality);
      formData.append("degree", education);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );
      formData.append("about", about);

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setDocImage(false);
        setName("");
        setEmail("");
        setPassword("");
        setFees("");
        setAbout("");
        setEducation("");
        setAddress1("");
        setAddress2("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      return toast.error();
    }
  };

  return (
    <form onSubmit={submitHandle} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className=" border rounded max-w-4xl p-8 w-full bg-white max-h-[80vh] overflow-y-scroll">
        <div className=" mb-4 text-gray-500 gap-4 flex items-center">
          <label htmlFor="doc-image">
            <img
              className="bg-white w-16 rounded-full  cursor-pointer"
              src={
                docImage ? URL.createObjectURL(docImage) : assets.upload_area
              }
              alt=""
            />
          </label>

          <input
            type="file"
            hidden
            id="doc-image"
            onChange={(e) => setDocImage(e.target.files[0])}
          />
          <p>
            Upload doctors <br /> image
          </p>
        </div>
        <div className=" flex flex-col lg:flex-row gap-10 items-start text-gray-600">
          <div className="w-full flex lg:flex-1 gap-4 flex-col">
            <div className=" flex flex-1 flex-col gap-1">
              <p>Doctor name</p>
              <input
              value={name}
                onChange={(e) => setName(e.target.value)}
                className=" border rounded px-3 py-2 outline-none"
                type="text"
                placeholder="Name"
                required
              />
            </div>
            <div className=" flex flex-1 flex-col gap-1">
              <p>Doctor email</p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" border rounded px-3 py-2 outline-none"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div className=" flex flex-1 flex-col gap-1">
              <p>Password</p>
              <input
              value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" border rounded px-3 py-2 outline-none"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div className=" flex flex-1 flex-col gap-1">
              <p>Experirnce</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                className=" border rounded px-3 py-2 outline-none"
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>
            <div className=" flex flex-1 flex-col gap-1">
              <p>Fees</p>
              <input
              value={fees}
                onChange={(e) => setFees(e.target.value)}
                className=" border rounded px-3 py-2 outline-none"
                type="number"
                placeholder="fees"
              />
            </div>
          </div>
          <div className=" flex flex-col lg:flex-1 w-full gap-4">
            <div className=" flex flex-1 flex-col gap-1">
              <p>Speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                className=" border rounded px-3 py-2 outline-none"
              >
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className=" flex flex-1 flex-col gap-1">
              <p>Education</p>
              <input
              value={education}
                onChange={(e) => setEducation(e.target.value)}
                className=" border rounded px-3 py-2 outline-none"
                type="text"
                required
                placeholder="Education"
              />
            </div>
            <div className=" flex flex-1 flex-col gap-1">
              <p>Address</p>
              <input
              value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className=" border rounded px-3 py-2 outline-none"
                type="text"
                required
                placeholder="address 1"
              />
              <input
              value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                className=" border rounded px-3 py-2 outline-none"
                type="text"
                required
                placeholder="address 2"
              />
            </div>
          </div>
        </div>
        <div className=" flex flex-1 flex-col mt-4 mb-2 gap-1">
          <p>About doctor</p>
          <textarea
          value ={about}
            onChange={(e) => setAbout(e.target.value)}
            className=" border rounded px-3 py-2 outline-none"
            name=""
            placeholder="About doctor"
            rows={5}
          ></textarea>
        </div>
        <button
          type="submit"
          className=" bg-primary text-white px-10 py-3 mt-4 rounded-full"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
