import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { createInputList } from "../features/remember/rememberSlice";

export default function Home() {
  const [settings, setSettings] = useState({
    category: 'animals',
    level: '5'
  })
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setSettings({
      ...settings,
      [name]: value
    })
  };

  const handleCreateInputList = () => {
    dispatch(createInputList(settings));
    navigate("/list", { state: settings.level })
  }
  
  return(
    <>
      <h1>Remember Word List !!!</h1>
      <p>A fun game to improve your memory.</p>
      <br />
      <p>Select any category and the level you want. On clicking play we will show you a list of words related to your selected category. You have to remember all the words before the time ends. After time ends, you will be asked to enter each word shown in the list. You will get only 2 retry for wrong words.</p>
      <div className="settings">
        <label>
          Category
          <select value={settings.category} onChange={handleChange} name="category">
            <option value="animals">Animals</option>
            <option value="birds">Birds</option>
            <option value="country">Country</option>
            <option value="colors">Colors</option>
            <option value="sports">Sports</option>
          </select>
        </label>
        <label>
          level
          <select value={settings.level} onChange={handleChange} name="level">
            <option value="5">Easy</option>
            <option value="8">Medium</option>
            <option value="10">Difficult</option>
          </select>
        </label>
      </div>
      <button
        className="btn hoverBtn"
        onClick={handleCreateInputList}
      >
        Play
      </button>
    </>
  )
}
      
