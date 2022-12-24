/* eslint-disable no-restricted-globals */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export default function List() {
  const { state } = useLocation();
  const { level, playing } = state;
  const [timer, setTimer] = useState(
    level === "5" ? 30 : level === "8" ? 45 : level === "10" ? 60 : 0
  );
  const { loading, error, list } = useSelector(
    (state) => state.remember.inputList
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!playing) {
      navigate("/", { replace: true });
    }
    if (!loading && !error) {
      setTimeout(() => setTimer(timer - 1), 1000);
      if (timer === 0) {
        navigate("/play", { replace: true });
      }
    }
  }, [timer, loading, error]);
  return (
    <div className="list">
      {error && <strong>Retry or refresh!</strong>}
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          <div className="caution">
            !!!Moving back will result in restarting the game.
          </div>
          <h1>{timer}s</h1>
          <div className="inputList">
            {list.map((value, index) => {
              return <p key={index}>{value}</p>;
            })}
          </div>
        </>
      )}
    </div>
  );
}
