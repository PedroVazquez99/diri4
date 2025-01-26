import { ChangeEvent, useState } from "react";
import "./App.css";
import EnrolmentForm from "./components/EnrolmentForm";
import EnrolList from "./components/EnrolList";

function App() {
  const [ugEnrolments, setUGEnrolments] = useState(0);
  const [program, setProgram] = useState("UG"); // Para el select
  const [pgEnrolments, setPGEnrolments] = useState(0);
  const [enrolments, setEnrolments] = useState(0); // Variable para contabilizar el numero de matriculas

  // Funcion para cambiar en el SELECT
  const handleChangeProgram = (event: ChangeEvent<HTMLLIElement>) => {
      setProgram(event.target.value.toString());
 };

  // Evento que se comunica con el hijo
  const handleChangeEnrolments = (updateEnrolments: number) => {
    setEnrolments(updateEnrolments);
  };

  const selectedEnrolments = (): number => {
    return program == "UG" ? ugEnrolments : pgEnrolments;
  };

  return (
    <>
      <div className="App">
        <div className="programs">
          <ul className="ulEnrol">
          <label>Selecciona el tipo de estudio:</label>
            <li className="parentLabels" onChange={handleChangeProgram}>
              <input
                type="radio"
                value="UG"
                name="programGroup"
                defaultChecked
              />
              Grado
              <input
                type="radio"
                className="radioSel"
                value="PG"
                name="programGroup"
              />
              Postgrado
            </li>
            <li>Matriculaciones actuales: {enrolments}</li>
          </ul>
        </div>
        <EnrolmentForm
          chosenProgram={program}
          onChangeEnrolments={handleChangeEnrolments}
          currentEnrolments={enrolments}
          onStudentChanged={}
         
        />
        <EnrolList></EnrolList>
      </div>
    </>
  );
}

export default App;
