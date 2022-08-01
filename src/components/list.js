/* eslint-disable no-restricted-globals */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import { cleanUpState } from "../features/remember/rememberSlice";

export default function List() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(state === '5' 
    ? 30 
    : ( state === '8' 
      ? 45 
      : (state === '10' 
        ? 60 
        : 0)));
  const {loading, error, list} = useSelector(state => state.remember.inputList);
  const navigate = useNavigate();
  useEffect(() => {
    if(!loading && !error) {
      setTimeout(() => setTimer(timer - 1), 1000);
      if (timer === 0) {
        navigate('/play');
      }
    }
    window.addEventListener('popstate', function () {
      dispatch(cleanUpState());
      navigate('/');
    });
  }, [timer, loading, error]);
  return(
    <div className="list">
      {
        error && <strong>Retry or refresh!</strong>
      }
      {
        loading
          ? <span>Loading...</span>
          :
          <>
            <div>Moving back will result in restarting the game.</div>
            <h1>{timer}s</h1>
            <div className="inputList">
              {list.map((value, index) => {
                return (
                  <p key={index}>{value}</p>
                );
              })}
            </div>
          </>
      }
    </div>
  )
}
