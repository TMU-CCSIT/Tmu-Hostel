"use client";
import Loading from "@/components/common/Loading";
import NotFound from "@/components/common/NotFound";
import LeaveApprovalCard from "@/components/faculty/LeaveApprovalCard";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import StudentInfo from "@/components/student/StudentInfo";

const ApplicationPage = () => {

  const [data, setData] = useState<null | []>(null);

  const [loading, setLoading] = useState(false);

  const [individualUserData, setIndividualUserData] = useState<any>(null);

  const [click, setClick] = useState(false);

  const router = useRouter();

  async function fetchAllPendingLeaves() {
    setLoading(true);
    try {
      const res: any = await axios.get("/api/leave-form");
      setData(res?.data?.data);
    } catch (error) {
      toast.error("Something went wrong, try again later");
      console.log("Error when try to fetch warden applications");
      setData(null);
      router.push("/something-went-wrong");
    } finally {
      setLoading(false);
    }
  }

  function removeHandler(id: string) {
    const newData: any = data?.filter(
      (application: any) => application._id !== id
    );
    setData(newData);
  }

  useEffect(() => {

    fetchAllPendingLeaves();

  }, []);

  return (
    <>
      {loading && <Loading />}
      <div className="min-h-screen w-full bg-[#ffffff] flex flex-col gap-5 justify-start items-center">
        <div className="w-11/12 mt-5 mb-10 flex-col flex gap-2">
          <div>
            <span className="text-4xl text-black font-semibold">
              Pending Applications
            </span>
          </div>
          <div className="w-full mt-5 flex-col flex gap-5">
            {data &&
              (data.length > 0 ? (
                data?.map((leaveForm: any) => (

                  <div onClick={() => {

                    setClick(true);
                    setIndividualUserData(leaveForm);

                  }}>

                    <LeaveApprovalCard
                      removeHandler={removeHandler}
                      key={leaveForm._id}
                      userInfo={leaveForm}
                    />

                  </div>
                ))
              ) : (
                <NotFound />
              ))}
          </div>

          {click && individualUserData && (

            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">

              <StudentInfo

                dateFrom={individualUserData?.dateFrom}
                dateTo={individualUserData?.dateTo}
                email={individualUserData?.user?.email}
                contactNo={individualUserData?.user?.contactNo}
                reasonForLeave={individualUserData?.reasonForLeave}
                addressDuringLeave={individualUserData?.addressDuringLeave}
                name={individualUserData?.user?.fullName}
                userImage={individualUserData?.user?.profileImage}
                enrollmentNo={individualUserData?.user?.refId?.enrollmentNo}
                Branch={individualUserData?.user?.refId?.branch}
                College={individualUserData?.user?.refId?.college}
                Hostel={individualUserData?.user?.refId?.hostel}
                ParentNo={individualUserData?.user?.refId?.parentContactNo}
                parentName={individualUserData?.user?.refId?.parentName}
                setClick={setClick}

              />

            </div>
          )}


        </div>
      </div>
    </>
  );
};

export default ApplicationPage;
