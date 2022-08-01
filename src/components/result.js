import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cleanUpState } from "../features/remember/rememberSlice";

export default function Result() {
  const navigate = useNavigate();
  let { state } = useLocation();
  state = state ?? {};
  const { target, score } = state ?? {};
  const success = target === score;
  const dispatch = useDispatch();
  const navigateHome = () => {
    dispatch(cleanUpState());
    navigate("/");
  }
  useEffect(() => {
    if (!state.hasOwnProperty('target')) {
      navigate("/");
    }
    if (target === 0) {
      navigate("/");
    }
    window.addEventListener('popstate', function() {
      dispatch(cleanUpState());
      navigate('/');
    });
  }, [target, score]);
  return(
    <div className="result">
      <h1>You {`${success ? "WON" : "LOST"}`} { success 
        ? <span>&#127881; &#127882;</span>
        : <span>&#128532; &#128533;</span>
      }</h1>
      <p>Your score <b>{score} / {target}</b>.</p>
      <button onClick={() => navigateHome()} className="btn hoverBtn">Home</button>
    </div>
  )
}