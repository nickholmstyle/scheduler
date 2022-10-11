import React from 'react';
import 'components/Appointment/styles.scss';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
// import Confirm from './Confirm';
// import Error from './Error';
import useVisualMode from 'components/hooks/useVisualMode';



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING = "SAVING"
// const DELETING = "DELETING"
// const CONFIRM = "CONFIRM"
// const ERROR = "ERROR"
// const EDIT = "EDIT"

const Appointment = (props) => {
  
const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY)
 
 
  const save = function(name, interviewer) {
    
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => 
      transition(SHOW)
    );  
  }

  // const deleteInterview = function() {
  //   transition(DELETING, true)
  //   props.cancelInterview(props.id)
  //     .then(() => transition(EMPTY))
  // }

  // const confirmDelete = function() {
  //   transition(CONFIRM)
  // }



  

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer}/>}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={back} />}
      {mode === SAVING && <Status message={"Saving"} />}   
      {/* {mode === DELETING && <Status message={DELETING} />} */}
      {/* {mode === CONFIRM && <Confirm message={'Are you sure?'} onConfirm={deleteInterview} onCancel={back} />} */}
    </article>

  )
}


export default Appointment;