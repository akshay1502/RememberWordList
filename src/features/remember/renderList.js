import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromInputList } from "./rememberSlice";

export default function RenderList() {
  const inputList = useSelector(state => state.remember.inputList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const letsPlayRef = useRef(null);
  useEffect(() => {
    if (inputList.length < 5) {
      letsPlayRef.current.setAttribute('disabled', 'true');
    } else {
      letsPlayRef.current.removeAttribute('disabled');
    }
  }, [inputList])
  return(
    <div>
      <div>
        {
          inputList.map(obj => {
            return(
              <div key={obj.key} className="listEle">
                <p>{obj.data}</p>
                {/* <button onClick={() => dispatch(removeFromInputList(obj.key))}>x</button> */}
              </div>
            )
          })
        }
      </div>
      <button className="letsPlay" ref={letsPlayRef} onClick={() => navigate('/selfAnsList')}>Let's Play</button>
    </div>
  )
}
