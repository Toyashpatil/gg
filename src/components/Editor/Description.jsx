
import { useLocation } from "react-router-dom";

const Description = (props) => {
  const location = useLocation();
  const { id } = location.state || {};

  console.log(props.currQuestion)
  const Ad = ({ma})=>{
    try{
      return <>{ma && ma.map((testCase, index) => (
        <div key={index} className="mt-2 ">
          <pre className="font-FiraCode ">
            Input:{"\n "}

            {testCase.input.map((item, index) => (
              item + "\n "
            ))}
          </pre>
          <pre className="font-FiraCode">
            Output:{"\n "}
            <span className="text-[#bab2b2]">
              {typeof (testCase.output) === 'string' || typeof (testCase.output) === 'number' ? testCase.output : testCase.output.join("\n ")}
            </span>
          </pre>
        </div>
      ))}</>
    }catch{
      return <>

      {
        <div className="mt-2 ">
          <pre className="font-FiraCode ">
            Input:{"\n "}
            {ma.input.map((item, index) => (
              item + "\n "
            ))}
          </pre>
          <pre className="font-FiraCode">
            Output:{"\n "}
            <span className="text-[#bab2b2]">
              {typeof (ma.output) === 'string' || typeof (ma.output) === 'number' ? ma.output : ma.output.join("\n ")}
            </span>
          </pre>
        </div>
      }
      </>
    }}
  return (
    <>
      <div className="bg-[#383636] rounded-tl-lg rounded-tr-lg p-2 font-Rubik">Description</div>
      <div className="bg-[#444444] max-h-screen px-4 pt-2 overflow-y-scroll rounded-bl-lg rounded-br-lg">
        <h2 className="font-bold font-Montserrat text-xl">
          {id}. {props.currQuestion.title}
        </h2>
        <p className="mt-2 text-[#bab2b2]">{props.currQuestion.description}</p>
        <div className="mt-4">
          <h3 className="font-bold text-lg">Test Cases:</h3>
          <Ad ma={props.currQuestion.testCases}/>
        </div>
        <div className="mt-4">
          <h3 className="font-bold text-lg">Constraints:</h3>
          <ul className="list-disc list-inside">
            {props.currQuestion.constraints && props.currQuestion.constraints.map((constraint, index) => (
              <li
                key={index}
                className="text-[#bab2b2] bg-blue-gray-600 p-1 my-2 w-fit rounded-md"
              >
                {constraint}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Description;
