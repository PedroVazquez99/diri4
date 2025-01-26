import { ChangeEvent, useState } from 'react';
import './App.css'
import EnrolmentForm from './components/EnrolmentForm'

function App() {

  const [program, setProgram] = useState("UG"); // Para el select
  const [enrolments, setEnrolments] = useState(0); // Variable para contabilizar el numero de matriculas

  // Funcion para cambiar en el SELECT
  const handleChangeProgram = (event: ChangeEvent<HTMLSelectElement>) => {
    setProgram(event.target.value); // Actualizo el valor del select, lo haya dentro de value
  };

  const handleEnrolments = (updateEnrolments: number) => { 
    setEnrolments(updateEnrolments);
  }

  return (
    <>
      <div className="App">
        <div className="programs">
          <label>Selecciona el tipo de estudio:</label>
          <select
            className="appDropDowns"
            onChange={handleChangeProgram}
            value={program}
            >
            <option value="UG">Grado</option>
            <option value="PG">Postgrado</option>
          </select>
          <p>Matriculaciones actuales: {enrolments}</p>
        </div>
        <EnrolmentForm chosenProgram={program} currentEnrolments={enrolments} onChangeEnrolments={() => handleEnrolments(enrolments + 1 )}/>
      </div>
    </>
  );
}

export default App
