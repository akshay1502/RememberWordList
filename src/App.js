import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/home';
import Result from './components/result';
import Play from './components/play';
import List from './components/list';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="list" element={<List />} />
        <Route path="play" element={<Play />} />
        <Route path="result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
