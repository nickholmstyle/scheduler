
  //this code works with a linting error, arrow function expects return on the callback.
  
  // const updateSpots = function(id, increment) {
  //   let index = -1;
    
  //   const dayObj = state.days.find((day, i) => {
  //     index = i;
  //     if (day.appointments.includes(id)) {
  //       return day;
  //     }
  //   });
      
  //   increment ? dayObj.spots++ : dayObj.spots--;
    
  //   const days = [...state.days];
  //   days.splice(index, 1, dayObj);

  //   return days;
    
  // }


  // taken from after the key variable in the appoinment component passed into the Application component and replaced by a copy of the appointment.
  
  // id={appointment.id}
  // time={appointment.time}