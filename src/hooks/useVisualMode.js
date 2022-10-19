import { useState } from "react";

//Function that takes state to update state. Transition accounts for the update in change and back uses the history
//of the transition to return in to its initial value. This "hook" is used to update the state of the form
// and transition the between the "modes" of the state as the users navigates through the form and makes changes to it.

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
