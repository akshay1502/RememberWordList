import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { addToAnsList, cleanUpState } from "../features/remember/rememberSlice";

export default function Play() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  console.log(Boolean(error || !input.length));

  const score = useSelector(state => state.remember.score);
  const retry = useSelector(state => state.remember.retry);
  const ansList = useSelector(state => state.remember.ansList);
  const target = useSelector(state => state.remember.inputList.list.length);
  const playing = useSelector(state => state.remember.playing);

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleInput = (e) => {
    const value = e.target.value;
    setInput(value);
    const errMsg = !/^[a-z]+$/g.test(value) ? "Only smallcase letters are allowed." : "";
    setError(errMsg);
  }
  const handleAddToAnsList = () => {
    dispatch(addToAnsList(input));
    setInput("");
    inputRef.current.focus();
  }
  useEffect(() => {
    if (!playing) {
      navigate('/');
    }
    if (retry < 0 || score === target) {
      navigate('/result', { state: { target, score, retry }});
    }
    window.addEventListener('popstate', function() {
      dispatch(cleanUpState());
      navigate('/');
    });
  }, [score, retry, playing, target]);
  return(
    <>
      <div className="output">
        <span>Score</span>
        <strong>{score} / {target}</strong>
      </div>
      <div className="output">
        <span>Retry</span>
        <strong>{retry}</strong>
      </div>
      <div className="inputContainer">
        <input
          type="text"
          value={input}
          onChange={(e) => handleInput(e)}
          ref={inputRef}
          className="input"
          placeholder="Enter word"
        />
        <small style={{ color: 'red' }}>{error}</small>
        <button
          onClick={handleAddToAnsList}
          className="btn"
          disabled={Boolean(error || !input.length)}
          >Add to List</button>
      </div>
      <div className="ansList">
        {
          ansList.map(obj => {
            const {key, success, data} = obj;
            return(
              <p key={key} style={{ color: `${success ? 'green' : 'red'}`}}>{data}</p>
            )
          })
        }
      </div>
    </>
  )
};