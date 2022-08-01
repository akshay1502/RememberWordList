import { useLocation, useNavigate } from "react-router-dom"

export default function Result() {
  const { state } = useLocation();
  const { target, score} = state;
  const navigate = useNavigate();
  const success = target === score;
  const navigateHome = () => {
    navigate("/");
  }
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