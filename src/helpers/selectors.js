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

const getInterview = function (state, interview) {
  if (!interview) {
    return null;
  }
  const interviewCopy = { ...interview };
  interviewCopy.interviewer = state.interviewers[interview.interviewer];
  return interviewCopy;
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };
