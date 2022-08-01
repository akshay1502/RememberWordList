import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { createInputList } from "../../features/remember/rememberSlice";
import RenderList from "../../features/remember/renderList";

export default function Home() {
  const [settings, setSettings] = useState({
    category: 'animals',
    level: '5'
  })
  const [start, setStart] = useState(false);
  const [timer, setTimer] = useState(30);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const {name, value} = e.target;
    setSettings({
      ...settings,
      [name]: value
    })
    if(name === 'level')
    switch(value) {
      case '5':
        setTimer(30);
        break;
      case '8':
        setTimer(45);
        break;
      case '10':
        setTimer(60);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    console.log(timer);
    if (start) {
      setTimeout(() => setTimer(timer - 1), 1000);
      if (timer === 0) {
        navigate('/play');
      }
    }
  }, [start, timer]);
  
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
      {
        start
          ? (
            <p>{timer}</p>
          )
          : (
            <button
              className="btn"
              onClick={() => {
                dispatch(createInputList(settings));
                setStart(true);
              }}
            >
              Create List
            </button>
          )
      }
      <RenderList />
    </>
  )
}
      
