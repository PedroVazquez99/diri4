import { ChangeEvent, useState } from "react";
import "./App.css";
import EnrolmentForm from "./components/EnrolmentForm";
import EnrolList from "./components/EnrolList";
import { Student } from "./entities/Student";

function App() {
  const [program, setProgram] = useState("UG"); // Para el select
  const [ugEnrolments, setUGEnrolments] = useState(0);
  const [pgEnrolments, setPGEnrolments] = useState(0);
  const [student, setStudent] = useState({firstName: '', lastName: '', program: ''});
  // const [enrolments, setEnrolments] = useState(0); // Variable para contabilizar el numero de matriculas

  // Funcion para cambiar en el SELECT
  const handleChangeProgram = (event: ChangeEvent<HTMLLIElement>) => {
      setProgram(event.target.value.toString());
 };

  // Evento que se comunica con el hijo
  const handleChangeEnrolments = (updateEnrolments: number) => {
    
    if (program === "UG") {
      setUGEnrolments(updateEnrolments);
    } else {
      setPGEnrolments(updateEnrolments);
    }
  };

  const handleChangeStudent = (student: Student) => {
    setStudent(student);
  }

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
            <li>Matriculaciones actuales: {program === 'UG' ? ugEnrolments : pgEnrolments}</li>
          </ul>
        </div>
        <EnrolmentForm
          chosenProgram={program}
          onChangeEnrolments={handleChangeEnrolments}
          currentEnrolments={selectedEnrolments()}
          onStudentChanged={handleChangeStudent}
         
        />
        <EnrolList student={student}></EnrolList>
      </div>
    </>
  );
}

export default App;
