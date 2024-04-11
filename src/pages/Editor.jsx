import  { useEffect, useState } from "react";
import Description from "../components/Editor/Description";
import CodeEditor from "../components/Editor/CodeEditor";
import Result from "../components/Editor/Result";
import ResultContext from "../context/ResultContext";
import { useLocation } from "react-router-dom";

import { getDoc, doc } from "firebase/firestore";

import { db } from "../firebase";

const Editor = () => {
  const [result, setResult] = useState([]);
  const location = useLocation();
  const data = location.state;
  console.log(data.id);

  const [disQuestions, setDisQuestions] = useState({});

  const getQuestion = async () => {
    const docRef = doc(db, "questions", `${data.id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const DATA = docSnap.data();
      setDisQuestions(DATA);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getQuestion();
  }, []);

  console.log(disQuestions);

  return (
    <div className="">
      <div className="flex flex-row w-full gap-3">
        <div className="w-[40%]">
          <Description currQuestion={disQuestions} />
        </div>
        <div className="w-[60%] flex flex-col">
          <ResultContext.Provider value={{ result, setResult }}>
            <CodeEditor />
            <Result currQuestion={disQuestions}  />
          </ResultContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default Editor;
