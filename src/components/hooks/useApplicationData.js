import { useEffect, useState } from "react";
import axios from 'axios';

const useApplicationData = () => {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  const updateSpots = function(state, appointments) {
    
    const dayObj = state.days.find(d => d.name === state.day);
    
    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }

    const day = {...dayObj, spots};
    const days = state.days.map(d => d.name === state.day ? day :d);

    return days;

  }


  const bookInterview = function(id, interview) {
    const appointment = {...state.appointments[id], interview: { ...interview }};
    const appointments = {...state.appointments, [id]: appointment};
    
    const url = `/api/appointments/${id}`;
    return axios.put(url, { interview })
    .then(res => {
        const days = updateSpots(state, appointments);
        setState(prev => ({ ...prev, appointments, days }));
      });

  };

  const cancelInterview = function(id) {
    const appointment = { ...state.appointments[id], interview: null};
    const appointments = { ...state.appointments, [id]: appointment};

    const url = `/api/appointments/${id}`
    return axios.delete(url)
      .then(res => {
        const days = updateSpots(state, appointments)
        setState(prev => ({ ...prev, appointments, days }));
      });
  };

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState(prev => ({...prev, days, appointments, interviewers})) 
    });
  }, []);

  return { state, bookInterview, cancelInterview, setDay };

}

export default useApplicationData;
