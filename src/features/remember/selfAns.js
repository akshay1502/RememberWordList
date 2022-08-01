import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputContainer from "./inputContainer";
import { addToAnsList } from "./rememberSlice";

export default function SelfAns() {
  const ansList = useSelector(state => state.remember.ansList);
  const target = useSelector(state => state.remember.inputList.length);
  const score = useSelector(state => state.remember.score);
  const retry = useSelector(state => state.remember.retry);
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
      <div className="output">
        <span>Score</span>
        <strong>{score} / {target}</strong>
      </div>
      <div className="output">
        <span>Retry</span>
        <strong>{retry}</strong>
      </div>
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