import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cleanUpState } from "../features/remember/rememberSlice";

export default function Result() {
  const navigate = useNavigate();
  let { state } = useLocation();
  state = state ?? {};
  const { target, score } = state ?? {};
  const success = target === score;
  const dispatch = useDispatch();
  const playing = useSelector(state => state.remember.playing);
  const ansList = useSelector(state => state.remember.ansList);
  const {list} = useSelector(state => state.remember.inputList);


  const navigateHome = () => {
    dispatch(cleanUpState());
    navigate("/", {replace: true});
  }
  useEffect(() => {
    if (!playing) {
      navigate('/', {replace: true});
    }
  })
  return(
    <div className="result">
      <h1>You {`${success ? "WON" : "LOST"}`} { success 
        ? <span>&#127881; &#127882;</span>
        : <span>&#128532; &#128533;</span>
      }</h1>
      <p>Your score <b>{score} / {target}</b>.</p>
      <button onClick={() => navigateHome()} className="btn hoverBtn">Home</button>
      <div style={{ marginTop: '32px'}}>
        <h3>Actual List</h3>
        <div>
          {list.map((value, index) => {
            return (
              <p key={index}>{value}</p>
            );
          })}
        </div>
        <h3 style={{ marginTop: '16px'}}>Your list</h3>
        <div>
          {
            ansList.map(obj => {
              const {key, success, data} = obj;
              return(
                <p key={key} style={{ color: `${success ? 'green' : 'red'}`}}>{data}</p>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}