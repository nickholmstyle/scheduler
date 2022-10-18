import { useState } from "react";

const useVisualMode = function (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (mode, replace = false) {
    setHistory(prev => replace ? [...prev.slice(0, -1), mode] : [...prev, mode])
    setMode(mode);
  };

  const back = function () {
    if (history.length < 2) {
      return;
    }
    setHistory(prev => {setMode(prev[prev.length -2])   
    return [...prev.slice(0, -1)] })
  };

  return { mode, transition, back };
};

export default useVisualMode;
