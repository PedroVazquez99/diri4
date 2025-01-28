import { FormEvent, useEffect, useRef, useState } from "react";
import "../styles/EnrolmentForm.css";
import { Student } from "../entities/Student";

interface EnrolmentFormProps {
  chosenProgram: string;
  currentEnrolments: number;
  onChangeEnrolments: (updateEnrolments: number) => void;
  onStudentChanged: (student: Student) => void;
  editingStudent?: Student; // Para editar un estudiante
}

function EnrolmentForm(props: EnrolmentFormProps) {
  const nameInputRef = useRef<HTMLInputElement>(null); // referencia el DOM con el Virtual DOM

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [btnTitle, setBtnTitle] = useState("Registar"); // Cambiar el título del botón
  const [editingStudentID, setEditingStudentID] = useState<string>(); // ID del estudiante a editar

  // Manejar el envío del formulario
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const submitter = (event.nativeEvent as SubmitEvent)
      .submitter as HTMLInputElement;
    if (!submitter || submitter.value != "Cancelar") {
      setWelcomeMessage(`Bienvenido/a ${firstName} ${lastName}`);
      props.onChangeEnrolments(props.currentEnrolments + 1);
      const student: Student = {
        id: editingStudentID,
        firstName: firstName,
        lastName: lastName,
        program: props.chosenProgram,
      };
      props.onStudentChanged(student);
    }
    setEditingStudentID(undefined);
    setFirstName(""); // añadido porque hemos añadido value en el input
    setLastName("");
    nameInputRef.current?.focus(); // situamos el cursor en el campo fname
    event.preventDefault();
    setBtnTitle("Registrar");
  };

  useEffect(() => {
    // Actualizar el formulario si se está editando un estudiante
    if (props.editingStudent) {
      setEditingStudentID(props.editingStudent.id);
      setFirstName(props.editingStudent.firstName);
      setLastName(props.editingStudent.lastName);
      setBtnTitle("Actualizar");
    }
  }, [props.editingStudent]);

  return (
    <div>
      <form className="enrolForm" onSubmit={handleSubmit}>
        <h1>Datos del estudiante - {props.chosenProgram}</h1>
        <label>Nombre:</label>
        <input
          type="text"
          name="fname"
          ref={nameInputRef}
          onChange={(event) => setFirstName(event.target.value)}
          value={firstName}
        />
        <label>Apellidos:</label>
        <input
          type="text"
          name="lname"
          onChange={(event) => setLastName(event.target.value)}
          value={lastName}
        />
        <input type="submit" value={btnTitle} className="btnForm" />
        <input type="submit" value="Cancelar" className="btnForm" />
        <label id="studentMsg" className="message">
          {welcomeMessage}
        </label>
      </form>
    </div>
  );
}

export default EnrolmentForm;
