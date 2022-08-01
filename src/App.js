import './App.css';
import { Routes, Route } from "react-router-dom";
// import SelfList from './features/remember/selfList';
// import SelfAns from './features/remember/selfAns';
import Home from './components/home/home';
import Result from './features/remember/result';
import Play from './components/play/play';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route path="/selfList" element={<SelfList />} />
        <Route path="/selfAnsList" element={<SelfAns />} /> */}
        <Route path="play" element={<Play />} />
        <Route path="result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
