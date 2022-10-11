import React from 'react';
import 'components/Appointment/styles.scss';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
// import Error from './Error';
import useVisualMode from 'components/hooks/useVisualMode';



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING = "SAVING"
const DELETING = "DELETING"
const CONFIRM = "CONFIRM"
const EDIT = "EDIT"
// const ERROR = "ERROR"

const Appointment = (props) => {
  
const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY)
 
 
  const save = function(name, interviewer) {
    
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview).then(() => 
      transition(SHOW)
    ); 

  }

  const deleteInterview = () => {
    transition(DELETING)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY));
  }

  const toConfirm = () => {
    transition(CONFIRM);
  }

  const toCreate = () => {
    transition(CREATE);
  }

  const toEdit = () => {
    transition(EDIT);
  }


  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={toCreate} />}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onEdit={toEdit} onDelete={toConfirm}/>}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={back} />}
      {mode === SAVING && <Status message={"Saving"} />}   
      {mode === DELETING && <Status message={"Bye-bye"} />}
      {mode === CONFIRM && <Confirm message={'Are you sure?'} onConfirm={deleteInterview} onCancel={back} />}
      {mode === EDIT && <Form student={props.interview.student} interviewer={props.interview.interviewer} interviewers={props.interviewers} onSave={save} onCancel={back}/>}
    </article>

  )
}


export default Appointment;