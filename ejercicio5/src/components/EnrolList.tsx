import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "../styles/EnrolList.css";
import { DetailsList } from "@fluentui/react/lib/DetailsList"; // Corregido el typo en @luentui
import { initializeIcons } from "@fluentui/react/lib/Icons";
import { Student } from "../entities/Student";
import { MdEdit, MdDelete } from "react-icons/md";

initializeIcons(); // Requerido por FluentUI

interface EnrolListProps {
  student?: Student;
  onStudentRemoved: (student: Student) => void;
  onStudentEditing: (student: Student) => void;
}

function EnrolList(props: EnrolListProps) {
  const [items, setItems] = useState<Student[]>([]);

  // Estructura tabla
  const columns = [
    {
      key: "fname",
      name: "Nombre",
      fieldName: "firstName",
      minWidth: 90,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "lname",
      name: "Apellidos",
      fieldName: "lastName",
      minWidth: 90,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "program",
      name: "Estudios",
      fieldName: "program",
      minWidth: 60,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "actions",
      name: "Acciones",
      fieldName: "actions",
      minWidth: 100,
      maxWidth: 150,
      isResizable: true,
      onRender: (item: Student) => (
        <div>
          <MdEdit
            style={{ cursor: "pointer", marginRight: "10px" }}
            onClick={() => handleEdit(item)}
            size={20}
          />
          <MdDelete
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(item)}
            size={20}
          />
        </div>
      ),
    },
  ];

  // Envio el estudiante al padre para que lo edite
  const handleEdit = (item: Student) => {
    props.onStudentEditing(item); // Funcion que se le pasa desde App.tsx
  };

  const handleDelete = (item: Student) => {
    setItems(items.filter((i) => i.id !== item.id));
    props.onStudentRemoved(item);
  };

  useEffect(() => {
    if (props.student) {
      const currentID = props.student.id;
      if (currentID == undefined) {
        // Si no tiene ID, es un estudiante nuevo, es decir, no se esta editando por lo que debemos CREARLO
        const student: Student = { ...props.student, id: uuidv4() };
        setItems([...items, student]);
      } else {
        // Si tiene ID, es un estudiante que se esta editando, por lo que debemos ACTUALIZARLO
        const studentIndex = items.findIndex(
          (item) => item.id === props.student!.id
        );
        if (studentIndex !== -1) {
          const updatedItems = [...items];
          updatedItems[studentIndex] = { ...props.student }; // reemplazamos el estudiante
          setItems(updatedItems);
        } else {
          //TODO Ya lo gestionaremos mejor...
          console.log("No encontramos el estudiante con ID " + studentIndex);
        }
      }
    }
  }, [props.student]);

  return (
    <div className="enrolList">
      <DetailsList items={items} columns={columns} />
    </div>
  );
}

export default EnrolList;
