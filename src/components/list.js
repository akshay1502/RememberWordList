import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';

export default function List() {
  const { state } = useLocation();
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
  }, [timer, loading, error]);
  return(
    <div>
      {
        error && <strong>Retry or refresh!</strong>
      }
      {
        loading
          ? <span>Loading...</span>
          :
          <>
            <h1>{timer}</h1>
            <div>
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
