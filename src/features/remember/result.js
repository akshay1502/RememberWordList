import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"

export default function Result() {
  const navigate = useNavigate();
  let { state } = useLocation();
  state = state ?? {};
  const { target, score } = state ?? {};
  const success = target === score;
  const navigateHome = () => {
    navigate("/");
  }
  useEffect(() => {
    if (!state.hasOwnProperty('target')) {
      navigate("/");
    }
    if (target === 0) {
      navigate("/");
    }
  }, [target, score]);
  return(
    <div>
      <h1>You {`${success ? "WON" : "LOST"}`} { success 
        ? <span>&#127881; &#127882;</span>
        : <span>&#128532; &#128533;</span>
      }</h1>
      <p>Your score {score} / {target}.</p>
      <button onClick={() => navigateHome()} className="home">Home</button>
    </div>
  )
}