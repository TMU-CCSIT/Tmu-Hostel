"use client";

// importing necessities
import React, { useState } from "react";
import CTCButton from "../common/CTCButton";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import DropDown from "../common/DropDown";
import { PROGRAME } from "@/constants/constant";
import { COLLEGES } from "@/constants/constant";


// interface
interface FormData {
  college: string;
  programe: string;
}

const Signup = () => {
  // hooks for reading different values

  const router = useRouter();

  const [data, setData] = useState<FormData>({
    college: COLLEGES.ccsit,
    programe: PROGRAME["Bachelor of Tecnology"][0],
  });

  console.log(Object.keys(PROGRAME));  

  const handleChangeOfDropDown = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // dummy function to pass

  async function submitHandler(e: any) {
    try {
      console.log(data);
      e.preventDefault();

      const userResponse = await axios.post("/api/auth/signup", {
        college: data.college,
        programe: data.programe,
      });
      //   const userSignupReponse = await axios.post("/api/auth/studentSignup", {
      //     enrollmentNo: data.enrollmentNo,
      //     course: data.course,
      //     college: data.college,
      //     fingerNo: data.fingerNo,
      //     programe: data.programe,
      //     roomNo: data.roomNo,
      //     parentName: data.parentName,
      //     parentContactNo: data.parentContactNo,
      //     userId: userResponse.data.data._id,
      //   });

      //     console.log(userSignupReponse);
      //     toast.success("Signup successfully");
      //     toast("Please verify your email!", {
      //       icon: "👏",
      //     });
      //     router.push("/auth/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Signup failed");
    }
  }

  return (
    // main div
    <div className="bg-white min-h-screen text-black text-lg flex justify-center items-center p-10">
      {/* inner div */}
      <div className="bg-[#EDF6FF] flex flex-col p-8 rounded-md shadow-xl justify-center items-center gap-4 ">
        {/* heading */}
        <h1 className="text-2xl font-bold">SIGN UP</h1>

        {/* form */}
        <form
          className=" flex flex-col justify-center items-center"
          onSubmit={submitHandler}
        >
          {/* dropdown for college */}
          {/* <DropDown
            text="college"
            label="Select College:"
            name={data.college}
            onChange={handleChangeOfDropDown}
          ></DropDown> */}

          {/* deropdown for fields related to college */}
          <DropDown
            text="programe"
            label="programe"
            name={Object.keys(PROGRAME)}
            onChange={handleChangeOfDropDown}
          ></DropDown>

          {/* button */}
          <div className="m-12">
            <CTCButton text={"Submit"} type={true} />
          </div>

          {/* return to login button */}
          <div className="text-sm text-center">
            {"Already have a account?"}
            <div
              onClick={() => {
                router.push("/auth/login");
              }}
              className="underline cursor-pointer text-blue-500"
            >
              Log In
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
