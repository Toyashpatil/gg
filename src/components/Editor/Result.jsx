import React, { useContext, useState } from "react";
import { Tab, Tabs } from "@mui/material";
import ResultContext from "../../context/ResultContext";


const Result = (props) => {
 const { currQuestion } = props;
 const [value, setValue] = useState(0); 
 let { result } = useContext(ResultContext);

 const handleChange = (event, newValue) => {
    setValue(newValue);
 };

 
 return (
    <div className="">
      <div className="bg-[#383636] p-2 font-Rubik">Result</div>
      {currQuestion.testCases ? (
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="test case tabs"
          sx={{
            '& .MuiTab-root': {
              margin: '10px', 
              borderRadius: '10px', 
             
              color: '#FFFFFF', 
              '&.Mui-selected': {
                backgroundColor: '#A9A9A9', 
              },
              
            },
          }}
        >
          {/* {currQuestion.testCases.map((testCase, index) => (
            <Tab label={`Case ${index + 1}`} key={index} />
          ))} */}
        </Tabs>
      ) : null}

      {currQuestion.testCases ? (
        <div className="bg-[#444444] px-4 pt-2 rounded-bl-lg rounded-br-lg overflow-y-scroll">
          {/* {currQuestion.testCases.map((testCase, index) => (
            <div
              key={index}
              style={{ display: value === index ? "block" : "none" }}
            >
              <h2 className="font-bold font-Rubik ">Input</h2>
              <p className=" text-[#bab2b2] bg-[#3c3c3c] p-2 rounded-md">
                {JSON.stringify(testCase.input)}
              </p>
              {currQuestion.testCases.target ? (
                <div>
                 <h2 className="mt-2 font-bold font-Rubik ">Target</h2>
                 <p className=" text-[#bab2b2] bg-[#3c3c3c] p-2 rounded-md">
                    {testCase.target}
                 </p>
                </div>
              ) : null}

              <h2 className="mt-2 font-bold font-Rubik ">Result</h2>
              <p className=" text-[#bab2b2] bg-[#3c3c3c] p-2 rounded-md">
                {JSON.stringify(result[index])}
              </p>
              <h2 className="mt-2 font-bold font-Rubik ">Expected</h2>
              <p className=" text-[#bab2b2] bg-[#3c3c3c] p-2 rounded-md mb-2">
                {JSON.stringify(testCase.output)}
              </p>
            </div>
          ))} */}
        </div>
      ) : null}
    </div>
 );
};

export default Result;
