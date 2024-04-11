import  { useContext, useEffect } from "react";
import { FaCoins } from "react-icons/fa";
import { TbReload } from "react-icons/tb";
import QuestionTable from "../components/QuestionTable";
import { HiTrophy } from "react-icons/hi2";
import authContext from "../context/authContext";
import { useNavigate } from "react-router-dom";



const Dashboard = () => {

  const { teamDetails, getTeamDetails, questionsDetails } = useContext(authContext)

  const navigate = useNavigate();



  useEffect(() => {
    if (localStorage.getItem('team-id')) {
      getTeamDetails()
    }else{
        navigate('/login')
    }


  }, [])

  return (
    <div className="">
      <h2 className="text-primary font-Montserrat text-[2.5rem] text-center ">
        Welcome to Bid by Bit Playground
      </h2>
      <div className="flex justify-between mt-3">
        <h1 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text font-Rubik">
          Team {teamDetails.teamName}
        </h1>
        <h2 className="font-Rubik text-xl flex items-center gap-2">
          <FaCoins className="text-orange-200" />
          Bids Left : <span className="text-red-500 font-Rubik">{teamDetails.bids_left}</span>
        </h2>
      </div>
      <div className="flex items-center gap-3 mt-[5vh]">
        <h2 className="font-Montserrat text-2xl">Your Bidded Questions</h2>
        <div className="bg-[#444444] p-2 cursor-pointer  shadow-md  rounded-md">
          <TbReload className="text-2xl " />
        </div>
        <div className="flex items-center gap-2 text-xl ml-[30%]">
          <HiTrophy className="text-orange-200" />
          Team Score : <span className="text-green-700 font-Rubik">{teamDetails.score}</span>
        </div>
      </div>
      <div className="mt-5">
        <QuestionTable />
      </div>
    </div>
  );
};

export default Dashboard;
