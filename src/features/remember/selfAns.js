import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputContainer from "./inputContainer";
import { addToAnsList } from "./rememberSlice";

export default function SelfAns() {


  const navigate = useNavigate();
  useEffect(() => {
    console.log(target);
    if(target === 0) {
      console.log('target');
      return navigate("/");
    }
    if (retry === -1) {
      console.log('retry');
      return navigate("/result", { state: {target, score}});
    }
    if (score === target) {
      console.log('score');
      return navigate("/result", { state: {target, score}});
    }
  }, [retry, score, target]);
  return(
    <div className="selfAnsList">
      <h1>Answer List.</h1>

      <InputContainer action={addToAnsList}/>
      <div>
        {
          ansList.map(obj => {
            const { key, success, data } = obj; 
            return(
              <div key={key} className="listEle">
                <p style={{ color: `${success ? "green" : "red"}`}}>{data}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}