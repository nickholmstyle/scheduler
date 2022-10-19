// Takes in state and day to filter through the days in order to filter through the appointments
// and return an array of existing appointments for the day.

const getAppointmentsForDay = function (state, day) {
  const filteredDays = state.days.filter((each) => {
    return each.name === day;
  });

  let filteredAppointments = [];
  if (filteredDays.length > 0) {
    filteredAppointments = filteredDays[0].appointments.map((id) => {
      return state.appointments[id];
    });
  }

  return filteredAppointments;
};

// Takes in state and day to filter through the days in order to filter through the interviewers
// and return an array of existing interviewers for that day.

const getInterviewersForDay = function (state, day) {
  const filteredDays = state.days.filter((each) => {
    return each.name === day;
  });

  let filteredInterviewers = [];
  if (filteredDays.length > 0) {
    filteredInterviewers = filteredDays[0].interviewers.map((id) => {
      return state.interviewers[id];
    });
  }

  return filteredInterviewers;
};

// Takes in state and the interview object. Only if an interview exists, return the interview after assigning
// the interviewer of the interview to the interviewer of the interview of the state of the interviewers array.

const getInterview = function (state, interview) {
  if (!interview) {
    return null;
  }
  const interviewCopy = { ...interview };
  interviewCopy.interviewer = state.interviewers[interview.interviewer];
  return interviewCopy;
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };
