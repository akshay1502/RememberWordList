import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

export default function InputContainer({action}) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const dispatch = useDispatch()
  const handleInput = (e) => {
    const value = e.target.value;
    setInput(value);
    const errMsg = !/^[a-z]+$/g.test(value) ? "Only smallcase letters are allowed" : "" ;
    setError(errMsg);
  }
  const handleEnter = (e) => {
    if(e.key === 'Enter') {
      SubmitInput();
    }
  }
  const SubmitInput = () => {
    if(!input.length) {
      alert("Word can't be empty");
    } else if(input.length === 1 || input.length > 20) {
      alert("Word length should be between 2-20");
    } else if (error) {
      inputRef.current.focus();
    } else {
      dispatch(action(input));
      setInput("");
    }
  }
  return(
    <div className="inputContainer">
        <input
          type="text"
          value={input}
          onChange={(e) => handleInput(e)}
          onKeyDown={handleEnter}
          ref={inputRef}
          className="input"
          placeholder="Enter word"
        />
        <small style={{ color: 'red' }}>{error}</small>
        <button
          onClick={SubmitInput}
          className="addToList"  
          >Add to List</button>
      </div>
  );
}