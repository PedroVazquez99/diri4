import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import "../styles/EnrolList.css";
import { DetailsList } from "@fluentui/react/lib/DetailsList"; // Corregido el typo en @luentui
import { initializeIcons } from "@fluentui/react/lib/Icons";
import { Student } from '../entities/Student';

initializeIcons(); // Requerido por FluentUI

interface EnrolListProps{
    student?: Student;
}


// Estructura tabla
const columns = [
  {
    key: "fname",
    name: "Nombre",
    fieldName: "firstName", // Corregido el typo 'ieldName' -> 'fieldName'
    minWidth: 90,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: "lname",
    name: "Apellidos",
    fieldName: "lastName", // Corregido el typo en las comillas
    minWidth: 90,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: "program",
    name: "Estudios",
    fieldName: "program", // Corregido el typo 'ieldName' -> 'fieldName'
    minWidth: 60,
    maxWidth: 200,
    isResizable: true,
  },
];

// Inserto en items los datos
const items: any[] = [];
for (let i = 1; i < 5; i++) {
  items.push({
    key: i,
    fname: "Nombre de #" + i,
    lname: "Apellidos de #" + i,
    program: "UG",
  });
}



function EnrolList(props: EnrolListProps) {
    const [items, setItems] = useState<Student[]>([]);

    useEffect(() => {
        if (props.student) {
          const currentID = props.student.id;
          if (currentID == undefined) {
            const student: Student = {
              ...props.student,
              id: uuidv4(),
            };
            setItems([...items, student]);
          }
        }
      }, [props.student]);

    return (
    <div className="enrolList">
        <DetailsList items={items} columns={columns} />
    </div>
    );
}

export default EnrolList