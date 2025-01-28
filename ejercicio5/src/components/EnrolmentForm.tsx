import { FormEvent, useRef, useState } from 'react';
import '../styles/EnrolmentForm.css';
import { Student } from '../entities/Student';
import { v4 as uuidv4 } from 'uuid';

interface EnrolmentFormProps {
    chosenProgram: string;
    currentEnrolments: number;
    onChangeEnrolments: (updateEnrolments: number) => void;
    onStudentChanged: (student: Student) => void;
}

function EnrolmentForm(props: EnrolmentFormProps) {

    const nameInputRef = useRef<HTMLInputElement>(null); // referencia el DOM con el Virtual DOM

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [welcomeMessage, setWelcomeMessage] = useState('');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        setWelcomeMessage(`Bienvenido/a ${firstName} ${lastName}`);
        props.onChangeEnrolments(props.currentEnrolments + 1);
        event.currentTarget.reset(); // vaciamos el formulario
        event.preventDefault();
 
      const student: Student = {
          firstName: firstName,
          lastName: lastName,
          program: props.chosenProgram
        };
        props.onStudentChanged(student);
        
    };


  return (
    <div>
      <form className="enrolForm" onSubmit={handleSubmit}>
        <h1>Datos del estudiante - {props.chosenProgram}</h1>
        <label>Nombre:</label>
        <input
          type="text"
          name="fname"
          onBlur={(event) => setFirstName(event.target.value)}
          ref={nameInputRef}
        />
        <label>Apellidos:</label>
        <input
          type="text"
          name="lname"
          onBlur={(event) => setLastName(event.target.value)}
        />
        <input type="submit" value="Registrar" />
        <label id="studentMsg" className="message">
          {welcomeMessage}
        </label>
      </form>
    </div>
  );
}

export default EnrolmentForm;
