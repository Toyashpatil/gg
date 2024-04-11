import { useState, useEffect, useContext } from "react";
import { FaCode } from "react-icons/fa6";
import MonacoEditor from "@monaco-editor/react";
import { Button } from "@material-tailwind/react";
import ResultContext from "../../context/ResultContext";
import { DialogDefault } from "../Dialog";
import { IoReloadOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";


const CodeEditor = () => {
  
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const { setResult } = useContext(ResultContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [newLanguage, setNewLanguage] = useState(""); 

  const questionNumber = useLocation().state.id; 

//   useEffect(() => {

//     fetch("../../questions.json")
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(language);
//         console.log(data[questionNumber][language].initialCode);
//         setTemplate(data[questionNumber][language].initialCode);
//         setQuestionsData(data);
//         setIsLoading(false);
//       });
//  }, [questionNumber, language]);

//  useEffect(() => {
//     const savedCode = localStorage.getItem("code");
//     // if (savedCode) {
//     //   setCode(savedCode);
//     //   setLanguage(localStorage.getItem("language") || "cpp");
//     // } else {
//     // }
//     // setCode(template);
//  }, [language]);



  // Define the "Hello World" templates for each language
//   const templates = {
//     c: '#include <stdio.h>\n\nint sumOfArray(const int *nums, int size) {\n    //write your code here \n\n}',
//     cpp: "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint sumOfArray(const vector<int>& nums){\n    //write your code here \n\n}",
//     java: ' public static int sumOfArray(int[] nums) {\n        //write your code here \n\n    }',
//     python: 'def sumOfArray(nums):\n    #write your code here \n\n',
//     javascript: 'function sumOfArray(nums) {\n    //write your code here \n\n}'
// };






  // useEffect(() => {
  //   fetch("../../questions.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setQuestionsData(data);
  //       setIsLoading(false);
  //       console.log(questionsData["1"]?.[language]?.trial);
  //     });
  // }, []);

  const handleEditorChange = (value) => {
    setCode(value || "");
    localStorage.setItem("code", value || "");
  };

  const handleLanguageChange = (event) => {
    setNewLanguage(event.target.value);
    setOpenDialog(true);
  };

  const handleDialogConfirm = () => {
 
    setLanguage(newLanguage);


    // const newCode = template;
    setCode('');


    localStorage.setItem("code", '');

   
    localStorage.setItem("language", newLanguage);


    setOpenDialog(false);
  };

  const handleDialogCancel = () => {
    setOpenDialog(false);
  };

  const handleRunCode = async () => {
    // console.log("Running code...");
    // if (isLoading) {
    //   console.log("Data is still loading. Please wait...");
    //   return;
    // }
    // console.log("Running code...");

    // let combinedCode = ``

    // if(language == "java"){
    //   const wrapperClass = 'import java.util.*;\npublic class HelloWorld {\n';
    //   const mainFunction = questionsData[`${questionNumber}`]?.[language]?.trial;
    //    combinedCode = `${wrapperClass}${code}\n ${mainFunction}\n}\n`;
    // }
    // else{
    //   const mainFunction = questionsData[`${questionNumber}`]?.[language]?.trial;
    //    combinedCode = `${code}\n${mainFunction}`;
    // }
    
    // console.log(combinedCode);

    // const data = {
    //   code: combinedCode,

    //   // language,
    // };

    // console.log(data);

    // let apiUrl = "http://localhost:8080/compileCpp";

    // if (language === "c++") {
    //   apiUrl = "http://localhost:8080/compileCpp";
    // } else if (language === "c") {
    //   apiUrl = "http://localhost:8080/compileC";
    // } else if (language === "python") {
    //   apiUrl = "http://localhost:8080/compilePython";
    // } else if (language === "java") {
    //   apiUrl = "http://localhost:8080/compileJava";
    // } else if (language === "javascript") {
    //   apiUrl = "http://localhost:8080/compileJavascript";
    // }

    // try {
    //   const response = await fetch(apiUrl, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Network response was not ok");
    //   }

    //   const resultData = await response.json();
    //   console.log(resultData);
    //   const output = resultData.output;
    //   const resultArray = output.split("\r\n").filter((item) => item);

    //   console.log(resultArray);
    //   setResult(resultArray);
    // } catch (error) {
    //   console.error("There was a problem with your fetch operation:", error);
    // }
    const teamId = localStorage.getItem('team-id');
    const question = questionNumber;
    console.log(teamId);
    if (teamId) {
      try {
        const docRef = await addDoc(collection(db, "submissions"), {
          code: code,
          language: language,
          question: question,
          teamId: teamId,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
   }
    
    
    
  };

  const handleSimpleRun = async() => {
    let combinedCode = ``
    if(language == "java"){
      const wrapperClass = 'import java.util.*;\npublic class HelloWorld {\n';
 
       combinedCode = `${wrapperClass}${code}\n}\n`;
    }
    else{
     
       combinedCode = `${code}\n`;
    }
    
    console.log(combinedCode);

    const data = {
      code: combinedCode,

      // language,
    };

    console.log(data);

    let apienv = import.meta.env.VITE_APP_API_URL;
    // let apiUrl = "http://localhost:8080/compileCpp";
    let apiUrl = `${apienv}/compileCpp`;
    if (language === "c++") {

      apiUrl = `${apienv}/compileCpp`;
    } else if (language === "c") {
      apiUrl = `${apienv}/compileC`;
    } else if (language === "python") {
      apiUrl = `${apienv}/compilePython`;
    } else if (language === "java") {
      apiUrl = `${apienv}/compileJava`;
    } else if (language === "javascript") {
      apiUrl = `${apienv}/compileJavascript`;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

     

      const resultData = await response.json();
      console.log(resultData);
      const output = resultData.output;
      const resultArray = output.split("\r\n").filter((item) => item);

      console.log(resultArray);
      setResult(resultArray);
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  }
  const restartCode = () => {
    setOpenDialog(true); 
  };

  return (
    <div>
      <div className="bg-[#444444] h-[60vh] rounded-lg">
        <div className="flex items-center justify-between mx-3 py-1">
          <div className="flex items-center gap-2">
            <FaCode className="text-2xl text-blue-500" />
            <h1 className="text-xl font-Rubik">Code Editor</h1>
          </div>
          <Button className="flex items-center gap-3" onClick={handleSimpleRun} children={undefined} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              width="16"
              height="16"
              viewBox="0 0 256 256"
              xmlSpace="preserve"
            >
              <defs></defs>
              <g
                style={{
                  stroke: "none",
                  strokeWidth: 0,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 10,
                  fill: "none",
                  fillRule: "nonzero",
                  opacity: 1,
                }}
                transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
              >
                <path
                  d="M 81.73 50.284 c 4.068 -2.349 4.068 -8.22 0 -10.569 L 48.051 20.271 L 14.372 0.827 c -4.068 -2.349 -9.153 0.587 -9.153 5.284 V 45 v 38.889 c 0 4.697 5.085 7.633 9.153 5.284 l 33.679 -19.444 L 81.73 50.284 z"
                  style={{
                    stroke: "none",
                    strokeWidth: 1,
                    strokeDasharray: "none",
                    strokeLinecap: "round",
                    fill: "rgb(167,167,167)",
                    fillRule: "nonzero",
                    opacity: 1,
                  }}
                  transform="matrix(1 0 0 1 0 0)"
                />
              </g>
            </svg>
            Run
          </Button>
          <Button className="flex items-center gap-3" onClick={handleRunCode} children={undefined} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              width="16"
              height="16"
              viewBox="0 0 256 256"
              xmlSpace="preserve"
            >
              <defs></defs>
              <g
                style={{
                  stroke: "none",
                  strokeWidth: 0,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 10,
                  fill: "none",
                  fillRule: "nonzero",
                  opacity: 1,
                }}
                transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
              >
                <path
                  d="M 81.73 50.284 c 4.068 -2.349 4.068 -8.22 0 -10.569 L 48.051 20.271 L 14.372 0.827 c -4.068 -2.349 -9.153 0.587 -9.153 5.284 V 45 v 38.889 c 0 4.697 5.085 7.633 9.153 5.284 l 33.679 -19.444 L 81.73 50.284 z"
                  style={{
                    stroke: "none",
                    strokeWidth: 1,
                    strokeDasharray: "none",
                    strokeLinecap: "round",
                    fill: "rgb(167,167,167)",
                    fillRule: "nonzero",
                    opacity: 1,
                  }}
                  transform="matrix(1 0 0 1 0 0)"
                />
              </g>
            </svg>
            Submit
          </Button>
          <IoReloadOutline onClick={restartCode} />
          <select
            className="text-white p-2 rounded h-full"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            {/* <option value="javascript">JavaScript</option> */}
          </select>
        </div>
        <MonacoEditor
          height="90%"
          theme="vs-dark"
          language={language}
          value={code}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            selectOnLineNumbers: true,
            fontSize: 14,
            fontFamily: "Fira Code",
          }}
        />
        <DialogDefault
          open={openDialog}
          setOpen={setOpenDialog}
          onConfirm={handleDialogConfirm}
          onCancel={handleDialogCancel}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
