import { useState } from "react";
import { useDispatch } from "react-redux";
import { createInputList } from "./features/remember/rememberSlice";
import RenderList from "./features/remember/renderList";

export default function Home() {
  return(
    <div>
      <h1>Remember Word List !!!</h1>
      <p>This game is about improving your remembering power. You can either create your own list or choose a list from below options.</p>
      <button className="btn">Create your own List</button>
      <ComputerList />
    </div>
  )
}

function ComputerList() {
  const [select, setSelect] = useState("animals");
  const [level, setLevel] = useState("5");
  const dispatch = useDispatch();
  return(
    <div>
      <h1>Play with computer generated List.</h1>
      <ul className="rules">
        <li>Easy level has 5 words.</li>
        <li>Medium level has 8 words.</li>
        <li>Difficult level has 10 words.</li>
      </ul>
      <div className="userSelection">
        <label>
          Category
          <select value={select} onChange={(e) => setSelect(e.target.value)}>
            <option value="animals">Animals</option>
            <option value="birds">Birds</option>
            <option value="country">Country</option>
            <option value="colors">Colors</option>
            <option value="sports">Sports</option>
          </select>
        </label>
        <label>
          level
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="5">Easy</option>
            <option value="8">Medium</option>
            <option value="10">Difficult</option>
          </select>
        </label>
      </div>
      <p>You will get {level}seconds to remember all the words.</p>
      <button className="btn" onClick={() => dispatch(createInputList({ fileName: select, number: level}))}>
        Create List
      </button>
      <RenderList />
    </div>
  )
}