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
      <button
        className="btn"
        onClick={handleCreateInputList}
      >
        Play
      </button>
    </>
  )
}
      
