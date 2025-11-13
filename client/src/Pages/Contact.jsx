import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="flex flex-col item-center mt-16 w-full">
      <div >
        <p className=" text-gray-600 text-2xl  text-center">
          CONTACT <span className=" text-black font-medium">US</span>
        </p>
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img className="md:w-[360px] w-full items-center" src={assets.contact_image} alt="" />
        <div className="flex flex-col gap-5 p-6">
          <b>OUR OFFICE</b>
          <p>00000 Willms Station <br />Suite 000, Washington, USA</p>
          <p>Tel: (000) 000-0000 <br /> Email: greatstackdev@gmail.com</p>
          <b>CAREERS AT PRESCRIPTO</b>
          <p>Learn more about our teams and job openings.</p>
        <button className="items-start flex  px-8 w-1/2 py-3 border cursor-pointer hover:bg-black transition-all duration-500 hover:text-white">Explore Jobs</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
