import { useEffect, useState } from "react";
import axios from "axios";

// This hook requests data from our scheduler api and allows the user to update the state of the app.
// As appointments are booked or cancelled, changes made in the form will either make put or delete
// requests to the api and update the api database. When booking or cancelling, the function update spots 
// does just that by taking in the current state and the state of the appoinments object,
// and increase the number of spots when called. Its not the spots that are returned, but rather the days
// that have been mapped with the updated spots. 

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  const updateSpots = function (state, appointments) {
    const dayObj = state.days.find((d) => d.name === state.day);

    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }

    const day = { ...dayObj, spots };
    const days = state.days.map((d) => (d.name === state.day ? day : d));

    return days;
  };



  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = { ...state.appointments, [id]: appointment };

    const url = `/api/appointments/${id}`;
    return axios.put(url, { interview }).then(() => {
      const days = updateSpots(state, appointments);
      setState((prev) => ({ ...prev, appointments, days }));
    });
  };

  const cancelInterview = (id) => {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };

    const url = `/api/appointments/${id}`;
    return axios.delete(url).then(() => {
      const days = updateSpots(state, appointments);
      setState((prev) => ({ ...prev, appointments, days }));
    });
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState((prev) => ({ ...prev, days, appointments, interviewers }));
    });
  }, []);

  return { state, bookInterview, cancelInterview, setDay };
};

export default useApplicationData;
