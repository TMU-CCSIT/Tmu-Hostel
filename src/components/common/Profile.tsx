"use client"

import React, { useState } from "react";
import Image from "next/image";

import { useEffect } from "react";

import axios from "axios";

const ProfilePage = () => {
  // Dummy data for now
  // const userData = {
  //   Name: "Adarsh Jain",
  //   Email: "oyoKaMalik@gmail.com",
  //   DOB: "1890-01-01",
  //   Address: "tent",
  //   EnrollmentNo: "TCA2159017",
  //   ParentName: "adarsh ke papa",
  //   ParentContactNo: "09888",
  //   FingerNo: "0000000",
  //   Course: "Agriculture",
  //   College: "none",
  //   RoomNo: "aunty wala",
  // };

  const [data, setData] = useState(null);




  async function userDetails() {

    try {

      let response = await axios.get("/api/auth/studentSignup");
      console.log("user details ", response?.data);
      // setData(response?.data?.data?.studentDetails);
      //studentDetails,userDetails

      setData([response?.data?.data?.studentDetails, response?.data?.data?.userDetails]);

    } catch (error: any) {

      console.log(error.message);

    }
  }

  useEffect(() => {

    userDetails();

  }, []);

  return (
    <div className="container mx-auto px-4 py-2 ">
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-14 flex justify-center underline sm:text-4xl">PROFILE  INFORMATION</h2>
        <div className="flex justify-center items-center">
          <div className="flex-shrink-0">
            <Image
              className="rounded-lg shadow-2xl w-[10rem] h-[10rem]"
              src="data:image/jpeg;base64,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"
              alt="Profile Picture"
              width={96}
              height={96}
            />
          </div>
        </div>
        <div className="sm:m-14 m-1 sm:mt-1 bg-[#437FC7] rounded-3xl shadow-2xl p-11">


          {/* content */}
          <div className="mt-8 grid lg:grid-cols-3 md:grid-cols-2 gap-16">
            {

              // data && Object.entries(data)?.map(([key, value]) => (

              //   <div key={key} className="mb-4">

              //     <p className="text-[#EDF6FF] font-bold">{key}</p>

              //     <p className="font-bold text-xl">{value}</p>

              //   </div>
              // ))

              data && data?.map((item:any, index:any) => (
                <div key={index} className="mb-4">
                  <p className="text-[#EDF6FF] font-bold">
                    {index === 0 ? "Student Details" : "User Details"}</p>
                  {Object.entries(item)?.map(([key, value]) => (
                    <div key={key} className="mb-4">
                      <p className="text-[#EDF6FF]">{key}</p>
                      <p className="font-bold text-xl">{value}</p>
                    </div>
                  ))}
                </div>
              ))

            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;


