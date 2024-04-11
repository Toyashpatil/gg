import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";


import { Card, Typography } from "@material-tailwind/react";
import authContext from "../context/authContext";


const TABLE_HEAD = ["No", "Title", "Cost", "Difficulty", "Status"];

const TABLE_ROWS = [
  {
    No: "1",
    Title: "How to use Tailwind CSS?",
    Cost: "100",
    Difficulty: "Easy",
    Status: "Done",
  },
  {
    No: "2",
    Title: "What is React?",
    Cost: "100",
    Difficulty: "Medium",
    Status: "Pending",
  },
  {
    No: "3",
    Title: "How to use React Hooks?",
    Cost: "100",
    Difficulty: "Hard",
    Status: "Pending",
  },
  {
    No: "4",
    Title: "How to use React Hooks?",
    Cost: "100",
    Difficulty: "Hard",
    Status: "Pending",
  },
  {
    No: "5",
    Title: "How to use React Hooks?",
    Cost: "100",
    Difficulty: "Hard",
    Status: "Pending",
  },
];

const QuestionTable = () => {
  const { teamDetails } = useContext(authContext)
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate("/editor/" + id, {
      state: { id: id },
    });


  };
  const [disQuestions, setDisQuestions] = useState([]);


  async function fetchQuestions(questionsIndex) {
    let questions = []
    for (const index of questionsIndex) {
      const docRef = doc(db, "questions", index); // Assuming index is the document ID
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const DATAQuestions = docSnap.data()
        const questionDetailsWithId = { id: index, ...DATAQuestions };
        questions.push(questionDetailsWithId)
      } else {
        console.log("No such document!");
      }
    }
    setDisQuestions(questions);
  }

  useEffect(() => {
    const questionsIndex = teamDetails.questionsID
    fetchQuestions(questionsIndex)
  }, [teamDetails])
  return (
    <Card className="h-full w-full overflow-x-hidden overflow-y-auto font-Rubik">
      <table className="w-full min-w-max table-auto text-left bg-[#444444]  font-Rubik">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100  p-4">
                <Typography
                  variant="lead"
                  color="white"
                  className="leading-none opacity-70 font-Rubik"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {disQuestions.map((question, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr
                key={question.id}
                className={`${classes} hover:bg-blue-gray-700 transition-colors duration-200`}
                onClick={() => handleClick(question.id)}
              >
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="white"
                    className=" font-Rubik"
                  >
                    {question.id}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal font-Rubik"
                  >
                    {question.title}
                  </Typography>
                </td>
                <td className={classes}>
                  {/* <Typography
                    variant="small"
                    color="white"
                    className="font-normal font-Rubik"
                  >
                    {Cost}
                  </Typography> */}
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal font-Rubik"
                  >
                    {question.difficulty}
                  </Typography>
                </td>
                <td className={classes}>
                  {/* <Typography
                    variant="small"
                    color="white"
                    className="font-normal font-Rubik"
                  >
                    {Status}
                  </Typography> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};

export default QuestionTable;
